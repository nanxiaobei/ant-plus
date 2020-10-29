(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{uqhU:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return o})),n.d(t,"default",(function(){return j}));n("sbMj");var a=n("H4M2"),b=n("Fcif"),l=n("+I+c"),i=(n("mXGw"),n("/FXl")),r=n("TjRS"),c=n("ZFoC"),m=n("NVUx"),o=(n("aD51"),{});void 0!==o&&o&&o===Object(o)&&Object.isExtensible(o)&&!o.hasOwnProperty("__filemeta")&&Object.defineProperty(o,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/Form.mdx"}});var p={_frontmatter:o},d=r.a;function j(e){var t,n=e.components,j=Object(l.a)(e,["components"]);return Object(i.b)(d,Object(b.a)({},p,j,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"form-表单"},"Form 表单"),Object(i.b)("h2",{id:"演示"},"演示"),Object(i.b)("pre",null,Object(i.b)("code",Object(b.a)({parentName:"pre"},{className:"language-js"}),"import { Form } from 'antx';\n")),Object(i.b)(c.b,{__position:0,__code:"() => {\n  const onFinish = values => {\n    console.log(values)\n  }\n  return (\n    <Form cols={[4, 20]} data={{ name: 'Emily', sex: 2 }} onFinish={onFinish}>\n      <Input\n        label=\"用户名\"\n        name=\"name\"\n        rules={['required', 'string', 'max=10']}\n        max={10}\n        tip=\"full\"\n      />\n      <Select\n        label=\"性别\"\n        name=\"sex\"\n        rules={['required', 'number']}\n        data={[\n          { id: 1, type: '男' },\n          { id: 2, type: '女' },\n        ]}\n        keys={['id', 'type']}\n        tip=\"short\"\n        search\n      />\n      <Button label=\"\" type=\"primary\" htmlType=\"submit\">\n        提交\n      </Button>\n    </Form>\n  )\n}",__scope:(t={props:j,DefaultLayout:r.a,Playground:c.b,Props:c.c,Button:a.a,Form:m.c,Input:m.d,Select:m.f},t.DefaultLayout=r.a,t._frontmatter=o,t),mdxType:"Playground"},(function(){return Object(i.b)(m.c,{cols:[4,20],data:{name:"Emily",sex:2},onFinish:function(e){console.log(e)},mdxType:"Form"},Object(i.b)(m.d,{label:"用户名",name:"name",rules:["required","string","max=10"],max:10,tip:"full",mdxType:"Input"}),Object(i.b)(m.f,{label:"性别",name:"sex",rules:["required","number"],data:[{id:1,type:"男"},{id:2,type:"女"}],keys:["id","type"],tip:"short",search:!0,mdxType:"Select"}),Object(i.b)(a.a,{label:"",type:"primary",htmlType:"submit",mdxType:"Button"},"提交"))})),Object(i.b)("h2",{id:"api"},"API"),Object(i.b)(c.c,{of:m.c,isToggle:!0,mdxType:"Props"}),Object(i.b)("p",null,"其它 Props 与 ",Object(i.b)("a",Object(b.a)({parentName:"p"},{href:"https://ant.design/components/form-cn/"}),"Ant Design Form")," 一致。"),Object(i.b)("h3",{id:"config"},"config"),Object(i.b)("p",null,"用于统一设置 ",Object(i.b)("inlineCode",{parentName:"p"},"placeholder")," 信息与 ",Object(i.b)("inlineCode",{parentName:"p"},"rules")," 校验提示信息。"),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"config")," 可选配置项："),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(b.a)({parentName:"tr"},{align:null}),"参数"),Object(i.b)("th",Object(b.a)({parentName:"tr"},{align:null}),"默认值"),Object(i.b)("th",Object(b.a)({parentName:"tr"},{align:null}),"说明"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),"input"),Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),"'请输入'"),Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),"Input 的 ",Object(i.b)("inlineCode",{parentName:"td"},"placeholder"),"（",Object(i.b)("inlineCode",{parentName:"td"},"tip")," 为 ",Object(i.b)("inlineCode",{parentName:"td"},"'short'")," ",Object(i.b)("inlineCode",{parentName:"td"},"'full'")," 时有效，转义：",Object(i.b)("inlineCode",{parentName:"td"},"'short'")," → ",Object(i.b)("inlineCode",{parentName:"td"},"'请输入'"),"，",Object(i.b)("inlineCode",{parentName:"td"},"'full'")," → ",Object(i.b)("inlineCode",{parentName:"td"},"请输入用户名"),"）")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),"select"),Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),"'请选择'"),Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),"Select 的 ",Object(i.b)("inlineCode",{parentName:"td"},"placeholder"),"（",Object(i.b)("inlineCode",{parentName:"td"},"tip")," 为 ",Object(i.b)("inlineCode",{parentName:"td"},"'short'")," ",Object(i.b)("inlineCode",{parentName:"td"},"'full'")," 时有效，转义：",Object(i.b)("inlineCode",{parentName:"td"},"'short'")," → ",Object(i.b)("inlineCode",{parentName:"td"},"'请选择'"),"，",Object(i.b)("inlineCode",{parentName:"td"},"'full'")," → ",Object(i.b)("inlineCode",{parentName:"td"},"'请选择性别'"),"）")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),"required"),Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),"'{label}不得为空'"),Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"required")," 校验提示，",Object(i.b)("inlineCode",{parentName:"td"},"{label}")," 为 ",Object(i.b)("inlineCode",{parentName:"td"},"label")," 占位符，会被替换")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),"type"),Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),"'{label}格式有误'"),Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),"数据格式校验提示，",Object(i.b)("inlineCode",{parentName:"td"},"{label}")," 为 ",Object(i.b)("inlineCode",{parentName:"td"},"label")," 占位符，会被替换")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),"max"),Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),"'不得超过 {max} 个字'"),Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"max")," 校验提示，",Object(i.b)("inlineCode",{parentName:"td"},"{max}")," 为数值占位符，会被替换")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),"min"),Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),"'不得少于 {min} 个字'"),Object(i.b)("td",Object(b.a)({parentName:"tr"},{align:null}),Object(i.b)("inlineCode",{parentName:"td"},"min")," 校验提示，",Object(i.b)("inlineCode",{parentName:"td"},"{min}")," 为数值占位符，会被替换")))),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"}," 设置方式 ")),Object(i.b)("pre",null,Object(i.b)("code",Object(b.a)({parentName:"pre"},{className:"language-jsx"}),"const config = {\n  input: 'Please input',\n  select: 'Please select',\n  required: 'Oops, {label} is needed',\n  type: '{label} got a wrong type',\n  max: 'Up to {max} words',\n  min: 'At least {min} words',\n};\n\n<Form config={config} />;\n")),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"}," 与 Ant Design Form ",Object(i.b)("inlineCode",{parentName:"strong"},"validateMessages")," 的区别 ")),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"config")," 占位符为 ",Object(i.b)("inlineCode",{parentName:"li"},"{label}"),"，",Object(i.b)("inlineCode",{parentName:"li"},"validateMessages")," 占位符为 ",Object(i.b)("inlineCode",{parentName:"li"},"${name}")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"config")," 使用 ",Object(i.b)("inlineCode",{parentName:"li"},"label")," 字段，",Object(i.b)("inlineCode",{parentName:"li"},"validateMessages")," 使用 ",Object(i.b)("inlineCode",{parentName:"li"},"name")," 字段。实际开发中，",Object(i.b)("inlineCode",{parentName:"li"},"label")," 更为实用（尤其在中文世界），",Object(i.b)("inlineCode",{parentName:"li"},"name")," 用于数据字段，一般情况下用户应无感知"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"config")," 配置项更简单，可配置范围小，",Object(i.b)("inlineCode",{parentName:"li"},"validateMessages")," 配置项更多，存在深一层配置对象")))}void 0!==j&&j&&j===Object(j)&&Object.isExtensible(j)&&!j.hasOwnProperty("__filemeta")&&Object.defineProperty(j,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/Form.mdx"}}),j.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-form-mdx-3b0d4a9e6c2359d2c3f5.js.map