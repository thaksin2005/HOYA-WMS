import React, { useState, useEffect } from "react";
import { Input, Col, Row, Spin } from "antd";
import Tables from "../../components/Tables";
import axios from "axios";
import NotificationAPI from "../../components/NotificationAPI";
import MessageAPI from "../../components/MessageAPI";
import moment from 'moment';

const ErrorLog = () => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [machineLogData, setMachineLogData] = useState([]);
  const [openNotification, setOpenNotification] = useState(null);
  const [description, setDescription] = useState(null);
  const [messageNotification, setMessageNotification] = useState(null);
  const [openMessage, setOpenMessage] = useState(null);
  const [MessageType, setMessageType] = useState(null);
  const [MessageText, setMessageText] = useState(null);

  // ฟังก์ชันดึงข้อมูล Machine Log
  const getMachineLogData = async () => {
    try {
      const response = await axios.get("http://localhost:1234/api/MachineLog-requests");
      
      console.log("Raw API Response:", response.data);

      if (response.data) {
        const mappedData = response.data.map((item, index) => ({
          key: index + 1,
          no: index + 1,
          machineId: item.ML_ID || '-',
          jobNumber: item.ML_JobNumber || '-',
          trayNumber: item.ML_TrayNumber || '-',
          moldSerial: item.ML_MoldSerial || '-',
          trayPosition: item.ML_TrayPosition || '-',
          errorMessage: item.ML_MsgError || '-',
          recordDateTime: item.ML_RecordOn ? 
            moment.utc(item.ML_RecordOn)
              .format('YYYY-MM-DD HH:mm:ss') : '-'
        }));

        console.log("Original DateTime:", response.data[0]?.ML_RecordOn);
        console.log("Converted DateTime:", mappedData[0]?.recordDateTime);
        
        setMachineLogData(mappedData);
      } else {
        console.error("No data received from API");
        setMessageText("No data received from server");
        setOpenMessage("error");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error details:", error);
      setOpenMessage("error");
      setMessageType("error");
      setMessageText(
        error.response 
          ? `Error: ${error.response.status} - ${error.response.statusText}`
          : "Failed to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  // columns สำหรับตาราง Machine Log
  const columns = [
    // {
    //   title: "No.",
    //   dataIndex: "no",
    //   key: "no",
    //   width: "5%",
    //   align: "center",
    // },
    {
      title: "Machine ID",
      dataIndex: "machineId",
      key: "machineId",
      width: "7%",
      align: "center",
    },
    {
      title: "Job Number",
      dataIndex: "jobNumber",
      key: "jobNumber",
      width: "7%",
      align: "center",
    },
    {
      title: "Tray Number",
      dataIndex: "trayNumber",
      key: "trayNumber",
      width: "10%",
      align: "center",
    },
    {
      title: "Mold Serial",
      dataIndex: "moldSerial",
      key: "moldSerial",
      width: "15%",
      align: "center",
    },
    {
      title: "Tray Position",
      dataIndex: "trayPosition",
      key: "trayPosition",
      width: "7%",
      align: "center",
    },
    {
      title: "Error Message",
      dataIndex: "errorMessage",
      key: "errorMessage",
      width: "25%",
    },
    {
      title: "Record Date Time",
      dataIndex: "recordDateTime",
      key: "recordDateTime",
      width: "12%",
      align: "center",
    }
  ];

  // ฟังก์ชัน filter ข้อมูล
  const filteredData = machineLogData.filter((item) =>
    Object.values(item).some((value) =>
      value
        ? value.toString().toLowerCase().includes(searchText.toLowerCase())
        : false
    )
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // เรียกข้อมูลครั้งแรก
  useEffect(() => {
    getMachineLogData();
  }, []);

  // อัพเดทข้อมูลทุก 30 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      getMachineLogData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="table-container">
        <div className="table-header2">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Input
              placeholder="Search"
              style={{ width: "300px" }}
              value={searchText}
              onChange={handleSearch}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 'bold' }}>Total Items:</span>
              <span style={{ 
                background: '#1890ff', 
                color: 'white', 
                padding: '2px 8px', 
                borderRadius: '4px',
                minWidth: '28px',
                textAlign: 'center'
              }}>{machineLogData.length}</span>
            </div>
            {/* <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 'bold' }}>Error:</span>
              <span style={{ 
                background: '#f5222d', 
                color: 'white', 
                padding: '2px 8px', 
                borderRadius: '4px',
                minWidth: '28px',
                textAlign: 'center'
              }}>{machineLogData.filter(item => item.status === 'Error').length}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 'bold' }}>Active:</span>
              <span style={{ 
                background: '#52c41a', 
                color: 'white', 
                padding: '2px 8px', 
                borderRadius: '4px',
                minWidth: '28px',
                textAlign: 'center'
              }}>{machineLogData.filter(item => item.status === 'Active').length}</span>
            </div> */}
          </div>
        </div>

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

export default ErrorLog;