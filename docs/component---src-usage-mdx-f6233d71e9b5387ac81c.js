(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{sVqV:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return c})),a.d(t,"default",(function(){return m}));var n=a("Fcif"),b=a("+I+c"),l=(a("mXGw"),a("/FXl")),r=a("TjRS"),c=(a("aD51"),{});void 0!==c&&c&&c===Object(c)&&Object.isExtensible(c)&&!c.hasOwnProperty("__filemeta")&&Object.defineProperty(c,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/Usage.mdx"}});var j={_frontmatter:c},O=r.a;function m(e){var t=e.components,a=Object(b.a)(e,["components"]);return Object(l.b)(O,Object(n.a)({},j,a,{components:t,mdxType:"MDXLayout"}),Object(l.b)("h1",{id:"使用"},"使用"),Object(l.b)("h2",{id:"表单控件-props"},"表单控件 Props"),Object(l.b)("p",null,"Ant Plus 最核心的使用方式，便是可以在表单控件 Props 中，直接传入 ",Object(l.b)("inlineCode",{parentName:"p"},"Form.Item")," 的相关 Props，如："),Object(l.b)("pre",null,Object(l.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx",metastring:"harmony",harmony:!0}),"<Form data={{ name: 'Emily' }}>\n  <Input\n    label=\"用户名\"\n    name=\"name\"\n    labelCol={{ span: 6 }}\n    wrapperCol={{ span: 18 }}\n    rules={['required', 'string']}\n    tip=\"请输入用户名\"\n    colon\n  />\n</Form>\n")),Object(l.b)("p",null,"从而去除对 ",Object(l.b)("inlineCode",{parentName:"p"},"Form.Item")," 的依赖，简化表单代码结构。"),Object(l.b)("hr",null),Object(l.b)("p",null,"以下为表单控件除自身 Props 外，可传入的 Props："),Object(l.b)("h3",{id:"formitem-可传入-props"},"Form.Item 可传入 Props"),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",Object(n.a)({parentName:"tr"},{align:null})),Object(l.b)("th",Object(n.a)({parentName:"tr"},{align:null})))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"colon"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"dependencies")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"extra"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"getValueFromEvent")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"getValueProps"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"hasFeedback")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"help"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"htmlFor")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"initialValue"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"noStyle")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"label"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"labelAlign")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"labelCol"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"name")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"preserve"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"normalize")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"required"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"rules")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"shouldUpdate"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"trigger")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"validateFirst"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"validateStatus")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"validateTrigger"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"valuePropName")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"wrapperCol"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"hidden")))),Object(l.b)("p",null,"若需用 ",Object(l.b)("inlineCode",{parentName:"p"},"Form.Item")," 来布局，如 Ant Design 代码："),Object(l.b)("pre",null,Object(l.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),"<Form.Item labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>\n  <Button>提交</Button>\n</Form.Item>\n")),Object(l.b)("p",null,"则 Ant Plus 对应代码应为："),Object(l.b)("pre",null,Object(l.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),'<Button label="" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>\n  提交\n</Button>\n')),Object(l.b)("p",null,"因为 Ant Plus 以 ",Object(l.b)("inlineCode",{parentName:"p"},"label")," 或 ",Object(l.b)("inlineCode",{parentName:"p"},"name")," 至少存在一个来识别节点是否为 ",Object(l.b)("inlineCode",{parentName:"p"},"Form.Item"),"，而纯布局时 ",Object(l.b)("inlineCode",{parentName:"p"},"name")," 不存在，所以应传入 ",Object(l.b)("inlineCode",{parentName:"p"},'label=""')," 以供识别。"),Object(l.b)("p",null,"同时，",Object(l.b)("inlineCode",{parentName:"p"},'label=""')," 也代表当前元素在表单布局中，为 ",Object(l.b)("inlineCode",{parentName:"p"},"label")," 文字为空的一个条目。"),Object(l.b)("h3",{id:"其它可传入-props"},"其它可传入 Props"),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"属性"),Object(l.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"说明"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"className"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"Form.Item")," 的 ",Object(l.b)("inlineCode",{parentName:"td"},"className")," 属性")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"style"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"Form.Item")," 的 ",Object(l.b)("inlineCode",{parentName:"td"},"style")," 属性")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"ownClass"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"Form.Item")," 内组件自身的 ",Object(l.b)("inlineCode",{parentName:"td"},"className")," 属性")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"ownStyle"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.b)("inlineCode",{parentName:"td"},"Form.Item")," 内组件自身的 ",Object(l.b)("inlineCode",{parentName:"td"},"style")," 属性")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"ownName"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"组件自身存在 ",Object(l.b)("inlineCode",{parentName:"td"},"name")," 属性，则自身 ",Object(l.b)("inlineCode",{parentName:"td"},"name")," 需改为 ",Object(l.b)("inlineCode",{parentName:"td"},"ownName"),"。如 ",Object(l.b)("inlineCode",{parentName:"td"},"Upload"),"，即为 ",Object(l.b)("inlineCode",{parentName:"td"},'<Upload name="key" ownName="files">'))))),Object(l.b)("h2",{id:"简化版-rules"},"简化版 rules"),Object(l.b)("p",null,"使用 Ant Design Form 时，需在 ",Object(l.b)("inlineCode",{parentName:"p"},"rules")," 中传入对象，如："),Object(l.b)("pre",null,Object(l.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx",metastring:"harmony",harmony:!0}),"<Form.Item\n  label=\"Username\"\n  name=\"name\"\n  rules={[\n    { required: true, message: '用户名不得为空' },\n    { type: 'string', whitespace: true, message: '用户名格式有误' },\n    { max: 10, message: '不得超过 10 个字' },\n  ]}\n>\n  <Input />\n</Form.Item>\n")),Object(l.b)("p",null,"而使用 Ant Plus 时，只需在 ",Object(l.b)("inlineCode",{parentName:"p"},"rules")," 中传入短语字符串即可，如："),Object(l.b)("pre",null,Object(l.b)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx",metastring:"harmony",harmony:!0}),"<Input name=\"name\" rules={['required', 'string', 'max=10']} />\n")),Object(l.b)("p",null,"Ant Plus 提供了以下短语形式的规则，可通过 Ant Plus ",Object(l.b)("inlineCode",{parentName:"p"},"Form")," 组件的 ",Object(l.b)("a",Object(n.a)({parentName:"p"},{href:"https://nanxiaobei.github.io/ant-plus/form#config"}),Object(l.b)("inlineCode",{parentName:"a"},"config"))," 属性自定义提示文案。"),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"短语"),Object(l.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"规则说明"),Object(l.b)("th",Object(n.a)({parentName:"tr"},{align:null}),"默认校验提示"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'required'"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"必填"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'XXX 不得为空'（XXX 为 label 字段，下同）")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'whitespace'"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"不允许仅空格"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'XXX 格式有误'")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'string'"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"字符串"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'XXX 格式有误'")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'number'"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"数值"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'XXX 格式有误'")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'array'"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"数组"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'XXX 格式有误'")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'email'"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"邮箱"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'XXX 格式有误'")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'phone'"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"手机号"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'XXX 格式有误'")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'id'"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"身份证号"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'XXX 格式有误'")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'max=10'"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"最大字符长度"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'不得超过 X 个字' （X 为数值，下同）")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'min=2'"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"最小字符长度"),Object(l.b)("td",Object(n.a)({parentName:"tr"},{align:null}),"'不得少于 X 个字'")))),Object(l.b)("p",null,"同时遵循渐进增强的理念，当遇到未在以上列出的规则或需自定义规则时，仍可使用传入对象的方式，字符串与对象可同时使用。"),Object(l.b)("p",null,"注意 ",Object(l.b)("inlineCode",{parentName:"p"},"max")," 与 ",Object(l.b)("inlineCode",{parentName:"p"},"min")," 的使用方式为 ",Object(l.b)("inlineCode",{parentName:"p"},"'max=10'")," ",Object(l.b)("inlineCode",{parentName:"p"},"'min=2'"),"，以 ",Object(l.b)("inlineCode",{parentName:"p"},"'='")," 分割。"))}void 0!==m&&m&&m===Object(m)&&Object.isExtensible(m)&&!m.hasOwnProperty("__filemeta")&&Object.defineProperty(m,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/Usage.mdx"}}),m.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-usage-mdx-f6233d71e9b5387ac81c.js.map