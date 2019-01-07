import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const App = ({ form }) => (
  <Form>
    <Form.Item label="姓名">
      {form.getFieldDecorator('name', {
        rules: [
          { required: true, message: '姓名不得为空' },
          { type: 'string', whitespace: true, message: '姓名格式有误' },
          { max: 10, message: '不得超过 10 个字' },
        ],
        initialValue: 'Emily',
      })(
        <Input placeholder="请输入姓名" />,
      )}
    </Form.Item>
    <Form.Item label="性别">
      {form.getFieldDecorator('sex', {
        rules: [
          { required: true, message: '性别不得为空' },
          { pattern: /^\d+$/, whitespace: true, message: '姓名格式有误' },
        ],
        initialValue: 2,
      })(
        <Select placeholder="请选择性别">
          <Select.Option value={1}>男</Select.Option>
          <Select.Option value={2}>女</Select.Option>
        </Select>,
      )}
    </Form.Item>
    <Button htmlType="submit">提交</Button>
  </Form>
);

export default Form.create()(App);
