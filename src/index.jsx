import React from 'react';
import * as Ant from 'antd';
import './AntPlus.scss';

let formConfig = {
  // Placeholder
  inputPlaceholder: '请输入',
  selectPlaceholder: '请选择',
  // Rule messages
  requiredMessage: '{label}不得为空',
  typeMessage: '{label}格式有误',
  maxMessage: '不得超过 {num} 个字',
  minMessage: '不得少于 {num} 个字',
};
const fieldRules = (rule, label) => {
  const [requiredBefore, requiredAfter] = formConfig.requiredMessage.split('{label}');
  const [typeBefore, typeAfter] = formConfig.typeMessage.split('{label}');
  const [maxBefore, maxAfter] = formConfig.maxMessage.split('{num}');
  const [minBefore, minAfter] = formConfig.minMessage.split('{num}');
  const rules = {
    required: {
      required: true,
      message: `${requiredBefore}${label}${requiredAfter}`,
    },
    string: {
      type: 'string',
      whitespace: true,
      message: `${typeBefore}${label}${typeAfter}`,
    },
    number: {
      pattern: /^\d+$/,
      whitespace: true,
      message: `${typeBefore}${label}${typeAfter}`,
    },
    numAll: {
      pattern: /^-?\d+$/,
      whitespace: true,
      message: `${typeBefore}${label}${typeAfter}`,
    },
    array: {
      type: 'array',
      message: `${typeBefore}${label}${typeAfter}`,
    },
    email: {
      type: 'email',
      whitespace: true,
      message: `${typeBefore}${label}${typeAfter}`,
    },
    max: {
      max: label,
      message: `${maxBefore}${label}${maxAfter}`,
    },
    min: {
      min: label,
      message: `${minBefore}${label}${minAfter}`,
    },
    phone: {
      pattern: /^1[3456789]\d{9}$/,
      whitespace: true,
      message: `${typeBefore}${label}${typeAfter}`,
    },
    id: {
      pattern: /^\d+x?$/i,
      whitespace: true,
      message: `${typeBefore}${label}${typeAfter}`,
    },
  };
  return rules[rule];
};

/**
 * createRules - 根据表单域简写 `rules` 属性生成完整验证规则 (配合 AntPlus.Form 组件使用)
 */
const createRules = (label, rules) =>
  rules.map((rule) => {
    if (typeof rule !== 'string') return rule;
    // e.g. "required"
    if (!rule.includes('=')) return fieldRules(rule, label || '');
    // e.g. "max=5"
    const [numRule, num] = rule.split('=');
    return fieldRules(numRule, Number(num));
  });

const selectList = ['Select', 'Cascader', 'TreeSelect'];

/**
 * createField - 格式化 AntPlus.Form 下的表单域
 */
const createField = (field, label, disabledFields, id) => {
  if (!field.props.msg && !disabledFields) return field;
  let fieldProps = field.props;
  // 若 msg (placeholder) 值为 `full`，进行转义
  if (fieldProps.msg !== undefined && (fieldProps.msg === 'short' || fieldProps.msg === 'full')) {
    if (field.type.displayName === undefined) {
      throw new Error('`msg` prop is not allowed for a non `AntPlus` component');
    }
    const { displayName } = field.type;
    const isSelect =
      typeof displayName === 'string' && selectList.includes(displayName.split('.')[1]);
    const shortMsg = isSelect ? formConfig.selectPlaceholder : formConfig.inputPlaceholder;
    const msg = fieldProps.msg === 'short' ? shortMsg : `${shortMsg}${label || ''}`;
    fieldProps = { ...fieldProps, msg };
  }
  // 若 disabledFields 值为 `all`、或为数组且包含当前表单域 `id`，添加 `disabled`
  if (
    disabledFields &&
    id !== undefined &&
    (disabledFields === 'all' || (Array.isArray(disabledFields) && disabledFields.includes(id)))
  ) {
    fieldProps = { ...fieldProps, disabled: true };
  }
  // 返回格式化后的 field
  return { ...field, props: fieldProps };
};

/**
 * Form - Ant Design Form 组件增强版本
 * @link https://ant.design/components/form-cn/
 *
 * @param {Object} api - 经 Form.create 包装后注入的 `form` 属性（为规避 Ant Design 提示信息，改为 `api`）
 * @param {Object} [data] - 与表单域的 `id` 属性对应的一组数据
 * @param {string|array} [disabledFields] - 禁用的表单域，全部禁用传 "all"，部分禁用传 id 组成的数组
 * @param {boolean} [colon] - 是否显示 label 后的冒号
 * @param {Function} [onSubmit] - 提交表单的回调事件
 * @param {node} [fields] - 表单域集合，e.g. <Input label="账号" id="id" rules=['number'] />
 * @param {node} [children] - Form 子节点（表单域集合）
 * @param {...any} [props] - 其它传给 Ant.Form 组件的 props
 */
