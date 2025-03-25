import React from "react";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Dropdown, Space, Avatar, message } from "antd";
import { useNavigate } from "react-router-dom";

const DropdownActionProfile = () => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("user");
    message.success("Logout successful");
    navigate("/login");
  };

  const items = [
    {
      label: (
        <a style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <UserOutlined /> <span>My Profile</span>
        </a>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            color: "#DA251C",
          }}
          onClick={Logout}
        >
          <LogoutOutlined /> <span>Logout</span>
        </a>
      ),
      key: "1",
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
    >
      <a onClick={(e) => e.preventDefault()} style={{ color: "#000" }}>
        <Space>
          <Avatar size="default" icon={<UserOutlined />} />
        </Space>
      </a>
    </Dropdown>
  );
};
export default DropdownActionProfile;
