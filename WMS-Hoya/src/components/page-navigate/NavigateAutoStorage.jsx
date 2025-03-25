import React from "react";
import {
  Gauge,
  ArrowBigDownDash,
  ArrowBigUpDash,
  RefreshCcwDot,
  FileSliders,
  Grid2x2Plus,
  PaperclipIcon,
  MonitorCheckIcon,
  InspectIcon,
  HistoryIcon
} from "lucide-react";

export const menuAutoStorage = (navigate) => [
  {
    key: "1",
    icon: <Gauge size={16} />,
    label: "Monitoring",
    onClick: () => navigate("/auto-storage"),
  },
  {
    key: "2",
    icon: <PaperclipIcon size={16} />,
    label: "RFID",
    onClick: () => navigate("/auto-storage/rfid"),
  },
  {
    key: "3",
    icon: <ArrowBigDownDash size={16} />,
    label: "Inbound",
    onClick: () => navigate("/auto-storage/inbound"),
  },
  // {
  //   key: "2-1",
  //   // icon: <ArrowBigDownDash size={16} />,
  //   // label: "Inbound Master",
  //   // onClick: () => navigate("/auto-storage/inbound-master"),
  // },
  {
    key: "4",
    icon: <ArrowBigUpDash size={16} />,
    label: "Outbound",
    onClick: () => navigate("/auto-storage/outbound"),
  },
  // {
  //   key: "3-1",
  //   icon: <ArrowBigUpDash size={16} />,
  //   label: "Outbound Master",
  //   onClick: () => navigate("/auto-storage/outbound-master"),
  // },
  {
    key: "5",
    icon: <RefreshCcwDot size={16} />,
    label: "Cycle Count",
    onClick: () => navigate("/auto-storage/cycle-count"),
  },
  {
    key: "6",
    icon: <InspectIcon size={16} />,
    label: "Inspection Mold",
    onClick: () => navigate("/auto-storage/inspection-mold"),
  },
  {
    key: "7",
    icon: <MonitorCheckIcon size={16} />,
    label: "Oven Monitor",
    onClick: () => navigate("/auto-storage/oven-monitor"),
  },
  {
    key: "8",
    icon: <HistoryIcon size={16} />,
    label: "Oven History",
    onClick: () => navigate("/auto-storage/oven-history"),
  },
  {
    key: "9",
    icon: <FileSliders size={16} />,
    label: "Oven Tranfer",
    onClick: () => navigate("/auto-storage/oven-tranfer"),
  },
];

export const pathToKeyAutoStorage = {
  "/auto-storage": "1",
  "/auto-storage/rfid": "2",
  "/auto-storage/inbound": "3",
  "/auto-storage/inbound-master": "3-1",
  "/auto-storage/outbound": "4",
  "/auto-storage/outbound-master": "4-1",
  "/auto-storage/cycle-count": "5",
  "/auto-storage/inspection-mold": "6",
  "/auto-storage/oven-monitor": "7",
  "/auto-storage/oven-history": "8",
  "/auto-storage/oven-tranfer": "9",
};
