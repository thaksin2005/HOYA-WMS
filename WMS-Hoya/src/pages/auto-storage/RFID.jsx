import React, { useState, useEffect } from "react";
import { Input, Col, Row, Spin, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Tables from "../../components/Tables";
import axios from "axios";
import NotificationAPI from "../../components/NotificationAPI";
import MessageAPI from "../../components/MessageAPI";

const RFID = () => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [summaryData, setSummaryData] = useState({
    LocationActive: 0,
    TotalTray: 0,
    TotalPosition: 0,
  });
  const [openNotification, setOpenNotification] = useState(null);
  const [description, setDescription] = useState(null);
  const [messageNotification, setMessageNotification] = useState(null);
  const [selectedSerial, setSelectedSerial] = useState(null);
  const [openMessage, setOpenMessage] = useState(null);
  const [MessageType, setMessageType] = useState(null);
  const [MessageText, setMessageText] = useState(null);

  // ฟังก์ชันดึงข้อมูล RFID
  const getRFIDData = async () => {
    try {
      const response = await axios.get("http://localhost:1234/api/RFID-requests");

      const data = response.data.map((item, index) => ({
        key: `${item.RFID_ID}-${index}`,
        no: index + 1,
        rfidCode: item.RFID_Code,
        rfidInfo: item.RFID_Info,
        rfidRecordOn: item.RFID_RecordOn,
        relId: item.REL_ID,
        relIdType: item.REL_IDType,
        isExport: item.RFID_IsExport ? "Yes" : "No",
        taskStackerOut: item.TSO_IDTaskStackerOut,
      }));
      console.log(response);
      setData(data);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setOpenMessage("error");
        setMessageType("error");
        setMessageText("Not connected to server");
      }
    }
  };

  // ฟังก์ชันดึงข้อมูลสรุปจาก API
  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1234/api/SummaryLocationMonitoring-requests"
        );
        setSummaryData(response.data[0]); // ตั้งค่า state ด้วยข้อมูลที่ได้จาก API
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchSummaryData();
  }, []);

  const handleSerialChange = (value) => {
    setSelectedSerial(value);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      width: "5%",
      align: "center",
    },
    {
      title: "RFID Code",
      dataIndex: "rfidCode",
      width: "10%",
      filterSearch: true,
      filters: Array.from(new Set(data.map((item) => item.rfidCode))).map(
        (rfidCode) => ({
          text: rfidCode,
          value: rfidCode,
        })
      ),
      onFilter: (value, record) =>
        record.rfidCode ? record.rfidCode.toString().includes(value) : false,
    },
    {
      title: "RFID Info",
      dataIndex: "rfidInfo",
      width: "20%",
      filterSearch: true,
    },
    {
      title: "Record On",
      dataIndex: "rfidRecordOn",
      width: "15%",
      filterSearch: true,
    },
    {
      title: "REL ID",
      dataIndex: "relId",
      width: "10%",
      filterSearch: true,
    },
    {
      title: "REL ID Type",
      dataIndex: "relIdType",
      width: "10%",
      filterSearch: true,
    },
    {
      title: "Is Export",
      dataIndex: "isExport",
      width: "8%",
      filterSearch: true,
      filters: [
        { text: "Yes", value: "Yes" },
        { text: "No", value: "No" },
      ],
      onFilter: (value, record) => record.isExport === value,
    },
    {
      title: "Task Stacker Out",
      dataIndex: "taskStackerOut",
      width: "12%",
      filterSearch: true,
    },
  ];

  const filteredData = data.filter(
    (item) =>
      Object.values(item).some((value) =>
        value
          ? value.toString().toLowerCase().includes(searchText.toLowerCase())
          : false
      ) && (selectedSerial ? item.rfidCode === selectedSerial : true)
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    getRFIDData();
  }, []);

  // ตรวจสอบข้อมูลใหม่ทุกๆ 2 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length > 0) {
        const checkNewData = async () => {
          try {
            const response = await axios.get(
              "http://localhost:1234/api/RFID-requests"
            );

            // สร้าง Set ของ RFID Code ที่มีอยู่แล้ว
            const existingRFIDCodes = new Set(data.map((item) => item.rfidCode));

            // สร้าง Set ของ RFID Code ใหม่
            const newRFIDCodes = new Set(
              response.data.map((item) => item.RFID_Code)
            );

            // คำนวณจำนวน RFID ที่เพิ่มเข้ามา
            const newRFIDCount = newRFIDCodes.size - existingRFIDCodes.size;

            // กรองข้อมูลใหม่ที่ไม่ซ้ำกับที่มีอยู่แล้ว
            const newData = response.data.filter(
              (item) => !existingRFIDCodes.has(item.RFID_Code)
            );

            if (newRFIDCount > 0) {
              getRFIDData();
              setOpenNotification("info");
              setMessageNotification("New RFID");
              setDescription(
                `New RFID is added: ${newRFIDCount} RFID`
              );
            }
          } catch (error) {
            if (error.response && error.response.status === 500) {
              setOpenMessage("error");
              setMessageType("error");
              setMessageText("Not connected to server");
            }
          }
        };
        checkNewData();
      }
    }, 2000);

    return () => {
      clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
    };
  }, [data]);

  useEffect(() => {
    if (data.length === 0) {
      setLoading(true);
      setTimeout(() => setLoading(false), 100);
    }
    if (data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (openMessage) {
      const timer = setTimeout(() => {
        setOpenMessage(null); // รีเซ็ตสถานะหลังจากแสดงผล
      }, 3000); // ตั้งเวลาให้ข้อความแสดงผลเป็นเวลา 3 วินาที

      return () => clearTimeout(timer); // ล้าง timer เมื่อ component ถูก unmount หรือเมื่อ openMessage เปลี่ยนแปลง
    }
  }, [openMessage]);

  return (
    <>
      {/* ส่วนหัวของหน้า */}
      <div className="table-container">
        <div className="total-section">
          <div className="total-section-header">
            <Col span={24}>
              <Row gutter={16}>
                <Col span={12} style={{ alignItems: "center", display: "flex" }}>
                  <Input
                    placeholder="Search"
                    style={{
                      width: "40%",
                      minWidth: "150px",
                    }}
                    value={searchText}
                    onChange={handleSearch}
                  />
                </Col>
                {/* <Col span={4}>
                  <center>
                    <h3>Location Active</h3>
                    <h3 style={{ color: "#DA251C" }}>{summaryData.LocationActive}</h3>
                  </center>
                </Col>
                <Col span={4}>
                  <center>
                    <h3>Total Tray</h3>
                    <h3 style={{ color: "#DA251C" }}>{summaryData.TotalTray}</h3>
                  </center>
                </Col>
                <Col span={4}>
                  <center>
                    <h3>Total Position</h3>
                    <h3 style={{ color: "#DA251C" }}>{summaryData.TotalPosition}</h3>
                  </center>
                </Col> */}
              </Row>
            </Col>
          </div>
        </div>

        {/* ส่วนแสดงตารางข้อมูล */}
        <section style={{ marginTop: "10px" }}>
          <Spin spinning={loading}>
            <Tables
              columns={columns}
              dataSource={filteredData}
              bordered
              scrollY={0.6}
              scrollX={"max-content"}
            />
          </Spin>
        </section>
      </div>

      {/* ส่วนแสดง Notification และ Drawer */}
      <section>
        <NotificationAPI
          openNotification={openNotification}
          description={description}
          message={messageNotification}
        />
        <MessageAPI
          openMessage={openMessage}
          MessageType={MessageType}
          MessageText={MessageText}
        />
      </section>
    </>
  );
};

export default RFID;