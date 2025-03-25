const express = require('express');
const XLSX = require('xlsx');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 1235;
const HOST = '192.168.0.122';

// เปิดใช้งาน CORS เพื่ออนุญาตให้ frontend เรียก API ได้
app.use(cors());

// API สำหรับส่งออก Excel
app.get('/export', async (req, res) => {
    try {
        // ตัวอย่างข้อมูลจาก API
        const data = [
            {
                TI_ID: "2086",
                TI_JobNumber: 0,
                MM_IDMoldMaster: "0",
                TI_Status: "Completed",
                TI_MsgError: null,
                UA_IDCreateBy: 99999,
                TI_CreateOn: "2024-12-25T14:34:49.513Z",
                UA_IDUpdateBy: null,
                TI_UpdateOn: null,
                TI_PlantNo: "00",
                TI_StockType: "05",
                TI_PlaceNo: "01",
                TI_MoldCode: "00583551",
                TI_TransactionCD: 23,
                TI_Qty: 1,
                TI_ProgramID: "WMS",
                TI_EmpNo: "99999",
                TI_WorkstationNo: "",
                TI_LotNo: "4282200732",
                TI_SndrcvPlantNo: "0",
                TI_SndrcvStockType: "05",
                TI_SndrcvPlaceNo: "0",
                TI_SndrcvTransactionCD: 0,
                TI_MoldSerial: "0058355124282200732024082710010",
                TI_ReworkCount: 0
            }
        ];

        // ฟอร์แมตข้อมูลเพื่อแปลงเป็น Excel
        const formattedData = data.map((item, index) => ({
            No: index + 1,
            TI_ID: item.TI_ID,
            TI_Status: item.TI_Status,
            TI_CreateOn: item.TI_CreateOn,
            TI_MoldCode: item.TI_MoldCode,
            TI_Qty: item.TI_Qty,
            TI_ProgramID: item.TI_ProgramID,
            TI_LotNo: item.TI_LotNo,
            TI_MoldSerial: item.TI_MoldSerial
        }));

        // สร้าง Workbook และ Worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(formattedData);

        XLSX.utils.book_append_sheet(workbook, worksheet, "TaskInboundDetail");

        // บันทึกไฟล์ Excel ชั่วคราว
        const filePath = './TaskInboundDetail.xlsx';
        XLSX.writeFile(workbook, filePath);

        // ส่งไฟล์กลับไปให้ผู้ใช้ดาวน์โหลด
        res.download(filePath, 'TaskInboundDetail.xlsx', (err) => {
            if (err) {
                console.error("Error downloading the file:", err);
                res.status(500).send("Error generating file");
            }

            // ลบไฟล์หลังจากดาวน์โหลดเสร็จ
            fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error("Error generating Excel:", error);
        res.status(500).send("Error generating Excel file");
    }
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
