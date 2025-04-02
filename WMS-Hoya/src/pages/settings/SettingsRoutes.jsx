import Permission from "./Permission"
import User from "./User"
import CompanyInfo from "./CompanyInfo"
import MoldMaster from "./MoldMaster";
import HighPerformance from "./HighPerformance"
import ProductionFlow from "./ProductionFlow"
import Location from "./Location"
import GeneralParameter from "./GeneralParameter"
import Gripper from "./Gripper"

import { Route, Routes } from "react-router-dom";

const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path="/permission" element={<Permission />} />
      <Route path="/user" element={<User/>} />
      <Route path="/company-info" element={<CompanyInfo />} />
      <Route path="/mold-master" element={<MoldMaster />} />
      <Route path="/high-performance" element={<HighPerformance />} />
      <Route path="/production-flow" element={<ProductionFlow />} />
      <Route path="/location" element={<Location/>} />
      <Route path="/general-parameter" element={<GeneralParameter />} />
      <Route path="/gripper" element={<Gripper />} />

    </Routes>
  );
};

export default SettingsRoutes;
