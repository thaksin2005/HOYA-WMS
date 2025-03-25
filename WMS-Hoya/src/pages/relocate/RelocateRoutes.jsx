import Relocate from "./Relocate";
import { Route, Routes } from "react-router-dom";

const RelocatRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Relocate />} />
      </Routes>
    </>
  );
};

export default RelocatRoutes;
