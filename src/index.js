import React, { Component } from 'react';
import {
  Form as AntForm,
  Input as AntInput,
  AutoComplete as AntAutoComplete,
  Select as AntSelect,
  Transfer as AntTransfer,
} from 'antd';
import createRules from './utils/createRules';
import createField from './utils/createField';
import './index.scss';

/**
 * Form - Enhanced Ant Design Form
 *
 * @param {object} [formProps] - 传给 Ant Design Form 组件的 props
 * @param {string} [className] - 传给 Ant Design Form 的 className
 * @param {function} [onSubmit] - 提交表单的回调事件
 * @param {node} children - 表单域，e.g. <Input label="账号" id="id" rules=['number'] options={{ initialValue: 1 }} />
 *
 * @param {object} props - AntPlus.Form 组件中传入的其它 props (rootProps)
 * @param {object} props.form - * Form.create()() 包装后传入的 `form` 属性
 * @param {object} [props.values={}] - 与表单域的 `id` 属性对应的一组数据，e.g. { field_id: '123', ... }
 * @param {string|array} [props.disabledFields] - 禁用的表单域，全部禁用传字符串 "all"，部分禁用传数组 e.g. ['id_1', 'id_2']
 * @param {boolean} [props.colon=false] - 是否显示 label 后的冒号
 */
const Form = ({
  formProps, className, onSubmit,
  children,
  ...props
}) => (
  <AntForm {...formProps} className={['ant-plus-form', className].join(' ')}
    onSubmit={event => {
      event.preventDefault();
      onSubmit();
    }}>
    {Form.createFields(children, props)}
  </AntForm>
);

Form.displayName = 'AntPlus.Form';

Form.createFields = (children, rootProps) => {
  if (typeof children === 'undefined' || typeof children === 'string' || typeof children === 'boolean') {
    return children;
  }
  // 遍历 children
  return React.Children.map(children, child => {
    if (!child || !child.props) return child;

    // 获取 `id` 属性，判断子节点是否为表单域，`id` 为表单域唯一标识，请勿被占用
    const { id, children: deepChildren, ...childProps } = child.props;

    if (!id) {
      // 当子节点不是表单域时，递归查找，包装子节点 `child.props.children` 内所有表单域
      const wrappedDeepChildren = Form.createFields(deepChildren, rootProps);
      return { ...child, props: { ...childProps, children: wrappedDeepChildren } };
    }

    // 当存在 `id`，即为表单域时
    const { label, rules, colon: itemColon, prefix, suffix, ...fieldProps } = childProps;
    const { form, values = {}, disabledFields, colon = false } = rootProps;

    // Cascader 组件 `options` 字段被占用，传入 getFieldDecorator(id, options) 的 `options`, 需使用 `fieldoptions`
    let options;
    if (childProps.prefixCls === 'ant-cascader') {
      options = childProps.fieldoptions;
      delete fieldProps.fieldoptions;
    } else {
      ({ options } = childProps);
      delete fieldProps.options;
    }

    // 使用 `AntForm.Item` 与 `form.getFieldDecorator()` 进行包装
    return (
      <AntForm.Item key={id} label={label} colon={itemColon || colon} className={`form-item-${id}`}>
        {Form.createFields(prefix, rootProps)}
        {form.getFieldDecorator(id, {
          rules: createRules(label, rules),
          validateTrigger: (rules && rules.includes('phone')) ? 'onBlur' : 'onChange',
          initialValue: values[id],
          ...options,
        })(createField(label, id, { ...child, props: fieldProps }, disabledFields))}
        {Form.createFields(suffix, rootProps)}
      </AntForm.Item>
    );
  });
};

/**
 * Input - Enhanced Ant Design Input (TextArea)
 *
 * @param {string} [msg] - `placeholder` 属性 (若为 `short` 或 `full`，需与 AntPlus.Form 配合使用，以获取 label)
 * e.g. `short` => `请输入`, `full` => `请输入XXX`, `其它提示信息` => `其它提示信息`
 * @param {string} [auto] - `autoComplete` 属性
 * @param {number} [max] - 最大可输入字符数 (传入则显示字符计算)
 * @param {string} [type] - 默认为 Input 组件，若传入 type 为 `textarea`， 则为 TextArea 组件
 * @param {number} [rows=2] - 若为 TextArea 时的输入框行高，默认为 2
 * @param {object} [props] - 其它传给 Ant Design Input (TextArea) 组件的 props
 */
class Input extends Component {
  constructor(props) {
    super(props);
    const { max, value, onChange } = props;
    if (max === undefined) {
      this.onInputChange = onChange;
    } else {
      this.countClass = 'ant-plus-input-with-count';
      this.onInputChange = this.onCountChange;
    }
    this.state = {
      count: value ? value.length : 0,
    };
  }
  onCountChange = event => {
    const { value } = event.target;
    this.setState({ count: value.length });
    this.props.onChange(value);
  };
  renderCounter = max => {
    if (max === undefined) return null;
    const { count } = this.state;
    this.overMaxClass = count > max ? 'over-max' : '';
    return (
      <span className={['input-counter', this.overMaxClass].join(' ')}>{count} | {max}</span>
    );
  };

