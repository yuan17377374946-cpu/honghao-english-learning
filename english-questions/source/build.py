from pathlib import Path
import json
R=Path(__file__).parent
D=R/'dist'
data=json.loads((D/'data.json').read_text())
html='''<!doctype html>
<html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#245e51"><meta name="description" content="宏浩英语问句课堂：一般疑问句、特殊疑问句、结构拆解、听力判断、阅读与102道练习。"><title>英语问句拆解 · 宏浩课堂</title><style>__CSS__</style></head><body>
<header class="top"><a class="brand" href="../">← 宏浩课堂</a><span class="topnote">英语 · 看结构，听问题，找答案</span><a class="brand" href="../phonics-combinations/">自然拼读 ↗</a></header>
<div class="layout"><aside><div class="rail-label">ENGLISH CLASSROOM</div><nav id="nav" aria-label="学习模块"></nav><div class="rail-note"><strong>循序渐进，不急着背公式</strong><p>先看谁做什么，<br>再问什么、怎样回答。</p><div id="rail-progress"></div><div class="progressbar" aria-hidden="true"><div id="rail-bar" style="width:0%"></div></div><span>记录保存在当前浏览器。</span></div></aside><main>
<div class="toolbar"><button class="small" id="teacher" data-action="teacher">学生模式</button><button class="small" id="fontsize" data-action="fontsize">字号 A+</button><label class="voice">英语语音 <select id="voice" aria-label="英语语音"><option>正在读取设备语音</option></select></label><label>语速 <select id="rate" aria-label="语速"><option value="0.75">较慢</option><option value="0.9">适中</option><option value="1">正常</option></select></label></div><div id="voice-status" role="status"></div><div id="content"></div>
<footer class="foot"><p>例句、短文和练习为原创教学材料，不标作中考真题。语音依赖设备；结构颜色用于入门理解，部分词块包含修饰信息。</p><a href="https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/question-forms" target="_blank" rel="noopener">语法参考：British Council 问句结构</a><a href="https://learnenglishteens.britishcouncil.org/grammar/a1-a2-grammar/question-words" target="_blank" rel="noopener">疑问词与进阶语序</a></footer></main></div><div id="toast" role="status" aria-live="polite"></div><input class="hidden" type="file" id="import-file" accept="application/json,.json"><script id="app-data" type="application/json">__DATA__</script><script>__JS__</script></body></html>'''
html=html.replace('__CSS__',(D/'style.css').read_text()).replace('__DATA__',json.dumps(data,ensure_ascii=False).replace('</','<\\/')).replace('__JS__',(D/'app.js').read_text())
(D/'index.html').write_text(html)
print('Built',len(html),'characters')
