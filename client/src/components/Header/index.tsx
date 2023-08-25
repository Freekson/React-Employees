import React from "react";
import styles from "./Header.module.scss";
import { Layout, Space, Typography } from "antd";
import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { CustomButton } from "../CustomButton";
import { Link } from "react-router-dom";
import { Path } from "../../paths";

export const Header: React.FC = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Path.home}>
          <CustomButton type="ghost">
            <Typography.Title level={1}>Employees</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      <Space>
        <Link to={Path.register}>
          <CustomButton type="ghost" icon={<UserOutlined />}>
            Register
          </CustomButton>
        </Link>
        <Link to={Path.login}>
          <CustomButton type="ghost" icon={<LoginOutlined />}>
            Login
          </CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  );
};
