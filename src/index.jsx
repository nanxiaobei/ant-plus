import React from 'react';
import PropTypes from 'prop-types';
import * as Ant from 'antd';
import './index.scss';

let config = {
  // `placeholder`
  input: '请输入',
  select: '请选择',
  // Rule messages
  required: '{label}不得为空',
  type: '{label}格式有误',
  max: '不得超过 {max} 个字',
  min: '不得少于 {min} 个字',
};

const ruleCreator = {
  required: (label) => ({
    required: true,
    message: config.required.replace('{label}', label),
  }),
  string: (label) => ({
    type: 'string',
    whitespace: true,
    message: config.type.replace('{label}', label),
  }),
  number: (label) => ({
    pattern: /^\d+$/,
    whitespace: true,
    message: config.type.replace('{label}', label),
  }),
  array: (label) => ({
    type: 'array',
    message: config.type.replace('{label}', label),
  }),
  email: (label) => ({
    type: 'email',
    whitespace: true,
    message: config.type.replace('{label}', label),
  }),
  max: (max) => ({
    max,
    message: config.max.replace('{max}', max),
  }),
  min: (min) => ({
    min,
    message: config.min.replace('{min}', min),
  }),
  phone: (label) => ({
    pattern: /^1[3456789]\d{9}$/,
    whitespace: true,
    message: config.type.replace('{label}', label),
  }),
  id: (label) => ({
    pattern: /^\d+x?$/i,
    whitespace: true,
    message: config.type.replace('{label}', label),
  }),
};

const ruleList = Object.keys(ruleCreator);

/**
 * 根据 `rules` 「短语」生成完整验证规则 (配合 Ant Plus Form 组件使用）
 */
const createRules = (label = '', id, rules) =>
  rules.map((rule) => {
    if (typeof rule !== 'string' || !ruleList.includes(rule)) return rule;
    const ruleKey = `${id}.${rule}`;
    // e.g. "required"
    if (!rule.includes('=')) {
      if (!createRules[ruleKey]) createRules[ruleKey] = ruleCreator[rule](label);
      return createRules[ruleKey];
    }
    // e.g. "max=5"
    const [key, val] = rule.split('=');
    if (!createRules[ruleKey]) createRules[ruleKey] = ruleCreator[key](Number(val));
    return createRules[ruleKey];
  });

/**
 * 获取 `placeholder` 与 `disabled` 属性
 */
const phraseList = ['short', 'full'];
const selectList = ['Select', 'Cascader', 'TreeSelect'];

const propsCreator = (node, label = '', id, disabledFields) => {
  let nodeProps = node.props;

  if (typeof nodeProps.msg === 'string' && phraseList.includes(nodeProps.msg)) {
    // 若 msg (placeholder) 值为 `short` 或 `full`，进行转义
    const { displayName } = node.type;
    if (typeof displayName !== 'string') {
      throw new Error('`msg` prop is not valid for a non Ant Plus component');
    }
    const isSelect = selectList.includes(displayName.split('.')[1]);
    const shortMsg = isSelect ? config.select : config.input;

    const msg = nodeProps.msg === 'short' ? shortMsg : `${shortMsg}${label}`;
    nodeProps = { ...nodeProps, msg };
  }

  // 若 disabledFields 值为 `all`、或为数组且包含当前表单域 `id`，添加 `disabled`
  if (
    typeof disabledFields !== 'undefined' &&
    typeof id === 'string' &&
    (disabledFields === 'all' || (Array.isArray(disabledFields) && disabledFields.includes(id)))
  ) {
    nodeProps = { ...nodeProps, disabled: true };
  }

  // 返回格式化后的 node
  return { ...node, props: nodeProps };
};

/**
 * Form - Ant Design Form 组件增强版本
 * @link https://ant.design/components/form-cn/
 */
class Form extends Ant.Form {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit();
  }

  render() {
    const {
      className = '',
      api: form,
      data,
      disabledFields,
      colon: formColon,
      onSubmit,
      children,
      ...props
    } = this.props;

    Form.createRender(form, data, disabledFields, formColon);

    return (
      <Ant.Form className={`ant-plus-form ${className}`} onSubmit={this.onSubmit} {...props}>
        {Form.render && Form.render(children)}
      </Ant.Form>
    );
  }
}

Form.displayName = 'AntPlus.Form';

