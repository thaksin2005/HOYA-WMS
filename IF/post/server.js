// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { connectDB } = require("./config/dbConfig");
// const moldRoutes = require("./routes/moldRoutes");
// const upLoadMoldProcessRoutes = require("./routes/upLoadMoldProcess");
// const moldSerialRoutes = require("./routes/moldSerialRoutes");

// // const moldBlockRoutes = require("./routes/moldBlockRoutes");




// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
// });

// connectDB().catch(err => {
//     console.error("Database connection failed:", err);
//     process.exit(1);
// });

// // ใช้ routes สำหรับ Factory API
// app.use("/api/controlMoldBlock", moldRoutes);
// app.use("/api/upLoadMoldProcess", upLoadMoldProcessRoutes);
// app.use("/api", moldSerialRoutes);

// // app.use("/api", moldBlockRoutes);

// // setInterval(() => {
// //     require("./controllers/moldBlockController").checkAndSendMoldBlockData();
// // }, 5000); // ตรวจสอบทุก 5 วินาที


// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: "Something went wrong!" });
// });

// const PORT = process.env.PORT || 3333;
// app.listen(PORT, () => {
//     console.log(`API server running at http://10.24.102.165:${PORT}`);
// });



// // server.js
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { connectDB } = require("./config/dbConfig");
// const moldRoutes = require("./routes/moldRoutes");
// const upLoadMoldProcessRoutes = require("./routes/upLoadMoldProcess");
// const moldSerialRoutes = require("./routes/moldSerialRoutes");
// const moldBlockRoutes = require("./routes/moldBlockRoutes");

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
// });

// connectDB().catch(err => {
//     console.error("Database connection failed:", err);
//     process.exit(1);
// });

// // ใช้ routes สำหรับ Factory API
// app.use("/api/controlMoldBlock", moldRoutes);
// app.use("/api/upLoadMoldProcess", upLoadMoldProcessRoutes);
// app.use("/api", moldSerialRoutes);
// app.use("/api", moldBlockRoutes);

// setInterval(() => {
//     require("./controllers/moldBlockController").fetchAndUpdateMoldBlock();
// }, 10000); // ตรวจสอบทุก 5 วินาที

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: "Something went wrong!" });
// });


// connectDB().then(() => {
//     console.log("Database connected successfully");
// }).catch(err => {
//     console.error("Database connection failed:", err);
// });

// const PORT = process.env.PORT || 3333;
// app.listen(PORT, () => {
//     console.log(`API server running at http://10.24.102.165:${PORT}`);
// });


// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/dbConfig");
const moldRoutes = require("./routes/moldRoutes");
const upLoadMoldProcessRoutes = require("./routes/upLoadMoldProcess");
const moldSerialRoutes = require("./routes/moldSerialRoutes");
const moldBlockRoutes = require("./routes/moldBlockRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// เชื่อมต่อฐานข้อมูล
connectDB().catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1);
});

// ใช้ routes สำหรับ Factory API
app.use("/api/controlMoldBlock", moldRoutes);
app.use("/api/upLoadMoldProcess", upLoadMoldProcessRoutes);
app.use("/api", moldSerialRoutes);
app.use("/api", moldBlockRoutes);

// ตรวจสอบทุก 10 วินาที
setInterval(() => {
    require("./controllers/moldBlockController").fetchAndUpdateMoldBlock();
}, 10000);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

connectDB().then(() => {
    console.log("Database connected successfully");
}).catch(err => {
    console.error("Database connection failed:", err);
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`API server running at http://10.24.102.165:${PORT}`);
});
