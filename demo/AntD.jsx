import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
const tailLayout = { wrapperCol: { offset: 8, span: 16 } };

const options = [
  { value: 1, label: '男' },
  { value: 2, label: '女' },
];

const Demo = () => (
  <Form {...layout} initialValues={{ username: 'Emily', sex: 2 }}>
    <Form.Item
      label="用户名"
      name="username"
      rules={[
        { required: true, message: '用户名不得为空' },
        { max: 10, message: '不得超过 10 个字' },
      ]}
    >
      <Input placeholder="请输入用户名" />
    </Form.Item>
    <Form.Item
      label="性别"
      name="sex"
      rule={[{ pattern: /^\d+$/, whitespace: true, message: '性别格式有误' }]}
    >
      <Select placeholder="请选择性别">
        {options.map(({ value, label }) => (
          <Select.Option value={value} key={value}>
            {label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form.Item>
  </Form>
);

export default Demo;
