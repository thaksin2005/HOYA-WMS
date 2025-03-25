import React from "react";
import { Factory, Warehouse, Building, NotebookPen } from "lucide-react";

export const menuFactory = (navigate) => [
  {
    key: "1",
    icon: <Factory size={16} />,
    label: "Factory",
    onClick: () => navigate("/factory"),
  },
  {
    key: "2",
    icon: <Building size={16} />,
    label: "Building",
    onClick: () => navigate("/factory/building"),
  },
  {
    key: "3",
    icon: <Warehouse size={16} />,
    label: "Warehouse",
    onClick: () => navigate("/factory/warehouse"),
  },
  {
    key: "4",
    icon: <NotebookPen size={16} />,
    label: "Production Plan",
    onClick: () => navigate("/factory/production-plan"),
  },
];

export const pathToKeyFactory = {
  "/factory": "1",
  "/factory/building": "2",
  "/factory/warehouse": "3",
  "/factory/production-plan": "4",
};
