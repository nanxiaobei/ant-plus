import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Form } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { NamePath, Store } from 'antd/es/form/interface';

const { Item } = Form;

// https://github.com/react-component/field-form/blob/master/src/utils/typeUtil.ts
function toArray<T>(value?: T | T[] | null): T[] {
  if (value === undefined || value === null) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

// https://github.com/react-component/util/blob/master/src/utils/get.ts
function get(
  entity: any,
  path: (string | number)[] | readonly (string | number)[]
) {
  let current = entity;

  for (let i = 0; i < path.length; i += 1) {
    if (current === null || current === undefined) {
      return undefined;
    }

    current = current[path[i]];
  }

  return current;
}

const valOf = (values: Store, name: NamePath) => {
  const namePath = toArray(name);
  return get(values, namePath);
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
  const { name, list, children, onlyValid = false, onChange } = props;

  const hasName = !Array.isArray(list);
  const prev = useRef(hasName ? undefined : list.map(() => undefined));

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

        const next = hasName
          ? name && form.getFieldValue(name)
          : list.map((key) => key && form.getFieldValue(key));

        let hasChange;
        let hasValidValue = false;
        let changeEffect = null;

        if (hasName) {
          hasChange = next !== prev.current;
          hasValidValue = next !== undefined;
        } else {
          hasChange = next.some((val: any, index: number) => {
            hasValidValue = val !== undefined;
            return val !== prev.current?.[index];
          });
        }

        const cachePrev = prev.current;

        if (hasChange) {
          prev.current = next;

          if (onChange) {
            const ChangeEffect = () => {
              useEffect(() => onChange(next, cachePrev, form), []);
              return null;
            };
            changeEffect = <ChangeEffect />;
          }
        }

        if (!onlyValid || (onlyValid && hasValidValue)) {
          return (
            <>
              {children?.(next, cachePrev, form)}
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
