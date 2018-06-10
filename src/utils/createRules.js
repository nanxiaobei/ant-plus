const emptyWarning = '不得为空';
const wrongWarning = '格式有误';

/**
 * fieldRules - 表单域验证规则生成工具
 */
export const fieldRules = {
  required: label => ({ required: true, message: `${label}${emptyWarning}` }),
  string: label => ({ type: 'string', whitespace: true, message: `${label}${wrongWarning}` }),
  number: label => ({ pattern: /^-*\d+$/, whitespace: true, message: `${label}${wrongWarning}` }),
  array: label => ({ type: 'array', message: `${label}的值需为数组` }),
  email: () => ({ type: 'email', whitespace: true, message: `邮件地址${wrongWarning}` }),
  max: num => ({ max: num, message: `不得超过 ${num} 个字` }),
  phone: () => ({ pattern: /^1[3456789]\d{9}$/, whitespace: true, message: `手机号${wrongWarning}` }), // 手机号
  id: () => ({ pattern: /^\d+x?$/i, whitespace: true, message: `身份证${wrongWarning}` }), // 身份证
};

/**
 * createRules - 根据表单域简写 `rules` 属性生成完整验证规则 (配合 AntPlus.Form 组件使用)
 */
const createRules = (label, rules) => Array.isArray(rules) && rules.length > 0 &&
  rules.map(rule => {
    if (typeof rule !== 'string') return rule;
    // e.g. "number"
    if (!rule.includes('=')) return fieldRules[rule](label);
    // e.g. "max=5"
    const [key, val] = rule.split('=');
    return fieldRules[key](+val);
  });

export default createRules;
