import React from 'react';
import { Form, Input, Select, Button } from 'antd';

const Demo = ({ form }) => (
  <Form api={form} data={{ username: 'Emily', gender: 2 }}>
    <Input
      label="姓名"
      id="username"
      rules={['required', 'string', 'max=10']}
      max={10}
      msg="full"
    />
    <Select
      label="性别"
      id="gender"
      rules={['required', 'number']}
      data={[{ id: 1, type: '男' }, { id: 2, type: '女' }]}
      keys={['id', 'type']}
      msg="full"
    />
    <Button htmlType="submit">提交</Button>
  </Form>
);

export default Form.create()(Demo);
