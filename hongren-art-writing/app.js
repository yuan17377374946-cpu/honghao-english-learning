const questions = [
  {q:"___ do you like to do?", hint:"I like to take photos.", answer:"What", choices:["What","Who","Where"]},
  {q:"___ do you take photos?", hint:"In the park.", answer:"Where", choices:["When","Where","Why"]},
  {q:"___ do you take photos?", hint:"On Sundays.", answer:"When", choices:["Who","How","When"]},
  {q:"___ do you like taking photos?", hint:"Because I can share beauty.", answer:"Why", choices:["Why","What","Where"]},
  {q:"___ do you take photos with?", hint:"My sister.", answer:"Who", choices:["How","Who","When"]},
  {q:"___ do you feel when you take photos?", hint:"Happy.", answer:"How", choices:["Where","How","What"]}
];

const arts = [
  {id:"photo",emoji:"📷",label:"take photos",zh:"拍照",gerund:"taking photos",past:"took photos",social:p=>`I often share my photos with ${p}.`},
  {id:"draw",emoji:"🎨",label:"draw pictures",zh:"画画",gerund:"drawing pictures",past:"drew a picture",social:p=>`I often show my pictures to ${p}.`},
  {id:"sing",emoji:"🎤",label:"sing songs",zh:"唱歌",gerund:"singing songs",past:"sang a song",social:p=>`I often sing songs with ${p}.`},
  {id:"dance",emoji:"💃",label:"dance",zh:"跳舞",gerund:"dancing",past:"danced",social:p=>`I often dance with ${p}.`},
  {id:"music",emoji:"🎹",label:"play music",zh:"演奏音乐",gerund:"playing music",past:"played music",social:p=>`I often play music for ${p}.`},
  {id:"paint",emoji:"🖌️",label:"paint",zh:"绘画",gerund:"painting",past:"painted a picture",social:p=>`I often show my paintings to ${p}.`},
  {id:"film",emoji:"🎬",label:"make films",zh:"拍电影",gerund:"making films",past:"made a short film",social:p=>`I often share my films with ${p}.`}
];

let currentStage=1, selectedAnswers={}, selectedArt=arts[0], draft="";
const $=s=>document.querySelector(s);

function renderQuiz(){
  $("#quizGrid").innerHTML=questions.map((item,i)=>`<article class="quiz-card" data-index="${i}"><p>${i+1}. ${item.q}</p><div class="answer-hint">回答：${item.hint}</div><div class="choice-row">${item.choices.map(c=>`<button class="choice" data-choice="${c}">${c}</button>`).join("")}</div></article>`).join("");
}

function renderArts(){
  $("#artGrid").innerHTML=arts.map((art,i)=>`<button class="art-card ${i===0?"selected":""}" data-art="${art.id}"><span class="emoji">${art.emoji}</span>${art.label}<small>${art.zh}</small></button>`).join("");
}

function goStage(n){
  currentStage=n;
  document.querySelectorAll(".stage").forEach(s=>s.classList.toggle("active",Number(s.dataset.stage)===n));
  $("#progressText").textContent=`第 ${n} 关 / 3`;
  $("#progressBar").style.width=`${n/3*100}%`;
  window.scrollTo({top:0,behavior:"smooth"});
}

$("#quizGrid").addEventListener("click",e=>{
  const choice=e.target.closest(".choice"); if(!choice)return;
  const card=choice.closest(".quiz-card"), i=Number(card.dataset.index);
  selectedAnswers[i]=choice.dataset.choice;
  card.querySelectorAll(".choice").forEach(b=>b.classList.toggle("selected",b===choice));
  card.classList.remove("correct","wrong");
});

$("#checkQuiz").addEventListener("click",()=>{
  let score=0;
  questions.forEach((q,i)=>{const card=document.querySelector(`.quiz-card[data-index="${i}"]`);const ok=selectedAnswers[i]===q.answer;card.classList.toggle("correct",ok);card.classList.toggle("wrong",!ok);if(ok)score++;});
  if(score===questions.length){$("#quizResult").textContent="全对！进入写作关 ✨";setTimeout(()=>goStage(2),650)}
  else $("#quizResult").textContent=`答对 ${score}/6，再看看“回答”在说什么。`;
});

$("#artGrid").addEventListener("click",e=>{
  const card=e.target.closest(".art-card"); if(!card)return;
  selectedArt=arts.find(a=>a.id===card.dataset.art);
  document.querySelectorAll(".art-card").forEach(b=>b.classList.toggle("selected",b===card));
});

function buildDraft(){
  const start=$("#startTime").value, place=$("#place").value, reason=$("#reason").value, person=$("#person").value, feeling=$("#feeling").value;
  const first=selectedArt.gerund.charAt(0).toUpperCase()+selectedArt.gerund.slice(1);
  const sentences=[
    `My favourite art form is ${selectedArt.gerund}.`,
    `I started ${selectedArt.gerund} ${start}.`,
    `Last weekend, I ${selectedArt.past} ${place}.`,
    `I like ${selectedArt.gerund} because I can ${reason}.`,
    selectedArt.social(person),
    `${first} makes me feel ${feeling}.`
  ];
  draft=sentences.join(" ");
  $("#essayPreview").textContent=draft;
  $("#studentEssay").value="";
  $("#finishCard").hidden=true;
  goStage(3);
}

$("#buildEssay").addEventListener("click",buildDraft);
document.querySelectorAll("[data-back]").forEach(b=>b.addEventListener("click",()=>goStage(Number(b.dataset.back))));

$("#speakEssay").addEventListener("click",()=>{
  if(!("speechSynthesis" in window))return;
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(draft);u.lang="en-US";u.rate=.82;speechSynthesis.speak(u);
});

$("#copyEssay").addEventListener("click",async()=>{
  try{await navigator.clipboard.writeText(`My Favourite Art Form\n${draft}`);$("#copyState").textContent="已复制"}catch{$("#copyState").textContent="长按文字即可复制"}
});

$("#toggleDraft").addEventListener("click",e=>{
  const card=document.querySelector(".essay-card"), hidden=card.hidden=!card.hidden;
  e.currentTarget.textContent=hidden?"显示初稿":"隐藏初稿";
});

$("#finishLesson").addEventListener("click",()=>{
  const text=$("#studentEssay").value.trim();
  if(text.split(/\s+/).filter(Boolean).length<20){alert("再多写一点吧，至少写出4到6个完整句子。");return;}
  $("#finishCard").hidden=false;$("#finishCard").scrollIntoView({behavior:"smooth",block:"center"});
});

// WebMCP: expose the core learning actions to compatible assistants.
if(document.modelContext?.registerTool){
  document.modelContext.registerTool({name:"open_writing_stage",title:"打开写作关卡",description:"Open a chosen stage of the art writing lesson",inputSchema:{type:"object",properties:{stage:{type:"number",enum:[1,2,3]}},required:["stage"],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},async execute({stage}){if(![1,2,3].includes(stage))throw new Error("Stage must be 1, 2, or 3.");goStage(stage);return{stage}}});
  document.modelContext.registerTool({name:"read_student_draft",title:"读取学生作文",description:"Read the student's independent essay draft",inputSchema:{type:"object",properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},async execute(){return{draft:$("#studentEssay").value||""}}});
}

renderQuiz();renderArts();goStage(1);
