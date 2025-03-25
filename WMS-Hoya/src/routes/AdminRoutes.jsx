// import { Routes, Route, Navigate } from "react-router-dom";
// import AdminLayout from "../layouts/AdminLayout";
// import User from "../pages/user/User";
// import NotFound from "../pages/NotFound";
// import CompanyInfoRoutes from "../pages/company/CompanyInfoRoutes";
// import MoldRoutes from "../pages/mold/MoldRoutes";
// import AutoStorageRoutes from "../pages/auto-storage/AutoStorageRoutes";
// import DashboardRoutes from "../pages/dashboard/DashboardRoutes";
// import LocationRoutes from "../pages/location/LocationRoutes";
// import ProductPlanRoutes from "../pages/productplan/ProductPlanRoutes";
// import MobileShelfRoutes from "../pages/mobileshelf/MobileShelfRoutes";
// import MoldManageRoutes from "../pages/moldmanage/MoldManageRoutes";
// import RelocateRoutes from "../pages/relocate/RelocateRoutes";
// import ReportRoutes from "../pages/report/ReportRoutes";



// // const AdminRoutes = () => {
// //   const user = JSON.parse(localStorage.getItem("user"));

// //   if (!user || user.role !== "admin") {
// //     return <Navigate to="/login" />;
// //   }

// //   return (
// //     <AdminLayout>
// //       <Routes>
// //         <Route path="/" element={<Dashboard />} />
// //         <Route path="/dashboard" element={<Dashboard />} />
// //         <Route path="/company-info/*" element={<CompanyInfoRoutes />} />
// //         <Route path="/mold/*" element={<MoldRoutes />} />
// //         <Route path="/warehouse-detail" element={<WarehouseDetail />} />
// //         <Route path="/user" element={<User />} />
// //         <Route path="/cycle-count" element={<CycleCount />} />
// //         <Route path="/location" element={<Location />} />
// //         <Route path="/product-plan" element={<ProductPlan />} />
// //         <Route path="/refill" element={<Refill />} />
// //         <Route path="/*" element={<NotFound />} />
// //         <Route path="/auto-storage/" element={<AutoStorageRoutes />} />
// //       </Routes>
// //     </AdminLayout>
// //   );
// // };

// // export default AdminRoutes;

// // ... existing imports ...

// const ProtectedRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user || user.role !== "admin") {
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

// const createProtectedRoute = (path, Component) => (
//   <Route
//     path={path}
//     element={
//       <ProtectedRoute>
//         <Component />
//       </ProtectedRoute>
//     }
//   />
// );

// const AdminRoutes = () => {
//   return (
//     <AdminLayout>
//       <Routes>
//         {createProtectedRoute("/", DashboardRoutes)}
//         {createProtectedRoute("/dashboard/*", DashboardRoutes)}
//         {createProtectedRoute("/company-info/*", CompanyInfoRoutes)}
//         {createProtectedRoute("/mold-master/*", MoldRoutes)}
//         {createProtectedRoute("/user", User)}
//         {createProtectedRoute("/auto-storage/*", AutoStorageRoutes)}
//         {createProtectedRoute("/location/*", LocationRoutes)}
//         {createProtectedRoute("/product-plan/*", ProductPlanRoutes)}
//         {createProtectedRoute("/mobile-shelf/*", MobileShelfRoutes)}
//         {createProtectedRoute("/management/*", MoldManageRoutes)}
//         {createProtectedRoute("/relocate/*", RelocateRoutes)}
//         {createProtectedRoute("/report/*", ReportRoutes)}
//         <Route path="/*" element={<NotFound />} />
//       </Routes>
//     </AdminLayout>
//   );
// };

// export default AdminRoutes;

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
