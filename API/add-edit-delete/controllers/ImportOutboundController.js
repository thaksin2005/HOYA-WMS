const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

exports.importCSV = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Please upload a CSV file!" });
    }

    // เปลี่ยน path เป็น "D:/Work AI-Tech/HOYA/File Import/job200"
    const filePath = path.join("D:\\MPICS_Share\\IF03\\csv", req.file.filename);

    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            res.json({ message: "CSV imported successfully!", data: results });
        })
        .on("error", (error) => {
            res.status(500).json({ message: "Error reading CSV file", error });
        });
};