import React from "react";
import { Layout as AntLayout } from "antd";
import styles from "./Layout.module.scss";
import { Header } from "../Header";

type TProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<TProps> = ({ children }) => {
  return (
    <div className={styles.main}>
      <Header />
      <AntLayout.Content style={{ height: "100vh" }}>
        {children}
      </AntLayout.Content>
    </div>
  );
};
