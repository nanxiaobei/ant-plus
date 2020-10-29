const fs = require('fs');
const path = require('path');
const dts = require('react-to-typescript-definitions');

let result = dts.generateFromFile('antx', path.resolve(__dirname, 'lib/index.jsx'), {
  babylonPlugins: ['optionalChaining'],
});

const importReact = "import * as React from 'react';";
result = result.replace(importReact, '');

const data = `
${importReact}
import { FormProps as AntFormProps } from 'antd/lib/form';
import { InputProps as AntInputProps } from 'antd/lib/input';
import { InputNumberProps as AntInputNumberProps } from 'antd/lib/input-number';
import { AutoCompleteProps as AntAutoCompleteProps } from 'antd/lib/auto-complete';
import { SelectProps as AntSelectProps, SelectValue } from 'antd/lib/select';
import { TransferProps as AntTransferProps } from 'antd/lib/transfer';
import { CascaderProps as AntCascaderProps } from 'antd/lib/cascader';
import { SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from 'rc-tree-select';
import {
  TreeSelectProps as AntTreeSelectProps,
  SelectValue as TreeSelectValue,
} from 'antd/lib/tree-select';

${result}`;

fs.writeFile('index.d.ts', data, (err) => {
  if (err) console.log(err);
});
