import HighPerformance from "./HighPerformance";
import { Route, Routes } from "react-router-dom";

const HighPerformanceRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HighPerformance />} />
    </Routes>
  );
};

export default HighPerformanceRoutes;
