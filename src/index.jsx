import React from 'react';
import t from 'prop-types';
import * as Ant from 'antd';
import './index.scss';

const defaultConfig = {
  // `placeholder`
  input: '请输入',
  select: '请选择',
  // Rule messages
  required: '{label}不得为空',
  type: '{label}格式有误',
  max: '不得超过 {max} 个字',
  min: '不得少于 {min} 个字',
};

let message = {};
const messageCreator = {
  input: (input) => {
    message = { ...message, input };
  },
  select: (select) => {
    message = { ...message, select };
  },
  required: (required) => {
    const [requiredBefore, requiredAfter] = required.split('{label}');
    message = { ...message, requiredBefore, requiredAfter };
  },
  type: (type) => {
    const [typeBefore, typeAfter] = type.split('{label}');
    message = { ...message, typeBefore, typeAfter };
  },
  max: (max) => {
    const [maxBefore, maxAfter] = max.split('{max}');
    message = { ...message, maxBefore, maxAfter };
  },
  min: (min) => {
    const [minBefore, minAfter] = min.split('{min}');
    message = { ...message, minBefore, minAfter };
  },
};
const createMessage = (formConfig) => {
  Object.entries(formConfig).forEach(([key, val]) => {
    if (messageCreator[key]) messageCreator[key](val);
  });
};

// 初始化 message
createMessage(defaultConfig);

const ruleCreator = {
  required: (label) => ({
    required: true,
    message: `${message.requiredBefore}${label}${message.requiredAfter}`,
  }),
  string: (label) => ({
    type: 'string',
    whitespace: true,
    message: `${message.typeBefore}${label}${message.typeAfter}`,
  }),
  number: (label) => ({
    pattern: /^\d+$/,
    whitespace: true,
    message: `${message.typeBefore}${label}${message.typeAfter}`,
  }),
  array: (label) => ({
    type: 'array',
    message: `${message.typeBefore}${label}${message.typeAfter}`,
  }),
  email: (label) => ({
    type: 'email',
    whitespace: true,
    message: `${message.typeBefore}${label}${message.typeAfter}`,
  }),
  max: (max) => ({
    max,
    message: `${message.maxBefore}${max}${message.maxAfter}`,
  }),
  min: (min) => ({
    min,
    message: `${message.minBefore}${min}${message.minAfter}`,
  }),
  phone: (label) => ({
    pattern: /^1[3456789]\d{9}$/,
    whitespace: true,
    message: `${message.typeBefore}${label}${message.typeAfter}`,
  }),
  id: (label) => ({
    pattern: /^\d+x?$/i,
    whitespace: true,
    message: `${message.typeBefore}${label}${message.typeAfter}`,
  }),
};

/**
 * 根据 `rules` 「短语」生成完整验证规则 (配合 AntPlus.Form 组件使用）
 */
const createRules = (label = '', rules) =>
  rules.map((rule) => {
    if (typeof rule !== 'string') return rule;
    // e.g. "required"
    if (!rule.includes('=')) return ruleCreator[rule](label);
    // e.g. "max=5"
    const [key, val] = rule.split('=');
    return ruleCreator[key](Number(val));
  });

const phraseList = ['short', 'full'];
const selectList = ['Select', 'Cascader', 'TreeSelect'];