Form.propTypes = {
  /** 必选。经 Form.create 包装后注入的 `form` 属性（为规避 Ant Design 提示信息，改为 `api`）*/
  api: PropTypes.object.isRequired,
  /** 与各表单域 `id` 对应的一组键值对，用于设置各表单域初始值 e.g. { [id]: value, ... } */
  data: PropTypes.object,
  /** 禁用的表单域，全部禁用传 "all"，部分禁用传 id 组成的数组 */
  disabledFields: PropTypes.array,
  /** 是否整体显示 label 后的冒号 */
  colon: PropTypes.bool,
  /** 提交表单的回调事件，已做了 `event.preventDefault()` 处理 */
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  data: {},
  colon: false,
};

// 设置校验提示
Form.setConfig = (newConfig) => {
  config = { ...config, ...newConfig };
};

const removeUndefined = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};

// 生成 `Form.render` 方法
Form.createRender = (form, data, disabledFields, formColon) => {
  // 核心渲染方法
  Form.render = (nodes) => {
    if (nodes === null || typeof nodes !== 'object') return nodes;

    // 遍历节点
    return React.Children.map(nodes, (node) => {
      if (node === null || typeof node !== 'object' || !node.props) return node;

      // 判断子节点是否为表单域，`id` 为表单域唯一标识，请勿被占用
      const { label, id, ...nodeProps } = node.props;

      if (id === undefined) {
        /**
         * ``
         */
        if (label === undefined) {
          // 递归查找，渲染 `children` 内表单域
          const newChildren = Form.render(nodeProps.children);
          return propsCreator({ ...node, props: { ...nodeProps, children: newChildren } });
        }
        /**
         * `label`
         */
        const {
          // UI props
          className = '',
          style,

          // Item props
          colon: uniqueColon,
          extra,
          hasFeedback,
          help,
          // label,
          labelCol,
          required,
          validateStatus,
          wrapperCol,

          // Two sides
          before,
          after,

          // Other props
          ...otherProps
        } = nodeProps;

        const itemProps = removeUndefined({
          // colon,
          extra,
          hasFeedback,
          help,
          // label,
          labelCol,
          required,
          validateStatus,
          wrapperCol,
        });

        const itemColon = uniqueColon !== undefined ? uniqueColon : formColon;

        return (
          <Ant.Form.Item
            className={className}
            style={style}
            colon={itemColon}
            label={label}
            {...itemProps}
          >
            {before && Form.render(before)}
            {propsCreator({ ...node, props: otherProps }, label)}
            {after && Form.render(after)}
          </Ant.Form.Item>
        );
      }

      /**
       * `id` | `label` `id`
       */
      const {
        // UI props
        className = '',
        style,

        // Extra options
        hide,

        // Item props
        colon: uniqueColon,
        extra,
        hasFeedback,
        help,
        // label,
        labelCol,
        required,
        validateStatus,
        wrapperCol,

        // Two sides
        before,
        after,

        // Other props
        ...otherProps
      } = nodeProps;

      const itemProps = removeUndefined({
        // colon,
        extra,
        hasFeedback,
        help,
        // label,
        labelCol,
        required,
        validateStatus,
        wrapperCol,
      });

      const itemStyle = hide === true ? { display: 'none' } : style;
      const itemColon = uniqueColon !== undefined ? uniqueColon : formColon;

      const {
        // Form options
        getValueFromEvent,
        initialValue,
        normalize,
        preserve,
        rules,
        trigger,
        validateFirst,
        validateTrigger,
        valuePropName,
        // rc-form options
        hidden,
        getValueProps,
        validate,

        ...fieldProps
      } = otherProps;

      const options = removeUndefined({
        getValueFromEvent,
        // initialValue,
        normalize,
        preserve,
        // rules,
        trigger,
        validateFirst,
        // validateTrigger,
        valuePropName,

        // hidden,
        getValueProps,
        validate,
      });

      const isNestedField = fieldProps.form !== undefined; // 是否嵌套表单域（`a` & `a.b`）
      const isValidRules = Array.isArray(rules);

      return (
        <Ant.Form.Item
          className={`${className} ${id}`}
          style={itemStyle}
          colon={itemColon}
          label={label}
          {...itemProps}
        >
          {before && Form.render(before)}
          {form.getFieldDecorator(isNestedField ? `${id}.nested` : id, {
            initialValue: initialValue !== undefined ? initialValue : data[id],
            rules: isValidRules && createRules(label, id, rules),
            validateTrigger:
              validateTrigger || (isValidRules && rules.includes('phone')) ? 'onBlur' : 'onChange',
            hidden: hidden || isNestedField,
            ...options,
          })(propsCreator({ ...node, props: fieldProps }, label, id, disabledFields))}
          {after && Form.render(after)}
        </Ant.Form.Item>
      );
    });
  };
};

/**
 * Input - Ant Design Input (TextArea) 组件增强版本
 * @link https://ant.design/components/input-cn/
 */
