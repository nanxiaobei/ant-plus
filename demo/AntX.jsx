import React from 'react';
import { Button } from 'antd';
import { Form, Input, Select } from 'antx';

const options = [
  { value: 1, label: '男' },
  { value: 2, label: '女' },
];

const Demo = () => (
  <Form cols={[8, 16]} data={{ name: 'Emily', sex: 2 }}>
    <Input label="用户名" name="name" rules={['required', 'max=10']} tip="full" />
    <Select label="性别" name="sex" rules={['number']} data={options} tip="full" />
    <Button label="" type="primary" htmlType="submit">
      提交
    </Button>
  </Form>
);

export default Demo;
