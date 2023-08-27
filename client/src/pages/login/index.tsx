import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { Card, Form, Row, Space, Typography } from "antd";
import { CustomInput } from "../../components/CustomInput";
import { PasswordInput } from "../../components/PasswordInput";
import { CustomButton } from "../../components/CustomButton";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../paths";
import { UserData, useLoginMutation } from "../../redux/services/auth";
import { isErrorWithMessage } from "../../utils/isErrorWithMessage";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();
  const [error, setError] = useState("");

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
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
        <Card title="Enter" style={{ width: "30rem", marginTop: "5rem" }}>
          <Form onFinish={login}>
            <CustomInput name="email" type="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <CustomButton type="primary" htmlType="submit">
              Login
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Don't have an account? <Link to={Path.register}>Register</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