class Input extends Ant.Input {
  constructor(props) {
    super(props);

    let showCount = false;
    const { max } = props;
    if (typeof max === 'number') {
      showCount = true;
      const { onChange } = props;
      this.onChange = typeof onChange === 'function' ? onChange : this.defaultOnChange.bind(this);
    }
    this.state = {
      showCount,
      count: 0,
    };
  }
  static getDerivedStateFromProps({ value }, { showCount }) {
    if (showCount && typeof value === 'string') {
      return { count: value.length };
    }
    return null;
  }
  defaultOnChange(event) {
    const { value } = event.target;
    if (typeof value === 'string') {
      this.setState({ count: value.length });
    }
  }
  renderCount(max) {
    const { count } = this.state;
    return (
      <span className={`count ${count < max ? '' : 'red'}`}>
        {count} | {max}
      </span>
    );
  }

  render() {
    const { max, auto, msg, textarea, rows, ...props } = this.props;
    const { showCount } = this.state;

    return (
      <span className={`ant-plus-input ${showCount ? 'ant-plus-input-with-count' : ''}`}>
        {textarea === true ? (
          <>
            <Ant.Input.TextArea
              onChange={this.onChange}
              autosize={{ minRows: rows || 5 }}
              placeholder={msg}
              {...props}
            />
            {showCount && this.renderCount(max)}
          </>
        ) : (
          <Ant.Input
            onChange={this.onChange}
            autoComplete={auto}
            placeholder={msg}
            suffix={showCount && this.renderCount(max)}
            {...props}
          />
        )}
      </span>
    );
  }
}

Input.displayName = 'AntPlus.Input';

Input.propTypes = {
  /** 最大可输入字符数（传入则显示字符计数器）*/
  max: PropTypes.number,
  /** `autoComplete` 属性（关闭需传入 "off"）*/
  auto: PropTypes.string,
  /** `placeholder` 属性（可传入 `short` 或 `full`，在 Ant Plus Form 中时有效）。
   e.g. `short` => `请输入`, `full` => `请输入XXX`, `其它提示信息` => `其它提示信息`*/
  msg: PropTypes.string,
  /** 默认为 Input 组件，若传入 textarea，则为 TextArea 组件 */
  textarea: PropTypes.bool,
  /** 若为 TextArea 时的输入框行高 */
  rows: PropTypes.number,
};

Input.defaultProps = {
  textarea: false,
  rows: 2,
};

/**
 * AutoComplete - Ant Design AutoComplete 组件增强版本
 * @link https://ant.design/components/auto-complete-cn/
 */
const autoCompleteSearchProps = {
  filterOption: (val, option) => {
    return option.props.children.includes(val);
  },
};
class AutoComplete extends Ant.AutoComplete {
  render() {
    const { data, search, clear, msg, ...props } = this.props;

    return (
      <Ant.AutoComplete
        dataSource={data}
        {...search === true && autoCompleteSearchProps}
        allowClear={clear}
        placeholder={msg}
        {...props}
      />
    );
  }
}

AutoComplete.displayName = 'AntPlus.AutoComplete';

AutoComplete.propTypes = {
  /** `dataSource` 属性 */
  data: PropTypes.array,
  /** 是否可搜索 */
  search: PropTypes.bool,
  /** `allowClear` 属性 */
  clear: PropTypes.bool,
  /** `placeholder` 属性（可传入 `short` 或 `full`，在 Ant Plus Form 中时有效）*/
  msg: PropTypes.string,
};

AutoComplete.defaultProps = {
  data: [],
  search: true,
  clear: false,
};

/**
 * Select - Ant Design Select 组件增强版本
 * @link https://ant.design/components/select-cn/
 */
const selectModeList = ['multiple', 'tags'];
const selectSearchProps = {
  showSearch: true,
  filterOption: (val, option) => option.props.children.includes(val),
};
class Select extends Ant.Select {
  constructor(props) {
    super(props);
    const { keys } = props;
    const [value = 'value', label = 'label'] = keys;
    this.value = value;
    this.label = label;
  }

  render() {
    const { data, keys, search, clear, empty, msg, ...props } = this.props;

    return (
      <Ant.Select
        className="ant-plus-select"
        {...(search === true || selectModeList.includes(props.mode)) && selectSearchProps}
        allowClear={clear}
        notFoundContent={empty}
        placeholder={msg}
        {...props}
      >
        {data.map((item) => (
          <Ant.Select.Option
            key={item[this.label]}
            value={item[this.value]}
            disabled={item.disabled}
          >
            {item[this.label]}
          </Ant.Select.Option>
        ))}
      </Ant.Select>
    );
  }
}

