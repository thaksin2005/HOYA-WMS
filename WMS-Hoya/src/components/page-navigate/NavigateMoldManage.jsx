import React from "react";
import { CircleDot, Warehouse, MapPinned } from "lucide-react";

export const menuMoldManage = (navigate) => [
  {
    key: "1",
    icon: <CircleDot size={16} />,
    label: "Mold Management",
    onClick: () => navigate("/management"),
  },
];

export const pathToKeyMoldManage = {
  "/management": "1",
};
