import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Form } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { NamePath, Store } from 'antd/es/form/interface';
import { getNamePath, getValue } from 'rc-field-form/es/utils/valueUtil';

const { Item } = Form;

const valOf = (values: Store, name: NamePath) => {
  const namePath = getNamePath(name);
  return getValue(values, namePath);
};

type OnChange = (next: any, prev: any, form: FormInstance) => void;
type Children = (next: any, prev: any, form: FormInstance) => ReactNode;

export type WatchProps =
  | {
      name: NamePath;
      list?: never;
      children: Children;
      onlyValid?: boolean;
      onChange?: never;
    }
  | {
      name: NamePath;
      list?: never;
      children?: never;
      onlyValid?: never;
      onChange: OnChange;
    }
  | {
      name?: never;
      list: NamePath[];
      children: Children;
      onlyValid?: boolean;
      onChange?: never;
    }
  | {
      name?: never;
      list: NamePath[];
      children?: never;
      onlyValid?: never;
      onChange: OnChange;
    };

/**
 * Watch - 用于监听其它字段的值
 */
const Watch = (props: WatchProps) => {
  const {
    name, // 需监听的字段
    list = [], // 需监听的字段列表 (与 name 互斥)
    children, // 渲染函数 render props
    onlyValid = false, // 只在值非 undefined 时，触发 children 渲染
    onChange, // 变化时的回调，用于字段不在组件内的情况 (与 children 互斥)
  } = props;

  const hasName = 'name' in props;
  const prevVal = useRef(hasName ? undefined : list.map(() => undefined));

  return (
    <Item
      noStyle
      shouldUpdate={(prev, next) => {
        if (hasName) {
          return name ? valOf(prev, name) !== valOf(next, name) : true;
        }
        return list.some((key) => key && valOf(prev, key) !== valOf(next, key));
      }}
    >
      {(rawForm) => {
        const form = rawForm as FormInstance;

        const curVal = hasName
          ? name && form.getFieldValue(name)
          : list.map((key) => key && form.getFieldValue(key));

        let hasChange;
        let hasValidValue = false;
        let changeEffect = null;

        if (hasName) {
          hasChange = curVal !== prevVal.current;
          hasValidValue = curVal !== undefined;
        } else {
          hasChange = curVal.some((val: any, index: number) => {
            hasValidValue = val !== undefined;
            return val !== prevVal.current?.[index];
          });
        }

        const prev = prevVal.current;

        if (hasChange) {
          prevVal.current = curVal;

          if (onChange) {
            const ChangeEffect = () => {
              useEffect(() => onChange(curVal, prev, form), []);
              return null;
            };
            changeEffect = <ChangeEffect />;
          }
        }

        if (!onlyValid || (onlyValid && hasValidValue)) {
          return (
            <>
              {children?.(curVal, prev, form)}
              {changeEffect}
            </>
          );
        }

        return changeEffect;
      }}
    </Item>
  );
};

export default Watch;
