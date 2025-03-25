import React from "react";
import { Factory, Warehouse, MapPinned } from "lucide-react";

export const menuProductPlan = (navigate) => [
  {
    key: "1",
    icon: <Factory size={16} />,
    label: "Production Plan",
    onClick: () => navigate("/product-plan"),
  },
];

export const pathToKeyProductPlan = {
  "/product-plan": "1",
};
