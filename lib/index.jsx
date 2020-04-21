import React, { forwardRef, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as Ant from 'antd';
import './index.less';

/**
 * Namespace
 */
const namePrefix = 'AntPlus';
const classPrefix = 'ant-plus';
const fullName = (name) => `${namePrefix}.${name}`;

/**
 * Subs
 */
const formSubs = ['Item', 'List', 'Provider'];
const subs = formSubs.map(fullName);

/**
 * Utils
 */
const hasItem = (arr, key) => Array.isArray(arr) && arr.includes(key);
const hasLength = (arr) => Array.isArray(arr) && arr.length > 0;
const addUniqueClass = (restProps, name) => {
  const { className = '' } = restProps;
  restProps.className = `${classPrefix}-${name} ${className}`;
};

/**
 * Settings
 */
const getSettings = (customConfig) => {
  const config = {
    input: '请输入',
    select: '请选择',

    required: '{label} 不得为空',
    type: '{label} 格式有误',
    max: '不得超过 {max} 个字',
    min: '不得少于 {min} 个字',
    ...customConfig,
  };

  const roleMap = {};
  const ruleTypeMap = {};
  const ruleNumMap = {};

  // tip, addon
  const inputs = ['Input', 'AutoComplete', 'Transfer'];
  const selects = ['Select', 'Cascader', 'TreeSelect'];
  const addonMap = {
    Input: ['addonBefore', 'addonAfter', 'prefix', 'suffix'],
  };
  const { input, select } = config;

  inputs.forEach((name) => {
    const obj = { shortTip: input };
    const addonList = addonMap[name];
    if (addonList) obj.addonList = addonList;
    roleMap[fullName(name)] = obj;
  });
  selects.forEach((name) => {
    roleMap[fullName(name)] = { shortTip: select };
  });

  // rules
  const ruleMap = {
    required: { required: true },

    string: { type: 'string', whitespace: true },
    number: { pattern: /^\d+$/, whitespace: true },
    array: { type: 'array' },
    email: { type: 'email', whitespace: true },
    phone: { pattern: /^1[3456789]\d{9}$/, whitespace: true },
    id: { pattern: /^\d+x?$/i, whitespace: true },
  };
  const typeRules = Object.keys(ruleMap);
  const numRules = ['max', 'min'];

  typeRules.forEach((key) => {
    const msg = config[key === 'required' ? 'required' : 'type'];
    ruleTypeMap[key] = (label) => ({ ...ruleMap[key], message: msg.replace('{label}', label) });
  });
  numRules.forEach((key) => {
    ruleNumMap[key] = (num) => ({ [key]: +num, message: config[key].replace(`{${key}}`, num) });
  });

  return { roleMap, ruleTypeMap, ruleNumMap };
};

/**
 * Form.Item props
 */
const itemPropList = [
  'colon',
  'htmlFor',
  'noStyle',
  'label',
  'labelAlign',
  'labelCol',
  'shouldUpdate',
  'wrapperCol',

  'dependencies',
  'extra',
  'getValueFromEvent',
  'hasFeedback',
  'help',
  'name',
  'normalize',
  'required',
  'rules',
  'trigger',
  'validateFirst',
  'validateStatus',
  'validateTrigger',
  'valuePropName',
  'getValueProps', // rc-field-form
  'initialValue', // rc-field-form

  'className',
  'style',
  'prefixCls',
  'fieldKey',
];
const ownPropMap = {
  ownClass: 'className',
  ownStyle: 'style',
  ownName: 'name',
};
const splitProps = (allProps) => {
  const itemProps = {};
  const ownProps = { ...allProps };

  itemPropList.forEach((key) => {
    const val = allProps[key];
    if (val !== undefined) itemProps[key] = val;
    delete ownProps[key];
  });
  Object.entries(ownPropMap).forEach(([key, realKey]) => {
    const val = allProps[key];
    if (val !== undefined) ownProps[realKey] = val;
    delete ownProps[key];
  });
  return { itemProps, ownProps };
};

/**
 * Form - Ant Design Form 组件增强版本
 * https://ant.design/fns/form-cn/
 */
const Form = forwardRef((props, ref) => {
  const { data, config, disabledNames, children: formChildren, ...restFormProps } = props;
  const settings = useRef(getSettings(config)).current;

  /**
   * 转换 `tip`，包装 addon
   */
  const setTipAddon = (isValid, displayName, nodeProps, label = '') => {
    if (!isValid) return;
    const { shortTip, addonList } = settings.roleMap[displayName];

    // `tip`
    if (shortTip) {
      const { tip } = nodeProps;
      if (tip === `'short'`) {
        nodeProps.tip = shortTip;
      } else if (tip === `'full'`) {
        nodeProps.tip = `${shortTip}${label}`;
      }
    }

    // addon
    if (addonList) {
      addonList.forEach((key) => {
        const val = nodeProps[key];
        if (val !== undefined) nodeProps[key] = launch(val);
      });
    }
  };

  /**
   * 生成校验信息
   */
  const getRules = (rules, label = '') => {
    if (!Array.isArray(rules)) return rules;

    return rules.map((rule) => {
      if (typeof rule !== 'string') return rule;

      // e.g. 'max=10'
      if (rule.includes('=')) {
        const [key, val] = rule.split('=');
        const getRule = settings.ruleNumMap[key];
        if (getRule) return getRule(val);
      }

      // e.g. 'required'
      const getRule = settings.ruleTypeMap[rule];
      if (getRule) return getRule(label);

      return rule;
    });
  };

  /**
   * 核心渲染工厂
   */
  const factory = (node) => {
    if (typeof node !== 'object' || node === null || !node.props) return node;

    const { children, ...restNodeProps } = node.props;
    const { label, name } = restNodeProps;
    const hasName = name !== undefined;

    const displayName = node.type?.displayName;
    const isValid = typeof displayName === 'string' && displayName.includes(`${namePrefix}.`);

    /**
     * normal node
     */
    if (label === undefined && !hasName) {
      setTipAddon(isValid, displayName, restNodeProps);
      return { ...node, props: { ...restNodeProps, children: launch(children) } };
    }

    /**
     * original <Form.XX> component
     */
    if (isValid && subs.includes(displayName)) {
      const isRenderProps = typeof children === 'function';
      const newChildren = isRenderProps ? (...args) => launch(children(...args)) : launch(children);
      return { ...node, props: { ...restNodeProps, children: newChildren } };
    }

    /**
     * Ant Plus Form.Item style node
     */
    const { rules, validateTrigger: rawVt, hide, ...restAllProps } = restNodeProps;
    if (hide === true) restAllProps.style = { display: 'none' };
    const validateTrigger = rawVt || hasItem(rules, 'phone') ? 'onBlur' : 'onChange';
    const allProps = { ...restAllProps, rules: getRules(rules, label), validateTrigger };

    // render props
    if (typeof children === 'function') {
      addUniqueClass(allProps, 'form-item');
      const renderNode = (...args) => launch(children(...args));
      return <Ant.Form.Item {...allProps}>{renderNode}</Ant.Form.Item>;
    }

    // object
    const { itemProps, ownProps } = splitProps(allProps);
    addUniqueClass(itemProps, `form-item ${hasName ? `form-item-${name}` : ''}`);

    setTipAddon(isValid, displayName, ownProps, label);
    const disabled = disabledNames === 'all' || (hasName && hasItem(disabledNames, name));
    if (disabled) ownProps.disabled = true;

    const ownNode = { ...node, props: { ...ownProps, children: launch(children) } };
    return <Ant.Form.Item {...itemProps}>{ownNode}</Ant.Form.Item>;
  };

  /**
   * 渲染工厂入口
   */
  const launch = (node) => {
    if (typeof node !== 'object' || node === null) return node;
    if (hasLength(node)) return React.Children.map(node, factory);
    return factory(node);
  };

  /**
   * Form
   */
  addUniqueClass(restFormProps, 'form');

  return (
    <Ant.Form initialValues={data} {...restFormProps} ref={ref}>
      {launch(formChildren)}
    </Ant.Form>
  );
});

Form.propTypes = {
  /** `initialValues` 简写 */
  data: PropTypes.object,
  /** 设置统一的 `placeholder` 信息与 `rules` 校验提示信息。详见下文 **config** */
  config: PropTypes.object,
  /** 禁用的表单域，传入 `name` 组成的数组。全部禁用传入字符串 `'all'` */
  disabledNames: PropTypes.array,
};

Form.defaultProps = {};

/**
 * Input - Ant Design Input (TextArea) 组件增强版本
 * https://ant.design/fns/input-cn/
 */
const Input = forwardRef((props, ref) => {
  const { max, tip, auto, textarea, rows, ...restProps } = props;
  const { disabled } = restProps;

  addUniqueClass(restProps, 'input');

  const renderInput = (inputProps) => {
    if (textarea !== true) {
      return <Ant.Input placeholder={tip} autoComplete={auto} {...inputProps} ref={ref} />;
    }
    return (
      <Ant.Input.TextArea
        placeholder={tip}
        autoSize={{ minRows: rows }}
        {...inputProps}
        ref={ref}
      />
    );
  };

  const noCount = typeof max !== 'number' || disabled === true;

  const [count, setCount] = useState(() => {
    if (noCount) return null;
    const { defaultValue, value } = restProps;
    if (typeof value === 'string') return value.length;
    if (typeof defaultValue === 'string') return defaultValue.length;
    return 0;
  });

  // no count
  if (noCount) return renderInput(restProps);

  // has count
  const { onChange } = restProps;
  restProps.onChange = (event) => {
    const { value } = event.target;
    if (typeof value === 'string') setCount(value.length);
    if (typeof onChange === 'function') return onChange(event);
  };

  return (
    <div className={`${classPrefix}-input-wrapper`}>
      {renderInput(restProps)}
      <span className={`count ${count <= max ? '' : 'red'}`}>
        {count} | {max}
      </span>
    </div>
  );
});

Input.propTypes = {
  /** 最大可输入字符数（若传入则显示字符计数器） */
  max: PropTypes.number,
  /** `placeholder` 简写（在 Ant Plus `Form` 内时，可传入 `'short'` 或 `'full'`。转义：`'short'` → `'请输入'`, `'full'` → `'请输入XX'`, `'其它'` → `'其它'`） */
  tip: PropTypes.string,
  /** `autoComplete` 简写（关闭需传入 `'off'`） */
  auto: PropTypes.string,
  /** 默认为 `Input` 组件，若传入 `textarea`，则为 `Input.TextArea` 组件 */
  textarea: PropTypes.bool,
  /** `Input.TextArea` 的输入框行高 */
  rows: PropTypes.number,
};

Input.defaultProps = {
  textarea: false,
  rows: 2,
};

/**
 * AutoComplete - Ant Design AutoComplete 组件增强版本
 * https://ant.design/fns/auto-complete-cn/
 */
const AutoComplete = forwardRef((props, ref) => {
  const { data, tip, search, clear, ...restProps } = props;

  let searchProps;
  if (search === true) {
    searchProps = { filterOption: (val, option) => option.value.includes(val) };
  }

  addUniqueClass(restProps, 'auto-complete');

  return (
    <Ant.AutoComplete
      options={data}
      placeholder={tip}
      {...searchProps}
      allowClear={clear}
      {...restProps}
      ref={ref}
    />
  );
});

AutoComplete.propTypes = {
  /** `options` 简写 */
  data: PropTypes.array,
  /** `placeholder` 简写（在 Ant Plus `Form` 内时，可传入 `'short'` 或 `'full'`。转义：`'short'` → `'请输入'`, `'full'` → `'请输入XX'`, `'其它'` → `'其它'`） */
  tip: PropTypes.string,
  /** 是否可搜索 */
  search: PropTypes.bool,
  /** `allowClear` 简写 */
  clear: PropTypes.bool,
};

AutoComplete.defaultProps = {
  data: [],
  search: true,
  clear: false,
};

/**
 * Select - Ant Design Select 组件增强版本
 * https://ant.design/fns/select-cn/
 */
const Select = forwardRef((props, ref) => {
  const { data, keys, tip, search, clear, empty, children, ...restProps } = props;
  const [value = 'value', label = 'label'] = keys;

  let searchProps;
  if (search === true) {
    searchProps = {
      showSearch: true,
      filterOption: (val, option) => option.children.includes(val),
    };
  }

  addUniqueClass(restProps, 'select');

  return (
    <Ant.Select
      placeholder={tip}
      {...searchProps}
      allowClear={clear}
      notFoundContent={empty}
      {...restProps}
      ref={ref}
    >
      {children ||
        data.map((item) => (
          <Ant.Select.Option key={item[label]} value={item[value]} disabled={item.disabled}>
            {item[label]}
          </Ant.Select.Option>
        ))}
    </Ant.Select>
  );
});

Select.propTypes = {
  /** 列表数据源 */
  data: PropTypes.array,
  /** 当数据源的键不是 `'value'` `'label'` 时传入。e.g. 数据源 `[{ val: 1, text: 'A'}, { val: 2, text: 'B'}]，则传入 ['val', 'text']` */
  keys: PropTypes.array,
  /** `placeholder` 简写（在 Ant Plus `Form` 内时，可传入 `'short'` 或 `'full'`。转义：`'short'` → `'请输入'`, `'full'` → `'请输入XX'`, `'其它'` → `'其它'`） */
  tip: PropTypes.string,
  /** 是否可搜索 */
  search: PropTypes.bool,
  /** `allowClear` 简写 */
  clear: PropTypes.bool,
  /** `notFoundContent` 简写 */
  empty: PropTypes.string,
};

Select.defaultProps = {
  data: [],
  keys: ['value', 'label'],
  search: false,
  clear: false,
};

/**
 * Transfer - Ant Design Transfer 组件增强版本
 * https://ant.design/fns/transfer-cn/
 */
const Transfer = forwardRef((props, ref) => {
  const { data, title, search, unit, searchTip, empty, ...restProps } = props;

  let searchProps;
  if (search === true) {
    searchProps = {
      showSearch: true,
      filterOption: (val, option) => `${option.title}${option.description || ''}`.includes(val),
    };
  }

  addUniqueClass(restProps, 'transfer');

  const { targetKeys, value } = restProps;
  restProps.targetKeys = targetKeys || value;

  return (
    <Ant.Transfer
      dataSource={data}
      titles={[`未选择${title}`, `已选择${title}`]}
      {...searchProps}
      locale={{
        itemsUnit: unit,
        itemUnit: unit,
        searchPlaceholder: searchTip,
        notFoundContent: empty,
      }}
      {...restProps}
      ref={ref}
    />
  );
});

Transfer.propTypes = {
  /** `dataSource` 简写 */
  data: PropTypes.array,
  /** `'未选择XX'` `'已选择XX'` 的 `'XX'` 文案 */
  title: PropTypes.string,
  /** 是否可搜索 */
  search: PropTypes.bool,
  /** `local.itemUnit` 与 `local.itemsUnits` 简写，默认：`'项'` */
  unit: PropTypes.string,
  /** `locale.searchPlaceholder` 简写（不支持 `'short'` `'full'`） */
  searchTip: PropTypes.string,
  /** `locale.notFoundContent` 简写 */
  empty: PropTypes.string,
};

Transfer.defaultProps = {
  data: [],
  title: '',
  search: false,
  unit: '项',
  searchTip: '搜索',
  render: (item) => item.title,
};

/**
 * Cascader - Ant Design Cascader 组件增强版本
 * https://ant.design/fns/cascader-cn/
 */
const Cascader = forwardRef((props, ref) => {
  const { data, keys, search, clear, empty, tip, last, ...restProps } = props;
  const [valueKey = 'value', labelKey = 'label', childrenKey = 'children'] = keys;

  const valPathMap = useRef({});
  const prevLength = useRef(0);

  if (last === true) {
    if (prevLength.current !== data.length) {
      prevLength.current = data.length;

      const travelOptions = (data, values = []) => {
        data.forEach((item) => {
          const { [valueKey]: val, [childrenKey]: children } = item;
          const selfValues = values.concat(val);
          if (hasLength(children)) return travelOptions(children, selfValues);
          valPathMap.current[val] = selfValues;
        });
      };
      travelOptions(data);
    }

    const { defaultValue, value, onChange } = restProps;
    if (value !== undefined) {
      restProps.value = valPathMap.current[value];
    } else if (defaultValue !== undefined) {
      restProps.defaultValue = valPathMap.current[defaultValue];
    }
    if (typeof onChange === 'function') {
      restProps.onChange = (val) => onChange(val[val.length - 1]);
    }
  }

  let searchProps;
  if (search === true) {
    searchProps = {
      showSearch: { filter: (val, path) => path.some((option) => option[labelKey].includes(val)) },
    };
  }

  addUniqueClass(restProps, 'cascader');

  return (
    <Ant.Cascader
      options={data}
      fieldNames={{ value: valueKey, label: labelKey, children: childrenKey }}
      placeholder={tip}
      {...searchProps}
      allowClear={clear}
      notFoundContent={empty}
      {...restProps}
      ref={ref}
    />
  );
});

Cascader.propTypes = {
  /** `options` 简写 */
  data: PropTypes.array,
  /** 当数据源的键不是 `'value'` `'label'` `'children'` 时传入 */
  keys: PropTypes.array,
  /** `placeholder` 简写（不支持 `'short'` `'full'`） */
  tip: PropTypes.string,
  /** 是否可搜索 */
  search: PropTypes.bool,
  /** `allowClear` 简写 */
  clear: PropTypes.bool,
  /** `notFoundContent` 简写 */
  empty: PropTypes.string,
  /** `value` 取数组最后一个值，默认为整体数组 */
  last: PropTypes.bool,
};

Cascader.defaultProps = {
  data: [],
  keys: ['value', 'label', 'children'],
  tip: '请选择',
  search: false,
  clear: true,
  last: false,
};

/**
 * TreeSelect - Ant Design TreeSelect 组件增强版本
 * https://ant.design/fns/tree-select-cn/
 */
const TreeSelect = forwardRef((props, ref) => {
  const {
    data,
    keys,
    tip,
    search,
    clear,
    empty,
    checkbox,
    expandAll,
    expandKeys,
    showType,
    ...restProps
  } = props;
  const [valueKey = 'value', titleKey = 'title', childrenKey = 'children'] = keys;

  const treeData = useRef([]);

  if (treeData.current.length !== data.length) {
    if (valueKey === 'value' && titleKey === 'title' && childrenKey === 'children') {
      treeData.current = data;
    } else {
      const getNewData = (data) => {
        return data.map((item) => {
          const { [valueKey]: value, [titleKey]: title, [childrenKey]: children } = item;
          const newItem = { value, title };
          if (hasLength(children)) newItem.children = getNewData(children);
          return newItem;
        });
      };
      treeData.current = getNewData(data);
    }
  }

  if (treeData.length === 0) delete restProps.value;

  let searchProps;
  if (search === true) {
    searchProps = {
      showSearch: true,
      filterTreeNode: (val, node) => new RegExp(val, 'i').test(`${node.value}${node.title}`),
    };
  }

  addUniqueClass(restProps, 'tree-select');

  return (
    <Ant.TreeSelect
      treeData={treeData.current}
      placeholder={tip}
      {...searchProps}
      allowClear={clear}
      notFoundContent={empty}
      treeCheckable={checkbox}
      treeDefaultExpandAll={expandAll}
      treeDefaultExpandedKeys={expandKeys}
      showCheckedStrategy={showType}
      {...restProps}
      ref={ref}
    />
  );
});

TreeSelect.propTypes = {
  /** `treeData` 简写 */
  data: PropTypes.array,
  /** 当数据源的键不是 `'value'` `'title'` `'children'` 时传入 */
  keys: PropTypes.array,
  /** `placeholder` 简写（不支持 `'short'` `'full'`） */
  tip: PropTypes.string,
  /** 是否可搜索 */
  search: PropTypes.bool,
  /** `allowClear` 简写 */
  clear: PropTypes.bool,
  /** `notFoundContent` 简写 */
  empty: PropTypes.string,
  /** `treeCheckable` 简写 */
  checkbox: PropTypes.bool,
  /** `treeDefaultExpandAll` 简写 */
  expandAll: PropTypes.bool,
  /** `treeDefaultExpandedKeys` 简写 */
  expandKeys: PropTypes.array,
  /** `showCheckedStrategy` 简写 */
  showType: PropTypes.oneOf([
    Ant.TreeSelect.SHOW_ALL,
    Ant.TreeSelect.SHOW_PARENT,
    Ant.TreeSelect.SHOW_CHILD,
  ]),
};

TreeSelect.defaultProps = {
  data: [],
  keys: ['value', 'title', 'children'],
  tip: '请选择',
  search: false,
  clear: false,
  checkbox: false,
  expandAll: false,
  showType: Ant.TreeSelect.SHOW_CHILD,
};

/**
 * Button - 未做任何封装，方便表单使用
 */
const Button = Ant.Button;

/**
 * sync component keys, add displayName
 */

const copyOriginalKeys = () => {
  const fromMap = {
    Form: Ant.Form,
    Input: Ant.Input,
    AutoComplete: Ant.AutoComplete,
    Select: Ant.Select,
    Transfer: Ant.Transfer,
    Cascader: Ant.Cascader,
    TreeSelect: Ant.TreeSelect,
  };
  const toMap = { Form, Input, AutoComplete, Select, Transfer, Cascader, TreeSelect };
  const omitKeys = ['$$typeof', 'render', 'propTypes', 'defaultProps'];

  Object.entries(fromMap).forEach(([name, fromFn]) => {
    const toFn = toMap[name];
    Object.entries(fromFn).forEach(([key, val]) => {
      if (!omitKeys.includes(key)) toFn[key] = val;
    });
    toFn.displayName = `${namePrefix}.${name}`;
  });
};

copyOriginalKeys();

formSubs.forEach((name) => {
  Form[name].displayName = `${namePrefix}.${name}`;
});

/**
 * exports
 */
export { Form, Input, AutoComplete, Select, Transfer, Cascader, TreeSelect, Button };