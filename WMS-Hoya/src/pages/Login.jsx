import React from "react";
import "../styles/login.css";
import { Form, Input, Button, ConfigProvider, message } from "antd";
import { useNavigate } from "react-router-dom";
import AITECH from "/Hoya.svg";
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
    <ConfigProvider theme={{ token: { colorPrimary: "#000000" } }}>
      <div className="flex-container">
        <div className="welcome-row">
          <img src={AITECH} alt="AITECH" className="welcome-logo" />
          <h1 className="welcome-title">Welcome to WMS</h1>
          <p className="welcome-footer">
            Copyright © {new Date().getFullYear()} A.I. TECHNOLOGY All rights
            reserved.
          </p>
        </div>

        <div className="login-row">
          <div className="login-title">Login to your account</div>

          <Form onFinish={onFinish}>

            <div className="login-inputlabel">Username</div>
            <Form.Item rules={[{ required: true }]} name="username">
              <Input size="large" placeholder="Enter Username" />
            </Form.Item>

            <div className="login-inputlabel">Password</div>
            <Form.Item rules={[{ required: true }]} name="password">
              <Input.Password size="large" placeholder="Enter Password" />
            </Form.Item>

            <div className="btn-forgotpass">Forgot your password?</div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{
                  width: "75%",
                  backgroundColor: "#FFFFFF",
                  color: "#03459A",
                  marginTop: "5vh",
                  fontSize: "18px",
                }}
              >
                Login
              </Button>
            </div>

          </Form>
        </div>

      </div>
    </ConfigProvider>
  );
};

export default Login;
