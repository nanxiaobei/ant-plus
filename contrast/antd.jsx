/* eslint-disable */

import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const options = [{ value: 1, label: '男' }, { value: 2, label: '女' }];

const Demo = ({ form }) => (
  <Form>
    <Form.Item label="用户名">
      {form.getFieldDecorator('username', {
        rules: [
          { required: true, message: '用户名不得为空' },
          { max: 10, message: '不得超过 10 个字' },
        ],
        initialValue: 'Emily',
      })(<Input placeholder="请输入用户名" />)}
    </Form.Item>
    <Form.Item label="性别">
      {form.getFieldDecorator('gender', {
        rules: [
          { required: true, message: '性别不得为空' },
          { pattern: /^\d+$/, whitespace: true, message: '性别格式有误' },
        ],
        initialValue: 2,
      })(
        <Select placeholder="请选择性别">
          {options.map(({ value, label }) => (
            <Select.Option value={value}>{label}</Select.Option>
          ))}
        </Select>,
      )}
    </Form.Item>
    <Button htmlType="submit">提交</Button>
  </Form>
);

export default Form.create()(Demo);
