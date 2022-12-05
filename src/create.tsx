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
  | 'warningOnly'
  | 'whitespace'
  | 'string'
  | 'number'
  | 'boolean'
  | 'url'
  | 'email'
  | `len=${number}` // len === val
  | `max=${number}` // max <= val
  | `min=${number}` // min >= val
  // number custom
  | `max<${number}` // max < val
  | `min>${number}` // min > val
  | FormRule;

const metaRuleMap = {
  required: { required: true },
  warningOnly: { warningOnly: true },
  whitespace: { whitespace: true },

  string: { type: 'string' },
  number: { type: 'number' },
  boolean: { type: 'boolean' },
  url: { type: 'url' },
  email: { type: 'email' },
};

const getShortRule = memoize((rule: string) => {
  if (rule in metaRuleMap) {
    return metaRuleMap[rule as keyof typeof metaRuleMap];
  }

  if (rule.includes('=')) {
    const [key, val] = rule.split('=');

    if (key === 'len' || key === 'min' || key === 'max') {
      return { [key]: +val };
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

const createRules = (rules: PlusShortRule[]): FormItemProps['rules'] => {
  const requiredRule = {};
  const otherRule = {};
  const ruleList = [];

  rules.forEach((rule) => {
    if (typeof rule === 'string') {
      const ruleObj = rule === 'required' ? requiredRule : otherRule;
      Object.assign(ruleObj, getShortRule(rule));
    } else {
      ruleList.push(rule);
    }
  });

  if (Object.keys(otherRule).length > 0) {
    ruleList.unshift(otherRule);
  }

  if (Object.keys(requiredRule).length > 0) {
    ruleList.unshift(requiredRule);
  }

  return ruleList;
};

// ─── Form.Item & Field ↓↓↓ ───────────────────────────────────────────────────
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
            const itemVal = key === 'rules' && val ? createRules(val) : val;
            itemProps[key as keyof FormItemProps] = itemVal;
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
