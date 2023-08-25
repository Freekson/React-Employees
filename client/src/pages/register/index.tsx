import React from "react";
import { Layout } from "../../components/Layout";
import { Card, Form, Row, Space, Typography } from "antd";
import { CustumInput } from "../../components/CustomInput";
import { PasswordInput } from "../../components/PasswordInput";
import { CustomButton } from "../../components/CustomButton";
import { Link } from "react-router-dom";
import { Path } from "../../paths";

export const Register: React.FC = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Register" style={{ width: "30rem", marginTop: "2rem" }}>
          <Form onFinish={() => null}>
            <CustumInput name="name" placeholder="Name" />
            <CustumInput name="email" type="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
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
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