class Form extends Ant.Form {
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  };

  render() {
    const {
      api: form,
      data = {},
      disabledFields,
      colon: formColon = false,
      onSubmit,
      fields,
      children,
      ...props
    } = this.props;

    Form.createItems = Form.renderNodes(form, data, disabledFields, formColon);

    return (
      <Ant.Form onSubmit={this.onSubmit} {...props}>
        {Form.createItems(fields || children)}
      </Ant.Form>
    );
  }
}

Form.displayName = 'AntPlus.Form';
Form.defaultProps = undefined;
Form.createItems = (nodes) => nodes;
// 设置信息
Form.setConfig = (config) => {
  formConfig = { ...formConfig, ...config };
};
// 渲染节点
Form.renderNodes = (form, data, disabledFields, formColon) => (nodes) => {
  if (
    typeof nodes === 'undefined' ||
    typeof nodes === 'string' ||
    typeof nodes === 'boolean' ||
    typeof nodes === 'function'
  ) {
    return nodes;
  }

  // 遍历节点
  return React.Children.map(nodes, (node) => {
    if (!node || !node.props) return node;

    // 根据 `id` 属性，判断子节点是否为表单域，`id` 为表单域唯一标识，请勿被占用
    const {
      className,
      label,
      id,
      colon,
      required = false,
      before,
      after,
      ...nodeProps
    } = node.props;

    if (id === undefined && label === undefined) {
      // 若子节点即不存在 `id` 也不存在 `label`，递归查找并包装其 `children` 内表单域
      const children = Form.createItems(nodeProps.children);
      return createField({ ...node, props: { ...nodeProps, className, children } });
    }
    if (id === undefined && label !== undefined) {
      // 若子节点不存在 `id`，但存在 `label`，使用 `Form.Item` 包装
      return (
        <Ant.Form.Item
          className={className}
          label={label}
          colon={colon || formColon}
          required={required}
        >
          {Form.createItems(before)}
          {createField({ ...node, props: nodeProps }, label)}
          {Form.createItems(after)}
        </Ant.Form.Item>
      );
    }

    // 是否为嵌套的表单域（`a` and `a.b`）
    const isNestedField = nodeProps.form !== undefined;

    // 若子节点存在 `id` 且存在 `label`，则为表单域
    const {
      hide,
      // Official `options` to `getFieldDecorator(id, options)`
      getValueFromEvent,
      initialValue,
      normalize,
      rules = [],
      trigger,
      validateFirst,
      validateTrigger,
      valuePropName,
      hidden,
      // getValueProps,
      // validate,
      // preserve,
      ...fieldProps
    } = nodeProps;
    // options
    const options = {
      getValueFromEvent,
      normalize,
      trigger,
      validateFirst,
      valuePropName,
      hidden: isNestedField || hidden, // Ignore current field while validating or getting fields
      // getValueProps,
      // validate,
      // preserve,
    };
    Object.keys(options).forEach((key) => {
      if (options[key] === undefined) delete options[key];
    });

    return (
      <Ant.Form.Item
        className={[className, id].join(' ')}
        label={label}
        colon={colon || formColon}
        style={hide === true ? { display: 'none' } : undefined}
      >
        {Form.createItems(before)}
        {form.getFieldDecorator(isNestedField ? `${id}.nested` : id, {
          rules: createRules(label, rules),
          validateTrigger: validateTrigger || rules.includes('phone') ? 'onBlur' : 'onChange',
          initialValue: initialValue !== undefined ? initialValue : data[id],
          ...options,
        })(createField({ ...node, props: fieldProps }, label, disabledFields, id))}
        {Form.createItems(after)}
      </Ant.Form.Item>
    );
  });
};

/**
 * Input - Ant Design Input (TextArea) 组件增强版本
 * @link https://ant.design/components/input-cn/
 *
 * @param {string} [msg] - `placeholder` 属性 (若为 `short` 或 `full`，需与 AntPlus.Form 配合使用)
 * e.g. `short` => `请输入`, `full` => `请输入XXX`, `其它提示信息` => `其它提示信息`
 * @param {string} [auto] - `autoComplete` 属性
 * @param {number} [max] - 最大可输入字符数 (传入则显示字符计算)
 * @param {boolean} [textarea] - 默认为 Input 组件，若传入 textarea， 则为 TextArea 组件
 * @param {number} [rows=2] - 若为 TextArea 时的输入框行高，默认为 2
 * @param {...any} [props] - 其它传给 Ant.Input (TextArea) 组件的 props
 */
