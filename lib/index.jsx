import React, {
  Children,
  forwardRef,
  useRef,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import t from 'prop-types';
import * as Ant from 'antd';
import './index.less';

/**
 * Namespace
 */
const namePrefix = 'AntPlus';
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
const noop = () => {};

/**
 * Settings
 */
const getSettings = (customConfig) => {
  const config = {
    input: '请输入',
    select: '请选择',

    required: '{label}不得为空',
    type: '{label}格式有误',
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

    whitespace: { whitespace: true },
    string: { type: 'string' },
    number: { pattern: /^\d+$/ },
    array: { type: 'array' },
    email: { type: 'email' },
    phone: { pattern: /^1[3456789]\d{9}$/, validateTrigger: 'onBlur' },
    id: { pattern: /^\d+x?$/i },
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
  'dependencies',
  'extra',
  'getValueFromEvent',
  'getValueProps',
  'hasFeedback',
  'help',
  'htmlFor',
  'initialValue',
  'noStyle',
  'label',
  'labelAlign',
  'labelCol',
  'name',
  'preserve',
  'normalize',
  'required',
  'rules',
  'shouldUpdate',
  'trigger',
  'validateFirst',
  'validateStatus',
  'validateTrigger',
  'valuePropName',
  'wrapperCol',
  'hidden',

  'prefixCls',
  'style',
  'className',
  'id',
  'fieldKey',
];

const ownPropMap = {
  ownClass: 'className',
  ownStyle: 'style',
  ownName: 'name',
};
const splitProps = (mixedProps) => {
  const itemProps = {};
  const ownProps = { ...mixedProps };

  itemPropList.forEach((key) => {
    const val = mixedProps[key];
    if (val !== undefined) itemProps[key] = val;
    delete ownProps[key];
  });
  Object.entries(ownPropMap).forEach(([key, realKey]) => {
    const val = mixedProps[key];
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
  const { data, config, cols, disabledNames, children: formChildren, ...restFormProps } = props;

  const settings = useMemo(() => getSettings(config), [config]);
  const ui = useMemo(() => {
    let layout;
    let offsetLayout;
    if (cols && cols.length === 2) {
      const [leftSpan, rightSpan] = cols;
      layout = { labelCol: { span: leftSpan }, wrapperCol: { span: rightSpan } };
      offsetLayout = { wrapperCol: { offset: leftSpan, span: rightSpan } };
    }
    return { layout, offsetLayout };
  }, [cols]);

  let launch = noop;

  /**
   * 转换 `tip`，包装 addon
   */
  const setTipAddon = useCallback(
    (isValid, displayName, nodeProps, label = '') => {
      if (!isValid) return;
      const { shortTip, addonList } = settings.roleMap[displayName];

      // `tip`
      if (shortTip) {
        const { tip } = nodeProps;
        if (tip === 'short') {
          nodeProps.tip = shortTip;
        } else if (tip === 'full') {
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
    },
    [launch, settings.roleMap]
  );

  /**
   * 生成校验信息
   */
  const getRules = useCallback(
    (rules, label = '', hasPhone) =>
      rules.map((rule) => {
        if (typeof rule !== 'string') return rule;

        let ruleObj;

        // e.g. 'max=10'
        if (rule.includes('=')) {
          const [key, val] = rule.split('=');
          const getRule = settings.ruleNumMap[key];
          if (getRule) ruleObj = getRule(val);
        } else {
          // e.g. 'required'
          const getRule = settings.ruleTypeMap[rule];
          if (getRule) ruleObj = getRule(label);
        }

        if (ruleObj) {
          if (hasPhone && !ruleObj.validateTrigger) ruleObj.validateTrigger = 'onChange';
          return ruleObj;
        }

        return rule;
      }),
    [settings.ruleNumMap, settings.ruleTypeMap]
  );

  /**
   * 核心渲染工厂
   */
  const factory = useCallback(
    (node, isOuter) => {
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
        const renderProps = typeof children === 'function';
        const newChildren = renderProps ? (...args) => launch(children(...args)) : launch(children);
        return { ...node, props: { ...restNodeProps, children: newChildren } };
      }

      /**
       * Ant Plus Form.Item
       */
      const { rules, ...mixedProps } = restNodeProps;
      if (Array.isArray(rules)) {
        const hasPhone = rules.includes('phone');
        mixedProps.rules = getRules(rules, label, hasPhone);
        if (hasPhone) mixedProps.validateTrigger = ['onChange', 'onBlur'];
      }
      const mixedLayout = isOuter && !label && ui.offsetLayout;

      // render props
      if (typeof children === 'function') {
        const renderNode = (...args) => launch(children(...args));
        return (
          <Ant.Form.Item {...mixedLayout} {...mixedProps}>
            {renderNode}
          </Ant.Form.Item>
        );
      }

      // element
      const { itemProps, ownProps } = splitProps(mixedProps);
      setTipAddon(isValid, displayName, ownProps, label);
      const disabled = disabledNames === 'all' || (hasName && hasItem(disabledNames, name));
      if (disabled) ownProps.disabled = true;
      const itemLayout = isOuter && !label && ui.offsetLayout;

      const ownNode = { ...node, props: { ...ownProps, children: launch(children) } };
      return (
        <Ant.Form.Item {...itemLayout} {...itemProps}>
          {ownNode}
        </Ant.Form.Item>
      );
    },
    [disabledNames, getRules, launch, setTipAddon, ui.offsetLayout]
  );

  /**
   * 渲染工厂入口
   */
  launch = useMemo(
    () => (node, isOuter) => {
      if (typeof node !== 'object' || node === null) return node;
      if (hasLength(node)) return Children.map(node, (one) => factory(one, isOuter));
      return factory(node, isOuter);
    },
    [factory]
  );

  /**
   * Form
   */
  return (
    <Ant.Form initialValues={data} {...ui.layout} {...restFormProps} ref={ref}>
      {launch(formChildren, true)}
    </Ant.Form>
  );
});

Form.propTypes = {
  /** `initialValues` 简写 */
  data: t.object,
  /** 设置统一的 `placeholder` 信息与 `rules` 校验提示信息。详见下文 **config** */
  config: t.object,
  /** labelCol 与 wrapperCol span 的数值。e.g. cols=[8, 16] → labelCol={ span: 8 } wrapperCol={ span: 16 } */
  cols: t.arrayOf(t.number),
  /** 禁用的表单域，传入 `name` 组成的数组。全部禁用传入字符串 `'all'` */
  disabledNames: t.array,
};

Form.defaultProps = {};

/**
 * Input - Ant Design Input (TextArea) 组件增强版本
 * https://ant.design/fns/input-cn/
 */
const Input = forwardRef((props, ref) => {
  const { max, tip, auto, textarea, rows, floatingLabel, ...restProps } = props;
  const { id, onChange, disabled } = restProps;

  const hasCount = useMemo(() => typeof max === 'number' && disabled !== true, [disabled, max]);
  const hasFloating = useMemo(() => typeof floatingLabel === 'string', [floatingLabel]);
  const isRawInput = useMemo(() => !hasCount && !hasFloating, [hasCount, hasFloating]);

  const [count, setCount] = useState(() => {
    if (isRawInput) return null;
    const { defaultValue, value } = restProps;
    if (typeof value === 'string') return value.length;
    if (typeof defaultValue === 'string') return defaultValue.length;
    return 0;
  });

  const extraProps = useMemo(() => {
    if (isRawInput) return null;
    const obj = {
      onChange: (event) => {
        setCount(event.target.value.length);
        if (typeof onChange === 'function') return onChange(event);
      },
    };
    if (hasFloating && !id) obj.id = floatingLabel;
    return obj;
  }, [floatingLabel, hasFloating, id, isRawInput, onChange]);

  const inputComponent = useMemo(
    () =>
      textarea !== true ? (
        <Ant.Input placeholder={tip} autoComplete={auto} {...restProps} {...extraProps} ref={ref} />
      ) : (
        <Ant.Input.TextArea
          placeholder={tip}
          autoSize={{ minRows: rows }}
          {...restProps}
          {...extraProps}
          ref={ref}
        />
      ),
    [auto, extraProps, ref, restProps, rows, textarea, tip]
  );

  if (isRawInput) return inputComponent;

  return (
    <div
      className={`ant-plus-input-wrapper ${hasCount ? 'has-count' : ''} ${
        hasFloating && count > 0 ? 'is-floating' : ''
      }`}
    >
      {inputComponent}
      {hasFloating && (
        <label className="floating-label" htmlFor={id || floatingLabel}>
          {floatingLabel}
        </label>
      )}
      {hasCount && (
        <span className={`count ${count > max ? 'red' : ''}`}>
          {count} | {max}
        </span>
      )}
    </div>
  );
});

Input.propTypes = {
  /** 最大可输入字符数（若传入则显示字符计数器） */
  max: t.number,
  /** `placeholder` 简写（在 Ant Plus `Form` 内时，可传入 `'short'` 或 `'full'`。转义：`'short'` → `'请输入'`, `'full'` → `'请输入XX'`, `'其它'` → `'其它'`） */
  tip: t.string,
  /** `autoComplete` 简写（关闭需传入 `'off'`） */
  auto: t.string,
  /** 展示为 Material Design 风格输入框，传入的字符串将为动态 label */
  floatingLabel: t.string,
  /** 默认为 `Input` 组件，若传入 `textarea`，则为 `Input.TextArea` 组件 */
  textarea: t.bool,
  /** `Input.TextArea` 的输入框行高 */
  rows: t.number,
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

  const searchProps = useMemo(() => {
    if (search !== true) return null;
    return { filterOption: (val, option) => option.value.includes(val) };
  }, [search]);

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
  data: t.array,
  /** `placeholder` 简写（在 Ant Plus `Form` 内时，可传入 `'short'` 或 `'full'`。转义：`'short'` → `'请输入'`, `'full'` → `'请输入XX'`, `'其它'` → `'其它'`） */
  tip: t.string,
  /** 是否可搜索 */
  search: t.bool,
  /** `allowClear` 简写 */
  clear: t.bool,
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

  const searchProps = useMemo(() => {
    if (search !== true) return null;
    return {
      showSearch: true,
      filterOption: (val, option) => option.children.includes(val),
    };
  }, [search]);

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
        data.map(({ [value]: val, [label]: text, ...restItem }) => (
          <Ant.Select.Option key={val} value={val} {...restItem}>
            {text}
          </Ant.Select.Option>
        ))}
    </Ant.Select>
  );
});

Select.propTypes = {
  /** 列表数据源 */
  data: t.array,
  /** 当数据源的键不是 `'value'` `'label'` 时传入。e.g. 数据源 `[{ val: 1, text: 'A'}, { val: 2, text: 'B'}]，则传入 ['val', 'text']` */
  keys: t.array,
  /** `placeholder` 简写（在 Ant Plus `Form` 内时，可传入 `'short'` 或 `'full'`。转义：`'short'` → `'请输入'`, `'full'` → `'请输入XX'`, `'其它'` → `'其它'`） */
  tip: t.string,
  /** 是否可搜索 */
  search: t.bool,
  /** `allowClear` 简写 */
  clear: t.bool,
  /** `notFoundContent` 简写 */
  empty: t.string,
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
  const { targetKeys, value } = restProps;

  const searchProps = useMemo(() => {
    if (search !== true) return null;
    return {
      showSearch: true,
      filterOption: (val, option) => `${option.title}${option.description || ''}`.includes(val),
    };
  }, [search]);

  restProps.targetKeys = useMemo(() => {
    return targetKeys || value;
  }, [targetKeys, value]);

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
  data: t.array,
  /** `'未选择XX'` `'已选择XX'` 的 `'XX'` 文案 */
  title: t.string,
  /** 是否可搜索 */
  search: t.bool,
  /** `local.itemUnit` 与 `local.itemsUnits` 简写，默认：`'项'` */
  unit: t.string,
  /** `locale.searchPlaceholder` 简写（不支持 `'short'` `'full'`） */
  searchTip: t.string,
  /** `locale.notFoundContent` 简写 */
  empty: t.string,
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

  useLayoutEffect(() => {
    if (last !== true) return;

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
  }, [childrenKey, data, last, restProps, valueKey]);

  const searchProps = useMemo(() => {
    if (search !== true) return null;
    return {
      showSearch: { filter: (val, path) => path.some((option) => option[labelKey].includes(val)) },
    };
  }, [labelKey, search]);

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
  data: t.array,
  /** 当数据源的键不是 `'value'` `'label'` `'children'` 时传入 */
  keys: t.array,
  /** `placeholder` 简写（不支持 `'short'` `'full'`） */
  tip: t.string,
  /** 是否可搜索 */
  search: t.bool,
  /** `allowClear` 简写 */
  clear: t.bool,
  /** `notFoundContent` 简写 */
  empty: t.string,
  /** `value` 取数组最后一个值，默认为整体数组 */
  last: t.bool,
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

  useLayoutEffect(() => {
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
  }, [childrenKey, data, restProps.value, titleKey, valueKey]);

  const searchProps = useMemo(() => {
    if (search !== true) return null;
    return {
      showSearch: true,
      filterTreeNode: (val, node) => new RegExp(val, 'i').test(`${node.value}${node.title}`),
    };
  }, [search]);

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
  data: t.array,
  /** 当数据源的键不是 `'value'` `'title'` `'children'` 时传入 */
  keys: t.array,
  /** `placeholder` 简写（不支持 `'short'` `'full'`） */
  tip: t.string,
  /** 是否可搜索 */
  search: t.bool,
  /** `allowClear` 简写 */
  clear: t.bool,
  /** `notFoundContent` 简写 */
  empty: t.string,
  /** `treeCheckable` 简写 */
  checkbox: t.bool,
  /** `treeDefaultExpandAll` 简写 */
  expandAll: t.bool,
  /** `treeDefaultExpandedKeys` 简写 */
  expandKeys: t.array,
  /** `showCheckedStrategy` 简写 */
  showType: t.oneOf([
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
export { Form, Input, AutoComplete, Select, Transfer, Cascader, TreeSelect };
