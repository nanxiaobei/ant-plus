const nameMsgMap = {
  'AntPlus.Input': '输入',
  'AntPlus.AutoComplete': '输入',
  'AntPlus.Select': '选择',
};

/**
 * createField - 格式化 AntPlus.Form 下的表单域
 */
const createField = (label, id, field, disabledFields) => {
  if (field.props.msg === undefined && disabledFields === undefined) return field;

  let fieldProps = field.props;
  // 若 msg (placeholder) 值为 `full`，进行转义
  if (
    fieldProps.msg !== undefined &&
    (fieldProps.msg === 'short' || fieldProps.msg === 'full')
  ) {
    const shortMsg = `请${nameMsgMap[field.type.displayName]}`;
    const msg = fieldProps.msg === 'short' ? shortMsg : `${shortMsg}${label}`;
    fieldProps = { ...fieldProps, msg, placeholder: msg };
  }

  // 若 disabledFields 值为 `all`、或为数组且包含当前表单域 `id`，添加 `disabled`
  if (
    disabledFields !== undefined &&
    (disabledFields === 'all' || (Array.isArray(disabledFields) && disabledFields.includes(id)))
  ) {
    fieldProps = { ...fieldProps, disabled: true };
  }

  // 返回格式化后的 field
  return { ...field, props: fieldProps };
};

export default createField;
