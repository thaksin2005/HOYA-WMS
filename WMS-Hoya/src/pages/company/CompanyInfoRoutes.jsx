import Factory from "./Factory";
import Warehouse from "./Warehouse";
import Place from "./Place";
import { Route, Routes } from "react-router-dom";

const FactoryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Factory />} />
      <Route path="/warehouse" element={<Warehouse />} />
      <Route path="/place" element={<Place />} />
    </Routes>
  );
};

export default FactoryRoutes;
