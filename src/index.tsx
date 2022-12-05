import * as React from 'react';
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
import type { MentionProps, MentionsRef } from 'antd/es/mentions';
import create from './create';

// fix mentions type
interface MentionsConfig {
  prefix?: string | string[];
  split?: string;
}
interface MentionsEntity {
  prefix: string;
  value: string;
}
type CompoundedComponent = React.ForwardRefExoticComponent<
  MentionProps & React.RefAttributes<MentionsRef>
> & {
  Option: typeof Option;
  _InternalPanelDoNotUseOrYouWillBeFired: any;
  getMentions: (value: string, config?: MentionsConfig) => MentionsEntity[];
};

/* create
 ---------------------------------------------------------------------- */
export { default as create } from './create';
export type { PlusShortRule, PlusFieldProps } from './create';

/* raw
 ---------------------------------------------------------------------- */
export const Form: typeof AntForm = AntForm;
export const Button = AntButton;
export const Item: typeof AntForm.Item = AntForm.Item;

/* new
 ---------------------------------------------------------------------- */
export { default as Watch } from './Watch';
export { default as WrapperCol } from './WrapperCol';
export type { WatchProps } from './Watch';
export type { WrapperColProps } from './WrapperCol';

/* 1st
 ---------------------------------------------------------------------- */
export const AutoComplete = create(AntAutoComplete);
export const Cascader = create(AntCascader);
export const Checkbox = create(AntCheckbox);
export const DatePicker = create(AntDatePicker);
export const Input = create(AntInput);
export const InputNumber = create(AntInputNumber);
export const Mentions = create(AntMentions as unknown as CompoundedComponent);
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
 ---------------------------------------------------------------------- */
export const CheckboxGroup = create(AntCheckbox.Group);
export const DateRange = create(AntDatePicker.RangePicker);
export const TextArea = create(AntInput.TextArea);
export const Search = create(AntInput.Search);
export const Password = create(AntInput.Password);
export const RadioGroup = create(AntRadio.Group);
export const TimeRange = create(AntTimePicker.RangePicker);
export const Dragger = create(AntUpload.Dragger);
