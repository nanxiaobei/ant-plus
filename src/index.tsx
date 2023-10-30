import type {
  AutoCompleteProps as AntAutoCompleteProps,
  ButtonProps as AntButtonProps,
  CascaderProps as AntCascaderProps,
  CheckboxProps as AntCheckboxProps,
  DatePickerProps as AntDatePickerProps,
  FormItemProps as AntFormItemProps,
  FormProps as AntFormProps,
  InputNumberProps as AntInputNumberProps,
  InputProps as AntInputProps,
  MentionProps as AntMentionProps,
  RadioGroupProps as AntRadioGroupProps,
  RadioProps as AntRadioProps,
  RateProps as AntRateProps,
  SelectProps as AntSelectProps,
  SliderSingleProps as AntSliderSingleProps,
  SwitchProps as AntSwitchProps,
  TimePickerProps as AntTimePickerProps,
  TimeRangePickerProps as AntTimeRangePickerProps,
  TransferProps as AntTransferProps,
  TreeSelectProps as AntTreeSelectProps,
  UploadProps as AntUploadProps,
} from 'antd';
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
import type { CheckboxGroupProps as AntCheckboxGroupProps } from 'antd/es/checkbox';
import type { RangePickerProps as AntRangePickerProps } from 'antd/es/date-picker';
import type {
  PasswordProps as AntPasswordProps,
  SearchProps as AntSearchProps,
  TextAreaProps as AntTextAreaProps,
} from 'antd/es/input';
import type { MentionsRef } from 'antd/es/mentions';
import type { DraggerProps as AntDraggerProps } from 'antd/es/upload';
import * as React from 'react';
import type { PlusProps } from './create';
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
  AntMentionProps & React.RefAttributes<MentionsRef>
> & {
  Option: typeof Option;
  _InternalPanelDoNotUseOrYouWillBeFired: any;
  getMentions: (value: string, config?: MentionsConfig) => MentionsEntity[];
};

/* create
 ---------------------------------------------------------------------- */
export { default as create } from './create';
export type { PlusProps, PlusShortRule } from './create';

/* raw
 ---------------------------------------------------------------------- */
export type FormProps = AntFormProps;
export type ButtonProps = AntButtonProps;
export type ItemProps = AntFormItemProps;

export const Form = AntForm;
export const Button = AntButton;
export const Item = AntForm.Item;

/* custom
 ---------------------------------------------------------------------- */
export type { WatchProps } from './Watch';
export type { WrapperColProps } from './WrapperCol';

export { default as Watch } from './Watch';
export { default as WrapperCol } from './WrapperCol';

/* 1st
 ---------------------------------------------------------------------- */
export type AutoCompleteProps = PlusProps<AntAutoCompleteProps>;
export type CascaderProps = PlusProps<AntCascaderProps>;
export type CheckboxProps = PlusProps<AntCheckboxProps>;
export type DatePickerProps = PlusProps<AntDatePickerProps>;
export type InputProps = PlusProps<AntInputProps>;
export type InputNumberProps = PlusProps<AntInputNumberProps>;
export type MentionProps = PlusProps<AntMentionProps>;
export type RadioProps = PlusProps<AntRadioProps>;
export type RateProps = PlusProps<AntRateProps>;
export type SelectProps = PlusProps<AntSelectProps>;
export type SliderProps = PlusProps<AntSliderSingleProps>;
export type SwitchProps = PlusProps<AntSwitchProps>;
export type TimePickerProps = PlusProps<AntTimePickerProps>;
export type TransferProps = PlusProps<AntTransferProps<any>>;
export type TreeSelectProps = PlusProps<AntTreeSelectProps>;
export type UploadProps = PlusProps<AntUploadProps>;

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
export type CheckboxGroupProps = PlusProps<AntCheckboxGroupProps>;
export type DateRangeProps = PlusProps<AntRangePickerProps>;
export type TextAreaProps = PlusProps<AntTextAreaProps>;
export type SearchProps = PlusProps<AntSearchProps>;
export type PasswordProps = PlusProps<AntPasswordProps>;
export type RadioGroupProps = PlusProps<AntRadioGroupProps>;
export type TimeRangeProps = PlusProps<AntTimeRangePickerProps>;
export type DraggerProps = PlusProps<AntDraggerProps>;

export const CheckboxGroup = create(AntCheckbox.Group);
export const DateRange = create(AntDatePicker.RangePicker);
export const TextArea = create(AntInput.TextArea);
export const Search = create(AntInput.Search);
export const Password = create(AntInput.Password);
export const RadioGroup = create(AntRadio.Group);
export const TimeRange = create(AntTimePicker.RangePicker);
export const Dragger = create(AntUpload.Dragger);
