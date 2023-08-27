import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import { CustomInput } from "../CustomInput";
import { ErrorMessage } from "../ErrorMessage";
import { CustomButton } from "../CustomButton";

type TProps<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
};
export const EmployeeForm = ({
  onFinish,
  title,
  btnText,
  error,
  employee,
}: TProps<Employee>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <CustomInput type="text" name="firstName" placeholder="Name" />
        <CustomInput type="text" name="lastName" placeholder="Surname" />
        <CustomInput type="number" name="age" placeholder="Age" />
        <CustomInput type="text" name="address" placeholder="Address" />
        <Space>
          <ErrorMessage message={error} />
          <CustomButton htmlType="submit">{btnText}</CustomButton>
        </Space>
      </Form>
    </Card>
  );
};
