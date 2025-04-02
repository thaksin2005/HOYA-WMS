import MoldManage from "./MoldManage";
import SerialControl from "./SericalControl";
import MasterAdjustment from "./MasterAdjustment";
import { Route, Routes } from "react-router-dom";

const MoldManageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MoldManage />} />
        <Route path="/serial-control" element={<SerialControl/>}/>
        <Route path="/master-adjustment" element={<MasterAdjustment/>}/>
      </Routes>
    </>
  );
};

export default MoldManageRoutes;
