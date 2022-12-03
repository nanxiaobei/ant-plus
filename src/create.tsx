import { forwardRef } from 'react';
import type {
  ComponentProps,
  ComponentType,
  CSSProperties,
  ForwardedRef,
  JSXElementConstructor,
} from 'react';
import { Form } from 'antd';
import type { FormItemProps, FormRule } from 'antd';

const { Item } = Form;

// https://github.com/lodash/lodash/blob/master/memoize.js
const memoize = <T extends (...args: any[]) => any>(func: T) => {
  const cache = new Map();

  return ((...args) => {
    const key = args[0];

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

// ─── rules ↓↓↓ ───────────────────────────────────────────────────────────────
export type PlusShortRule =
  | 'required'
  | `required=${string}`
  | 'string'
  | 'number'
  // string
  | `strLen=${number}` // string length === len
  | `strMax=${number}` // string length <= max
  | `strMin=${number}` // string length >= min
  // number
  | `len=${number}` // number === val
  | `max=${number}` // number max <= val
  | `min=${number}` // number min >= val
  // number custom
  | `max<${number}` // number max < val
  | `min>${number}` // number min > val
  | FormRule;

// 自定义短语 rules
// 使用示例：rules={['required', 'required=X is required', 'strMax=50']}
const ruleMap = {
  required: { required: true },
  string: { type: 'string', whitespace: true },
  number: { type: 'number' },
  url: { type: 'url' },
  email: { type: 'email' },
};

const getShortRule = memoize((rule: string) => {
  if (rule in ruleMap) {
    return ruleMap[rule as keyof typeof ruleMap];
  }

  if (rule.includes('=')) {
    const [key, val] = rule.split('=');
    if (key === 'required') {
      return { required: true, message: val };
    }

    if (key === 'strLen' || key === 'strMax' || key === 'strMin') {
      const newKey = key.replace('str', '').toLowerCase();
      return { type: 'string', whitespace: true, [newKey]: +val };
    }

    if (key === 'len' || key === 'min' || key === 'max') {
      return { type: 'number', [key]: +val };
    }
  }

  if (rule.includes('min>')) {
    const [, val] = rule.split('min>');
    return {
      type: 'number',
      validator: (_, value) => {
        if (typeof value !== 'number' || value > +val) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(`Must be greater than ${val}`));
      },
    } as FormRule;
  }

  if (rule.includes('max<')) {
    const [, rawVal] = rule.split('max<');
    const val = +rawVal;

    return {
      type: 'number',
      validator: (_, value) => {
        if (typeof value !== 'number' || value < val) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(`Must be less than ${val}`));
      },
    } as FormRule;
  }

  return {};
});

// createRules - 处理自定义短语 rules
const createRules = (rules: PlusShortRule[]): FormItemProps['rules'] => {
  const requiredRule = {};
  const otherRules = {};
  const ruleList = [];

  rules.forEach((rule) => {
    if (typeof rule === 'string') {
      const ruleObj = rule.startsWith('required') ? requiredRule : otherRules;
      Object.assign(ruleObj, getShortRule(rule));
    } else {
      ruleList.push(rule);
    }
  });

  if (Object.keys(otherRules).length > 0) {
    ruleList.unshift(otherRules);
  }

  if (Object.keys(requiredRule).length > 0) {
    ruleList.unshift(requiredRule);
  }

  return ruleList;
};

// ─── Form.Item & field ↓↓↓ ───────────────────────────────────────────────────
type FixFieldProps = {
  selfClass?: string;
  selfStyle?: CSSProperties;
  selfName?: string;
};

type ConflictFieldProps = 'className' | 'style' | 'name';

type NewFieldProps<P> = Omit<P, ConflictFieldProps> & FixFieldProps;

type NewItemProps = Omit<FormItemProps, 'rules'> & { rules?: PlusShortRule[] };

export type PlusFieldProps<P> = NewFieldProps<P> & NewItemProps;

const fixFieldProps: Record<keyof FixFieldProps, ConflictFieldProps> = {
  selfClass: 'className',
  selfStyle: 'style',
  selfName: 'name',
};

const formItemKeys = [
  'colon',
  'dependencies',
  'extra',
  'getValueFromEvent',
  'getValueProps',
  'hasFeedback',
  'help',
  'hidden',
  'htmlFor',
  'initialValue',
  'label',
  'labelAlign',
  'labelCol',
  'messageVariables',
  'name',
  'normalize',
  'noStyle',
  'preserve',
  'required',
  'rules',
  'shouldUpdate',
  'tooltip',
  'trigger',
  'validateFirst',
  'validateStatus',
  'validateTrigger',
  'valuePropName',
  'wrapperCol',

  // extra
  'className',
  'style',
] as (keyof FormItemProps)[];

const formItemProps = formItemKeys.reduce((obj, key) => {
  obj[key] = true;
  return obj;
}, {} as Record<keyof FormItemProps, boolean>);

const create = <T extends JSXElementConstructor<any>>(
  Field: T,
  getDefaultFieldProps?: (p: ComponentProps<T>) => Partial<ComponentProps<T>>
) => {
  type P = ComponentProps<T>;

  const ItemField = forwardRef(
    (props: PlusFieldProps<P>, ref: ForwardedRef<unknown>) => {
      const itemProps: FormItemProps = {};
      const fieldProps: P = {} as P;

      // split props
      if (props) {
        Object.keys(props).forEach((key) => {
          const { [key]: val } = props;

          if (key in formItemProps) {
            const itemKey = key as keyof FormItemProps;
            itemProps[itemKey] =
              val && key === 'rules' ? createRules(val) : val;
          } else {
            const fieldKey = fixFieldProps[key as keyof FixFieldProps] || key;
            fieldProps[fieldKey as keyof P] = val;
          }
        });
      }

      // default field props
      if (getDefaultFieldProps) {
        const extraFieldProps = getDefaultFieldProps(fieldProps);

        Object.keys(extraFieldProps).forEach((key) => {
          if (!(key in fieldProps)) {
            fieldProps[key as keyof P] = extraFieldProps[key] as P[keyof P];
          }
        });
      }

      const RawField = Field as ComponentType<P>;

      return (
        <Item {...itemProps}>
          <RawField {...fieldProps} ref={ref} />
        </Item>
      );
    }
  );

  Object.keys(Field).forEach((key) => {
    if (!(key in ItemField)) {
      (ItemField as any)[key] = (Field as any)[key];
    }
  });

  return ItemField as Omit<T, 'label'> & typeof ItemField;
};

export default create;
