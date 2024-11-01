<div align="center">

Link in bio to **widgets**,
your online **home screen**. ➫ [🔗 kee.so](https://kee.so/)

</div>

---

<div align="center">

<img src="public/ant_plus_logo.svg" alt="Ant Plus" height="100" />

Ant Design Form Simplified, build forms in the simplest way.

[![npm version](https://img.shields.io/npm/v/antx.svg?style=flat-square)](https://www.npmjs.com/package/antx)
[![npm downloads](https://img.shields.io/npm/dt/antx.svg?style=flat-square)](http://www.npmtrends.com/antx)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/antx?style=flat-square)](https://bundlephobia.com/result?p=antx)
[![GitHub](https://img.shields.io/github/license/nanxiaobei/ant-plus.svg?style=flat-square)](https://github.com/nanxiaobei/ant-plus/blob/main/LICENSE)
![npm peer dependency version](https://img.shields.io/npm/dependency-version/antx/peer/react?style=flat-square)
![npm peer dependency version](https://img.shields.io/npm/dependency-version/antx/peer/antd?style=flat-square)

English · [简体中文](./README.zh-CN.md)

</div>

---

## Introduction

`antx` provides a set of `antd` mixed field components:

**1. Say goodbye to cumbersome `<Form.Item>` and `rules`**  
Directly write on field components (e.g. `Input`) with `Form.Item` props and field props (**fully TypeScript support**), which greatly simplifies the code.

**2. String `rules` (only enhanced, original `rules` are also supported)**  
`rules` in string, for example `rules={['required', 'max=10']}` represents for `rules={[{ required: true }, { max: 10 }]}`.

**3. Not adding any new props**  
All props are `antd` original props, without add any other new props, reducing mental burden.

In the same time, `antx` provides 2 helper components (`WrapperCol`, `Watch`), and a tool function `create()` for easily enhancing existing field components.

## Installation

```sh
pnpm add antx
# or
yarn add antx
# or
npm i antx
```

## Usage

```tsx
import { Button, Form } from 'antd';
import { Input, Select, WrapperCol } from 'antx';

const App = () => {
  return (
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Input label="Name" name="name" rules={['required', 'string']} />
      <Select
        label="Gender"
        name="gender"
        rules={['required', 'number']}
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

## API

### 1. Mixed components

1. **AutoComplete**
1. **Cascader**
1. **Checkbox**
1. **DatePicker**
1. **Input**
1. **InputNumber**
1. **Mentions**
1. **Radio**
1. **Rate**
1. **Select**
1. **Slider**
1. **Switch**
1. **TimePicker**
1. **Transfer**
1. **TreeSelect**
1. **Upload**
1. **CheckboxGroup** `Checkbox.Group`
1. **DateRange** `DatePicker.RangePicker`
1. **TextArea** `Input.TextArea`
1. **Search** `Input.Search`
1. **Password** `Input.Password`
1. **RadioGroup** `Radio.Group`
1. **TimeRange** `TimePicker.RangePicker`
1. **Dragger** `Upload.Dragger`

For all the mixed components above, props like`className`, `style`, `name`, `tooltip` will be passed to `Form.Item`.

To pass to the inner field component, please use `selfClass`, `selfStyle`, `selfName`, `selfTooltip`.

### 2. Helper components

1. **Watch**: used to monitor the changes of form values, which can be only partial re-render, more refined and better performance

| Props       | Description                                                                                 | Type                                                      | Default |
| ----------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------- |
| `name`      | Field to monitor                                                                            | [`NamePath`](https:ant.designcomponentsform-cnNamePath)   | -       |
| `list`      | List of fields to monitor (mutually exclusive with `name`)                                  | `NamePath[]`                                              | -       |
| `children`  | Render props. Get the monitored value (or list), return UI                                  | `(next: any, prev: any, form: FormInstance) => ReactNode` | -       |
| `onlyValid` | Only trigger `children` rendering when the monitored value is not `undefined`               | `boolean`                                                 | `false` |
| `onChange`  | Get the monitored value (or list), handle side effects (mutually exclusive with `children`) | ` (next: any, prev: any, form: FormInstance) => void`     | -       |

```tsx
// Watch example
import { Watch } from 'antx';

<Form>
  <Input label="Song" name="song" />
  <Input label="Artist" name="artist" />

  <Watch name="song">
    {(song) => {
      return <div>Song: {song}</div>;
    }}
  </Watch>

  <Watch list={['song', 'artist']}>
    {([song, artist]) => {
      return (
        <div>
          Song: {song}, Artist: {artist}
        </div>
      );
    }}
  </Watch>
</Form>;
```

2. **WrapperCol**: simplify the layout code, the same props as `Form.Item`, used when the UI needs to be aligned with the input box.

```tsx
// WrapperCol example
import { WrapperCol } from 'antx';

<Form>
  <Input label="Song" name="song" />
  <WrapperCol>This is a hint that aligns with the input box</WrapperCol>
</Form>;
```

### 3. `create()` function

- **create()**: convert existing custom field components into components that support `Form.Item` props mix-in.

```tsx
import { create } from 'antx';

// Before
<Form>
  <Form.Item label="Song" name="song" rules={{ required: true }}>
    <MyCustomInput />
  </Form.Item>
</Form>;

// enhancing with create()
const MyCustomInputPlus = create(MyCustomInput);

// After
<Form>
  <MyCustomInputPlus label="Song" name="song" rules={['required']} />
</Form>;
```

### 4. String `rules`

| String          | Equals to                              | Description  |
| --------------- | -------------------------------------- | ------------ |
| `'required'`    | `{ required: true }`                   |              |
| `'required=xx'` | `{ required: true, message: 'xx' }`    |              |
| `'string'`      | `{ type: 'string', whitespace: true }` |              |
| `'pureString'`  | `{ type: 'string' }`                   |              |
| `'number'`      | `{ type: 'number' }`                   |              |
| `'array'`       | `{ type: 'array' }`                    |              |
| `'boolean'`     | `{ type: 'boolean' }`                  |              |
| `'url'`         | `{ type: 'url' }`                      |              |
| `'email'`       | `{ type: 'email' }`                    |              |
| `'len=20'`      | `{ len: 20 }`                          | `len === 20` |
| `'max=100'`     | `{ max: 100 }`                         | `max <= 100` |
| `'min=10'`      | `{ min: 10 }`                          | `min >= 10`  |

```tsx
// String rules example
<Input label="Song" name="song" rules={['required', 'min=0', 'max=50']} />
```

## Comparison

Ant Plus and Ant Design form code comparison:

![Comparison](public/antx_vs_antd.png)

## License

[MIT License](https://github.com/nanxiaobei/ant-plus/blob/main/LICENSE) (c) [nanxiaobei](https://lee.so/)
