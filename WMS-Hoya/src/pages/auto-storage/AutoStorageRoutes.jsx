import Monitoring from "./Monitoring";
import Inbound from "./Inbound";
import Outbound from "./Outbound";
import CycleCount from "./CycleCount";
import AdjustStock from "./AdjustStock";
import Refill from "./Refill";
import InspectionMold from "./InspectionMold";
import InboundMaster from "./InboundMaster";
import OutboundMaster from "./OutboundMaster";
import OvenMonitor from "./OvenMonitor";
import OvenHistory from "./OvenHistory";
import OvenTranfer from "./OvenTranfer";
import { Route, Routes } from "react-router-dom";
import RFID from "./RFID";

const AutoStorageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Monitoring />} />
      <Route path="/rfid" element={<RFID />} />
      <Route path="/inbound" element={<Inbound />} />
      <Route path="/inbound-master" element={<InboundMaster />} />
      <Route path="/outbound" element={<Outbound />} />
      <Route path="/outbound-master" element={<OutboundMaster />} />
      <Route path="/cycle-count" element={<CycleCount />} />
      <Route path="/adjust-stock" element={<AdjustStock />} />
      <Route path="/refill" element={<Refill />} />
      <Route path="/inspection-mold" element={<InspectionMold />} />
      <Route path="/oven-monitor" element={<OvenMonitor />} />
      <Route path="/oven-history" element={<OvenHistory />} />
      <Route path="/oven-tranfer" element={<OvenTranfer />} />
    </Routes>
  );
};

export default AutoStorageRoutes;
