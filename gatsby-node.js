const path = require('path');

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: 'babel-plugin-import',
    options: {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    },
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        root: path.resolve(__dirname, '../'),
        antx: path.resolve(__dirname, '../lib'),
      },
    },
  });
};
