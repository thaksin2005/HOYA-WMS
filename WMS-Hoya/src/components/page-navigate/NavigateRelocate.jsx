import React from "react";
import { RotateCcw, Star, FolderKanban, SlidersVertical } from "lucide-react";

export const menuRelocate = (navigate) => [
  {
    key: "1",
    icon: <RotateCcw size={16} />,
    label: "Relocate",
    onClick: () => navigate("/relocate"),
  },
];

export const pathToKeyRelocate = {
  "/relocate": "1",
};
