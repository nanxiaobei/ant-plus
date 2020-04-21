(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{sVqV:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return r})),n.d(t,"default",(function(){return i}));n("5hJT"),n("W1QL"),n("K/PF"),n("t91x"),n("75LO"),n("PJhk"),n("mXGw");var a=n("/FXl"),l=n("TjRS");n("aD51");function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var r={};void 0!==r&&r&&r===Object(r)&&Object.isExtensible(r)&&!r.hasOwnProperty("__filemeta")&&Object.defineProperty(r,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/Usage.mdx"}});var m={_frontmatter:r},p=l.a;function i(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,l={},b=Object.keys(e);for(a=0;a<b.length;a++)n=b[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,["components"]);return Object(a.b)(p,b({},m,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"使用"},"使用"),Object(a.b)("h2",{id:"表单控件-props"},"表单控件 Props"),Object(a.b)("p",null,"Ant Plus 最核心的使用方式，便是可以在表单控件 Props 中，直接传入 ",Object(a.b)("inlineCode",{parentName:"p"},"Form.Item")," 的相关 Props，如："),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-jsx",metastring:"harmony",harmony:!0}),"<Form data={{ name: 'Emily' }}>\n  <Input\n    label=\"用户名\"\n    name=\"name\"\n    colon\n    after={<span>请输入正确信息</span>}\n    rules={['required', 'string']}\n    tip=\"请输入用户名\"\n  />\n</Form>\n")),Object(a.b)("p",null,"从而去除对 ",Object(a.b)("inlineCode",{parentName:"p"},"Form.Item")," 的依赖，简化表单代码结构。"),Object(a.b)("hr",null),Object(a.b)("p",null,"以下为表单控件除自身 Props 外，可传入的 Props："),Object(a.b)("h3",{id:"formitem-可传入-props"},"Form.Item 可传入 Props"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",b({parentName:"tr"},{align:null})),Object(a.b)("th",b({parentName:"tr"},{align:null})),Object(a.b)("th",b({parentName:"tr"},{align:null})),Object(a.b)("th",b({parentName:"tr"},{align:null})))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"colon"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"dependencies"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"extra"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"getValueFromEvent")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"hasFeedback"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"help"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"htmlFor"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"noStyle")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"label"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"labelAlign"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"labelCol"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"name")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"normalize"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"required"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"rules"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"shouldUpdate")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"trigger"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"validateFirst"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"validateStatus"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"validateTrigger")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"valuePropName"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"wrapperCol"),Object(a.b)("td",b({parentName:"tr"},{align:null})),Object(a.b)("td",b({parentName:"tr"},{align:null}))))),Object(a.b)("p",null,"若需用 ",Object(a.b)("inlineCode",{parentName:"p"},"Form.Item")," 来布局，如 Ant Design 代码："),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-jsx"}),"<Form.Item labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>\n  <Button>提交</Button>\n</Form.Item>\n")),Object(a.b)("p",null,"则 Ant Plus 对应代码应为："),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-jsx"}),'<Button label="" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>\n  提交\n</Button>\n')),Object(a.b)("p",null,"因为 Ant Plus 以 ",Object(a.b)("inlineCode",{parentName:"p"},"label")," 或 ",Object(a.b)("inlineCode",{parentName:"p"},"name")," 至少存在一个来识别节点是否为 ",Object(a.b)("inlineCode",{parentName:"p"},"Form.Item"),"，而纯布局时 ",Object(a.b)("inlineCode",{parentName:"p"},"name")," 不存在，所以应传入 ",Object(a.b)("inlineCode",{parentName:"p"},'label=""')," 以供识别。"),Object(a.b)("p",null,"同时，",Object(a.b)("inlineCode",{parentName:"p"},'label=""')," 也代表当前元素在表单布局中，为 ",Object(a.b)("inlineCode",{parentName:"p"},"label")," 文字为空的一个条目。"),Object(a.b)("h3",{id:"其它可传入-props"},"其它可传入 Props"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",b({parentName:"tr"},{align:null}),"属性"),Object(a.b)("th",b({parentName:"tr"},{align:null}),"说明"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"className"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"将传给 ",Object(a.b)("inlineCode",{parentName:"td"},"Form.Item"),"，如 ",Object(a.b)("inlineCode",{parentName:"td"},'<Input className="form-item-class">'))),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"style"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"将传给 ",Object(a.b)("inlineCode",{parentName:"td"},"Form.Item"),"，如 ",Object(a.b)("inlineCode",{parentName:"td"},'<Input style="form-item-style">'))),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"ownClass"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"将传给自身 ",Object(a.b)("inlineCode",{parentName:"td"},"className"),"，如 ",Object(a.b)("inlineCode",{parentName:"td"},'<Input ownClass="input-class">'))),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"ownStyle"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"将传给自身 ",Object(a.b)("inlineCode",{parentName:"td"},"style"),"，如 ",Object(a.b)("inlineCode",{parentName:"td"},'<Input ownClass="input-style">'))),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"ownName"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"自身存在 ",Object(a.b)("inlineCode",{parentName:"td"},"name")," 属性时，如 ",Object(a.b)("inlineCode",{parentName:"td"},"Upload"),"，则为 ",Object(a.b)("inlineCode",{parentName:"td"},'<Upload name="field-name" ownName="files">'))),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"hide"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"是否隐藏表单域")))),Object(a.b)("h2",{id:"简化版-rules"},"简化版 rules"),Object(a.b)("p",null,"使用 Ant Design Form 时，需在 ",Object(a.b)("inlineCode",{parentName:"p"},"rules")," 中传入对象，如："),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-jsx",metastring:"harmony",harmony:!0}),"<Form.Item\n  label=\"Username\"\n  name=\"name\"\n  rules={[\n    { required: true, message: '用户名不得为空' },\n    { type: 'string', whitespace: true, message: '用户名格式有误' },\n    { max: 10, message: '不得超过 10 个字' },\n  ]}\n>\n  <Input />\n</Form.Item>\n")),Object(a.b)("p",null,"而使用 Ant Plus 时，只需在 ",Object(a.b)("inlineCode",{parentName:"p"},"rules")," 中传入短语字符串即可，如："),Object(a.b)("pre",null,Object(a.b)("code",b({parentName:"pre"},{className:"language-jsx",metastring:"harmony",harmony:!0}),"<Input name=\"name\" rules={['required', 'string', 'max=10']} />\n")),Object(a.b)("p",null,"Ant Plus 提供了以下短语形式的规则，可通过 Ant Plus ",Object(a.b)("inlineCode",{parentName:"p"},"Form")," 组件的 ",Object(a.b)("a",b({parentName:"p"},{href:"/ant-plus/form#config"}),Object(a.b)("inlineCode",{parentName:"a"},"config"))," 属性自定义提示文案。"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",b({parentName:"tr"},{align:null}),"短语"),Object(a.b)("th",b({parentName:"tr"},{align:null}),"对应规则"),Object(a.b)("th",b({parentName:"tr"},{align:null}),"规则说明"),Object(a.b)("th",b({parentName:"tr"},{align:null}),"默认错误提示"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"'required'"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"required"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"必填"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"'XXX 不得为空'（XXX 为 label 字段，下同）")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"'string'"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"string"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"字符串"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"'XXX 格式有误'")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"'number'"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"number"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"数值"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"'XXX 格式有误'")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"'array'"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"array"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"数组"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"'XXX 格式有误'")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"'email'"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"email"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"邮箱"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"'XXX 格式有误'")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"'phone'"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"phone"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"手机号"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"'XXX 格式有误'")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"'id'"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"id"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"身份证号"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"'XXX 格式有误'")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"'max=10'"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"max"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"最大字符长度"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"'不得超过 X 个字' （X 为数值，下同）")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",b({parentName:"tr"},{align:null}),"'min=2'"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"min"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"最小字符长度"),Object(a.b)("td",b({parentName:"tr"},{align:null}),"'不得少于 X 个字'")))),Object(a.b)("p",null,"同时遵循渐进增强的理念，当遇到未在以上列出的规则或需自定义规则时，仍可使用传入对象的方式，字符串与对象可同时使用。"),Object(a.b)("p",null,"注意 ",Object(a.b)("inlineCode",{parentName:"p"},"max")," 与 ",Object(a.b)("inlineCode",{parentName:"p"},"min")," 的使用方式为 ",Object(a.b)("inlineCode",{parentName:"p"},'"max=10"')," ",Object(a.b)("inlineCode",{parentName:"p"},'"min=2"'),"，以 ",Object(a.b)("inlineCode",{parentName:"p"},'"="')," 分割。"))}void 0!==i&&i&&i===Object(i)&&Object.isExtensible(i)&&!i.hasOwnProperty("__filemeta")&&Object.defineProperty(i,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/Usage.mdx"}}),i.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-usage-mdx-3cc190b2d8974d25ef68.js.map