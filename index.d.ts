import * as React from 'react';
import { FormProps as AntFormProps } from 'antd/lib/form';
import { InputProps as AntInputProps } from 'antd/lib/input';
import { InputNumberProps as AntInputNumberProps } from 'antd/lib/input-number';
import { AutoCompleteProps as AntAutoCompleteProps } from 'antd/lib/auto-complete';
import { SelectProps as AntSelectProps, SelectValue } from 'antd/lib/select';
import { TransferProps as AntTransferProps } from 'antd/lib/transfer';
import { CascaderProps as AntCascaderProps } from 'antd/lib/cascader';
import { SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from 'rc-tree-select';
import {
  TreeSelectProps as AntTreeSelectProps,
  SelectValue as TreeSelectValue,
} from 'antd/lib/tree-select';

declare module 'antx' {
  export interface FormProps extends AntFormProps {
    /**
     * `initialValues` 简写
     */
    data?: Object;
    /**
     * 设置统一的 `placeholder` 信息与 `rules` 校验提示信息。详见下文 **config**
     */
    config?: Object;
    /**
     * labelCol 与 wrapperCol span 的数值。e.g. cols=[8, 16] → labelCol={ span: 8 } wrapperCol={ span: 16 }
     */
    cols?: number[];
    /**
     * 禁用的表单域，传入 `name` 组成的数组。全部禁用传入字符串 `'all'`
     */
    disabledNames?: any[];
  }

  export const Form: React.FC<FormProps>;

  export interface InputProps extends AntInputProps {
    /**
     * 最大可输入字符数（若传入则显示字符计数器）
     */
    max?: number;
    /**
     * `placeholder` 简写（在 Ant Plus `Form` 内时，可传入 `'short'` 或 `'full'`。转义：`'short'` → `'请输入'`, `'full'` → `'请输入XX'`, `'其它'` → `'其它'`）
     */
    tip?: string;
    /**
     * `autoComplete` 简写（关闭需传入 `'off'`）
     */
    auto?: string;
    /**
     * 展示为 Material Design 风格输入框，传入的字符串将为动态 label
     */
    floatingLabel?: string;
    /**
     * 默认为 `Input` 组件，若传入 `textarea`，则为 `Input.TextArea` 组件
     */
    textarea?: boolean;
    /**
     * `Input.TextArea` 的输入框行高
     */
    rows?: number;
  }

  export const Input: React.FC<InputProps>;

  export interface InputNumberProps extends AntInputNumberProps {
    /**
     * `placeholder` 简写（在 Ant Plus `Form` 内时，可传入 `'short'` 或 `'full'`。转义：`'short'` → `'请输入'`, `'full'` → `'请输入XX'`, `'其它'` → `'其它'`）
     */
    tip?: string;
    /**
     * `autoComplete` 简写（关闭需传入 `'off'`）
     */
    auto?: string;
    /**
     * 展示为 Material Design 风格输入框，传入的字符串将为动态 label
     */
    floatingLabel?: string;
  }

  export const InputNumber: React.FC<InputNumberProps>;

  export interface AutoCompleteProps extends AntAutoCompleteProps {
    /**
     * `options` 简写
     */
    data?: any[];
    /**
     * `placeholder` 简写（在 Ant Plus `Form` 内时，可传入 `'short'` 或 `'full'`。转义：`'short'` → `'请输入'`, `'full'` → `'请输入XX'`, `'其它'` → `'其它'`）
     */
    tip?: string;
    /**
     * 是否可搜索
     */
    search?: boolean;
    /**
     * `allowClear` 简写
     */
    clear?: boolean;
  }

  export const AutoComplete: React.FC<AutoCompleteProps>;

  export interface SelectProps<VT> extends AntSelectProps<VT> {
    /**
     * 列表数据源
     */
    data?: any[];
    /**
     * 当数据源的键不是 `'value'` `'label'` 时传入。e.g. 数据源 `[{ val: 1, text: 'A'}, { val: 2, text: 'B'}]，则传入 ['val', 'text']`
     */
    keys?: any[];
    /**
     * `placeholder` 简写（在 Ant Plus `Form` 内时，可传入 `'short'` 或 `'full'`。转义：`'short'` → `'请输入'`, `'full'` → `'请输入XX'`, `'其它'` → `'其它'`）
     */
    tip?: string;
    /**
     * 是否可搜索
     */
    search?: boolean;
    /**
     * `allowClear` 简写
     */
    clear?: boolean;
    /**
     * `notFoundContent` 简写
     */
    empty?: string;
  }

  export const Select: React.FC<SelectProps<SelectValue>>;

  export interface TransferProps extends AntTransferProps {
    /**
     * `dataSource` 简写
     */
    data?: any[];
    /**
     * `'未选择XX'` `'已选择XX'` 的 `'XX'` 文案
     */
    title?: string;
    /**
     * 是否可搜索
     */
    search?: boolean;
    /**
     * `local.itemUnit` 与 `local.itemsUnits` 简写，默认：`'项'`
     */
    unit?: string;
    /**
     * `locale.searchPlaceholder` 简写（不支持 `'short'` `'full'`）
     */
    searchTip?: string;
    /**
     * `locale.notFoundContent` 简写
     */
    empty?: string;
  }

  export const Transfer: React.FC<TransferProps>;

  export interface CascaderProps extends AntCascaderProps {
    /**
     * `options` 简写
     */
    data?: any[];
    /**
     * 当数据源的键不是 `'value'` `'label'` `'children'` 时传入
     */
    keys?: any[];
    /**
     * `placeholder` 简写（不支持 `'short'` `'full'`）
     */
    tip?: string;
    /**
     * 是否可搜索
     */
    search?: boolean;
    /**
     * `allowClear` 简写
     */
    clear?: boolean;
    /**
     * `notFoundContent` 简写
     */
    empty?: string;
    /**
     * `value` 取数组最后一个值，默认为整体数组
     */
    last?: boolean;
  }

  export const Cascader: React.FC<CascaderProps>;

  export type TreeSelectShowType = typeof SHOW_ALL | typeof SHOW_PARENT | typeof SHOW_CHILD;

  export interface TreeSelectProps<T> extends AntTreeSelectProps<T> {
    /**
     * `treeData` 简写
     */
    data?: any[];
    /**
     * 当数据源的键不是 `'value'` `'title'` `'children'` 时传入
     */
    keys?: any[];
    /**
     * `placeholder` 简写（不支持 `'short'` `'full'`）
     */
    tip?: string;
    /**
     * 是否可搜索
     */
    search?: boolean;
    /**
     * `allowClear` 简写
     */
    clear?: boolean;
    /**
     * `notFoundContent` 简写
     */
    empty?: string;
    /**
     * `treeCheckable` 简写
     */
    checkbox?: boolean;
    /**
     * `treeDefaultExpandAll` 简写
     */
    expandAll?: boolean;
    /**
     * `treeDefaultExpandedKeys` 简写
     */
    expandKeys?: any[];
    /**
     * `showCheckedStrategy` 简写
     */
    showType?: TreeSelectShowType;
  }

  export const TreeSelect: React.FC<TreeSelectProps<TreeSelectValue>>;
}
