import { Form } from 'antd';
import type { FormItemProps } from 'antd';

const { Item } = Form;

const WrapperCol = (props: FormItemProps) => {
  return <Item label={<span />} colon={false} {...props} />;
};

export default WrapperCol;
