# 🚀 Ant Plus

Ant Plus 是 [Ant Design Form](https://ant.design/components/form-cn/) 的增强版，在其基础上，封装了极其简便的 Form 使用方式与 Form 相关组件的简化 API。

[![npm version](https://img.shields.io/npm/v/antx.svg?style=flat-square)](https://www.npmjs.com/package/antx)
[![GitHub](https://img.shields.io/github/license/nanxiaobei/ant-plus.svg?style=flat-square)](https://github.com/nanxiaobei/ant-plus/blob/master/LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/antx.svg?style=flat-square)](http://www.npmtrends.com/antx)

## 文档

[https://nanxiaobei.github.io/ant-plus](https://nanxiaobei.github.io/ant-plus)

## 特点

- **🧬 极其简便**：告别繁琐的 `form.getFieldDecorator` 样板代码，告别冗长的 `rules` 检验代码。
- **⛳️ 统一提示**：全局定义 `rules` 错误提示信息，统一体验，告别烦乱的自定义与不可控。
- **💅 渐进增强**：若不使用新的功能，完全可以把组件当作 Ant Design 中的组件来使用。
- **🥽 简化 API**：对 Form 相关组件的常用 API 进行了简化，一切只为更流畅的开发。

## 安装

#### Yarn

```bash
yarn add antx
```

#### npm

```bash
npm install antx
```

## 使用

添加 `id` 属性以标明是表单域，`label` 用以渲染 Form.Item 的 `label`。其它 [`getFieldDecorator(id, options)`](<https://ant.design/components/form-cn/#getFieldDecorator(id,-options)-%E5%8F%82%E6%95%B0>) `options` 参数中的项，均可直接用于组件的 Props，例如 `rules` `initialValue` 等。

Ant Plus 还对 `rules` 做了一些特殊处理，可在规则数组中使用字符串，以简化校验规则的生成，并提供了自定义错误提示信息的接口。

更完整使用介绍，请查阅 [Ant Plus Form 组件文档](https://nanxiaobei.github.io/ant-plus/#/form)。

```jsx harmony
import { Button } from 'antd';
import { Form, Input } from 'antx';

const App = ({ form }) => (
  <Form api={form} data={{ username: 'Emily' }}>
    <Input
      label="用户名"
      id="username"
      rules={['required', 'string', 'max=10']}
      max={10}
      msg="full"
    />
    <Button htmlType="submit">提交</Button>
  </Form>
);

export default Form.create()(App);
```

是的，一切就是如此的简洁清晰。示例：[https://codesandbox.io/s/q75nvj6vrj](https://codesandbox.io/s/q75nvj6vrj)。

## 对比

使用 Ant Plus 与使用传统 Ant Design 搭建 Form 的代码对比。

![代码对比图](https://raw.githubusercontent.com/nanxiaobei/ant-plus/master/contrast/demo.png)

## 协议

[MIT](https://github.com/nanxiaobei/ant-plus/blob/master/LICENSE)
