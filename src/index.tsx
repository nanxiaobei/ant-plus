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
import type { CheckboxGroupProps as AntCheckboxGroupProps } from 'antd/es/checkbox';
import type { RangePickerProps as AntRangePickerProps } from 'antd/es/date-picker';
import type {
  PasswordProps as AntPasswordProps,
  SearchProps as AntSearchProps,
  TextAreaProps as AntTextAreaProps,
} from 'antd/es/input';
import type { MentionsRef } from 'antd/es/mentions';
import type { DraggerProps as AntDraggerProps } from 'antd/es/upload';
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
export type { PlusShortRule, PlusFieldProps } from './create';

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
export type AutoCompleteProps = AntAutoCompleteProps & AntFormItemProps;
export type CascaderProps = AntCascaderProps & AntFormItemProps;
export type CheckboxProps = AntCheckboxProps & AntFormItemProps;
export type DatePickerProps = AntDatePickerProps & AntFormItemProps;
export type InputProps = AntInputProps & AntFormItemProps;
export type InputNumberProps = AntInputNumberProps & AntFormItemProps;
export type MentionProps = AntMentionProps & AntFormItemProps;
export type RadioProps = AntRadioProps & AntFormItemProps;
export type RateProps = AntRateProps & AntFormItemProps;
export type SelectProps = AntSelectProps & AntFormItemProps;
export type SliderProps = AntSliderSingleProps & AntFormItemProps;
export type SwitchProps = AntSwitchProps & AntFormItemProps;
export type TimePickerProps = AntTimePickerProps & AntFormItemProps;
export type TransferProps = AntTransferProps<any> & AntFormItemProps;
export type TreeSelectProps = AntTreeSelectProps & AntFormItemProps;
export type UploadProps = AntUploadProps & AntFormItemProps;

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
export type CheckboxGroupProps = AntCheckboxGroupProps & AntFormItemProps;
export type DateRangeProps = AntRangePickerProps & AntFormItemProps;
export type TextAreaProps = AntTextAreaProps & AntFormItemProps;
export type SearchProps = AntSearchProps & AntFormItemProps;
export type PasswordProps = AntPasswordProps & AntFormItemProps;
export type RadioGroupProps = AntRadioGroupProps & AntFormItemProps;
export type TimeRangeProps = AntTimeRangePickerProps & AntFormItemProps;
export type DraggerProps = AntDraggerProps & AntFormItemProps;

export const CheckboxGroup = create(AntCheckbox.Group);
export const DateRange = create(AntDatePicker.RangePicker);
export const TextArea = create(AntInput.TextArea);
export const Search = create(AntInput.Search);
export const Password = create(AntInput.Password);
export const RadioGroup = create(AntRadio.Group);
export const TimeRange = create(AntTimePicker.RangePicker);
export const Dragger = create(AntUpload.Dragger);
