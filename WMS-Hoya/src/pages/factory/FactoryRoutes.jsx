// import Factory from "./Factory";
// import Building from "./Building";
// import Warehouse from "./Warehouse";
// import ProductionPlan from "./ProductionPlan";
// import { Route, Routes } from "react-router-dom";

// const FactoryRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Factory />} />
//       <Route path="/building" element={<Building />} />
//       <Route path="/warehouse" element={<Warehouse />} />
//       <Route path="/production-plan" element={<ProductionPlan />} />
//     </Routes>
//   );
// };

// export default FactoryRoutes;

import Factory from "./Factory";
import Building from "./Building";
import Warehouse from "./Warehouse";
import ProductionPlan from "./ProductionPlan";
import { Route, Routes } from "react-router-dom";

const FactoryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Factory />} />
      <Route path="/building" element={<Building />} />
      <Route path="/warehouse" element={<Warehouse />} />
      <Route path="/production-plan" element={<ProductionPlan />} />
    </Routes>
  );
};

export default FactoryRoutes;
