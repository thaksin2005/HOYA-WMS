import MoldMaster from "./MoldMaster";
import { Route, Routes } from "react-router-dom";

const MoldRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MoldMaster />} />
      </Routes>
    </>
  );
};

export default MoldRoutes;
