import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Auth } from "./features/auth/auth";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Auth>
          <Router>
            <App />
          </Router>
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
