import React from "react";
import {Factory,MapPin,Blocks} from "lucide-react";

export const menuMobileShelf = (navigate) => [
  {
    key: "1",
    icon: <Blocks size={16} />,
    label: "Mobile Shelf",
    onClick: () => navigate("/mobile-shelf"),
  },
];

export const pathToKeyMobileShelf = {
  "/mobile-shelf": "1",
};