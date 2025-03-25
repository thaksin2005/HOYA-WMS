import StockLimit from "./StockLimit";
import { Route, Routes } from "react-router-dom";

const StockLimitRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Stock Limit />} />
      </Routes>
    </>
  );
};

export default StockLimitRoutes;
