import Report from "./Report";
import ErrorLog from "./ErrorLog";
import { Route, Routes } from "react-router-dom";

const ReportRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Report />} />
        <Route path="/error-log" element={<ErrorLog />} />
      </Routes>
    </>
  );
};

export default ReportRoutes;
