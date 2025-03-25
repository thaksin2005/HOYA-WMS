require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql2/promise');

// Import Routes
const LocationRoutes = require('./routes/LocationDetail');
const InboundRoutes = require('./routes/InboundDetail');
const OutboundDetailRoutes = require('./routes/OutboundDetail');
const WarehouseRoutes = require('./routes/WarehouseDetail');
const MoldSerialDetailRoutes = require('./routes/MoldSerialDetail');
const StackerDetailRoutes = require('./routes/StackerDetail');
const StackerGripperDetailRoutes = require('./routes/StackerGripperDetail');
const TaskStacker_InProgressDetailRoutes = require('./routes/TaskStacker_InProgressDetail');
const TaskStackerDetailRoutes = require('./routes/TaskStackerDetail');
const TrayMoldDetailRoutes = require('./routes/TrayMoldDetail');
const TaskStrackerDetailRoutes = require('./routes/TaskStrackerDetail');
const MoldMasterRoutes = require('./routes/MoldMaster');
const LocationTrayMoldRoutes = require('./routes/LocationTrayMold');
const FactoryDetailRoutes = require('./routes/FactoryDetail');
const PlaceDetailRoutes = require('./routes/PlaceDetail');
const HighperformanceRoutes = require('./routes/HighPerformance');
const MoldLimitStockRoutes = require('./routes/MoldLimitStock');
const InboundItempDetailRoutes = require('./routes/InboundItemDetail');
const OutboundItempDetailRoutes = require('./routes/OutboundItemDetail');
const SummaryLocationMonitoringRoutes = require('./routes/SummaryLocationMonitoring');
const RFIDRoutes = require('./routes/RFID');
const MachineLogRoutes = require('./routes/MachineLog');
const OvenMonitor1Routes = require('./routes/OvenMonitor1');
const OvenMonitor2Routes = require('./routes/OvenMonitor2');
const OvenMonitorGridRoutes = require('./routes/OvenMonitorGrid');

//IF
const MoldBlockRoutes = require('./routes/if/MoldBlock');
const UppLowReturnRoutes = require('./routes/UppLowReturn');

const app = express();
const port = process.env.PORT || 1234;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Enable logging

// MySQL Database Connection
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydatabase'
};

let db;
(async() => {
    try {
        db = await mysql.createPool(dbConfig);
        console.log('Connected to the database');
        app.set('db', db);
    } catch (err) {
        console.error('Failed to connect to the database:', err.message);
    }
})();

// API Routes
app.use('/api', LocationRoutes);
app.use('/api', InboundRoutes);
app.use('/api', OutboundDetailRoutes);
app.use('/api', WarehouseRoutes);
app.use('/api', MoldSerialDetailRoutes);
app.use('/api', StackerDetailRoutes);
app.use('/api', StackerGripperDetailRoutes);
app.use('/api', TaskStacker_InProgressDetailRoutes);
app.use('/api', TaskStackerDetailRoutes);
app.use('/api', TrayMoldDetailRoutes);
app.use('/api', TaskStrackerDetailRoutes);
app.use('/api', MoldMasterRoutes);
app.use('/api', LocationTrayMoldRoutes);
app.use('/api', MoldBlockRoutes);
app.use('/api', FactoryDetailRoutes);
app.use('/api', PlaceDetailRoutes);
app.use('/api', HighperformanceRoutes);
app.use('/api', MoldLimitStockRoutes);
app.use('/api', InboundItempDetailRoutes);
app.use('/api', OutboundItempDetailRoutes);
app.use('/api', SummaryLocationMonitoringRoutes);
app.use('/api', RFIDRoutes);
app.use('/api', MachineLogRoutes);
app.use('/api', OvenMonitor1Routes);
app.use('/api', OvenMonitor2Routes);
app.use('/api', OvenMonitorGridRoutes);
app.use('/api', UppLowReturnRoutes);

// 404 Error Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// Start Server
app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});