class Input extends Ant.Input {
  constructor(props) {
    super(props);
    const { max } = props;
    const initState = {};
    if (typeof max === 'number') {
      this.countClass = 'ant-plus-input-with-count';
      this.onChange = this.onChangeWithCount;
      const { value } = props;
      initState.count = value ? value.length : 0;
    } else {
      const { onChange } = props;
      this.onChange = onChange;
    }
    this.state = initState;
  }
  onChangeWithCount = (event) => {
    const { value } = event.target;
    this.setState({ count: value.length });
    const { onChange } = this.props;
    onChange(value);
  };
  renderCount = (max, count) => (
    <span className={['count', count > max ? ' red' : ''].join('')}>
      {count} | {max}
    </span>
  );

  render() {
    const { onChange, msg, auto, max, textarea, rows, ...props } = this.props;
    const { count } = this.state;

    return (
      <span className={['ant-plus-input', this.countClass].join(' ')}>
        {textarea === true ? (
          <>
            <Ant.Input.TextArea
              placeholder={msg}
              onChange={this.onChange}
              autosize={{ minRows: rows || 5 }}
              {...props}
            />
            {typeof max === 'number' && this.renderCount(max, count)}
          </>
        ) : (
          <Ant.Input
            placeholder={msg}
            autoComplete={auto}
            onChange={this.onChange}
            suffix={typeof max === 'number' && this.renderCount(max, count)}
            {...props}
          />
        )}
      </span>
    );
  }
}

Input.displayName = 'AntPlus.Input';
Input.defaultProps = undefined;

/**
 * AutoComplete - Ant Design AutoComplete 组件增强版本
 * @link https://ant.design/components/auto-complete-cn/
 *
 * @param {string} [msg] - `placeholder` 属性 (若为 `short` 或 `full`，需与 AntPlus.Form 配合使用)
 * e.g. `short` => `请输入`, `full` => `请输入XXX`, `其它提示信息` => `其它提示信息`
 *
 * @param {Array} [data] - `dataSource` 属性
 * @param {boolean} [search] - 是否可搜索
 * @param {...any} [props] - 其它传给 Ant.AutoComplete 组件的 props
 */
class AutoComplete extends Ant.AutoComplete {
  constructor(props) {
    super(props);
    const { search } = props;
    if (search === true) {
      this.searchProps = {
        showSearch: true,
        filterOption: (val, option) => option.props.children.includes(val),
      };
    }
  }

  render() {
    const { data = [], msg, search, ...props } = this.props;

    return (
      <Ant.AutoComplete {...this.searchProps} dataSource={data} placeholder={msg} {...props} />
    );
  }
}

AutoComplete.displayName = 'AntPlus.AutoComplete';
AutoComplete.defaultProps = undefined;

/**
 * Select - Ant Design Select 组件增强版本
 * @link https://ant.design/components/select-cn/
 *
 * @param {Array} data - 列表数据源
 * @param {Array} [keys] - 当数据源条目中的 key 不是 `value` (值) 与 `label` (展示的汉字) 时传入
 * e.g. 如 [{ shop_id: 1, shop_name: ''}, ...]，则传入 ['shop_id', 'shop_name']
 *
 * @param {string} [msg] - `placeholder` 属性 (若为 `short` 或 `full`，需与 AntPlus.Form 配合使用)
 * e.g. `short` => `请选择`, `full` => `请选择XXX`, `其它提示信息` => `其它提示信息`
 *
 * @param {boolean} [search] - 是否可搜索
 * @param {boolean} [clear] - 是否支持清除
 * @param {string} [empty] - `notFoundContent` 属性，默认为 `列表为空`
 * @param {...any} [props] - 其它传给 Ant.Select 组件的 props
 */
class Select extends Ant.Select {
  constructor(props) {
    super(props);
    const { search, mode } = props;
    if (search === true || mode === 'multiple' || mode === 'tags') {
      this.searchProps = {
        showSearch: true,
        filterOption: (val, option) => option.props.children.includes(val),
      };
    }
  }

