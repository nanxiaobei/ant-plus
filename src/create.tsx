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

// ─── rules ↓↓↓ ───────────────────────────────────────────────────────────────
export type PlusShortRule =
  | 'required'
  | `required=${string}`
  | 'string'
  | 'pureString'
  | 'number'
  | 'array'
  | 'boolean'
  | 'url'
  | 'email'
  | `len=${number}` // len === val
  | `max=${number}` // max <= val
  | `min=${number}` // min >= val
  | FormRule;

const miscTypeMap: Record<string, FormRule> = {
  boolean: { type: 'boolean' },
  url: { type: 'url' },
  email: { type: 'email' },
};

const numTypeMap: Record<string, FormRule> = {
  string: { type: 'string', whitespace: true },
  pureString: { type: 'string' },
  number: { type: 'number' },
  array: { type: 'array' },
};

const getRules = (rules: PlusShortRule[]): FormRule[] => {
  const ruleList: FormRule[] = [];
  let numTypeRule: FormRule | null = null;
  let numValRules: FormRule[] = [];

  rules.forEach((rule) => {
    if (typeof rule !== 'string') {
      ruleList.push(rule);
      return;
    }

    if (rule === 'required') {
      ruleList.push({ required: true });
      return;
    }

    if (rule in miscTypeMap) {
      ruleList.push(miscTypeMap[rule]);
      return;
    }

    if (rule in numTypeMap) {
      numTypeRule = numTypeMap[rule];
      return;
    }

    const [key, val] = rule.split('=');

    if (val === undefined) {
      return;
    }

    if (key === 'required') {
      ruleList.push({ required: true, message: val });
      return;
    }

    if (key === 'len' || key === 'min' || key === 'max') {
      numValRules.push({ [key]: +val });
      return;
    }
  });

  if (numTypeRule && numValRules.length > 0) {
    ruleList.push(...numValRules.map((obj) => ({ ...numTypeRule, ...obj })));
  } else if (numTypeRule) {
    ruleList.push(numTypeRule);
  } else if (numValRules.length > 0) {
    ruleList.push(...numValRules);
  }

  return ruleList;
};

// ─── Form.Item & Field ↓↓↓ ───────────────────────────────────────────────────
type ConflictProps = 'className' | 'style' | 'name';

type ReplaceProps = {
  selfClass?: string;
  selfStyle?: CSSProperties;
  selfName?: string;
};

export type PlusProps<P> = Omit<P, ConflictProps> &
  ReplaceProps &
  Omit<FormItemProps, 'rules'> & { rules?: PlusShortRule[] };

const replaceMap: Record<keyof ReplaceProps, ConflictProps> = {
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

const formItemProps = formItemKeys.reduce(
  (obj, key) => {
    obj[key] = true;
    return obj;
  },
  {} as Record<keyof FormItemProps, boolean>,
);

const create = <T extends JSXElementConstructor<any>>(
  Field: T,
  getDefaultFieldProps?: (p: ComponentProps<T>) => Partial<ComponentProps<T>>,
) => {
  type P = ComponentProps<T>;

  const ItemField = forwardRef(
    (props: PlusProps<P>, ref: ForwardedRef<unknown>) => {
      const itemProps: FormItemProps = {};
      const fieldProps: P = {} as P;

      // split props
      if (props) {
        Object.keys(props).forEach((key) => {
          const { [key]: val } = props;

          if (key in formItemProps) {
            const itemKey = key as keyof FormItemProps;
            itemProps[itemKey] = key === 'rules' && val ? getRules(val) : val;
          } else {
            const fieldKey = replaceMap[key as keyof ReplaceProps] || key;
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
    },
  );

  Object.keys(Field).forEach((key) => {
    if (!(key in ItemField)) {
      (ItemField as any)[key] = (Field as any)[key];
    }
  });

  return ItemField as Omit<T, 'label'> & typeof ItemField;
};

export default create;
