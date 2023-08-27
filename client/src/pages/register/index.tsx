import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { Card, Form, Row, Space, Typography } from "antd";
import { CustomInput } from "../../components/CustomInput";
import { PasswordInput } from "../../components/PasswordInput";
import { CustomButton } from "../../components/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../paths";
import { useRegisterMutation } from "../../redux/services/auth";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../components/ErrorMessage";

type TRegister = Omit<User, "id"> & { confirmPassword: string };

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  const register = async (data: TRegister) => {
    try {
      await registerUser(data).unwrap();
      navigate("/");
    } catch (err) {
      const mayBeError = isErrorWithMessage(err);
      if (mayBeError) {
        setError(err.data.message);
      } else {
        setError("Unkown error");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Register" style={{ width: "30rem", marginTop: "2rem" }}>
          <Form onFinish={register}>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput name="email" type="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="password_confirm"
              placeholder="Confirm password"
            />
            <CustomButton type="primary" htmlType="submit">
              Register
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Have an account? <Link to={Path.login}>Login</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