  render() {
    const { data = [], keys = [], msg, search, clear, empty = '列表为空', ...props } = this.props;
    const [value = 'value', label = 'label'] = keys;

    return (
      <Ant.Select
        {...this.searchProps}
        placeholder={msg}
        allowClear={clear}
        notFoundContent={empty}
        {...props}
      >
        {data.map((item) => (
          <Ant.Select.Option key={item[label]} value={item[value]} disabled={item.disabled}>
            {item[label]}
          </Ant.Select.Option>
        ))}
      </Ant.Select>
    );
  }
}

Select.displayName = 'AntPlus.Select';
Select.defaultProps = undefined;

/**
 * Transfer - Ant Design Transfer 组件增强版本
 * @link https://ant.design/components/transfer-cn/
 *
 * @param {Array} data - `dataSource` 属性
 * @param {string} [msg] - 搜索框 `placeholder` 属性
 * @param {boolean} [search] - 是否可搜索
 * @param {string} [title] - 组件 `未选择XXX` `已选择XXX` 的 `XXX` 文案
 * @param {string} [empty] - `notFoundContent` 属性，默认为 `列表为空`
 * @param {...any} [props] - 其它传给 Ant.Transfer 组件的 props
 */
class Transfer extends Ant.Transfer {
  constructor(props) {
    super(props);
    const { search } = props;
    if (search === true) {
      this.searchProps = {
        showSearch: true,
        filterOption: (val, option) => `${option.title}${option.description || ''}`.includes(val),
      };
    }
  }

  render() {
    const {
      data = [],
      targetKeys,
      value,
      msg = '搜索',
      search,
      title = '',
      empty = '列表为空',
      ...props
    } = this.props;

    return (
      <Ant.Transfer
        {...this.searchProps}
        dataSource={data}
        targetKeys={targetKeys || value}
        searchPlaceholder={msg}
        titles={[`未选择${title}`, `已选择${title}`]}
        notFoundContent={empty}
        {...props}
      />
    );
  }
}

Transfer.displayName = 'AntPlus.Transfer';
Transfer.defaultProps = { render: (item) => item.title };

/**
 * Cascader - Ant Design Cascader 组件增强版本
 * @link https://ant.design/components/cascader-cn/
 *
 * @param {Array} data - `options` 属性
 * @param {Array} [keys] - 当数据源条目中的 key 不是 `value` `label` `children` 时传入
 * @param {string} [msg] - `placeholder` 属性，默认为 `请选择`
 * @param {boolean} [search] - 是否可搜索
 * @param {string} [empty] - `notFoundContent` 属性，默认为 `未找到`
 * @param {boolean} [clear] - 是否支持清除
 * @param {boolean} [last] - `value` 是否只传出数组的最后一个 id
 * @param {...any} [props] - 其它传给 Ant.Cascader 组件的 props
 */
class Cascader extends Ant.Cascader {
  constructor(props) {
    super(props);
    const {
      keys: [value = 'value', label = 'label', children = 'children'] = [],
      search,
      last,
    } = props;
    // 初始化 fieldNames
    this.fieldNames = { value, label, children };
    // 是否可搜索
    if (search === true) {
      this.searchProps = {
        showSearch: { filter: (val, path) => path.some((option) => option[label].includes(val)) },
      };
    }
    // 是否只传出数组的最后一个 value
    if (last === true) {
      this.valueMap = {};
    }
  }
  onChange = (value) => {
    const { last, onChange } = this.props;
    onChange(last === true ? value[value.length - 1] : value);
  };
  travelOptions = (valueMap, arr, breadValues) => {
    if (arr.length === 0) return;
    const { value, children } = this.fieldNames;
    arr.forEach((item) => {
      const curBreadValues = breadValues.concat(item[value]);
      if (item[children]) {
        this.travelOptions(valueMap, item[children], curBreadValues);
      } else {
        valueMap[item[value]] = curBreadValues;
      }
    });
  };

  render() {
    const {
      data = [],
      keys,
      msg = '请选择',
      search,
      empty = '未找到',
      clear = true,
      last,
      value,
      ...props
    } = this.props;

    if (last === true && Object.keys(this.valueMap).length === 0 && data.length > 0) {
      this.travelOptions(this.valueMap, data, []);
    }

    return (
      <Ant.Cascader
        {...this.searchProps}
        options={data}
        fieldNames={this.fieldNames}
        value={last === true ? this.valueMap[value] : value}
        onChange={this.onChange}
        placeholder={msg}
        notFoundContent={empty}
        allowClear={clear}
        {...props}
      />
    );
  }
}

Cascader.displayName = 'AntPlus.Cascader';
Cascader.defaultProps = undefined;

