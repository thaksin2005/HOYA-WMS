const express = require("express");
const app = express();
const cors = require("cors");
const placeRoutes = require("./routes/placeRoutes");
const factoryRoutes = require("./routes/factoryRoutes");
const warehouseRoutes = require("./routes/warehouseRoutes");
const locationRoutes = require('./routes/locationRoutes');
const userAccounRountes = require("./routes/userAccounRountes");
const confirmOutboundRoutes = require("./routes/ConfirmOutboundRoutes");
const confirmInboundRoutes = require("./routes/ConfirmInboundRoutes");
const confirmOutboundItemRoutes = require("./routes/ConfirmOutboundItemRoutes");
const LocationActiveRoutes = require("./routes/LocationActiveRoutes");
const importOutboundRoutes = require("./routes/ImportOutboundRoutes");
const importInboundRoutes = require("./routes/ImportInboundRoutes");
const importMoldMasterRoutes = require("./routes/ImportMoldMasterRoutes");
const ExpressRoutes = require("./routes/ExpressRoutes");

// ใช้ express.json() แทน body-parser
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3334;
// กำหนด Access-Control-Allow-Headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// รวม routes
app.use("/api", placeRoutes);
app.use("/api", factoryRoutes);
app.use("/api", warehouseRoutes);
app.use('/api', locationRoutes);
app.use("/api", userAccounRountes);
app.use("/api", confirmOutboundRoutes);
app.use("/api", confirmInboundRoutes);
app.use("/api", confirmOutboundItemRoutes);
app.use("/api", LocationActiveRoutes);
app.use("/api", importOutboundRoutes);
app.use("/api", importInboundRoutes);
app.use("/api", importMoldMasterRoutes);
app.use("/api", ExpressRoutes);

const PORT = process.env.PORT || 3334;
app.listen(PORT, () => {
    console.log(`API server running at http://192.168.0.122:${PORT}`);
});
