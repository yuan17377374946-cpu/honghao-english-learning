/* 配方法配套自编题。原先8道练习保持原顺序，保留已有答题记录。 */
(()=>{
const make=(a,b,c,type,extra={})=>{const h=b/(2*a),d=h*h-c/a;return {a,b,c,type,roots:d<-1e-10?[]:Math.abs(d)<1e-10?[-h]:[-h+Math.sqrt(d),-h-Math.sqrt(d)],...extra};};
const prep=(name,math,note)=>({name,math,note});
const types=[
['positive','1 · 正偶数系数','二次项系数为1，一次项系数是正偶数。','取一半，再平方；左右两边一起补。'],
['negative','2 · 负偶数系数','二次项系数为1，一次项系数是负偶数。','括号中保留负号，补的平方是非负数。'],
['odd','3 · 奇数系数','一次项系数是奇数。','先接受分数：3的一半是3/2，再平方。'],
['leading','4 · 先化成1','二次项系数不是1，除完是整数。','所有项同时除以二次项系数。'],
['leadingFraction','5 · 除完有分数','二次项系数不是1，除完出现分数。','取新系数的一半，不是取原系数的一半。'],
['leadingNegative','6 · 二次项为负','二次项系数是负数。','先变成正的1，逐项检查符号。'],
['fraction','7 · 原式含分数','原方程带分数系数。','先去分母，再配方；每一项都要乘。'],
['decimal','8 · 原式含小数','原方程带小数系数。','先把系数化成整数，再整理。'],
['bothSides','9 · 两边都有x','等号两边都有含x的项。','先移项、合并，再确定一次项系数。'],
['brackets','10 · 括号或乘积','原式需要展开括号或乘积。','先正确展开，再化成一般形式。'],
['missingLinear','11 · 缺一次项','一次项系数为0。','左边已是平方，可以直接开平方。'],
['missingConstant','12 · 缺常数项','常数项为0。','配方后仍要保留根0，不能除以x。']
].map(([id,title,description,tip])=>({id,title,description,tip}));
const exBoth={raw:'x² + 2x = 4x + 3',pre:[prep('先把两边含x的项移到左边','x² + 2x − 4x − 3 = 0 → x² − 2x − 3 = 0','整理完，才能确定一次项系数是−2。')]};
const exBracket={raw:'(x + 1)(x − 3) = 5',pre:[prep('先展开乘积','x² − 3x + x − 3 = 5 → x² − 2x − 8 = 0','展开后先合并，再把常数移项。')]};
const exFraction={raw:'(1/2)x² − (3/2)x − 1 = 0',pre:[prep('方程两边同时乘2','x² − 3x − 2 = 0','去分母时每一项都乘2，包括常数项。')],prepared:{a:1,b:-3,c:-2}};
const exDecimal={raw:'0.2x² − 0.4x − 0.6 = 0',pre:[prep('方程两边同时乘10','2x² − 4x − 6 = 0','先化成整数系数，再把二次项系数化成1。')],prepared:{a:2,b:-4,c:-6}};
const radical1=make(1,2*Math.sqrt(2),-1,'radical',{raw:'x² + 2√2x − 1 = 0',bText:'2√2',halfText:'√2',answerText:'x₁ = −√2 + √3，x₂ = −√2 − √3'});
const radical2=make(1,-2*Math.sqrt(3),-1,'radical',{raw:'x² − 2√3x − 1 = 0',bText:'−2√3',halfText:'−√3',answerText:'x₁ = √3 + 2，x₂ = √3 − 2'});
const examples=[
make(1,6,-7,'positive',{label:'正偶数'}),make(1,-4,-5,'negative',{label:'负偶数'}),make(2,-4,-6,'leading',{label:'先化成1'}),make(1,3,-1,'odd',{label:'奇数 / 分数'}),make(1,4,4,'positive',{label:'两个相同的根'}),make(1,2,3,'positive',{label:'没有实数根'}),
make(2,3,-1,'leadingFraction',{label:'除完有分数'}),make(-1,4,5,'leadingNegative',{label:'二次项为负'}),make(.5,-1.5,-1,'fraction',{label:'原式含分数',...exFraction}),make(.2,-.4,-.6,'decimal',{label:'原式含小数',...exDecimal}),make(1,-2,-3,'bothSides',{label:'两边都有x',...exBoth}),make(1,-2,-8,'brackets',{label:'展开括号',...exBracket}),make(1,0,-9,'missingLinear',{label:'缺一次项'}),make(1,4,0,'missingConstant',{label:'缺常数项'}),{...radical1,label:'根式系数①'},{...radical2,label:'根式系数②'}
];
const questions=[
// 已发布的前8题：索引和方程不变。
make(1,2,-3,'positive'),make(1,6,5,'positive'),make(1,-6,5,'negative'),make(1,-2,-8,'negative'),make(2,4,-6,'leading'),make(3,-6,-9,'leading'),make(1,3,-1,'odd'),make(1,4,4,'positive'),
make(1,-5,1,'odd'),
make(2,3,-1,'leadingFraction'),make(3,-2,-2,'leadingFraction'),
make(-1,4,5,'leadingNegative'),make(-2,-4,6,'leadingNegative'),
make(.5,-1.5,-1,'fraction',exFraction),make(1/3,2/3,-1,'fraction',{raw:'(1/3)x² + (2/3)x − 1 = 0',pre:[prep('方程两边同时乘3','x² + 2x − 3 = 0','每一项都要乘3。')],prepared:{a:1,b:2,c:-3}}),
make(.2,-.4,-.6,'decimal',exDecimal),make(.1,.6,.5,'decimal',{raw:'0.1x² + 0.6x + 0.5 = 0',pre:[prep('方程两边同时乘10','x² + 6x + 5 = 0','小数全部化成整数。')],prepared:{a:1,b:6,c:5}}),
make(1,-2,-3,'bothSides',exBoth),make(2,2,-6,'bothSides',{raw:'2x² + 5x = 3x + 6',pre:[prep('移项、合并同类项','2x² + 5x − 3x − 6 = 0 → 2x² + 2x − 6 = 0','移项后还要把二次项系数化成1。')]}),
make(1,-2,-8,'brackets',exBracket),make(1,1,-6,'brackets',{raw:'(x + 2)(x − 1) = 4',pre:[prep('先展开、再整理','x² − x + 2x − 2 = 4 → x² + x − 6 = 0','合并后的一次项系数是1。')]}),
make(1,0,-9,'missingLinear'),make(2,0,-8,'missingLinear'),
make(1,4,0,'missingConstant'),make(3,-6,0,'missingConstant'),
make(1,2,3,'positive'),{...radical1},{...radical2}
];
const basics=[
{kind:'fill',raw:'x² + 6x + □ = (x + □)²',b:6},
{kind:'fill',raw:'x² − 4x + □ = (x + □)²',b:-4},
{kind:'fill',raw:'x² + 3x + □ = (x + □)²',b:3},
{kind:'fill',raw:'x² − 5x + □ = (x + □)²',b:-5},
{kind:'open',raw:'(x − 2)² = 9',h:-2,d:9,roots:[5,-1]},
{kind:'open',raw:'(x + 3)² = 16',h:3,d:16,roots:[1,-7]},
{kind:'open',raw:'(x − 1)² = 2',h:-1,d:2,roots:[1+Math.sqrt(2),1-Math.sqrt(2)],answer:'x₁ = 1 + √2，x₂ = 1 − √2'},
{kind:'open',raw:'(x + 2)² = 0',h:2,d:0,roots:[-2]}
];
const parameters=[
{title:'字母系数①',raw:'x² + 2px + q = 0（p、q为实数）',task:'请在纸上配方，并说明什么时候有两个不相等的实数根、重根或没有实数根。',steps:[prep('先移项','x² + 2px = −q','一次项系数是2p。'),prep('取一半，再平方','2p的一半是p；需要补p²','补的是p²，不是2p²。'),prep('两边同时加','x² + 2px + p² = p² − q','左右两边都加p²。'),prep('写成完全平方','(x + p)² = p² − q','先判断右边的正负。'),prep('分类讨论','p² − q > 0：x = −p ± √(p² − q)；p² − q = 0：x₁ = x₂ = −p；p² − q < 0：没有实数根','三种情况要分别说明。')]},
{title:'字母系数②',raw:'2x² + 4mx + n = 0（m、n为实数）',task:'请先把二次项系数化成1，再配方、判断实数根。',steps:[prep('先除以2','x² + 2mx + n/2 = 0','每一项都除以2。'),prep('移项，确定要补的数','x² + 2mx = −n/2；需要补m²','用新的一次项系数2m的一半。'),prep('两边同时加m²','x² + 2mx + m² = m² − n/2','左边变成完全平方。'),prep('配方完成','(x + m)² = m² − n/2','接下来根据右边的正负分类。'),prep('分类讨论','m² − n/2 > 0：x = −m ± √(m² − n/2)；等于0：x₁ = x₂ = −m；小于0：没有实数根','不是所有含字母的方程都一定有两个不相等的实数根。')]}
];
window.SQUARE_CONTENT={types,examples,questions,basics,parameters};
})();