/**
 * TreeSelect - Ant Design TreeSelect 组件增强版本
 * @link https://ant.design/components/tree-select-cn/
 *
 * @param {Array} data - `treeData` 属性
 * @param {Array} [keys] - 当数据源条目中的 key 不是 `value` `title` `children` 时传入
 * @param {boolean} [useString] - 当数据源条目中的 `value` 为 number 类型时传入
 * @param {string} [msg] - `placeholder` 属性，默认为 `请选择`
 * @param {boolean} [search] - 是否可搜索
 * @param {boolean} [check] - `treeCheckable` 属性
 * @param {boolean} [expandAll] - `treeDefaultExpandAll` 属性
 * @param {Array} [expandKeys] - `treeDefaultExpandedKeys` 属性
 * @param {boolean} [clear] - 是否支持清除
 * @param {...any} [props] - 其它传给 Ant.TreeSelect 组件的 props
 */
class TreeSelect extends Ant.TreeSelect {
  constructor(props) {
    super(props);
    const { search, keys, useString } = props;
    if (search === true) {
      this.searchProps = {
        showSearch: true,
        filterTreeNode: (val, node) => new RegExp(val, 'i').test(`${node.value}${node.title}`),
      };
    }
    this.useKeys = keys !== undefined || useString !== undefined;
  }
  getTreeData = (data) => {
    if (this.formatted) return this.treeData;
    if (this.useKeys && data.length > 0) {
      const { useString, keys } = this.props;
      const [value = 'value', title = 'title', children = 'children'] = keys || [];
      this.treeData = this.travelTreeData(data, useString, value, title, children);
      this.formatted = true;
    } else {
      this.treeData = data;
    }
    return this.treeData;
  };
  travelTreeData = (data, useString, value, title, children) =>
    data.map((item) => {
      const newItem = {
        value: useString !== true ? item[value] : item[value].toString(),
        title: item[title],
      };
      if (item[children]) {
        newItem.children = this.travelTreeData(item[children], useString, value, title, children);
      }
      return newItem;
    });

  render() {
    const {
      data = [],
      value,
      keys,
      useString,
      msg = '请选择',
      search,
      check,
      expandAll = false,
      expandKeys,
      clear,
      ...props
    } = this.props;

    return (
      <Ant.TreeSelect
        {...this.searchProps}
        treeData={this.getTreeData(data)}
        value={this.treeData.length > 0 ? value : undefined}
        placeholder={msg}
        treeCheckable={check}
        treeDefaultExpandAll={expandAll}
        treeDefaultExpandedKeys={expandKeys}
        allowClear={clear}
        {...props}
      />
    );
  }
}

TreeSelect.displayName = 'AntPlus.TreeSelect';
TreeSelect.defaultProps = { dropdownStyle: { maxHeight: 400, overflow: 'auto' } };

/**
 * Checkbox - Ant Design Checkbox 组件增强版本
 * @link https://ant.design/components/checkbox-cn/
 *
 * @param {Array} [keys] - 当数据源条目中的 key 不是 `value` `label` 时传入
 * @param {...any} [props] - 其它传给 Ant.Checkbox 组件的 props
 */
class Checkbox extends Ant.Checkbox {
  render() {
    return <Ant.Checkbox {...this.props} />;
  }
}
Checkbox.Group = class CheckboxGroup extends Ant.Checkbox.Group {
  constructor(props) {
    super(props);
    const { keys } = props;
    this.useKeys = Array.isArray(keys) && keys.length === 2;
    if (this.useKeys) {
      this.state = {
        newOptions: [],
      };
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { newOptions } = prevState;
    if (!newOptions) return null;

    // useKeys
    const { options } = nextProps;
    if (options.length === 0 || newOptions.length > 0) return null;

    const { keys } = nextProps;
    const [value, label] = keys;
    const throwError = (key) => {
      throw new Error(`\`option.${key}\` is undefined`);
    };
    return {
      newOptions: options.map((option) => {
        if (option[value] === undefined) throwError(value);
        if (option[label] === undefined) throwError(label);
        return {
          value: option[value],
          label: option[label],
        };
      }),
    };
  }

  render() {
    if (!this.useKeys) return <Ant.Checkbox.Group {...this.props} />;
    const { options, keys, ...props } = this.props;
    // useKeys
    const { newOptions } = this.state;
    return <Ant.Checkbox.Group options={newOptions} {...props} />;
  }
};

Checkbox.Group.defaultProps = undefined;

/**
 * exports
 */
export {
  // Form
  Form,
  Input,
  AutoComplete,
  Select,
  Transfer,
  Cascader,
  TreeSelect,
  Checkbox,
};
