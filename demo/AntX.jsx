import React from 'react';
import { Form, Input, Select, Button } from 'antx';

const data = [
  { value: 1, label: '男' },
  { value: 2, label: '女' },
];

const Demo = () => (
  <Form data={{ name: 'Emily', sex: 2 }}>
    <Input label="用户名" name="name" rules={['required', 'max=10']} tip="full" />
    <Select label="性别" name="sex" rules={['number']} data={data} tip="full" />
    <Button label="" type="primary" htmlType="submit">
      提交
    </Button>
  </Form>
);

export default Demo;
