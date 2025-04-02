import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import NotFound from "../pages/NotFound";
import AutoStorageRoutes from "../pages/auto-storage/AutoStorageRoutes";
import DashboardRoutes from "../pages/dashboard/DashboardRoutes";
import MoldManageRoutes from "../pages/moldmanage/MoldManageRoutes";
import SettingsRoutes from "../pages/settings/SettingsRoutes";


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
        {createProtectedRoute("/auto-storage/*", AutoStorageRoutes)}
        {createProtectedRoute("/settings/*", SettingsRoutes)}  
        {createProtectedRoute("/mold-management/*", MoldManageRoutes)}
        
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
