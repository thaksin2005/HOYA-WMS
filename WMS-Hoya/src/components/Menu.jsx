import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DatePicker, Menu } from "antd";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import {
  Factory,
  MapPin,
  RotateCcw,
  CircleDot,
  ServerCog,
  Blocks,
  FileChartLine,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isReportSelected = location.pathname.startsWith('/report');

  const getSelectedKey = () => {
    const pathToKeyMap = {
      "/": "1",
      "/company-info": "2-1",
      "/company-info/warehouse": "2-2",
      "/company-info/place": "2-3",
      "/location": "3",
      // "/mold-master": "5",
      "/mold-master": "5-1",
      "/mold-master/high-performance": "5-2",
      "/mold-master/stock-limit": "5-3",
      // "/auto-storage": "6",
      "/auto-storage": "6-1",
      "/auto-storage/rfid": "6-2",
      "/auto-storage/inbound": "6-3",
      "/auto-storage/inbound-master": "6-3-1",
      "/auto-storage/outbound": "6-4",
      "/auto-storage/outbound-master": "6-4-1",
      "/auto-storage/cycle-count": "6-5",
      "/auto-storage/inspection-mold": "6-6",
      "/auto-storage/oven-monitor": "6-7",
      "/auto-storage/oven-history": "6-8",
      "/auto-storage/oven-tranfer": "6-9",
      "/mobile-shelf": "7",
      "/management": "8",
      "/relocate": "9",
      "/report": "10",
      "/report/error-log": "10-1",
      "/user": "11",
    };
    return pathToKeyMap[location.pathname] || "1";
  };

  const selectedKey = getSelectedKey();
  const isAutoStorageSelected = selectedKey.startsWith("6");
  const isCompanyInfoSelected = selectedKey.startsWith("2");
  const isMoldMasterSelected = selectedKey.startsWith("5");

  const menuAdmin = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "2",
      icon: <Factory size={16} />,
      label: "Company Info",
      style: isCompanyInfoSelected
        ? { backgroundColor: "#0055C4", color: "white" }
        : {},

      children: [
        {
          key: "2-1",
          label: "Factory",
          onClick: () => navigate("/company-info"),
        },
        {
          key: "2-2",
          label: "Warehouse",
          onClick: () => navigate("/company-info/warehouse"),
        },
        {
          key: "2-3",
          label: "Place",
          onClick: () => navigate("/company-info/place"),
        },
      ],
    },
    {
      key: "3",
      icon: <MapPin size={16} />,
      label: "Location",
      onClick: () => navigate("/location"),
    },
    {
      key: "5",
      icon: <CircleDot size={16} />,
      label: "Mold Master",
      style: isMoldMasterSelected
        ? { backgroundColor: "#0055C4", color: "white" }
        : {},
      children: [
        {
          key: "5-1",
          label: "Mold Master",
          onClick: () => navigate("/mold-master"),
        },
        {
          key: "5-2",
          label: "High Performance",
          onClick: () => navigate("/mold-master/high-performance"),
        },
        {
          key: "5-3",
          label: "Stock Limit",
          onClick: () => navigate("/mold-master/stock-limit"),
        },
      ],
    },
    {
      key: "6",
      icon: <ServerCog size={16} />,
      label: "Auto Storage",
      style: isAutoStorageSelected
        ? { backgroundColor: "#0055C4", color: "white" }
        : {},
      children: [
        {
          key: "6-1",
          label: "Monitor",
          onClick: () => navigate("/auto-storage"),
        },
         {
          key: "6-2",
          label: "RFID",
          onClick: () => navigate("/auto-storage/rfid"),
        },
        {
          key: "6-3",
          label: "Inbound",
          onClick: () => navigate("/auto-storage/inbound"),
        },
        // {
        //   key: "6-2-1",
        //   label: "Inbound Master",
        //   onClick: () => navigate("/auto-storage/inbound-master"),
        // },
        {
          key: "6-4",
          label: "Outbound",
          onClick: () => navigate("/auto-storage/outbound"),
        },
        {
          key: "6-5",
          label: "Cycle Count",
          onClick: () => navigate("/auto-storage/cycle-count"),
        },
        {
          key: "6-6",
          label: "Inspection Mold",
          onClick: () => navigate("/auto-storage/inspection-mold"),
        },
        {
          key: "6-7",
          label: "Oven Monitor",
          onClick: () => navigate("/auto-storage/oven-monitor"),
        },
        {
          key: "6-8",
          label: "Oven History",
          onClick: () => navigate("/auto-storage/oven-history"),
        },
        {
          key: "6-9",
          label: "Oven Tranfer",
          onClick: () => navigate("/auto-storage/oven-tranfer"),
        },
      ],
    },
    {
      key: "7",
      icon: <Blocks size={16} />,
      label: "Mobile Shelf",
      onClick: () => navigate("/mobile-shelf"),
    },
    {
      key: "8",
      icon: <CircleDot size={16} />,
      label: "Mold Management",
      onClick: () => navigate("/management"),
    },
    {
      key: "9",
      icon: <RotateCcw size={16} />,
      label: "Relocate",
      onClick: () => navigate("/relocate"),
    },
      {
        key: "10",
        icon: <FileChartLine size={16} />,
        label: "Report",
        style: isReportSelected
          ? { backgroundColor: "#0055C4", color: "white" }
          : {},
        children: [
          {
            key: "10-1",
            label: "Report List",
            onClick: () => navigate("/report"),
          },
          {
            key: "10-2",
            label: "Error Log",
            onClick: () => navigate("/report/error-log"),
          },
        ],
      },
    {
      key: "11",
      icon: <UserOutlined />,
      label: "User",
      onClick: () => navigate("/user"),
    },
  ];


  return (
    <Menu
      mode="vertical"
      selectedKeys={[selectedKey]}
      items={menuAdmin}
      style={{
        padding: "0 10px",
        border: "none",
      }}
    />
  );
};

export default Sidebar;
