import React from "react";
import { Star, FileSliders } from "lucide-react";

export const menuMold = (navigate) => [
  {
    key: "1",
    icon: <Star size={16} />,
    label: "Mold Master",
    onClick: () => navigate("/mold-master"),
  },
  {
    key: "2",
    icon: <FileSliders size={16} />,
    label: "High Performance",
    onClick: () => navigate("/mold-master/high-performance"),
  },
  {
    key: "3",
    icon: <FileSliders size={16} />,
    label: "Stock Limit",
    onClick: () => navigate("/mold-master/stock-limit"),
  },
];

export const pathToKeyMold = {
  "/mold-master": "1",
  "/mold-master/high-performance": "2",
  "/mold-master/stock-limit": "3",
};