Select.displayName = 'AntPlus.Select';

Select.propTypes = {
  /** 列表数据源 */
  data: PropTypes.array,
  /** 当数据源条目中的 key 不是 `value` (值) 与 `label` (展示的名称) 时传入，e.g. 如 [{ id: 1, name: ''}, ...]，则传入 ['id', 'name'] */
  keys: PropTypes.array,
  /** 是否可搜索 */
  search: PropTypes.bool,
  /** `allowClear` 属性 */
  clear: PropTypes.bool,
  /** `notFoundContent` 属性 */
  empty: PropTypes.string,
  /** `placeholder` 属性（可传入 `short` 或 `full`，在 Ant Plus Form 中时有效）。
   e.g. `short` => `请选择`, `full` => `请选择XXX`, `其它提示信息` => `其它提示信息`*/
  msg: PropTypes.string,
};

Select.defaultProps = {
  data: [],
  keys: ['value', 'label'],
  search: false,
  clear: false,
  empty: '列表为空',
};

/**
 * Transfer - Ant Design Transfer 组件增强版本
 * @link https://ant.design/components/transfer-cn/
 */
const transferSearchProps = {
  showSearch: true,
  filterOption: (val, option) => `${option.title}${option.description || ''}`.includes(val),
};
class Transfer extends Ant.Transfer {
  render() {
    const { data, targetKeys, value, search, title, unit, empty, searchMsg, ...props } = this.props;

    return (
      <Ant.Transfer
        dataSource={data}
        targetKeys={targetKeys || value}
        {...search === true && transferSearchProps}
        titles={[`未选择${title}`, `已选择${title}`]}
        locale={{
          itemsUnit: unit,
          itemUnit: unit,
          notFoundContent: empty,
          searchPlaceholder: searchMsg,
        }}
        {...props}
      />
    );
  }
}

Transfer.displayName = 'AntPlus.Transfer';

Transfer.propTypes = {
  /** `dataSource` 属性 */
  data: PropTypes.array,
  /** 是否可搜索 */
  search: PropTypes.bool,
  /** 组件 `未选择XXX` `已选择XXX` 的 `XXX` 文案 */
  title: PropTypes.string,
  /** 数字后面的单位 */
  unit: PropTypes.string,
  /** `notFoundContent` 属性 */
  empty: PropTypes.string,
  /** 搜索框 `placeholder` 属性 */
  searchMsg: PropTypes.string,
};

Transfer.defaultProps = {
  data: [],
  search: false,
  title: '',
  unit: '项',
  empty: '列表为空',
  searchMsg: '搜索',
  render: (item) => item.title,
};

/**
 * Cascader - Ant Design Cascader 组件增强版本
 * @link https://ant.design/components/cascader-cn/
 */
let cascaderIdMap = {};
const cascaderTravelOptions = (data, valueKey, childrenKey, idList) => {
  data.forEach((item) => {
    const { [valueKey]: id, [childrenKey]: children } = item;

    const itemIdList = idList.concat(id);
    if (Array.isArray(children) && children.length > 0) {
      cascaderTravelOptions(children, valueKey, childrenKey, itemIdList);
    } else {
      cascaderIdMap[id] = itemIdList;
    }
  });
};
const getCascaderSearchProps = (label) => ({
  showSearch: {
    filter: (val, path) => path.some((option) => option[label].includes(val)),
  },
});
class Cascader extends Ant.Cascader {
  constructor(props) {
    super(props);
    const { keys: [value = 'value', label = 'label', children = 'children'] = [], last } = props;
    this.fieldNames = { value, label, children };
    if (last === true) this.useLast = true;
  }
  componentDidUpdate({ data: prevData }) {
    const { data } = this.props;
    if (this.useLast && data.length !== prevData.length) {
      cascaderIdMap = {};
      const { value: valueKey, children: childrenKey } = this.fieldNames;
      cascaderTravelOptions(data, valueKey, childrenKey, []);
    }
  }
  onChange(value) {
    const { onChange } = this.props;
    onChange(this.useLast ? value[value.length - 1] : value);
  }

  render() {
    const { value, data, keys, search, clear, empty, msg, last, ...props } = this.props;

    return (
      <Ant.Cascader
        {...search === true && getCascaderSearchProps(this.fieldNames.label)}
        options={data}
        fieldNames={this.fieldNames}
        value={this.useLast ? cascaderIdMap[value] : value}
        onChange={this.onChange}
        allowClear={clear}
        notFoundContent={empty}
        placeholder={msg}
        {...props}
      />
    );
  }
}

Cascader.displayName = 'AntPlus.Cascader';

