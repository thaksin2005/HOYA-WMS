import React, { Children, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DatePicker, Button, Menu, ConfigProvider } from "antd";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import {
  Factory, MapPin, RotateCcw, CircleDot, ServerCog,
  Blocks, FileChartLine, Warehouse, MapPinned, FileText,
  FileChartColumnIncreasing, FileSliders, Gauge, PaperclipIcon,
  ArrowBigDownDashIcon, ArrowBigUpDash, RefreshCcwDotIcon,
  InspectIcon, MonitorCheckIcon, HistoryIcon, StarIcon,
  AlarmPlusIcon,
  HouseIcon,
  HandIcon,
  Hand,
  GrabIcon,
  ArrowDownUp,
  SettingsIcon,
  SlidersHorizontalIcon,
  HandHelpingIcon,
  BarcodeIcon,
  ImportIcon,
  FileDownIcon
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
      "/auto-storage/inbound": "2-1",
      "/auto-storage/outbound": "2-2",
      "/auto-storage/manual-picking": "2-3",
      "/auto-storage/manual-put-away": "2-4",
      "/auto-storage/Relocate": "2-5",
      "/auto-storage/cycle-count": "2-6",
      "/auto-storage/oven-monitor": "2-7",
      "/auto-storage/oven-history": "2-8",
      "/auto-storage/location-monitor": "2-9",
      "/auto-storage/report": "2-10",

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

  const isStorageSelected = selectedKey.startsWith("2");
  const isInboundSelected = selectedKey.startsWith("2-1");
  const isOutboundSelected = selectedKey.startsWith("2-2");
  const isManualPickingSelected = selectedKey.startsWith("2-3");
  const isManualPutAwaySelected = selectedKey.startsWith("2-4");
  const isRelocateSelected = selectedKey.startsWith("2-5");
  const isCycleCountSelected = selectedKey.startsWith("2-6");
  const isOvenMonitorSelected = selectedKey.startsWith("2-7");
  const isOvenHistorySelected = selectedKey.startsWith("2-8");
  const isLocationMonitorSelected = selectedKey.startsWith("2-9");
  const isReportListSelected = selectedKey.startsWith("2-10");

  const menuAdmin = [
    {
      key: "1",
      label: "Home",
      onClick: () => navigate("/"),
      icon: <HouseIcon size={16} />,
    },
    {
      key: "2",
      label: "Storage",
      icon: <ServerCog size={16} />,
      onClick: () => navigate("/auto-storage"),

      children: [
        {
          key: "2-1",
          icon: <ArrowBigDownDashIcon size={16} />,
          label: "Inbound",
          onClick: () => navigate("/auto-storage/inbound"),
        },
        {
          key: "2-2",
          icon: <ArrowBigUpDash size={16} />,
          label: "Outbound",
          onClick: () => navigate("/auto-storage/outbound"),
        },

        {
          key: "2-3",
          icon: <HandIcon size={16}/>,
          label: "Manual Picking",
          onClick: () => navigate("/auto-storage/manual-picking"),
        },
        {
          key: "2-4",
          icon: <GrabIcon size={16}/>,
          label: "Manual Put Away",
          onClick: () => navigate("/auto-storage/manual-put-away"),
        },
        {
          key: "2-5",
          icon: <RotateCcw size={16} />,
          label: "Relocate",
          onClick: () => navigate("/auto-storage/relocate"),
        },
        {
          key: "2-6",
          icon: <RefreshCcwDotIcon size={16} />,
          label: "Cycle Count",
          onClick: () => navigate("/auto-storage/cycle-count"),

        },
        {
          key: "2-7",
          icon: <MonitorCheckIcon size={16} />,
          label: "Oven Monitor",
          onClick: () => navigate("/auto-storage/oven-monitor"),
        },
        {
          key: "2-8",
          icon: <HistoryIcon size={16} />,
          label: "Oven History",
          onClick: () => navigate("/auto-storage/oven-history"),
        },
        {
          key: "2-9",
          icon: <Gauge size={16} />,
          label: "Location Monitor",
          onClick: () => navigate("/auto-storage/location-monitor"),
        },
        {
          key: "2-10",
          icon: <StarIcon size={16} />,
          label: "Report List",
          onClick: () => navigate("/auto-storage/report"),
        },
      ]
    },
    {
      key: "3",
      icon: <SettingsIcon size={16} />,
      label: "Settings",
      onClick: () => navigate("/settings"),

      children: [
        {
          key: "3-1",
          icon: <FileText size={16} />,
          label: "Permission",
          onClick: () => navigate("/settings/permission"),
        },
        {
          key: "3-2",
          icon: <FileSliders size={16} />,
          label: "User",
          onClick: () => navigate("/settings/User"),
        },
        {
          key: "3-3",
          icon: <Factory size={16} />,
          label: "Company Info",
          onClick: () => navigate("/settings/company-info"),
        },
        {
          key: "3-4",
          icon: <CircleDot size={16} />,
          label: "Mold Master",
          onClick: () => navigate("/settings/mold-master"),
        },
        {
          key: "3-5",
          icon: <FileChartColumnIncreasing size={16} />,
          label: "High Performance",
          onClick: () => navigate("/settings/high-performance"),
        },
        {
          key: "3-6",
          icon: <ArrowDownUp size={16}/>,
          label: "Production Flow",
          onClick: () => navigate("/settings/production-flow"),
        },
        {
          key: "3-7",
          icon: <MapPinned size={16} />,
          label: "Location",
          onClick: () => navigate("/settings/location")
        },
        {
          key: "3-8",
          icon: <SlidersHorizontalIcon size={16} />,
          label: "General Parameter",
          onClick: () => navigate("/settings/general-parameter")
        },
        {
          key: "3-9",
          icon: <HandHelpingIcon size={16} />,
          label: "Gripper",
          onClick: () => navigate("/settings/gripper")
        }
      ]
    },
    {
      key: "4",
      icon: <CircleDot size={16} />,
      label: "Mold Management",
      onClick: () => navigate("/mold-management"),
      children: [
        {
          key: "4-1",
          icon: <BarcodeIcon size={16} />,
          label: "Serial Control",
          onClick: () => navigate("/mold-management/serial-control"),
        },
        {
          key: "4-2",
          icon: <FileDownIcon size={16} />,
          label: "Master Adjustment",
          onClick: () => navigate("/mold-management/master-adjustment"),
        }
      ]
    }

  ]


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
