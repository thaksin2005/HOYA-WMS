import React from "react";
import { Factory, Warehouse, MapPinned } from "lucide-react";

export const menuCompanyInfo = (navigate) => [
  {
    key: "1",
    icon: <Factory size={16} />,
    label: "Factory",
    onClick: () => navigate("/company-info"),
  },
  {
    key: "2",
    icon: <Warehouse size={16} />,
    label: "Warehouse",
    onClick: () => navigate("/company-info/warehouse"),
  },
  {
    key: "3",
    icon: <MapPinned size={16} />,
    label: "Place",
    onClick: () => navigate("/company-info/place"),
  },
];

export const pathToKeyCompanyInfo = {
  "/company-info": "1",
  "/company-info/warehouse": "2",
  "/company-info/place": "3",
};
