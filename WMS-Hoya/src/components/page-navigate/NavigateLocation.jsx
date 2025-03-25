import React from "react";
import {Factory,MapPin,ChartGantt} from "lucide-react";

export const menuLocation = (navigate) => [
  {
    key: "1",
    icon: <MapPin size={16} />,
    label: "Location",
    onClick: () => navigate("/location"),
  },
];

export const pathToKeyLocation = {
  "/location": "1",
};