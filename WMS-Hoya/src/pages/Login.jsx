import React from "react";
import "../styles/login.css";
import { Form, Input, Button, ConfigProvider, message } from "antd";
import { useNavigate } from "react-router-dom";
import AITECH from "/logo.jpg";
import { testUser } from "../assets/testUser";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const user = testUser.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      message.success("Login successful");
      navigate("/");
    } else {
      message.error("Invalid username or password");
    }
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#DA251C" } }}>
      <div className="login-container">
        <img src={AITECH} alt="AITECH" className="login-logo" />
        <h2 className="login-title">Hoya WMS - Login</h2>
        <div className="login-form">
          <Form onFinish={onFinish}>
            <Form.Item rules={[{ required: true }]} name="username">
              <Input size="large" placeholder="Username" />
            </Form.Item>
            <Form.Item rules={[{ required: true }]} name="password">
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "100%" }}
            >
              Login
            </Button>
          </Form>
        </div>
        <p className="login-footer">
          Copyright © {new Date().getFullYear()} A.I. TECHNOLOGY All rights
          reserved.
        </p>
      </div>
    </ConfigProvider>
  );
};

export default Login;
