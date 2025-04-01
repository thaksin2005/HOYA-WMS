import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import User from "../pages/user/User";
import NotFound from "../pages/NotFound";
import CompanyInfoRoutes from "../pages/company/CompanyInfoRoutes";
import MoldRoutes from "../pages/mold/MoldRoutes";
import HighPerformance from "../pages/mold/HighPerformance";  
import StockLimit from "../pages/mold/StockLimit";  
import AutoStorageRoutes from "../pages/auto-storage/AutoStorageRoutes";
import DashboardRoutes from "../pages/dashboard/DashboardRoutes";
import LocationRoutes from "../pages/location/LocationRoutes";
import ProductPlanRoutes from "../pages/productplan/ProductPlanRoutes";
import MobileShelfRoutes from "../pages/mobileshelf/MobileShelfRoutes";
import MoldManageRoutes from "../pages/moldmanage/MoldManageRoutes";
import RelocateRoutes from "../pages/relocate/RelocateRoutes";
import ReportRoutes from "../pages/report/ReportRoutes";


const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return children;
};

const createProtectedRoute = (path, Component) => (
  <Route
    path={path}
    element={
      <ProtectedRoute>
        <Component />
      </ProtectedRoute>
    }
  />
);

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        {createProtectedRoute("/", DashboardRoutes)}
        {createProtectedRoute("/dashboard/*", DashboardRoutes)}
        {createProtectedRoute("/company-info/*", CompanyInfoRoutes)}
        {createProtectedRoute("/mold-master/*", MoldRoutes)}  {/* เส้นทางหลัก */}
        {createProtectedRoute("/user", User)}
        {createProtectedRoute("/auto-storage/*", AutoStorageRoutes)}
        {createProtectedRoute("/location/*", LocationRoutes)}
        {createProtectedRoute("/product-plan/*", ProductPlanRoutes)}
        {createProtectedRoute("/mobile-shelf/*", MobileShelfRoutes)}
        {createProtectedRoute("/management/*", MoldManageRoutes)}
        {createProtectedRoute("/relocate/*", RelocateRoutes)}
        {createProtectedRoute("/report/*", ReportRoutes)}
        {createProtectedRoute("/mold-master/high-performance", HighPerformance)}  
        {createProtectedRoute("/mold-master/stock-limit", StockLimit)}  
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
