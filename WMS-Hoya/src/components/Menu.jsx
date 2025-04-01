import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DatePicker, Button, Menu, ConfigProvider } from "antd";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import {
  Factory, MapPin, RotateCcw, CircleDot, ServerCog,
  Blocks, FileChartLine, Warehouse, MapPinned, FileText,
  FileChartColumnIncreasing, FileSliders, Gauge, PaperclipIcon,
  ArrowBigDownDashIcon, ArrowBigUpDash, RefreshCcwDotIcon,
  InspectIcon, MonitorCheckIcon, HistoryIcon, StarIcon,
  AlarmPlusIcon
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const isReportSelected = location.pathname.startsWith('/report');
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

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
      "/report": "10-1",
      "/report/error-log": "10-2",
      "/user": "11",
    };
    return pathToKeyMap[location.pathname] || "1";
  };

  const selectedKey = getSelectedKey();

  const isCompanyInfoSelected = selectedKey.startsWith("2");
  const isFactorySelected = selectedKey.startsWith("2-1");
  const isWarehouseSelected = selectedKey.startsWith("2-2");
  const isPlaceSelected = selectedKey.startsWith("2-3");
  
  const isMoldMasterSelected = selectedKey.startsWith("5");
  const isMoldMasterListSelected = selectedKey.startsWith("5-1");
  const isHighPerformanceSelected = selectedKey.startsWith("5-2");
  const isStockLimitSelected = selectedKey.startsWith("5-3");

  const isAutoStorageSelected = selectedKey.startsWith("6");
  const isMonitorSelected = selectedKey.startsWith("6-1");
  const isRfidSelected = selectedKey.startsWith("6-2");
  const isInboundSelected = selectedKey.startsWith("6-3");
  const isOutboundSelected = selectedKey.startsWith("6-4");
  const isCycleCountSelected = selectedKey.startsWith("6-5");
  const isInspectionMoldSelected = selectedKey.startsWith("6-6");
  const isOvenMonitorSelected = selectedKey.startsWith("6-7");
  const isOvenHistorySelected = selectedKey.startsWith("6-8");
  const isOvenTranferSelected = selectedKey.startsWith("6-9");

  const isReportSelected = selectedKey.startsWith("10");
  const isReportListSelected = selectedKey.startsWith("10-1");
  const isErrorLogSelected = selectedKey.startsWith("10-2");

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
        ? { backgroundColor: "#0055C4", color: "#FFFFFF" }
        : {},

      children: [
        {
          key: "2-1",
          icon: <Factory size={16} />,
          label: "Factory",
          onClick: () => navigate("/company-info"),
          style: isCompanyInfoSelected && !isFactorySelected
          ? { color: "#a7a7a7" }
          : {},
        },
        {
          key: "2-2",
          icon: <Warehouse size={16} />,
          label: "Warehouse",
          onClick: () => navigate("/company-info/warehouse"),
          style: isCompanyInfoSelected && !isWarehouseSelected
          ? { color: "#a7a7a7" }
          : {},
        },
        {
          key: "2-3",
          icon: <MapPinned size={16} />,
          label: "Place",
          onClick: () => navigate("/company-info/place"),
          style: isCompanyInfoSelected && !isPlaceSelected
          ? { color: "#a7a7a7" }
          : {},
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
        ? { backgroundColor: "#0055C4", color: "#FFFFFF" }
        : {},
      children: [
        {
          key: "5-1",
          icon: <FileText size={16} />,
          label: "Mold Master",
          onClick: () => navigate("/mold-master"),
          style: isMoldMasterSelected && !isMoldMasterListSelected
          ? { color: "#a7a7a7" }
          : {},
        },
        {
          key: "5-2",
          icon: <FileChartColumnIncreasing size={16} />,
          label: "High Performance",
          onClick: () => navigate("/mold-master/high-performance"),
          style: isMoldMasterSelected && !isHighPerformanceSelected
          ? { color: "#a7a7a7" }
          : {},
        },
        {
          key: "5-3",
          icon: <FileSliders size={16} />,
          label: "Stock Limit",
          onClick: () => navigate("/mold-master/stock-limit"),
          style: isMoldMasterSelected && !isStockLimitSelected
          ? { color: "#a7a7a7" }
          : {},
        },
      ],
    },
    {
      key: "6",
      icon: <ServerCog size={16} />,
      label: "Auto Storage",
      style: isAutoStorageSelected
        ? { backgroundColor: "#0055C4", color: "#FFFFFF" }
        : {},
      children: [
        {
          key: "6-1",
          icon: <Gauge size={16} />,
          label: "Monitor",
          onClick: () => navigate("/auto-storage"),
          style: isAutoStorageSelected && !isMonitorSelected
          ? { color: "#a7a7a7" }
          : {},
        },
        {
          key: "6-2",
          icon: <PaperclipIcon size={16} />,
          label: "RFID",
          onClick: () => navigate("/auto-storage/rfid"),
          style: isAutoStorageSelected && !isRfidSelected
          ? { color: "#a7a7a7" }
          : {},
        },
        {
          key: "6-3",
          icon: <ArrowBigDownDashIcon size={16} />,
          label: "Inbound",
          onClick: () => navigate("/auto-storage/inbound"),
          style: isAutoStorageSelected && !isInboundSelected
          ? { color: "#a7a7a7" }
          : {},
        },
        // {
        //   key: "6-2-1",
        //   label: "Inbound Master",
        //   onClick: () => navigate("/auto-storage/inbound-master"),
        // },
        {
          key: "6-4",
          icon: <ArrowBigUpDash size={16} />,
          label: "Outbound",
          onClick: () => navigate("/auto-storage/outbound"),
          style: isAutoStorageSelected && !isOutboundSelected
          ? { color: "#a7a7a7" }
          : {},
        },
        {
          key: "6-5",
          icon: <RefreshCcwDotIcon size={16} />,
          label: "Cycle Count",
          onClick: () => navigate("/auto-storage/cycle-count"),
          style: isAutoStorageSelected && !isCycleCountSelected
          ? { color: "#a7a7a7" }
          : {},
        },
        {
          key: "6-6",
          icon: <InspectIcon size={16} />,
          label: "Inspection Mold",
          onClick: () => navigate("/auto-storage/inspection-mold"),
          style: isAutoStorageSelected && !isInspectionMoldSelected
          ? { color: "#a7a7a7" }
          : {},
        },
        {
          key: "6-7",
          icon: <MonitorCheckIcon size={16} />,
          label: "Oven Monitor",
          onClick: () => navigate("/auto-storage/oven-monitor"),
          style: isAutoStorageSelected && !isOvenMonitorSelected
          ? { color: "#a7a7a7" }
          : {},  
        },
        {
          key: "6-8",
          icon: <HistoryIcon size={16} />,
          label: "Oven History",
          onClick: () => navigate("/auto-storage/oven-history"),
          style: isAutoStorageSelected && !isOvenHistorySelected
          ? { color: "#a7a7a7" }
          : {},  
        },
        {
          key: "6-9",
          icon: <FileSliders size={16} />,
          label: "Oven Tranfer",
          onClick: () => navigate("/auto-storage/oven-tranfer"),
          style: isAutoStorageSelected && !isOvenTranferSelected
          ? { color: "#a7a7a7" }
          : {},  
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
        ? { backgroundColor: "#0055C4", color: "#FFFFFF" }
        : {},
      children: [
        {
          key: "10-1",
          icon: <StarIcon size={16} />,
          label: "Report List",
          onClick: () => navigate("/report"),
          style: isReportSelected && !isReportListSelected
          ? { color: "#a7a7a7" }
          : {},  
        },
        {
          key: "10-2",
          icon: <AlarmPlusIcon size={16} />,
          label: "Error Log",
          onClick: () => navigate("/report/error-log"),
          style: isReportSelected && !isErrorLogSelected
          ? { color: "#a7a7a7" }
          : {},  
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
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedColor: "#FFFFFF",
            itemSelectedBg: "#0055C4",
            itemColor: "#0055C4",
          },
        },
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuAdmin}
        style={{
          padding: "0 10px",
          border: "none",
        }}
      />
    </ConfigProvider>
  );
};

export default Sidebar;
