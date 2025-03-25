import MobileShelf  from "./MobileShelf";
import { Route, Routes } from "react-router-dom";

const MobileShelfRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MobileShelf  />} />
    </Routes>
  );
};

export default MobileShelfRoutes;
