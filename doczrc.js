import { css } from 'docz-plugin-css';

export default {
  dest: './docs',
  title: '🚀 Ant Plus',
  description: 'Enhanced Ant Design Form',
  modifyBabelRc: (babelrc) => {
    babelrc.plugins.unshift([
      'import',
      { libraryName: 'antd', libraryDirectory: 'es', style: 'css' },
    ]);
    return babelrc;
  },
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
  codeSandbox: false,
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
};
