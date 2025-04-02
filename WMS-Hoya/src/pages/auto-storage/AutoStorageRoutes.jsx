import Inbound from "./Inbound";
import InboundMaster from "./InboundMaster";
import Outbound from "./Outbound";
import OutboundMaster from "./OutboundMaster";
import ManualPicking from "./ManualPicking";
import ManualPutAway from "./ManualPutAway";
import Relocate from "./Relocate";
import CycleCount from "./CycleCount";
import OvenMonitor from "./OvenMonitor";
import OvenHistory from "./OvenHistory";
import LocationMonitor from "./LocationMonitor";
import Report from "./Report"

import AdjustStock from "./AdjustStock";
import Refill from "./Refill";
import InspectionMold from "./InspectionMold";
import Monitoring from "./Monitoring";
import RFID from "./RFID";
import OvenTranfer from "./OvenTranfer";
import { Route, Routes } from "react-router-dom";

const AutoStorageRoutes = () => {
  return (
    <Routes>
      <Route path="/inbound" element={<Inbound />} />
      <Route path="/inbound-master" element={<InboundMaster />} />
      <Route path="/outbound" element={<Outbound />} />
      <Route path="/outbound-master" element={<OutboundMaster />} />
      <Route path="/manual-picking" element={<ManualPicking/>} />
      <Route path="/manual-put-away" element={<ManualPutAway/>} />
      <Route path="/relocate" element={<Relocate/>} />
      <Route path="/cycle-count" element={<CycleCount />} />
      <Route path="/oven-monitor" element={<OvenMonitor />} />
      <Route path="/oven-history" element={<OvenHistory />} />
      <Route path="/location-monitor" element={<LocationMonitor/>} />
      <Route path="/report" element={<Report />} />

      {/* <Route path="/" element={<Monitoring />} />
      <Route path="/rfid" element={<RFID />} />
      <Route path="/adjust-stock" element={<AdjustStock />} />
      <Route path="/refill" element={<Refill />} />
      <Route path="/inspection-mold" element={<InspectionMold />} />
      <Route path="/oven-tranfer" element={<OvenTranfer />} /> */}
      
    </Routes>
  );
};

export default AutoStorageRoutes;
