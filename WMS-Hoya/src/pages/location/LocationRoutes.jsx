import Location from "./Location";
import { Route, Routes } from "react-router-dom";

const LocationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Location />} />
    </Routes>
  );
};

export default LocationRoutes;
