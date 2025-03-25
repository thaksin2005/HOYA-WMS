import React from "react";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";

export const menuDashboard = (navigate) => [
  {
    key: "1",
    icon: <DashboardOutlined size={16} />,
    label: "Dashboard",
    onClick: () => navigate("/dashboard"),
  },
];

export const pathToKeyDashboard = {
  "/dashboard": "1",
};