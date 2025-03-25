import React from "react";
import { AlarmPlusIcon,EraserIcon,RotateCcw, Star, FolderKanban, SlidersVertical } from "lucide-react";

export const menuReport = (navigate) => [
  {
    key: "1",
    icon: <Star size={16} />,
    label: "Report",
    onClick: () => navigate("/report"),
  },
  {
    key: "2",
    icon: <AlarmPlusIcon size={16} />,
    label: "Error Log",
    onClick: () => navigate("/report/error-log"),
  },

];

export const pathToKeyReport = {
  "/report": "1",
  "/report/error-log": "2",
};