/**
 * 格式化 `msg`，添加 `disabled`
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
    const shortMsg = isSelect ? message.select : message.input;

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
Form.setConfig = (newConfig) => {
  createMessage(newConfig);
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
    if (typeof nodes !== 'object' || nodes === null) return nodes;

    // 遍历节点
    return React.Children.map(nodes, (node) => {
      if (!node.props) return node;

      // 判断子节点是否为表单域，`id` 为表单域唯一标识，请勿被占用
      const { label, id, ...nodeProps } = node.props;

      if (label === undefined) {
        /**
         * ``
         */
        if (id === undefined) {
          // 递归查找，渲染 `children` 内表单域
          const newChildren = Form.render(nodeProps.children);
          return getMsgAndDisabled({ ...node, props: { ...nodeProps, children: newChildren } });
        }

        /**
         * `id`
         */
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
        } = nodeProps;

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

        // 是否嵌套表单域（`a` & `a.b`）
        const isNestedField = fieldProps.form !== undefined;

        return form.getFieldDecorator(isNestedField ? `${id}.nested` : id, {
          initialValue: initialValue !== undefined ? initialValue : data[id],
          rules: Array.isArray(rules) && createRules(label, rules),
          validateTrigger: validateTrigger || rules.includes('phone') ? 'onBlur' : 'onChange',
          hidden: hidden || isNestedField,
          ...options,
        })(getMsgAndDisabled({ ...node, props: fieldProps }, label, id, disabledFields));
      }

      const {
        // UI props
        className,
        style,

        // Item props
        colon: itemColon,
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
        ...otherNodeProps
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

      const colon = itemColon !== undefined ? itemColon : formColon;

      /**
       * `label`
       */
      if (id === undefined) {
        return (
          <Ant.Form.Item
            className={className}
            style={style}
            colon={colon}
            label={label}
            {...itemProps}
          >
            {before && Form.render(before)}
            {getMsgAndDisabled({ ...node, props: otherNodeProps }, label)}
            {after && Form.render(after)}
          </Ant.Form.Item>
        );
      }

      /**
       * `label` `id`
       */
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

        // Extra options
        hide,

        ...fieldProps
      } = otherNodeProps;

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

      // 是否嵌套表单域（`a` & `a.b`）
      const isNestedField = fieldProps.form !== undefined;

      return (
        <Ant.Form.Item
          className={`${className} ${id}`}
          style={hide === true ? { display: 'none' } : style}
          colon={colon}
          label={label}
          {...itemProps}
        >
          {before && Form.render(before)}
          {form.getFieldDecorator(isNestedField ? `${id}.nested` : id, {
            initialValue: initialValue !== undefined ? initialValue : data[id],
            rules: Array.isArray(rules) && createRules(label, rules),
            validateTrigger: validateTrigger || rules.includes('phone') ? 'onBlur' : 'onChange',
            hidden: hidden || isNestedField,
            ...options,
          })(getMsgAndDisabled({ ...node, props: fieldProps }, label, id, disabledFields))}
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
    this.state = {
      count: 0,
    };
  }
  static getDerivedStateFromProps({ max, value }) {
    if (typeof max === 'number' && typeof value === 'string') {
      return { count: value.length };
    }
    return null;
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
    const showCount = typeof max === 'number';

    return (
      <span className={`ant-plus-input ${showCount ? 'ant-plus-input-with-count' : ''}`}>
        {textarea === true ? (
          <>
            <Ant.Input.TextArea autosize={{ minRows: rows || 5 }} placeholder={msg} {...props} />
            {showCount && this.renderCount(max)}
          </>
        ) : (
          <Ant.Input
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
    search: true,
    clear: false,
  };

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
    this.state = {};
  }
  static getDerivedStateFromProps({ keys }, state) {
    const [value = 'value', label = 'label'] = keys;
    if (value !== state.value || label !== state.label) {
      return { value, label };
    }
    return null;
  }

  render() {
    const { data, keys, search, clear, empty, msg, ...props } = this.props;
    const { value, label } = this.state;

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
const transferSearchProps = {
  showSearch: true,
  filterOption: (val, option) => `${option.title}${option.description || ''}`.includes(val),
};
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

  render() {
    const { data, targetKeys, value, search, title, unit, empty, searchMsg, ...props } = this.props;

    return (
      <Ant.Transfer
        {...search === true && transferSearchProps}
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
let cascaderIdMap = null;
const cascaderTravelOptions = (arr, fieldNames, valueMap, idList) => {
  if (arr.length === 0) return;
  const { value, children } = fieldNames;
  arr.forEach((item) => {
    const curIdList = idList.concat(item[value]);
    if (item[children]) {
      cascaderTravelOptions(valueMap, item[children], curIdList);
    } else {
      valueMap[item[value]] = curIdList;
    }
  });
};
const getCascaderSearchProps = (label) => ({
  showSearch: {
    filter: (val, path) => path.some((option) => option[label].includes(val)),
  },
});
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
    this.state = {
      fieldNames: {},
    };
  }
  static getDerivedStateFromProps({ last, data, ...props }, { fieldNames }) {
    if (last === true && !cascaderIdMap && data.length > 0) {
      cascaderIdMap = {};
      cascaderTravelOptions(data, fieldNames, cascaderIdMap, []);
    }
    const { keys: [value = 'value', label = 'label', children = 'children'] = [] } = props;
    if (
      value !== fieldNames.value ||
      label !== fieldNames.label ||
      children !== fieldNames.children
    ) {
      return { fieldNames: { value, label, children } };
    }
    return null;
  }

  onChange(value) {
    const { last, onChange } = this.props;
    onChange(last === true ? value[value.length - 1] : value);
  }

  render() {
    const { value, data, keys, search, clear, empty, msg, last, ...props } = this.props;
    const { fieldNames } = this.state;

    return (
      <Ant.Cascader
        {...search === true && getCascaderSearchProps(fieldNames.label)}
        options={data}
        fieldNames={fieldNames}
        value={last === true ? cascaderIdMap[value] : value}
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
const treeSelectSearchProps = {
  showSearch: true,
  filterTreeNode: (val, node) => new RegExp(val, 'i').test(`${node.value}${node.title}`),
};
class TreeSelect extends Ant.TreeSelect {
  static propTypes = {
    /** `treeData` 属性，Array<{value, title, children}> */
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
        treeData={data}
        value={data.length > 0 ? value : undefined}
        treeCheckable={check}
        treeDefaultExpandAll={expandAll}
        treeDefaultExpandedKeys={expandKeys}
        allowClear={clear}
        placeholder={msg}
        {...search === true && treeSelectSearchProps}
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
