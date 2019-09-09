/* eslint-disable */

import React from 'react';
import { Form, Input, Select, Button } from 'antx';

const options = [{ value: 1, label: '男' }, { value: 2, label: '女' }];

const Demo = ({ form }) => (
  <Form api={form} data={{ username: 'Emily', gender: 2 }}>
    <Input label="用户名" id="username" rules={['required', 'max=10']} max={10} msg="full" />
    <Select label="性别" id="gender" rules={['required', 'number']} data={options} msg="full" />
    <Button htmlType="submit">提交</Button>
  </Form>
);

export default Form.create()(Demo);
