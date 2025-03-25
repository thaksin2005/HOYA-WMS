import ProductPlan from "./ProductPlan";
import { Route, Routes } from "react-router-dom";

const ProductPlanRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductPlan />} />
    </Routes>
  );
};

export default ProductPlanRoutes;
