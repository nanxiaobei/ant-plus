import { css } from 'docz-plugin-css';

export default {
  src: './mdx',
  dest: './docs',
  base: '/ant-plus/',
  title: '🚀 Ant Plus',
  description: 'Enhanced Ant Design Form',
  codeSandbox: false,
  menu: [
    'Getting Started',
    'Form',
    'Input',
    'AutoComplete',
    'Select',
    'Transfer',
    'Cascader',
    'TreeSelect',
    'Checkbox.Group',
  ],
  plugins: [
    css(),
    css({
      preprocessor: 'less',
      loaderOpts: {
        javascriptEnabled: true,
      },
    }),
    css({
      preprocessor: 'sass',
    }),
  ],
  modifyBabelRc: (babelrc) => {
    babelrc.plugins.unshift([
      'import',
      { libraryName: 'antd', libraryDirectory: 'es', style: 'css' },
    ]);
    return babelrc;
  },
};
