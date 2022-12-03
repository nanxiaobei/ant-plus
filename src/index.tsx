import {
  AutoComplete as AntAutoComplete,
  Button as AntButton,
  Cascader as AntCascader,
  Checkbox as AntCheckbox,
  DatePicker as AntDatePicker,
  Form as AntForm,
  Input as AntInput,
  InputNumber as AntInputNumber,
  Mentions as AntMentions,
  Radio as AntRadio,
  Rate as AntRate,
  Select as AntSelect,
  Slider as AntSlider,
  Switch as AntSwitch,
  TimePicker as AntTimePicker,
  Transfer as AntTransfer,
  TreeSelect as AntTreeSelect,
  Upload as AntUpload,
} from 'antd';
import create from './create';

export { default as create } from './create';
export type { PlusShortRule, PlusFieldProps } from './create';

/*
 * Ant Plus
 * 提供 4 个基础组件 Form、Item、Button、Watch（除 Watch 外均为 antd 原组件）
 * 与一套增强表单组件的集合
 *
 * 增强表单组件是为了实现：
 *
 * 1. 不写 <Form.Item>
 * 直接在一个组件上混写 Form.Item 的 props 与原表单组件的 props，简化代码结构
 *
 * 2. 简化 rules 写法 (仅增强，原 rules 写法同样支持)
 * 提供的 string 短语形式 rules，详见 create.tsx 中的 shortRules
 * 例如 rules={[{ required: true }]}，可写为 rules={['required']}
 */

export const Form = AntForm;
export const Button = AntButton;
export const Item = AntForm.Item;

export { default as Watch } from './Watch';
export type { WatchProps } from './Watch';

export { default as WrapperCol } from './WrapperCol';

/* 1st
 ------------------------------------------------------------*/
export const AutoComplete = create(AntAutoComplete);
export const Cascader = create(AntCascader);
export const Checkbox = create(AntCheckbox);
export const DatePicker = create(AntDatePicker);
export const Input = create(AntInput);
export const InputNumber = create(AntInputNumber);
export const Mentions = create(AntMentions);
export const Radio = create(AntRadio);
export const Rate = create(AntRate);
export const Select = create(AntSelect);
export const Slider = create(AntSlider);
export const Switch = create(AntSwitch);
export const TimePicker = create(AntTimePicker);
export const Transfer = create(AntTransfer);
export const TreeSelect = create(AntTreeSelect);
export const Upload = create(AntUpload);

/* 2nd
 ------------------------------------------------------------*/
// Checkbox
export const CheckboxGroup = create(AntCheckbox.Group);

// DatePicker
export const DateRange = create(AntDatePicker.RangePicker);

// Input
export const TextArea = create(AntInput.TextArea);
export const Search = create(AntInput.Search);
export const Password = create(AntInput.Password);

// Radio
export const RadioGroup = create(AntRadio.Group);

// TimePicker
export const TimeRange = create(AntTimePicker.RangePicker);

// Upload
export const Dragger = create(AntUpload.Dragger);
