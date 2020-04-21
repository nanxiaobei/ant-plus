(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{uqhU:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return o})),n.d(t,"default",(function(){return m}));n("5hJT"),n("W1QL"),n("K/PF"),n("t91x"),n("75LO"),n("PJhk"),n("mXGw");var a=n("/FXl"),l=n("TjRS"),b=n("ZFoC"),r=n("NVUx");n("aD51");function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var o={};void 0!==o&&o&&o===Object(o)&&Object.isExtensible(o)&&!o.hasOwnProperty("__filemeta")&&Object.defineProperty(o,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/Form.mdx"}});var c={_frontmatter:o},p=l.a;function m(e){var t,n=e.components,m=function(e,t){if(null==e)return{};var n,a,l={},b=Object.keys(e);for(a=0;a<b.length;a++)n=b[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,["components"]);return Object(a.b)(p,i({},c,m,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"form-表单"},"Form 表单"),Object(a.b)("h2",{id:"演示"},"演示"),Object(a.b)("pre",null,Object(a.b)("code",i({parentName:"pre"},{className:"language-js"}),"import { Form } from 'antx';\n")),Object(a.b)(b.b,{__position:0,__code:"() => {\n  const onFinish = values => {\n    console.log(values)\n  }\n  return (\n    <Form data={{ name: 'Emily', sex: 2 }} onFinish={onFinish}>\n      <Input\n        label=\"用户名\"\n        name=\"name\"\n        rules={['required', 'string', 'max=10']}\n        max={10}\n        tip=\"full\"\n      />\n      <Select\n        label=\"性别\"\n        name=\"sex\"\n        rules={['required', 'number']}\n        data={[\n          { id: 1, type: '男' },\n          { id: 2, type: '女' },\n        ]}\n        keys={['id', 'type']}\n        tip=\"short\"\n        search\n      />\n      <Button label=\"\" type=\"primary\" htmlType=\"submit\">\n        提交\n      </Button>\n    </Form>\n  )\n}",__scope:(t={props:m,DefaultLayout:l.a,Playground:b.b,Props:b.c,Form:r.d,Input:r.e,Select:r.f,Button:r.b},t.DefaultLayout=l.a,t._frontmatter=o,t),mdxType:"Playground"},(function(){return Object(a.b)(r.d,{data:{name:"Emily",sex:2},onFinish:function(e){console.log(e)},mdxType:"Form"},Object(a.b)(r.e,{label:"用户名",name:"name",rules:["required","string","max=10"],max:10,tip:"full",mdxType:"Input"}),Object(a.b)(r.f,{label:"性别",name:"sex",rules:["required","number"],data:[{id:1,type:"男"},{id:2,type:"女"}],keys:["id","type"],tip:"short",search:!0,mdxType:"Select"}),Object(a.b)(r.b,{label:"",type:"primary",htmlType:"submit",mdxType:"Button"},"提交"))})),Object(a.b)("h2",{id:"api"},"API"),Object(a.b)(b.c,{of:r.d,isToggle:!0,mdxType:"Props"}),Object(a.b)("p",null,"其它 Props 与 ",Object(a.b)("a",i({parentName:"p"},{href:"https://ant.design/components/form-cn/"}),"Ant Design Form")," 一致。"),Object(a.b)("h3",{id:"config"},"config"),Object(a.b)("p",null,"用于统一设置 ",Object(a.b)("inlineCode",{parentName:"p"},"placeholder")," 信息与 ",Object(a.b)("inlineCode",{parentName:"p"},"rules")," 校验提示信息。"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"config")," 可选配置项："),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",i({parentName:"tr"},{align:null}),"参数"),Object(a.b)("th",i({parentName:"tr"},{align:null}),"默认值"),Object(a.b)("th",i({parentName:"tr"},{align:null}),"说明"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",i({parentName:"tr"},{align:null}),"input"),Object(a.b)("td",i({parentName:"tr"},{align:null}),"'请输入'"),Object(a.b)("td",i({parentName:"tr"},{align:null}),"Input 的 ",Object(a.b)("inlineCode",{parentName:"td"},"placeholder"),"（",Object(a.b)("inlineCode",{parentName:"td"},"tip")," 为 ",Object(a.b)("inlineCode",{parentName:"td"},"'short'")," ",Object(a.b)("inlineCode",{parentName:"td"},"'full'")," 时有效，转义：",Object(a.b)("inlineCode",{parentName:"td"},"'short'")," → ",Object(a.b)("inlineCode",{parentName:"td"},"'请输入'"),"，",Object(a.b)("inlineCode",{parentName:"td"},"'full'")," → ",Object(a.b)("inlineCode",{parentName:"td"},"请输入用户名"),"）")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",i({parentName:"tr"},{align:null}),"select"),Object(a.b)("td",i({parentName:"tr"},{align:null}),"'请选择'"),Object(a.b)("td",i({parentName:"tr"},{align:null}),"Select 的 ",Object(a.b)("inlineCode",{parentName:"td"},"placeholder"),"（",Object(a.b)("inlineCode",{parentName:"td"},"tip")," 为 ",Object(a.b)("inlineCode",{parentName:"td"},"'short'")," ",Object(a.b)("inlineCode",{parentName:"td"},"'full'")," 时有效，转义：",Object(a.b)("inlineCode",{parentName:"td"},"'short'")," → ",Object(a.b)("inlineCode",{parentName:"td"},"'请选择'"),"，",Object(a.b)("inlineCode",{parentName:"td"},"'full'")," → ",Object(a.b)("inlineCode",{parentName:"td"},"'请选择性别'"),"）")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",i({parentName:"tr"},{align:null}),"required"),Object(a.b)("td",i({parentName:"tr"},{align:null}),"'{label}不得为空'"),Object(a.b)("td",i({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"required")," 校验提示，",Object(a.b)("inlineCode",{parentName:"td"},"{label}")," 为 ",Object(a.b)("inlineCode",{parentName:"td"},"label")," 占位符，会被替换")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",i({parentName:"tr"},{align:null}),"type"),Object(a.b)("td",i({parentName:"tr"},{align:null}),"'{label}格式有误'"),Object(a.b)("td",i({parentName:"tr"},{align:null}),"数据格式校验提示，",Object(a.b)("inlineCode",{parentName:"td"},"{label}")," 为 ",Object(a.b)("inlineCode",{parentName:"td"},"label")," 占位符，会被替换")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",i({parentName:"tr"},{align:null}),"max"),Object(a.b)("td",i({parentName:"tr"},{align:null}),"'不得超过 {max} 个字'"),Object(a.b)("td",i({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"max")," 校验提示，",Object(a.b)("inlineCode",{parentName:"td"},"{max}")," 为数值占位符，会被替换")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",i({parentName:"tr"},{align:null}),"min"),Object(a.b)("td",i({parentName:"tr"},{align:null}),"'不得少于 {min} 个字'"),Object(a.b)("td",i({parentName:"tr"},{align:null}),Object(a.b)("inlineCode",{parentName:"td"},"min")," 校验提示，",Object(a.b)("inlineCode",{parentName:"td"},"{min}")," 为数值占位符，会被替换")))),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"}," 设置方式 ")),Object(a.b)("pre",null,Object(a.b)("code",i({parentName:"pre"},{className:"language-jsx"}),"const config = {\n  input: 'Please input',\n  select: 'Please select',\n  required: 'Oops, {label} is needed',\n  type: '{label} got a wrong type',\n  max: 'Up to {max} words',\n  min: 'At least {min} words',\n};\n\n<Form config={config} />;\n")),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"}," 与 Ant Design Form ",Object(a.b)("inlineCode",{parentName:"strong"},"validateMessages")," 的区别 ")),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"config")," 占位符为 ",Object(a.b)("inlineCode",{parentName:"li"},"{label}"),"，",Object(a.b)("inlineCode",{parentName:"li"},"validateMessages")," 占位符为 ",Object(a.b)("inlineCode",{parentName:"li"},"${name}")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"config")," 使用 ",Object(a.b)("inlineCode",{parentName:"li"},"label")," 字段，",Object(a.b)("inlineCode",{parentName:"li"},"validateMessages")," 使用 ",Object(a.b)("inlineCode",{parentName:"li"},"name")," 字段。实际开发中，",Object(a.b)("inlineCode",{parentName:"li"},"label")," 更为实用（尤其在中文世界），",Object(a.b)("inlineCode",{parentName:"li"},"name")," 用于数据字段，一般情况下用户应无感知"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"config")," 配置项更简单，可配置范围小，",Object(a.b)("inlineCode",{parentName:"li"},"validateMessages")," 配置项更多，存在深一层配置对象")))}void 0!==m&&m&&m===Object(m)&&Object.isExtensible(m)&&!m.hasOwnProperty("__filemeta")&&Object.defineProperty(m,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/Form.mdx"}}),m.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-form-mdx-8f6a7c35cdd9f9b9ed72.js.map