Cascader.propTypes = {
  /** `options` 属性 */
  data: PropTypes.array,
  /** 当数据源条目中的 key 不是 `value` `label` `children` 时传入 */
  keys: PropTypes.array,
  /** 是否可搜索 */
  search: PropTypes.bool,
  /** `allowClear` 属性 */
  clear: PropTypes.bool,
  /** `notFoundContent` 属性 */
  empty: PropTypes.string,
  /** `placeholder` 属性 */
  msg: PropTypes.string,
  /** `value` 是否只传出数组的最后一个 id（在 Ant Plus Form 中时有效）*/
  last: PropTypes.bool,
};

Cascader.defaultProps = {
  data: [],
  keys: ['value', 'label', 'children'],
  search: false,
  clear: true,
  empty: '列表为空',
  msg: '请选择',
  last: false,
};

/**
 * TreeSelect - Ant Design TreeSelect 组件增强版本
 * @link https://ant.design/components/tree-select-cn/
 */
const treeSelectSearchProps = {
  showSearch: true,
  filterTreeNode: (val, node) => new RegExp(val, 'i').test(`${node.value}${node.title}`),
};
const treeSelectTravelData = (data, valueKey, titleKey, childrenKey) =>
  data.map((item) => {
    const { [valueKey]: value, [titleKey]: title, [childrenKey]: children } = item;
    const newItem = {
      value,
      title,
    };
    if (Array.isArray(children) && children.length > 0) {
      newItem.children = treeSelectTravelData(children, valueKey, titleKey, childrenKey);
    }
    return newItem;
  });

class TreeSelect extends Ant.TreeSelect {
  constructor(props) {
    super(props);
    const { keys } = props;
    const [value = 'value', title = 'title', children = 'children'] = keys;
    const useKeys = value !== 'value' || title !== 'title' || children !== 'children';
    this.state = {
      treeData: [],
      keys: useKeys ? { value, title, children } : null,
    };
  }
  static getDerivedStateFromProps({ data }, { treeData, keys }) {
    if (treeData.length !== data.length) {
      let newTreeData = data;
      if (keys) {
        const { value: valueKey, title: titleKey, children: childrenKey } = keys;
        newTreeData = treeSelectTravelData(data, valueKey, titleKey, childrenKey);
      }
      return { treeData: newTreeData };
    }
    return null;
  }

  render() {
    const {
      data,
      keys,
      value,
      search,
      check,
      back,
      expandAll,
      expandKeys,
      clear,
      msg,
      searchMsg,
      ...props
    } = this.props;
    const { treeData } = this.state;

    return (
      <Ant.TreeSelect
        className="ant-plus-tree-select"
        treeData={treeData}
        value={treeData.length > 0 ? value : undefined}
        {...search === true && treeSelectSearchProps}
        treeCheckable={check}
        showCheckedStrategy={back}
        treeDefaultExpandAll={expandAll}
        treeDefaultExpandedKeys={expandKeys}
        allowClear={clear}
        placeholder={msg}
        searchPlaceholder={searchMsg}
        {...props}
      />
    );
  }
}

TreeSelect.displayName = 'AntPlus.TreeSelect';

TreeSelect.propTypes = {
  /** `treeData` 属性 */
  data: PropTypes.array,
  /** 当数据源条目中的 key 不是 `value` `title` `children` 时传入 */
  keys: PropTypes.array,
  /** 是否可搜索 */
  search: PropTypes.bool,
  /** `treeCheckable` 属性 */
  check: PropTypes.bool,
  /** `showCheckedStrategy` 属性 */
  back: PropTypes.oneOf([TreeSelect.SHOW_ALL, TreeSelect.SHOW_PARENT, TreeSelect.SHOW_CHILD]),
  /** `treeDefaultExpandAll` 属性 */
  expandAll: PropTypes.bool,
  /** `treeDefaultExpandedKeys` 属性 */
  expandKeys: PropTypes.array,
  /** `allowClear` 属性 */
  clear: PropTypes.bool,
  /** `placeholder` 属性 */
  msg: PropTypes.string,
  /** `searchPlaceholder` 属性 */
  searchMsg: PropTypes.string,
};

TreeSelect.defaultProps = {
  data: [],
  keys: ['value', 'title', 'children'],
  search: false,
  check: false,
  back: TreeSelect.SHOW_CHILD,
  expandAll: false,
  clear: false,
  msg: '请选择',
  searchMsg: '搜索',
  dropdownStyle: { maxHeight: 400, overflow: 'auto' },
};

/**
 * exports
 */
export { Form, Input, AutoComplete, Select, Transfer, Cascader, TreeSelect };
