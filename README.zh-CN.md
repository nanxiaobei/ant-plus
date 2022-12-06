<div align="center">

<img src="public/ant_plus_logo.svg" alt="Ant Plus" height="122" />

Ant Design Form 简化版，以最简单的方式来搭建表单。

[![npm version](https://img.shields.io/npm/v/antx.svg?style=flat-square)](https://www.npmjs.com/package/antx)
[![npm downloads](https://img.shields.io/npm/dt/antx.svg?style=flat-square)](http://www.npmtrends.com/antx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/antx?style=flat-square)](https://bundlephobia.com/result?p=antx)
[![GitHub](https://img.shields.io/github/license/nanxiaobei/ant-plus.svg?style=flat-square)](https://github.com/nanxiaobei/ant-plus/blob/main/LICENSE)
![npm peer dependency version](https://img.shields.io/npm/dependency-version/antx/peer/react?style=flat-square)
![npm peer dependency version](https://img.shields.io/npm/dependency-version/antx/peer/antd?style=flat-square)

[English](./README.md) · 简体中文

</div>

---

## 特点

- 告别繁琐的 `<Form.Item>` 与 `rules`
- 完整 TypeScript 提示支持
- 轻松拓展已有表单组件

## 安装

```sh
pnpm add antx
# or
yarn add antx
# or
npm i antx
```

## 使用

```tsx
import { Button, Form, Input, Select, WrapperCol } from 'antx';

const App = () => {
  return (
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Input label="Name" name="name" rules={['required', 'max=10']} />
      <Select
        label="Gender"
        name="gender"
        rules={['required']}
        options={[
          { value: 1, label: 'Male' },
          { value: 2, label: 'Female' },
        ]}
      />
      <InputNumber
        label="Age"
        name="age"
        rules={['required', 'number', 'min=0']}
      />
      <WrapperCol>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </WrapperCol>
    </Form>
  );
};

export default App;
```

[![Edit antx](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/antx-v4hqw?fontsize=14&hidenavigation=1&theme=dark)

## 介绍

`antx` 提供一套 `antd` 增强表单组件的集合，增强表单组件的特点：

**1. 不写 <Form.Item>**  
直接混写 `Form.Item` props 与原表单组件 props（完整 TypeScript 提示），显著简化代码。

**2. 简化 rules 写法 (仅增强，原 rules 写法同样支持)**  
提供 string 短语形式 rules，例如 `rules={['required', 'max=10'']}` 即 `rules={[{ required: true }, { max: 10 }]}`。

**3. 未新增任何其它 props**  
所有 props 均为 `antd` 原有 props，未新增任何其它 props 及 API，减少心智负担

此外 `antx` 还提供了 3 个原始组件（`Form`、`Button`、`Item`），2 个自定义组件（`WrapperCol`、`Watch`），以及一个工具函数 `create`。

## API

### 1. 增强表单组件

> 一级表单组件：

- **AutoComplete**
- **Cascader**
- **Checkbox**
- **DatePicker**
- **Input**
- **InputNumber**
- **Mentions**
- **Radio**
- **Rate**
- **Select**
- **Slider**
- **Switch**
- **TimePicker**
- **Transfer**
- **TreeSelect**
- **Upload**

> 二级表单组件，`antd` 中使用方式为 `AAA.BBB`，`antx` 中可直接引入 `BBB`：

- **CheckboxGroup** `Checkbox.Group`
- **DateRange** `DatePicker.RangePicker`
- **TextArea** `Input.TextArea`
- **Search** `Input.Search`
- **Password** `Input.Password`
- **RadioGroup** `Radio.Group`
- **TimeRange** `TimePicker.RangePicker`
- **Dragger** `Upload.Dragger`

### 2. 基础组件

> `Form`、`Button`、`Item` 均为 `antd` 原始组件，为方便使用而提供。`Watch`、`WrapperCol` 为自定义组件。

- **Form**
- **Button**
- **Item** `Form.Item`
- **Watch** 用于监听表单字段变化，可实现仅局部 re-render，更精细、性能更好

| Props       | 说明                                                      | 类型                                                         | 默认值  |
| ----------- | --------------------------------------------------------- | ------------------------------------------------------------ | ------- |
| `name`      | 需监听的字段                                              | [`NamePath`](https://ant.design/components/form-cn#NamePath) | -       |
| `list`      | 需监听的字段列表 (与 `name` 互斥)                         | `NamePath[]`                                                 | -       |
| `children`  | Render props 形式。获取被监听的值（或列表），返回 UI      | `(next: any, prev: any, form: FormInstance) => ReactNode`    | -       |
| `onlyValid` | 被监听的值非 `undefined` 时，才触发 `children` 渲染       | `boolean`                                                    | `false` |
| `onChange`  | 获取被监听的值（或列表），处理副作用 (与 `children` 互斥) | ` (next: any, prev: any, form: FormInstance) => void`        | -       |

```tsx
// Watch 使用示例
import { Watch } from 'antx';

<Form>
  <Input label="歌曲" name="song" />
  <Input label="歌手" name="artist" />

  <Watch name="song">
    {(song) => {
      return <div>歌曲：{song}</div>;
    }}
  </Watch>

  <Watch list={['song', 'artist']}>
    {([song, artist]) => {
      return (
        <div>
          歌曲：{song}，歌手：{artist}
        </div>
      );
    }}
  </Watch>
</Form>;
```

- **WrapperCol** 简化布局代码，props 与` Form.Item` 完全一致，用于 UI 需与输入框对齐的情况

```tsx
// WrapperCol 使用示例
import { WrapperCol } from 'antx';

<Form>
  <Input label="歌曲" name="song" />
  <WrapperCol>这是一条与输入框对齐的提示</WrapperCol>
</Form>;
```

### 3. `create` 工具函数

- **create** 将已有表单组件，包装为支持 `Form.Item` props 混写的组件，轻松拓展现有组件

```tsx
import { create } from 'antx';

// 拓展前
<Form>
  <Form.Item label="歌曲" name="song" rules={{ required: true }}>
    <MyCustomInput />
  </Form.Item>
</Form>;

// 拓展后 (TypeScript 提示支持)
const MyCustomInputPlus = create(MyCustomInput);

<Form>
  <MyCustomInputPlus label="歌曲" name="song" rules={['required']} />
</Form>;
```

### 4. 简化版 `rules`

| 短语            | 对应                                | 说明         |
| --------------- | ----------------------------------- | ------------ |
| `'required'`    | `{ required: true }`                |              |
| `'required=xx'` | `{ required: true, message: 'xx' }` |              |
| `'string'`      | `{ type: 'string' }`                |              |
| `'number'`      | `{ type: 'number' }`                |              |
| `'array'`       | `{ type: 'array' }`                 |              |
| `'boolean'`     | `{ type: 'boolean' }`               |              |
| `'url'`         | `{ type: 'url' }`                   |              |
| `'email'`       | `{ type: 'email' }`                 |              |
| `'len=20'`      | `{ len: 20 }`                       | `len === 20` |
| `'max=100'`     | `{ max: 100 }`                      | `max <= 100` |
| `'min=10'`      | `{ min: 10 }`                       | `min >= 10`  |

```tsx
// 简化版 rules 使用示例

<Form>
  <Input label="歌曲" name="song" rules={['required', 'min=0', 'max=50']} />
</Form>
```

## 对比

Ant Plus 与 Ant Design 表单代码对比：

![Comparison](public/antx_vs_antd.png)

## 协议

[MIT License](https://github.com/nanxiaobei/ant-plus/blob/main/LICENSE) (c) [nanxiaobei](https://lee.so/)

## FUTAKE

试试 [**FUTAKE**](https://sotake.com/f) 小程序，你的灵感相册。🌈

![FUTAKE](https://s3.bmp.ovh/imgs/2022/07/21/452dd47aeb790abd.png)
