        const multer = require("multer");
        const fs = require("fs");
        const path = require("path");
        
        const uploadDir = "D:\\MPICS_Share\\IF201\\csv";
        
        // ตรวจสอบและสร้างโฟลเดอร์ถ้าไม่มีอยู่
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        // ตั้งค่าการอัปโหลดไฟล์
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, uploadDir);
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}-${file.originalname}`);
            }
        });
        
        // ฟิลเตอร์เฉพาะไฟล์ CSV
        const fileFilter = (req, file, cb) => {
            if (file.mimetype === "text/csv") {
                cb(null, true);
            } else {
                cb(new Error("Only CSV files are allowed!"), false);
            }
        };
        
        const upload = multer({ storage, fileFilter });
        
        module.exports = upload;