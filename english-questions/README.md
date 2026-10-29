# 英语问句拆解 · 宏浩课堂

面向初中英语基础复习的独立静态课堂。公开入口：`english-questions/index.html`。

## 内容

- 中英提问方式对照，彩色词块解释主语、疑问词、be / 助动词 / 情态动词、动作与其他信息。
- 三条路线各20组：有 be、有情态动词、普通动词。每组按陈述句 → 一般疑问句 → 特殊疑问句逐步展开，共60组。
- 16组疑问词或词组，特别比较 how often / how long / how soon / how far。
- 主语提问 Who called you? 与宾语提问 Who did you call?；间接问句 Do you know where he lives? 置于进阶区。
- 24道听辨题：判断类型 → 判断所问信息 → 选择回答。支持普通和慢速设备语音。
- 3篇原创短文、12道阅读题：句子编号、按需中文、答案依据高亮及解析。
- 66道专项练习：18选择、24词块排序、12改错、12自主提问。
- 共102道可记录练习；错题复习、教师解析、可调大字号、导出/导入记录。

## 使用说明

`index.html` 包含全部样式、脚本与题库，可独立部署，无第三方前端依赖。

记录保存在当前浏览器 localStorage（`honghao-questions-v1`），不会自动跨设备同步。导入合并记录，同一道题保留较新的作答。最近一次答错的题进入待复习，重做答对后移出。

朗读使用 SpeechSynthesis 和设备提供的英语语音，优先 en-GB。没有英语语音时显示明确说明，可展开题干由老师朗读；页面未包含真人录音。自动语音无法保证和真人听力材料完全一致。

输入题忽略大小写和标点后与参考表达匹配；其他合理表达需由老师确认，不把所有不同写法都判成语法错误。

例句、听力题和短文均为原创教学材料，不是中考真题。已链接到同站2022—2026中考真题课堂供后续迁移。

## 维护源文件

`source/data.py` 生成题库，`source/dist/app.js` 和 `style.css` 是应用源文件。重新构建：

```sh
cd source
python3 data.py
python3 build.py
node --check dist/app.js
node check.cjs
cp dist/index.html ../index.html
```

检查覆盖全部60组例句与102题的答题流程，以及错题重做、题干/依据收起、记录持久化、语音缺失和输入标准化。浏览器实际朗读是否可用仍取决于访问设备。

语法参考：
- https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/question-forms
- https://learnenglishteens.britishcouncil.org/grammar/a1-a2-grammar/question-words
