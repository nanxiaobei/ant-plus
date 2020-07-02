(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{uqhU:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return o})),n.d(t,"default",(function(){return d}));n("5hJT"),n("W1QL"),n("K/PF"),n("t91x"),n("75LO"),n("PJhk"),n("sbMj");var a=n("H4M2"),l=(n("mXGw"),n("/FXl")),b=n("TjRS"),r=n("ZFoC"),i=n("NVUx");n("aD51");function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var o={};void 0!==o&&o&&o===Object(o)&&Object.isExtensible(o)&&!o.hasOwnProperty("__filemeta")&&Object.defineProperty(o,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/Form.mdx"}});var p={_frontmatter:o},m=b.a;function d(e){var t,n=e.components,d=function(e,t){if(null==e)return{};var n,a,l={},b=Object.keys(e);for(a=0;a<b.length;a++)n=b[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,["components"]);return Object(l.b)(m,c({},p,d,{components:n,mdxType:"MDXLayout"}),Object(l.b)("h1",{id:"form-表单"},"Form 表单"),Object(l.b)("h2",{id:"演示"},"演示"),Object(l.b)("pre",null,Object(l.b)("code",c({parentName:"pre"},{className:"language-js"}),"import { Form } from 'antx';\n")),Object(l.b)(r.b,{__position:0,__code:"() => {\n  const onFinish = values => {\n    console.log(values)\n  }\n  return (\n    <Form cols={[4, 20]} data={{ name: 'Emily', sex: 2 }} onFinish={onFinish}>\n      <Input\n        label=\"用户名\"\n        name=\"name\"\n        rules={['required', 'string', 'max=10']}\n        max={10}\n        tip=\"full\"\n      />\n      <Select\n        label=\"性别\"\n        name=\"sex\"\n        rules={['required', 'number']}\n        data={[\n          { id: 1, type: '男' },\n          { id: 2, type: '女' },\n        ]}\n        keys={['id', 'type']}\n        tip=\"short\"\n        search\n      />\n      <Button label=\"\" type=\"primary\" htmlType=\"submit\">\n        提交\n      </Button>\n    </Form>\n  )\n}",__scope:(t={props:d,DefaultLayout:b.a,Playground:r.b,Props:r.c,Button:a.a,Form:i.c,Input:i.d,Select:i.e},t.DefaultLayout=b.a,t._frontmatter=o,t),mdxType:"Playground"},(function(){return Object(l.b)(i.c,{cols:[4,20],data:{name:"Emily",sex:2},onFinish:function(e){console.log(e)},mdxType:"Form"},Object(l.b)(i.d,{label:"用户名",name:"name",rules:["required","string","max=10"],max:10,tip:"full",mdxType:"Input"}),Object(l.b)(i.e,{label:"性别",name:"sex",rules:["required","number"],data:[{id:1,type:"男"},{id:2,type:"女"}],keys:["id","type"],tip:"short",search:!0,mdxType:"Select"}),Object(l.b)(a.a,{label:"",type:"primary",htmlType:"submit",mdxType:"Button"},"提交"))})),Object(l.b)("h2",{id:"api"},"API"),Object(l.b)(r.c,{of:i.c,isToggle:!0,mdxType:"Props"}),Object(l.b)("p",null,"其它 Props 与 ",Object(l.b)("a",c({parentName:"p"},{href:"https://ant.design/components/form-cn/"}),"Ant Design Form")," 一致。"),Object(l.b)("h3",{id:"config"},"config"),Object(l.b)("p",null,"用于统一设置 ",Object(l.b)("inlineCode",{parentName:"p"},"placeholder")," 信息与 ",Object(l.b)("inlineCode",{parentName:"p"},"rules")," 校验提示信息。"),Object(l.b)("p",null,Object(l.b)("inlineCode",{parentName:"p"},"config")," 可选配置项："),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",c({parentName:"tr"},{align:null}),"参数"),Object(l.b)("th",c({parentName:"tr"},{align:null}),"默认值"),Object(l.b)("th",c({parentName:"tr"},{align:null}),"说明"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",c({parentName:"tr"},{align:null}),"input"),Object(l.b)("td",c({parentName:"tr"},{align:null}),"'请输入'"),Object(l.b)("td",c({parentName:"tr"},{align:null}),"Input 的 ",Object(l.b)("inlineCode",{parentName:"td"},"placeholder"),"（",Object(l.b)("inlineCode",{parentName:"td"},"tip")," 为 ",Object(l.b)("inlineCode",{parentName:"td"},"'short'")," ",Object(l.b)("inlineCode",{parentName:"td"},"'full'")," 时有效，转义：",Object(l.b)("inlineCode",{parentName:"td"},"'short'")," → ",Object(l.b)("inlineCode",{parentName:"td"},"'请输入'"),"，",Object(l.b)("inlineCode",{parentName:"td"},"'full'")," → ",Object(l.b)("inlineCode",{parentName:"td"},"请输入用户名"),"）")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",c({parentName:"tr"},{align:null}),"select"),Object(l.b)("td",c({parentName:"tr"},{align:null}),"'请选择'"),Object(l.b)("td",c({parentName:"tr"},{align:null}),"Select 的 ",Object(l.b)("inlineCode",{parentName:"td"},"placeholder"),"（",Object(l.b)("inlineCode",{parentName:"td"},"tip")," 为 ",Object(l.b)("inlineCode",{parentName:"td"},"'short'")," ",Object(l.b)("inlineCode",{parentName:"td"},"'full'")," 时有效，转义：",Object(l.b)("inlineCode",{parentName:"td"},"'short'")," → ",Object(l.b)("inlineCode",{parentName:"td"},"'请选择'"),"，",Object(l.b)("inlineCode",{parentName:"td"},"'full'")," → ",Object(l.b)("inlineCode",{parentName:"td"},"'请选择性别'"),"）")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",c({parentName:"tr"},{align:null}),"required"),Object(l.b)("td",c({parentName:"tr"},{align:null}),"'{label}不得为空'"),Object(l.b)("td",c({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"required")," 校验提示，",Object(l.b)("inlineCode",{parentName:"td"},"{label}")," 为 ",Object(l.b)("inlineCode",{parentName:"td"},"label")," 占位符，会被替换")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",c({parentName:"tr"},{align:null}),"type"),Object(l.b)("td",c({parentName:"tr"},{align:null}),"'{label}格式有误'"),Object(l.b)("td",c({parentName:"tr"},{align:null}),"数据格式校验提示，",Object(l.b)("inlineCode",{parentName:"td"},"{label}")," 为 ",Object(l.b)("inlineCode",{parentName:"td"},"label")," 占位符，会被替换")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",c({parentName:"tr"},{align:null}),"max"),Object(l.b)("td",c({parentName:"tr"},{align:null}),"'不得超过 {max} 个字'"),Object(l.b)("td",c({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"max")," 校验提示，",Object(l.b)("inlineCode",{parentName:"td"},"{max}")," 为数值占位符，会被替换")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",c({parentName:"tr"},{align:null}),"min"),Object(l.b)("td",c({parentName:"tr"},{align:null}),"'不得少于 {min} 个字'"),Object(l.b)("td",c({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"min")," 校验提示，",Object(l.b)("inlineCode",{parentName:"td"},"{min}")," 为数值占位符，会被替换")))),Object(l.b)("p",null,Object(l.b)("strong",{parentName:"p"}," 设置方式 ")),Object(l.b)("pre",null,Object(l.b)("code",c({parentName:"pre"},{className:"language-jsx"}),"const config = {\n  input: 'Please input',\n  select: 'Please select',\n  required: 'Oops, {label} is needed',\n  type: '{label} got a wrong type',\n  max: 'Up to {max} words',\n  min: 'At least {min} words',\n};\n\n<Form config={config} />;\n")),Object(l.b)("p",null,Object(l.b)("strong",{parentName:"p"}," 与 Ant Design Form ",Object(l.b)("inlineCode",{parentName:"strong"},"validateMessages")," 的区别 ")),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"config")," 占位符为 ",Object(l.b)("inlineCode",{parentName:"li"},"{label}"),"，",Object(l.b)("inlineCode",{parentName:"li"},"validateMessages")," 占位符为 ",Object(l.b)("inlineCode",{parentName:"li"},"${name}")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"config")," 使用 ",Object(l.b)("inlineCode",{parentName:"li"},"label")," 字段，",Object(l.b)("inlineCode",{parentName:"li"},"validateMessages")," 使用 ",Object(l.b)("inlineCode",{parentName:"li"},"name")," 字段。实际开发中，",Object(l.b)("inlineCode",{parentName:"li"},"label")," 更为实用（尤其在中文世界），",Object(l.b)("inlineCode",{parentName:"li"},"name")," 用于数据字段，一般情况下用户应无感知"),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"config")," 配置项更简单，可配置范围小，",Object(l.b)("inlineCode",{parentName:"li"},"validateMessages")," 配置项更多，存在深一层配置对象")))}void 0!==d&&d&&d===Object(d)&&Object.isExtensible(d)&&!d.hasOwnProperty("__filemeta")&&Object.defineProperty(d,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/Form.mdx"}}),d.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-form-mdx-4ab604c1c168003c043f.js.map