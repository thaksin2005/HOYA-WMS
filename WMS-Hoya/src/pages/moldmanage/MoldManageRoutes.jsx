import MoldManage from "./MoldManage";
import { Route, Routes } from "react-router-dom";

const MoldManageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MoldManage />} />
      </Routes>
    </>
  );
};

export default MoldManageRoutes;
