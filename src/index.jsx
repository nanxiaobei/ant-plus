import React from 'react';
import * as Ant from 'antd';
import t from 'prop-types';
import './index.scss';

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
 * 根据表单域简写 `rules` 属性生成完整验证规则 (配合 AntPlus.Form 组件使用）
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

const phraseList = ['short', 'full'];
const selectList = ['Select', 'Cascader', 'TreeSelect'];

/**
 * 格式化 AntPlus.Form 下的节点
 */
const getMsgAndDisabled = (node, label = '', id, disabledFields) => {
  let nodeProps = node.props;

  if (typeof nodeProps.msg === 'string' && phraseList.includes(nodeProps.msg)) {
    // 若 msg (placeholder) 值为 `short` 或 `full`，进行转义
    const { displayName } = node.type;
    if (typeof displayName !== 'string') {
      throw new Error('`msg` prop is not valid for a non Ant Plus component');
    }
    const isSelect = selectList.includes(displayName.split('.')[1]);
    const shortMsg = isSelect ? formConfig.selectPlaceholder : formConfig.inputPlaceholder;

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
  static propTypes = {
    /** 必选。经 Form.create 包装后注入的 `form` 属性（为规避 Ant Design 提示信息，改为 `api`）*/
    api: t.object.isRequired,
    /** 与各表单域 `id` 对应的一组键值对，用于设置各表单域初始值 e.g. { [id]: value, ... } */
    data: t.object,
    /** 禁用的表单域，全部禁用传 "all"，部分禁用传 id 组成的数组 */
    disabledFields: t.array,
    /** 是否整体显示 label 后的冒号 */
    colon: t.bool,
    /** 提交表单的回调事件，已做了 `event.preventDefault()` 处理 */
    onSubmit: t.func,
  };
  static defaultProps = {
    data: {},
    colon: false,
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit();
  };

  render() {
    const {
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
      <Ant.Form onSubmit={this.onSubmit} {...props}>
        {Form.render && Form.render(children)}
      </Ant.Form>
    );
  }
}

Form.displayName = 'AntPlus.Form';

// 设置校验提示
Form.setConfig = (config) => {
  formConfig = { ...formConfig, ...config };
  return formConfig;
};

// Default option functions
const defaultGetValueFromEvent = (e) => {
  if (!e || !e.target) {
    return e;
  }
  const { target } = e;
  return target.type === 'checkbox' ? target.checked : target.value;
};

const defaultGetValueProps = (value) => ({ value });

// 生成 `Form.render` 方法
Form.createRender = (form, data, disabledFields, formColon) => {
  // 核心渲染方法
  Form.render = (nodes) => {
    if (typeof nodes !== 'object' || nodes === null) return nodes;

    // 遍历节点
    return React.Children.map(nodes, (node) => {
      if (!node.props) return node;

      // 判断子节点是否为表单域，`id` 为表单域唯一标识，请勿被占用
      const { label, id, ...nodeProps } = node.props;

      // ``
      if (label === undefined && id === undefined) {
        // 递归查找，包装渲染 `children` 内表单域
        const newChildren = Form.render(nodeProps.children);
        const newNode = { ...node, props: { ...nodeProps, children: newChildren } };
        return getMsgAndDisabled(newNode);
      }

      const {
        // Form.Item props
        colon: itemColon,
        extra,
        hasFeedback = false,
        help,
        // label,
        labelCol,
        required = false,
        validateStatus,
        wrapperCol,

        // UI props
        className,
        style,

        // Two sides
        before,
        after,

        // Props
        ...otherNodeProps
      } = nodeProps;

      const itemProps = {
        // colon,
        extra,
        hasFeedback,
        help,
        // label,
        labelCol,
        required,
        validateStatus,
        wrapperCol,
      };

      const colon = itemColon !== undefined ? itemColon : formColon;
      // `label`
      if (label !== undefined && id === undefined) {
        const newNode = { ...node, props: otherNodeProps };
        return (
          <Ant.Form.Item
            className={className}
            style={style}
            label={label}
            colon={colon}
            {...itemProps}
          >
            {before && Form.render(before)}
            {getMsgAndDisabled(newNode, label)}
            {after && Form.render(after)}
          </Ant.Form.Item>
        );
      }

      // 是否为嵌套表单域（`a` & `a.b`）
      const isNestedField = otherNodeProps.form !== undefined;

      const {
        // Form options
        getValueFromEvent = defaultGetValueFromEvent,
        initialValue,
        normalize,
        preserve = false,
        rules,
        trigger = 'onChange',
        validateFirst = false,
        validateTrigger,
        valuePropName = 'value',
        // rc-form options
        hidden,
        getValueProps = defaultGetValueProps,
        validate = [],

        // Extra options
        hide,

        ...fieldProps
      } = otherNodeProps;

      const options = {
        getValueFromEvent,
        // initialValue,
        normalize,
        preserve,
        // rules,
        trigger,
        validateFirst,
        // validateTrigger,
        valuePropName,

        hidden: hidden || isNestedField,
        getValueProps,
        validate,
      };

      const createField = (field) =>
        form.getFieldDecorator(isNestedField ? `${id}.nested` : id, {
          rules: Array.isArray(rules) && createRules(label, rules),
          validateTrigger: validateTrigger || rules.includes('phone') ? 'onBlur' : 'onChange',
          initialValue: initialValue !== undefined ? initialValue : data[id],
          ...options,
        })(getMsgAndDisabled(field, label, id, disabledFields));

      // `id`
      if (label === undefined) {
        const field = { ...node, props: { ...fieldProps, className, style } };
        return createField(field);
      }

      // `label`, `id`
      const field = { ...node, props: fieldProps };
      return (
        <Ant.Form.Item
          className={`${className} ${id}`}
          style={hide === true ? { display: 'none' } : style}
          label={label}
          colon={colon}
          {...itemProps}
        >
          {before && Form.render(before)}
          {createField(field)}
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
  static propTypes = {
    /** 最大可输入字符数（传入则显示字符计数器）*/
    max: t.number,
    /** `autoComplete` 属性（关闭需传入 "off"）*/
    auto: t.string,
    /** `placeholder` 属性（可传入 `short` 或 `full`，在 AntPlus.Form 中时有效）。
     e.g. `short` => `请输入`, `full` => `请输入XXX`, `其它提示信息` => `其它提示信息`*/
    msg: t.string,
    /** 默认为 Input 组件，若传入 textarea，则为 TextArea 组件 */
    textarea: t.bool,
    /** 若为 TextArea 时的输入框行高 */
    rows: t.number,
  };
  static defaultProps = {
    textarea: false,
    rows: 2,
  };

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
    const { onChange, max, auto, msg, textarea, rows, ...props } = this.props;
    const { count } = this.state;

    return (
      <span className={['ant-plus-input', this.countClass].join(' ')}>
        {textarea === true ? (
          <>
            <Ant.Input.TextArea
              onChange={this.onChange}
              autosize={{ minRows: rows || 5 }}
              placeholder={msg}
              {...props}
            />
            {typeof max === 'number' && this.renderCount(max, count)}
          </>
        ) : (
          <Ant.Input
            autoComplete={auto}
            onChange={this.onChange}
            placeholder={msg}
            suffix={typeof max === 'number' && this.renderCount(max, count)}
            {...props}
          />
        )}
      </span>
    );
  }
}

Input.displayName = 'AntPlus.Input';

/**
 * AutoComplete - Ant Design AutoComplete 组件增强版本
 * @link https://ant.design/components/auto-complete-cn/
 */
class AutoComplete extends Ant.AutoComplete {
  static propTypes = {
    /** `dataSource` 属性 */
    data: t.array,
    /** 是否可搜索 */
    search: t.bool,
    /** `allowClear` 属性 */
    clear: t.bool,
    /** `placeholder` 属性（可传入 `short` 或 `full`，在 AntPlus.Form 中时有效）*/
    msg: t.string,
  };
  static defaultProps = {
    data: [],
    search: false,
    clear: false,
  };

  constructor(props) {
    super(props);
    const { search } = props;
    if (search === true) {
      this.searchProps = {
        filterOption: (val, option) => option.props.children.includes(val),
      };
    }
  }

  render() {
    const { data, search, clear, msg, ...props } = this.props;

    return (
      <Ant.AutoComplete
        {...this.searchProps}
        dataSource={data}
        allowClear={clear}
        placeholder={msg}
        {...props}
      />
    );
  }
}

AutoComplete.displayName = 'AntPlus.AutoComplete';

/**
 * Select - Ant Design Select 组件增强版本
 * @link https://ant.design/components/select-cn/
 */
class Select extends Ant.Select {
  static propTypes = {
    /** 列表数据源 */
    data: t.array,
    /** 当数据源条目中的 key 不是 `value` (值) 与 `label` (展示的汉字) 时传入，e.g. 如 [{ id: 1, name: ''}, ...]，则传入 ['id', 'name'] */
    keys: t.array,
    /** 是否可搜索 */
    search: t.bool,
    /** `allowClear` 属性 */
    clear: t.bool,
    /** `notFoundContent` 属性 */
    empty: t.string,
    /** `placeholder` 属性（可传入 `short` 或 `full`，在 AntPlus.Form 中时有效）。
     e.g. `short` => `请选择`, `full` => `请选择XXX`, `其它提示信息` => `其它提示信息`*/
    msg: t.string,
  };
  static defaultProps = {
    data: [],
    keys: ['value', 'label'],
    search: false,
    clear: false,
    empty: '列表为空',
  };

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
    const { data, keys, search, clear, empty, msg, ...props } = this.props;
    const [value = 'value', label = 'label'] = keys;

    return (
      <Ant.Select
        className="ant-plus-select"
        {...this.searchProps}
        allowClear={clear}
        notFoundContent={empty}
        placeholder={msg}
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

/**
 * Transfer - Ant Design Transfer 组件增强版本
 * @link https://ant.design/components/transfer-cn/
 */
class Transfer extends Ant.Transfer {
  static propTypes = {
    /** `dataSource` 属性 */
    data: t.array,
    /** 是否可搜索 */
    search: t.bool,
    /** 组件 `未选择XXX` `已选择XXX` 的 `XXX` 文案 */
    title: t.string,
    /** 数字后面的单位 */
    unit: t.string,
    /** `notFoundContent` 属性 */
    empty: t.string,
    /** 搜索框 `placeholder` 属性 */
    searchMsg: t.string,
  };
  static defaultProps = {
    data: [],
    search: false,
    title: '',
    unit: '项',
    empty: '列表为空',
    searchMsg: '搜索',
    render: (item) => item.title,
  };

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
    const { data, targetKeys, value, search, title, unit, empty, searchMsg, ...props } = this.props;

    return (
      <Ant.Transfer
        {...this.searchProps}
        dataSource={data}
        targetKeys={targetKeys || value}
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

/**
 * Cascader - Ant Design Cascader 组件增强版本
 * @link https://ant.design/components/cascader-cn/
 */
class Cascader extends Ant.Cascader {
  static propTypes = {
    /** `options` 属性 */
    data: t.array,
    /** 当数据源条目中的 key 不是 `value` `label` `children` 时传入 */
    keys: t.array,
    /** 是否可搜索 */
    search: t.bool,
    /** `allowClear` 属性 */
    clear: t.bool,
    /** `notFoundContent` 属性 */
    empty: t.string,
    /** `placeholder` 属性 */
    msg: t.string,
    /** `value` 是否只传出数组的最后一个 id（在 AntPlus.Form 中时有效）*/
    last: t.bool,
  };
  static defaultProps = {
    data: [],
    keys: ['value', 'label', 'children'],
    search: false,
    clear: true,
    empty: '列表为空',
    msg: '请选择',
    last: false,
  };

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
    const { value, data, keys, search, clear, empty, msg, last, ...props } = this.props;

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
        allowClear={clear}
        notFoundContent={empty}
        placeholder={msg}
        {...props}
      />
    );
  }
}

Cascader.displayName = 'AntPlus.Cascader';

/**
 * TreeSelect - Ant Design TreeSelect 组件增强版本
 * @link https://ant.design/components/tree-select-cn/
 */
class TreeSelect extends Ant.TreeSelect {
  static propTypes = {
    /** `treeData` 属性 */
    data: t.array,
    /** 是否可搜索 */
    search: t.bool,
    /** `treeCheckable` 属性 */
    check: t.bool,
    /** `treeDefaultExpandAll` 属性 */
    expandAll: t.bool,
    /** `treeDefaultExpandedKeys` 属性 */
    expandKeys: t.array,
    /** `allowClear` 属性 */
    clear: t.bool,
    /** `placeholder` 属性 */
    msg: t.string,
    /** `searchPlaceholder` 属性 */
    searchMsg: t.string,
  };
  static defaultProps = {
    data: [],
    search: false,
    check: false,
    expandAll: false,
    clear: false,
    msg: '请选择',
    searchMsg: '搜索',
    dropdownStyle: { maxHeight: 400, overflow: 'auto' },
  };

  constructor(props) {
    super(props);
    const { search } = props;
    if (search === true) {
      this.searchProps = {
        showSearch: true,
        filterTreeNode: (val, node) => new RegExp(val, 'i').test(`${node.value}${node.title}`),
      };
    }
  }

  render() {
    const {
      data,
      value,
      msg,
      check,
      expandAll,
      expandKeys,
      clear,
      search,
      searchMsg,
      ...props
    } = this.props;

    return (
      <Ant.TreeSelect
        className="ant-plus-tree-select"
        {...this.searchProps}
        treeData={data}
        value={data.length > 0 ? value : undefined}
        treeCheckable={check}
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

/**
 * exports
 */
export { Form, Input, AutoComplete, Select, Transfer, Cascader, TreeSelect };
