import { css } from 'docz-plugin-css';

export default {
  src: './docz',
  dest: './docs',
  base: '/ant-plus',
  title: 'Ant Plus',
  description: 'Enhanced Ant Design Form',
  codeSandbox: false,
  hashRouter: true,
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
    babelrc.plugins.push(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }]);
    return babelrc;
  },
  htmlContext: {
    favicon: '/ant-plus/public/favicon.ico',
  },
  sourcemaps: false,
  menu: [
    '快速开始',
    'Form 表单',
    'Input 输入框',
    'AutoComplete 自动完成',
    'Select 选择器',
    'Transfer 穿梭框',
    'Cascader 级联选择',
    'TreeSelect 树选择',
  ],
};
