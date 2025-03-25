import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  menuCompanyInfo,
  pathToKeyCompanyInfo,
} from "./page-navigate/NavigateCompanyInfo";
import { menuMold, 
  pathToKeyMold } 
from "./page-navigate/NavigateMold";
import {
  menuAutoStorage,
  pathToKeyAutoStorage,
} from "./page-navigate/NavigateAutoStorage";
import {
  menuDashboard,
  pathToKeyDashboard,
} from "./page-navigate/NavigateDashboard";
import {
  menuLocation,
  pathToKeyLocation,
} from "./page-navigate/NavigateLocation";
import {
  menuProductPlan,
  pathToKeyProductPlan,
} from "./page-navigate/NavigateProductPlan";
import {
  menuMobileShelf,
  pathToKeyMobileShelf,
} from "./page-navigate/NavigateMobileShelf";
import {
  menuMoldManage,
  pathToKeyMoldManage,
} from "./page-navigate/NavigateMoldManage";
import {
  menuRelocate,
  pathToKeyRelocate,
} from "./page-navigate/NavigateRelocate";
import { 
  menuReport, 
  pathToKeyReport 
} from "./page-navigate/NavigateReport";

const TabsPage = () => {
  const [menuPage, setMenuPage] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.startsWith("/company-info")) {
      setMenuPage(menuCompanyInfo(navigate));
    } else if (location.pathname.startsWith("/mold")) {
      setMenuPage(menuMold(navigate));
    } else if (location.pathname.startsWith("/auto-storage")) {
      setMenuPage(menuAutoStorage(navigate));
    } else if (location.pathname.startsWith("/dashboard")) {
      setMenuPage(menuDashboard(navigate));
    } else if (location.pathname.startsWith("/location")) {
      setMenuPage(menuLocation(navigate));
    } else if (location.pathname.startsWith("/product-plan")) {
      setMenuPage(menuProductPlan(navigate));
    } else if (location.pathname.startsWith("/mobile-shelf")) {
      setMenuPage(menuMobileShelf(navigate));
    } else if (location.pathname.startsWith("/management")) {
      setMenuPage(menuMoldManage(navigate));
    } else if (location.pathname.startsWith("/relocate")) {
      setMenuPage(menuRelocate(navigate));
    } else if (location.pathname.startsWith("/report")) {
      setMenuPage(menuReport(navigate));
    } else {
      setMenuPage([]);
    }
  }, [location.pathname, navigate]);

  const getSelectedKey = () => {
    if (location.pathname.startsWith("/company-info")) {
      return pathToKeyCompanyInfo[location.pathname] || "1";
    } else if (location.pathname.startsWith("/mold")) {
      return pathToKeyMold[location.pathname] || "1";
    } else if (location.pathname.startsWith("/auto-storage")) {
      return pathToKeyAutoStorage[location.pathname] || "1";
    } else if (location.pathname.startsWith("/dashboard")) {
      return pathToKeyDashboard[location.pathname] || "1";
    } else if (location.pathname.startsWith("/location")) {
      return pathToKeyLocation[location.pathname] || "1";
    } else if (location.pathname.startsWith("/product-plan")) {
      return pathToKeyProductPlan[location.pathname] || "1";
    } else if (location.pathname.startsWith("/mobile-shelf")) {
      return pathToKeyMobileShelf[location.pathname] || "1";
    } else if (location.pathname.startsWith("/management")) {
      return pathToKeyMoldManage[location.pathname] || "1";
    } else if (location.pathname.startsWith("/relocate")) {
      return pathToKeyRelocate[location.pathname] || "1";
    } else if (location.pathname.startsWith("/report")) {
      return pathToKeyReport[location.pathname] || "1";
    } else {
      return "1";
    }
  };

  return (
    <>
      {menuPage.length > 0 && (
        <Menu
          style={{ width: "100%" }}
          selectedKeys={[getSelectedKey()]}
          theme="light"
          mode="horizontal"
          items={menuPage}
        />
      )}
    </>
  );
};

export default TabsPage;
