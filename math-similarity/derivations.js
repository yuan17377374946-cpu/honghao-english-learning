(function(){
'use strict';
const {models}=window.Similarity;
// The diagram and the proof share one step number. A pair is shown only when
// its vertices and supporting construction have been introduced.
const mark=(a,b,c,color=0,label='α',radius=29)=>[a,b,c,color,label,radius];
models[4].diagram=(v,m,s)=>({
 pair:s>=4?['DGC','DFE']:['ABF','ACG'],pairAt:3,
 angles:s===3?[mark('B','A','F',0,'',23),mark('A','B','F',1,'β'),mark('A','C','G',1,'β')]:s>=4?[mark('G','D','C',0,'α',32),mark('F','D','E',0,'α',32),mark('D','G','C',1,'β'),mark('D','F','E',1,'β')]:[],
 right:[],
 emphasis:s===1?['AC','CE']:s===2?['CG','DG']:s>=5?['AF','FD','DG']:[],
 labels:s===3?[{edge:'AF',text:'x',dx:27,dy:10},{edge:'AG',text:(m+1)+'x',dx:34,dy:0}]:s>=4?[{edge:'AF',text:'x',dx:29,dy:9},{edge:'FD',text:'y',dx:31,dy:5},{edge:'DG',text:'3y',dx:33,dy:10}]:[],
 caption:['先观察：AB∶BC=1∶'+m+'，DE∶CD=1∶3。','分段换整体：AC=(m+1)AB，DC=3DE。','辅助线：CG∥BE；A、F、D、G依次共线。','第一组：△ABF∼△ACG，A↔A，B↔C，F↔G。','第二组：△DGC∼△DFE，D↔D，G↔F，C↔E。','沿直线拼接：AG=AF+FD+DG=x+y+3y。','两式联立：(m+1)x=x+4y，得到AF/DF=4/m。'][s],
 formula:s===0?'AB∶BC=1∶'+m+'　|　DE∶CD=1∶3':s===1?'AC=(m+1)AB　|　DC=3DE':s===2?'CG∥BF∥FE':s===3?'AB/AC=AF/AG=1/'+(m+1):s===4?'DG/DF=DC/DE=3':s===5?'AG=x+4y':'AF/DF=4/'+m,
});
models[5].diagram=(v,t,s)=>({
 pair:s===1?['ADE','ABC']:['ADB','AEC'],pairAt:s===1?1:3,
 angles:s>=2?[mark('D','A','B',0,'θ',31),mark('E','A','C',0,'θ',51)]:[],right:[],
 emphasis:s>=3?['BD','CE']:[],
 caption:['先看原来的相似三角形，再找BD、CE这两条“拉手线”。','原有相似：△ADE∼△ABC，A↔A，D↔B，E↔C。','蓝色θ：AB到AD、AC到AE，都是同向旋转'+t+'°。','新的相似：△ADB∼△AEC，A↔A，D↔E，B↔C。','拉手线对应：BD↔CE；AD↔AE；AB↔AC。',v?'直角特例：对应旋转90°，所以BD⊥CE。':'从BD到CE的对应旋转为65°；两直线的较小夹角为65°。'][s],
 formula:s===0?'AD/AB=AE/AC=0.6':s===1?'AD/AB=AE/AC ⇒ AD/AE=AB/AC':s===2?'∠DAB=∠EAC=θ':s===3?'两边成比例＋夹角相等 ⇒ SAS':s===4?'BD/CE=AD/AE=AB/AC':v?'公共顶角α=90° ⇒ BD⊥CE':'公共顶角α=65° ⇒ 两拉手线夹角65°',
});
models[6].diagram=(v,t,s)=>({
 pair:v?['NFA','MDE']:['BCF','MDE'],pairAt:4,
 angles:s>=3?[v?mark('N','F','A',0):mark('B','C','F',0),mark('M','D','E',0)]:[],
 right:s>=2?(v?[['A','N','F'],['D','M','E']]:[['C','B','F'],['D','M','E']]):[],
 emphasis:s===1?(v?['DM','FN']:['DM']):s===3?(v?['FN','DM','AF','DE']:['BC','DM','CF','DE']):[],
 caption:['先认出题设中的垂直关系；垂足随辅助线出现。',v?'橙色虚线：DM⊥BC，FN⊥AB；M、N是新垂足。':'橙色虚线：过D作DM⊥BC，M是新垂足。',v?'方框标出第一对等角：∠FNA=∠DME=90°。':'方框标出第一对等角：∠CBF=∠DME=90°。',v?'蓝色α：∠NFA=∠MDE；两角的两边分别垂直，且都是锐角。':'蓝色α：∠BCF=∠MDE；两角的两边分别垂直，且都是锐角。',v?'比较△NFA与△MDE：N↔M，F↔D，A↔E。':'比较△BCF与△MDE：B↔M，C↔D，F↔E。','按相同位置逐项对应，先说顶点，再写边的比例。'][s],
 formula:s<2?(v?'AB⊥BC，DE⊥AF':'FB⊥BC，DE⊥CF'):s===2?'第一对：90°=90°':s===3?'第二对：α=α':s===4?'两角分别相等 ⇒ AA':v?'NF/MD=FA/DE=NA/ME':'BC/MD=CF/DE=BF/ME',
});
models[7].diagram=(v,t,s)=>({
 pair:['CDM','CEN'],pairAt:5,
 angles:s===0?[mark('A','O','B',0,t+'°',31),mark('D','C','E',1,(180-t)+'°',31)]:s===3?[mark('C','D','O',0,'β',28),mark('C','E','O',1,'γ',28)]:s>=4?[mark('C','D','M',0,'α',28),mark('C','E','N',0,'α',33)]:[],
 right:s>=2?[['C','M','D'],['C','N','E']]:[],
 emphasis:s===1?['CM','CN']:s===3?['OD','DC','CE','EO']:[],
 labels:[],
 caption:['已知两角互补：∠AOB='+t+'°，∠DCE='+(180-t)+'°。','橙色虚线：CM⊥OA，CN⊥OB；M在OD上，N在OE延长线上。','两个垂足处的方框：∠CMD=∠CNE=90°。','沿四边形O—D—C—E看内角：β+γ=360°−180°=180°。','D、M、O同向；O、E、N共线。α=β=180°−γ。','比较△CDM与△CEN：C↔C，D↔E，M↔N。','按蓝色与橙色三角形的对应顶点，依次写出三组边比。'][s],
 formula:s===0?'∠AOB+∠DCE=180°':s===1?'先作垂线，构造两个直角三角形':s===2?'第一对：∠CMD=∠CNE=90°':s===3?'∠CDO+∠CEO=180°':s===4?'第二对：∠CDM=∠CEN=α':s===5?'两角分别相等 ⇒ AA':'CD/CE=DM/EN=CM/CN',
});
// Keep the original statement and all algebraic steps; clarify the diagram notes.
models[4].note='演示固定n=3，滑块改变m；辅助点G在第2步出现，第3、4步分别突出两组相似三角形。';
models[5].note='先突出原有相似，再切换到拉手三角形；同一颜色的θ表示同向旋转形成的等角。';
models[6].note='辅助线、垂足、直角与相等锐角随板书逐步出现；两个构造可分别切换。';
models[7].note='先用四边形内角和得到β+γ=180°，再沿共线点把互补角换成等角α。';
})();
