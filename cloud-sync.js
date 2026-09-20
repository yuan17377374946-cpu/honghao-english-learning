(function(){
  "use strict";

  const SUPABASE_URL="https://djaywxfkwuihuwqmsgui.supabase.co";
  const SUPABASE_KEY="sb_publishable_tZ7LywU9lG_yoAhJtqaZLQ_C3DQcb8_";
  const SESSION_KEY="honghao-cloud-session-v1";
  const META_KEY="honghao-cloud-meta-v1";
  const COURSE_KEYS={
    day10:"honghao-day10-that-v1",
    day11:"honghao-day11-that-v1",
    day12:"honghao-day12-v1",
    day13:"honghao-day13-v1",
    day14:"honghao-day14-v1"
  };
  const HISTORY_KEY="honghao-history-v1";
  const WATCHED_KEYS=new Set([...Object.values(COURSE_KEYS),HISTORY_KEY]);
  const nativeSetItem=Storage.prototype.setItem;
  const nativeRemoveItem=Storage.prototype.removeItem;
  let session=readJson(localStorage.getItem(SESSION_KEY),null);
  let meta=readJson(localStorage.getItem(META_KEY),{});
  let suppressStorageHook=false;
  let refreshPromise=null;
  let syncTimer=null;
  let resolveReady;
  const ready=new Promise(resolve=>{resolveReady=resolve});

  function readJson(value,fallback){try{return value?JSON.parse(value):fallback}catch(_){return fallback}}
  function writeNative(key,value){nativeSetItem.call(localStorage,key,value)}
  function removeNative(key){nativeRemoveItem.call(localStorage,key)}
  function saveMeta(){writeNative(META_KEY,JSON.stringify(meta))}
  function saveSession(next){session=next;if(next)writeNative(SESSION_KEY,JSON.stringify(next));else removeNative(SESSION_KEY);updateAccountUI()}
  function currentPage(){
    const direct=(location.pathname.match(/(day\d+|index|vocabulary)\.html$/i)||[])[1];
    if(direct)return direct.toLowerCase();
    const preview=decodeURIComponent((location.search||"").slice(1));
    return ((preview.match(/\/(day\d+|index|vocabulary)\.html/i)||[])[1]||"index").toLowerCase();
  }
  function localPageHref(file){
    if(location.hostname!=="htmlpreview.github.io")return file;
    const source=decodeURIComponent((location.search||"").slice(1));
    return "?"+source.replace(/\/[^/]+(?:\?.*)?$/,"/"+file);
  }
  function currentCourse(){const page=currentPage();return /^day\d+$/.test(page)?page:null}
  function currentStateKey(){return COURSE_KEYS[currentCourse()]||null}
  function formatError(payload,status){
    const text=payload&&(payload.msg||payload.message||payload.error_description||payload.error);
    if(String(text||"").includes("Invalid login credentials"))return "邮箱或密码不正确";
    if(String(text||"").includes("Email not confirmed"))return "请先到邮箱确认账号";
    if(String(text||"").includes("User already registered"))return "这个邮箱已经注册，可以直接登录";
    if(String(text||"").includes("relation")&&String(text||"").includes("does not exist"))return "云端数据表还没有建立";
    return text||("连接失败（"+status+"）");
  }
  async function parseResponse(response){
    const text=await response.text();let payload=null;
    try{payload=text?JSON.parse(text):null}catch(_){payload={message:text}}
    if(!response.ok){const error=new Error(formatError(payload,response.status));error.status=response.status;error.payload=payload;throw error}
    return payload;
  }
  async function authRequest(path,options){
    const response=await fetch(SUPABASE_URL+path,{...options,headers:{apikey:SUPABASE_KEY,"Content-Type":"application/json",...(options&&options.headers||{})}});
    return parseResponse(response);
  }
  async function refreshSession(){
    if(!session||!session.refresh_token)throw new Error("请先登录云端账号");
    if(refreshPromise)return refreshPromise;
    refreshPromise=authRequest("/auth/v1/token?grant_type=refresh_token",{method:"POST",body:JSON.stringify({refresh_token:session.refresh_token})})
      .then(next=>{saveSession(next);return next})
      .catch(error=>{saveSession(null);throw error})
      .finally(()=>{refreshPromise=null});
    return refreshPromise;
  }
  async function ensureSession(){
    if(!session)return null;
    const expiresAt=Number(session.expires_at||0)*1000;
    if(expiresAt&&expiresAt<Date.now()+60000)await refreshSession();
    return session;
  }
  async function dataRequest(path,options={},retry=true){
    await ensureSession();
    if(!session)throw new Error("请先登录云端账号");
    const response=await fetch(SUPABASE_URL+path,{...options,headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+session.access_token,"Content-Type":"application/json",...(options.headers||{})}});
    if(response.status===401&&retry){await refreshSession();return dataRequest(path,options,false)}
    return parseResponse(response);
  }
  async function signIn(email,password){
    setMessage("正在登录…",false);
    const next=await authRequest("/auth/v1/token?grant_type=password",{method:"POST",body:JSON.stringify({email,password})});
    saveSession(next);closeDialog();await syncAll();setMessage("已登录，数据已同步",false);return next;
  }
  async function signUp(email,password){
    setMessage("正在创建账号…",false);
    const result=await authRequest("/auth/v1/signup",{method:"POST",body:JSON.stringify({email,password,data:{student_name:"宏浩"}})});
    if(result.access_token){saveSession(result);closeDialog();await syncAll();setMessage("宏浩账号已创建并完成同步",false)}
    else setDialogMessage("账号已创建，请先到邮箱点击确认链接，然后再登录。",false);
    return result;
  }
  async function signOut(){
    if(session){try{await dataRequest("/auth/v1/logout",{method:"POST"})}catch(_){}}
    saveSession(null);setMessage("已退出云端，本地记录仍然保留",false);
  }
  function userId(){return session&&session.user&&session.user.id}
  function encodedFilter(value){return encodeURIComponent(value)}
  async function getRemoteState(key){
    const rows=await dataRequest("/rest/v1/student_progress?select=state,updated_at&user_id=eq."+encodedFilter(userId())+"&course_key=eq."+encodedFilter(key),{method:"GET"});
    return rows&&rows[0]||null;
  }
  async function uploadState(key,raw){
    const value=readJson(raw,{});
    const rows=await dataRequest("/rest/v1/student_progress?on_conflict=user_id,course_key",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=representation"},body:JSON.stringify({user_id:userId(),course_key:key,state:value,updated_at:new Date().toISOString()})});
    meta[key]={pending:false,remoteUpdatedAt:rows&&rows[0]&&rows[0].updated_at||new Date().toISOString()};saveMeta();
    if(key!==HISTORY_KEY)await syncVocabularyFromState(key,value);
  }
  async function syncKey(key){
    if(!session)return false;
    const localRaw=localStorage.getItem(key),remote=await getRemoteState(key),info=meta[key]||{};
    if(info.pending&&localRaw){await uploadState(key,localRaw);return false}
    if(!remote){if(localRaw)await uploadState(key,localRaw);return false}
    const remoteRaw=JSON.stringify(remote.state==null?{}:remote.state);
    if(localRaw!==remoteRaw){
      suppressStorageHook=true;writeNative(key,remoteRaw);suppressStorageHook=false;
      meta[key]={pending:false,remoteUpdatedAt:remote.updated_at};saveMeta();
      return key===currentStateKey();
    }
    meta[key]={pending:false,remoteUpdatedAt:remote.updated_at};saveMeta();return false;
  }
  async function syncAll(){
    if(!session)return;
    setCloudState("syncing","正在同步");
    try{
      let shouldReload=false;
      for(const key of [...Object.values(COURSE_KEYS),HISTORY_KEY])shouldReload=(await syncKey(key))||shouldReload;
      setCloudState("ok","云端已同步");
      document.dispatchEvent(new CustomEvent("honghao:cloud-synced"));
      if(shouldReload&&!sessionStorage.getItem("honghao-cloud-reloaded-"+currentCourse())){sessionStorage.setItem("honghao-cloud-reloaded-"+currentCourse(),"1");location.reload()}
    }catch(error){setCloudState("error",error.message==="云端数据表还没有建立"?"等待建立数据表":"本地已保存 · 云端待同步");throw error}
  }
  function resolveWord(markKey){
    if(/^[a-z][a-z' -]*$/i.test(markKey))return markKey.toLowerCase().trim();
    try{if(typeof window.findWord==="function")return String(window.findWord(markKey)||"").toLowerCase().replace(/[^a-z' -]/g,"").trim()}catch(_){}
    return "";
  }
  function dictionaryInfo(word){
    try{if(typeof window.findDict==="function"){const found=window.findDict(word);if(found&&found.data)return {part_of_speech:found.data[1]||"",meaning:found.data[2]||""}}}catch(_){}
    return {part_of_speech:"",meaning:""};
  }
  async function syncVocabularyFromState(key,value){
    if(!value||!value.marks||typeof value.marks!=="object")return;
    const source=Object.keys(COURSE_KEYS).find(day=>COURSE_KEYS[day]===key)||key;
    const records=[];
    Object.entries(value.marks).forEach(([markKey,status])=>{
      const word=resolveWord(markKey);if(!word)return;const info=dictionaryInfo(word);
      records.push({user_id:userId(),word,status:status==="uncertain"?"uncertain":"unknown",source,meaning:info.meaning,part_of_speech:info.part_of_speech,last_seen:new Date().toISOString()});
    });
    if(!records.length)return;
    await dataRequest("/rest/v1/vocabulary?on_conflict=user_id,word",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify(records)});
  }
  async function trackWord(word,status="unknown",source=currentCourse()||"manual",meaning="",partOfSpeech=""){
    if(!session)return false;const clean=String(word||"").toLowerCase().replace(/[^a-z' -]/g,"").trim();if(!clean)return false;
    await dataRequest("/rest/v1/vocabulary?on_conflict=user_id,word",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify({user_id:userId(),word:clean,status,source,meaning,part_of_speech:partOfSpeech,last_seen:new Date().toISOString()})});return true;
  }
  async function listVocabulary(){
    if(!session)return [];
    return dataRequest("/rest/v1/vocabulary?select=word,status,source,meaning,part_of_speech,first_seen,last_seen&user_id=eq."+encodedFilter(userId())+"&order=last_seen.desc",{method:"GET"});
  }
  function scheduleUpload(key,raw){
    if(!WATCHED_KEYS.has(key)||suppressStorageHook)return;
    meta[key]={...(meta[key]||{}),pending:true,localUpdatedAt:new Date().toISOString()};saveMeta();
    if(!session)return;
    clearTimeout(syncTimer);syncTimer=setTimeout(()=>uploadState(key,raw).then(()=>setCloudState("ok","云端已同步")).catch(()=>setCloudState("error","本地已保存 · 云端待同步")),850);
  }
  Storage.prototype.setItem=function(key,value){nativeSetItem.call(this,key,value);if(this===localStorage)scheduleUpload(String(key),String(value))};
  Storage.prototype.removeItem=function(key){nativeRemoveItem.call(this,key);if(this===localStorage&&WATCHED_KEYS.has(String(key)))scheduleUpload(String(key),"{}")};

  function injectUI(){
    const style=document.createElement("style");style.textContent=`
      .cloud-account{position:fixed;right:18px;bottom:18px;z-index:900;display:flex;align-items:center;gap:8px;padding:9px 11px;border:1px solid #c9d9e9;border-radius:14px;background:#fff;box-shadow:0 12px 32px rgba(13,41,74,.16);font-family:Inter,"PingFang SC","Microsoft YaHei",sans-serif}.cloud-dot{width:9px;height:9px;border-radius:50%;background:#9aa8b7}.cloud-dot.ok{background:#2f8f68}.cloud-dot.syncing{background:#e3a52d}.cloud-dot.error{background:#d56a6a}.cloud-account button,.cloud-account a{border:0;background:transparent;color:#173b67;font-family:inherit;font-size:.78rem;font-weight:800;line-height:1.2;text-decoration:none;cursor:pointer}.cloud-account small{display:block;color:#657386;font-size:.66rem}.cloud-dialog-backdrop{position:fixed;inset:0;z-index:950;display:grid;place-items:center;padding:18px;background:rgba(9,28,50,.48)}.cloud-dialog-backdrop[hidden]{display:none}.cloud-dialog{width:min(420px,100%);padding:24px;border-radius:20px;background:#fff;box-shadow:0 24px 70px rgba(0,0,0,.24);font-family:Inter,"PingFang SC","Microsoft YaHei",sans-serif}.cloud-dialog h2{margin:0 0 7px;color:#0d294a}.cloud-dialog p{margin:0 0 16px;color:#657386;font-size:.82rem;line-height:1.6}.cloud-dialog label{display:block;margin:12px 0 5px;color:#173b67;font-size:.78rem;font-weight:800}.cloud-dialog input{width:100%;min-height:44px;padding:9px 11px;border:1px solid #cbd8e6;border-radius:10px;font:inherit}.cloud-dialog-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:17px}.cloud-dialog-actions button{min-height:40px;padding:8px 13px;border:1px solid #d5e0eb;border-radius:10px;background:#fff;color:#173b67;font-weight:800;cursor:pointer}.cloud-dialog-actions .cloud-primary{border-color:#173b67;background:#173b67;color:#fff}.cloud-form-message{min-height:20px;margin-top:10px!important;color:#2f8f68!important}.cloud-form-message.error{color:#ad3f3f!important}@media(max-width:600px){.cloud-account{right:11px;bottom:11px}.cloud-account small{display:none}}
    `;document.head.append(style);
    const account=document.createElement("div");account.className="cloud-account";account.innerHTML='<span id="cloudDot" class="cloud-dot"></span><button id="cloudAccountButton" type="button"><span id="cloudAccountTitle">云端未登录</span><small id="cloudAccountState">点击登录</small></button><a id="cloudVocabularyLink" href="vocabulary.html" hidden>生词本</a>';
    const dialog=document.createElement("div");dialog.id="cloudDialog";dialog.className="cloud-dialog-backdrop";dialog.hidden=true;dialog.innerHTML='<section class="cloud-dialog" role="dialog" aria-modal="true" aria-labelledby="cloudDialogTitle"><h2 id="cloudDialogTitle">宏浩学习账号</h2><p>登录后，课堂进度和点击过的生词会同步到云端。电脑和手机使用同一个账号即可看到同一份记录。</p><form id="cloudLoginForm"><label for="cloudEmail">邮箱</label><input id="cloudEmail" name="email" type="email" autocomplete="username" required><label for="cloudPassword">密码</label><input id="cloudPassword" name="password" type="password" autocomplete="current-password" minlength="6" required><div class="cloud-dialog-actions"><button class="cloud-primary" type="submit">登录</button><button id="cloudSignup" type="button">第一次使用：创建账号</button><button id="cloudClose" type="button">取消</button></div><p id="cloudFormMessage" class="cloud-form-message"></p></form><div id="cloudSignedIn" hidden><p>当前已登录宏浩的云端学习账号。</p><div class="cloud-dialog-actions"><a href="vocabulary.html" style="display:inline-flex;align-items:center;padding:8px 13px;border-radius:10px;background:#173b67;color:#fff;font-weight:800;text-decoration:none">查看云端生词本</a><button id="cloudLogout" type="button">退出登录</button><button id="cloudCloseSigned" type="button">关闭</button></div></div></section>';
    document.body.append(account,dialog);
    document.querySelector("#cloudVocabularyLink").href=localPageHref("vocabulary.html");
    dialog.querySelector('a[href="vocabulary.html"]').href=localPageHref("vocabulary.html");
    document.querySelector("#cloudAccountButton").onclick=openDialog;
    document.querySelector("#cloudClose").onclick=closeDialog;document.querySelector("#cloudCloseSigned").onclick=closeDialog;
    dialog.addEventListener("click",event=>{if(event.target===dialog)closeDialog()});
    document.querySelector("#cloudLoginForm").onsubmit=async event=>{event.preventDefault();const form=new FormData(event.currentTarget);try{await signIn(String(form.get("email")||"").trim(),String(form.get("password")||""))}catch(error){setDialogMessage(error.message,true)}};
    document.querySelector("#cloudSignup").onclick=async()=>{const form=document.querySelector("#cloudLoginForm");if(!form.reportValidity())return;const data=new FormData(form);try{await signUp(String(data.get("email")||"").trim(),String(data.get("password")||""))}catch(error){setDialogMessage(error.message,true)}};
    document.querySelector("#cloudLogout").onclick=async()=>{await signOut();closeDialog()};
    updateAccountUI();
  }
  function openDialog(){const dialog=document.querySelector("#cloudDialog");if(!dialog)return;dialog.hidden=false;updateAccountUI();if(!session)setTimeout(()=>document.querySelector("#cloudEmail")&&document.querySelector("#cloudEmail").focus(),0)}
  function closeDialog(){const dialog=document.querySelector("#cloudDialog");if(dialog)dialog.hidden=true;setDialogMessage("",false)}
  function setDialogMessage(text,isError){const host=document.querySelector("#cloudFormMessage");if(host){host.textContent=text||"";host.classList.toggle("error",Boolean(isError))}}
  function setMessage(text,isError){setDialogMessage(text,isError);setCloudState(isError?"error":"ok",text)}
  function setCloudState(kind,text){const dot=document.querySelector("#cloudDot"),label=document.querySelector("#cloudAccountState");if(dot)dot.className="cloud-dot "+kind;if(label)label.textContent=text}
  function updateAccountUI(){
    const title=document.querySelector("#cloudAccountTitle"),stateLabel=document.querySelector("#cloudAccountState"),link=document.querySelector("#cloudVocabularyLink"),form=document.querySelector("#cloudLoginForm"),signed=document.querySelector("#cloudSignedIn");
    if(title)title.textContent=session?"宏浩 · 已登录":"云端未登录";if(stateLabel)stateLabel.textContent=session?"云端数据同步中":"点击登录";if(link)link.hidden=!session;if(form)form.hidden=Boolean(session);if(signed)signed.hidden=!session;const dot=document.querySelector("#cloudDot");if(dot)dot.className="cloud-dot "+(session?"syncing":"")
  }
  async function init(){
    injectUI();
    if(session){try{await ensureSession();await syncAll()}catch(error){if(error.status===401)saveSession(null);else setCloudState("error",error.message==="云端数据表还没有建立"?"等待建立数据表":"本地已保存 · 云端待同步")}}
    resolveReady();document.dispatchEvent(new CustomEvent("honghao:cloud-ready"));
  }
  window.HonghaoCloud={ready,signIn,signUp,signOut,syncAll,trackWord,listVocabulary,isSignedIn:()=>Boolean(session),getUser:()=>session&&session.user};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
