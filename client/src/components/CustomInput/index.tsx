import React from "react";
import { Form, Input } from "antd";

type TProps = {
  name: string;
  placeholder?: string;
  type?: string;
};

export const CustomInput: React.FC<TProps> = ({
  name,
  placeholder,
  type = "text",
}) => {
  return (
    <Form.Item
      name={name}
      rules={[{ required: true, message: "Required field" }]}
      shouldUpdate={true}
    >
      <Input placeholder={placeholder} type={type} size="large"></Input>
    </Form.Item>
  );
};