  render() {
    const {
      msg,
      auto,
      max,
      type,
      rows,
      ...props
    } = this.props;
    return (
      <div className={['ant-plus-input', this.countClass].join(' ')}>
        {type === 'textarea' ? (
          <AntInput.TextArea
            {...props}
            placeholder={msg}
            onChange={this.onInputChange}
            autosize={{ minRows: rows || 2 }}
          />
        ) : (
          <AntInput
            {...props}
            placeholder={msg}
            autoComplete={auto}
            onChange={this.onInputChange}
          />
        )}
        {this.renderCounter(max)}
      </div>
    );
  }
}

Input.displayName = 'AntPlus.Input';

/**
 * AutoComplete - Enhanced Ant Design AutoComplete
 *
 * @param {string} [msg] - `placeholder` 属性 (若为 `short` 或 `full`，需与 AntPlus.Form 配合使用，以获取 label)
 * e.g. `short` => `请输入`, `full` => `请输入XXX`, `其它提示信息` => `其它提示信息`
 * @param {array} [data] - Ant Design AutoComplete 组件的 `dataSource` 属性
 * @param {object} [props] - 其它传给 Ant Design AutoComplete 组件的 props
 */
class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      data,
      msg,
      ...props
    } = this.props;
    return (
      <AntAutoComplete
        {...props}
        dataSource={data}
        placeholder={msg}
      />
    );
  }
}

AutoComplete.displayName = 'AntPlus.AutoComplete';

/**
 * Select - Enhanced Ant Design Select
 *
 * @param {string} [msg] - `placeholder` 属性 (若为 `short` 或 `full`，需与 AntPlus.Form 配合使用，以获取 label)
 * e.g. `short` => `请选择`, `full` => `请选择XXX`, `其它提示信息` => `其它提示信息`
 * @param {boolean} [search] - 是否可搜索
 * @param {array} data - 列表数据源
 * @param {array} [keys] - 当数据源条目中的 key 不是 `id` (值) 与 `value` (展示的汉字) 时传入
 * e.g. 如 [{ shop_id: 1, shop_name: ''}]，则传入 ['shop_id', 'shop_name']
 * @param {object} [props] - 其它传给 Ant Design Select 组件的 props
 */
class Select extends Component {
  constructor(props) {
    super(props);
    const { search } = props;
    this.searchProps = search ? {
      showSearch: true,
      filterOption: (input, option) => option.props.children.includes(input),
    } : undefined;
  }

  render() {
    const {
      msg,
      data,
      keys = ['id', 'value'],
      ...props
    } = this.props;
    return (
      <AntSelect {...props} {...this.searchProps} placeholder={msg}>
        {data.map(item => (
          <AntSelect.Option key={item[keys[0]]} value={item[keys[0]]}>
            {item[keys[1]]}
          </AntSelect.Option>
        ))}
      </AntSelect>
    );
  }
}

Select.displayName = 'AntPlus.Select';

/**
 * Transfer - Enhanced Ant Design Transfer
 *
 * @param {array} data - Ant Design Transfer 组件 `dataSource` 属性
 * @param {boolean} [search] - 是否可搜索
 * @param {string} [msg] - 搜索框 `placeholder` 属性
 * @param {string} [title] - 组件 `未选择XXX` `已选择XXX` 的 `XXX` 文案
 * @param {string} [render] - Ant Design Transfer 组件的 `render` 属性，默认渲染 `item.title`
 * @param {string} [empty] - Ant Design Transfer 组件得 `notFoundContent` 属性，默认为 `列表为空`
 * @param {object} [props] - 其它传给 Ant Design Transfer 组件的 props
 */
class Transfer extends Component {
  constructor(props) {
    super(props);
    const { search } = props;
    this.searchProps = search ? {
      showSearch: true,
      filterOption: (val, option) => `${option.title}${option.description || ''}`.includes(val),
    } : undefined;
  }
  render() {
    const {
      data,
      value,
      msg = '搜索',
      title = '',
      render = item => item.title,
      empty = '列表为空',
      ...props
    } = this.props;
    return (
      <AntTransfer
        {...props}
        {...this.searchProps}
        dataSource={data}
        targetKeys={value}
        searchPlaceholder={msg}
        titles={[`未选择${title}`, `已选择${title}`]}
        render={render}
        notFoundContent={empty}
      />
    );
  }
}

Transfer.displayName = 'AntPlus.Transfer';

/**
 * Exports
 */
export {
  Form,
  Input,
  AutoComplete,
  Select,
  Transfer,
};
