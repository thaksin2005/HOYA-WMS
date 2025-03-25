// import React, { useState, useEffect } from "react";
// import { Input, Col, Row, Spin, Select } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// import Tables from "../../components/Tables";
// import axios from "axios";
// import NotificationAPI from "../../components/NotificationAPI";
// import MessageAPI from "../../components/MessageAPI";

// const Monitoring = () => {
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState("");
//   const [data, setData] = useState([]);
//   const [totalTray, setTotalTray] = useState(0);
//   const [totalLocation, setTotalLocation] = useState(0);
//   const [totalQTY, setTotalQTY] = useState(0);
//   const [openNotification, setOpenNotification] = useState(null);
//   const [description, setDescription] = useState(null);
//   const [messageNotification, setMessageNotification] = useState(null);
//   const [selectedSerial, setSelectedSerial] = useState(null);
//   const [openMessage, setOpenMessage] = useState(null);
//   const [MessageType, setMessageType] = useState(null);
//   const [MessageText, setMessageText] = useState(null);

//   const getMonitoring = async () => {
//     try {
//       const response = await axios.get(import.meta.env.VITE_API_MONITORING);

//       const data = response.data.map((item, index) => ({
//         key: `${item.MS_Serial}-${index}`,
//         no: index + 1,
//         trayCode: item.T_TrayNumber,
//         position: item.TP_Position,
//         stacker: item.S_IDStacker,
//         moldCode: item.MM_MoldCode,
//         typeShortName: item.MM_TypeShortName,
//         serial: item.MS_Serial,
//         location: item.L_LocationCode,
//       }));
//       console.log(response);
//       setData(data);

//       const trayCode = Array.from(new Set(data.map((item) => item.trayCode)));
//       const location = Array.from(new Set(data.map((item) => item.location)));
//       const qty = data.length;
//       setTotalTray(trayCode.length);
//       setTotalLocation(location.length);
//       setTotalQTY(qty);
//     } catch (error) {
//       if (error.status === 500) {
//         setOpenMessage("error");
//         setMessageType("error");
//         setMessageText("Not connected to server");
//       }
//     }
//   };

//   // ฟังก์ชันใหม่สำหรับกรอง trayCode ที่มีจำนวนไม่ถึง 8
//   const getTrayCodesWithLessThanEight = (data) => {
//     const trayCodeCount = data.reduce((acc, item) => {
//       acc[item.trayCode] = (acc[item.trayCode] || 0) + 1;
//       return acc;
//     }, {});

//     return Array.from(
//       new Set(
//         data
//           .filter((item) => trayCodeCount[item.trayCode] < 8)
//           .map((item) => item.trayCode)
//       )
//     );
//   };

//   const lessThanEightTrayCodes = getTrayCodesWithLessThanEight(data);

//   const handleSerialChange = (value) => {
//     setSelectedSerial(value);
//   };

//   const columns = [
//     {
//       title: "No",
//       dataIndex: "no",
//       width: "5%",
//       align: "center",
//     },
//     {
//       title: "Tray Code",
//       dataIndex: "trayCode",
//       width: "8%",
//       filterSearch: true,
//       filterMode: "tree",
//       filters: [
//         {
//           text: "Less than 8",
//           value: "Less than 8",
//           children: lessThanEightTrayCodes.map((trayCode, index) => ({
//             text: trayCode,
//             value: trayCode,
//             key: `${trayCode}-${index}`,
//           })),
//         },
//         {
//           text: "Full tray",
//           value: "Full tray",
//           children: Array.from(new Set(data.map((item) => item.trayCode)))
//             .filter((trayCode) => !lessThanEightTrayCodes.includes(trayCode))
//             .map((trayCode, index) => ({
//               text: trayCode,
//               value: trayCode,
//               key: `${trayCode}-${index}`,
//             })),
//         },
//       ],
//       onFilter: (value, record) =>
//         record.trayCode ? record.trayCode.toString().includes(value) : false,
//     },
//     {
//       title: "Position",
//       dataIndex: "position",
//       width: "8%",
//       filters: Array.from(new Set(data.map((item) => item.position))).map(
//         (position) => ({
//           text: position,
//           value: position,
//         })
//       ),
//       onFilter: (value, record) =>
//         record.position ? record.position.toString().includes(value) : false,
//       filterSearch: true,
//     },
//     {
//       title: "Stacker",
//       dataIndex: "stacker",
//       width: "8%",
//       filters: Array.from(new Set(data.map((item) => item.stacker))).map(
//         (stacker) => ({
//           text: stacker,
//           value: stacker,
//         })
//       ),
//       onFilter: (value, record) =>
//         record.stacker ? record.stacker.toString().includes(value) : false,
//       filterSearch: true,
//     },
//     {
//       title: "Mold Code",
//       dataIndex: "moldCode",
//       width: "10%",
//       filterSearch: true,
//       filters: Array.from(new Set(data.map((item) => item.moldCode))).map(
//         (moldCode) => ({
//           text: moldCode,
//           value: moldCode,
//         })
//       ),
//       onFilter: (value, record) =>
//         record.moldCode ? record.moldCode.toString().includes(value) : false,
//     },
//     {
//       title: "Type",
//       dataIndex: "typeShortName",
//       width: "8%",
//       filterSearch: true,
//       filters: Array.from(new Set(data.map((item) => item.typeShortName))).map(
//         (typeShortName) => ({
//           text: typeShortName,
//           value: typeShortName,
//         })
//       ),
//       onFilter: (value, record) =>
//         record.typeShortName
//           ? record.typeShortName.toString().includes(value)
//           : false,
//     },
//     {
//       title: "Serial",
//       dataIndex: "serial",
//       width: "20%",
//       filterDropdown: () => (
//         <Select
//           showSearch
//           style={{ width: 200 }}
//           placeholder="Select a serial"
//           onChange={handleSerialChange}
//           allowClear
//           filterOption={(input, option) =>
//             option.children.toLowerCase().includes(input.toLowerCase())
//           }
//         >
//           {Array.from(new Set(data.map((item) => item.serial))).map(
//             (serial) => (
//               <Select.Option key={serial} value={serial}>
//                 {serial}
//               </Select.Option>
//             )
//           )}
//         </Select>
//       ),
//       filterIcon: (filtered) => (
//         <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
//       ),
//     },
//     {
//       title: "Location",
//       dataIndex: "location",
//       width: "15%",
//       filterSearch: true,
//       filters: Array.from(new Set(data.map((item) => item.location))).map(
//         (location) => ({
//           text: location,
//           value: location,
//         })
//       ),
//       onFilter: (value, record) =>
//         record.location ? record.location.toString().includes(value) : false,
//     },
//   ];

//   const filteredData = data.filter(
//     (item) =>
//       Object.values(item).some((value) =>
//         value
//           ? value.toString().toLowerCase().includes(searchText.toLowerCase())
//           : false
//       ) && (selectedSerial ? item.serial === selectedSerial : true)
//   );

//   const handleSearch = (e) => {
//     setSearchText(e.target.value);
//   };

//   useEffect(() => {
//     getMonitoring();
//   }, []);

//   // ตรวจอบข้อมูลใหม่ทุกๆ 2 วินาที
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (data.length > 0) {
//         const checkNewData = async () => {
//           try {
//             const response = await axios.get(
//               import.meta.env.VITE_API_MONITORING
//             );

//             // สร้าง Set ของ trayCode ที่มีอยู่แล้ว
//             const existingTrayCodes = new Set(
//               data.map((item) => item.trayCode)
//             );

//             // กร้าง Set ของ trayCode ใหม่
//             const newTrayCodes = new Set(
//               response.data.map((item) => item.T_Number)
//             );

//             // คำนวณจำนวน tray ที่เพิ่มเข้ามา
//             const newTrayCount = newTrayCodes.size - existingTrayCodes.size;

//             // กรอง tray ใหม่ที่ไม่ซ้ำกับที่มีอยู่แล้ว เพื่อดูจำนวน mold ที่อยู่ใน tray ใหม่
//             const newData = response.data.filter(
//               (item) => !existingTrayCodes.has(item.T_Number)
//             );

//             if (newTrayCount > 0) {
//               getMonitoring();
//               setOpenNotification("info");
//               setMessageNotification("New tray");
//               setDescription(
//                 `New tray is added: ${newTrayCount} tray ${newData.length} mold`
//               );
//             }
//           } catch (error) {
//             if (error.status === 500) {
//               setOpenMessage("error");
//               setMessageType("error");
//               setMessageText("Not connected to server");
//             }
//           }
//         };
//         checkNewData();
//       }
//     }, 2000);

//     return () => {
//       clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
//     };
//   }, [data]);

//   useEffect(() => {
//     if (data.length === 0) {
//       setLoading(true);
//       setTimeout(() => setLoading(false), 100);
//     }
//     if (data.length > 0) {
//       setLoading(false);
//     }
//   }, [data]);

//   useEffect(() => {
//     if (openMessage) {
//       const timer = setTimeout(() => {
//         setOpenMessage(null); // รีเซ็ตสถานะหลังจากแสดงผล
//       }, 3000); // ตั้งเวลาให้ข้อความแสดงผลเป็นเวลา 3 วินาที

//       return () => clearTimeout(timer); // ล้าง timer เมื่อ component ถูก unmount หรือเมื่อ openMessage เปลี่ยนแปลง
//     }
//   }, [openMessage]);

//   return (
//     <>
//       {/* ส่วนหัวของหน้า */}
//       <div className="table-container">
//         <div className="total-section">
//           <div className="total-section-header">
//             <Col span={24}>
//               <Row gutter={16}>
//                 <Col
//                   span={12}
//                   style={{ alignItems: "center", display: "flex" }}
//                 >
//                   <Input
//                     placeholder="Search"
//                     style={{
//                       width: "40%",
//                       minWidth: "150px",
//                     }}
//                     value={searchText}
//                     onChange={handleSearch}
//                   />
//                 </Col>
//                 <Col span={4}>
//                   <center>
//                     <h3>Location Active</h3>
//                     <h3 style={{ color: "#DA251C" }}>{totalQTY}</h3>
//                   </center>
//                 </Col>
//                 <Col span={4}>
//                   <center>
//                     <h3>Total Tray</h3>
//                     <h3 style={{ color: "#DA251C" }}>{totalTray}</h3>
//                   </center>
//                 </Col>
//                 <Col span={4}>
//                   <center>
//                     <h3>Total Position</h3>
//                     <h3 style={{ color: "#DA251C" }}>{totalLocation}</h3>
//                   </center>
//                 </Col>
//               </Row>
//             </Col>
//           </div>
//         </div>

//         {/* ส่วนแสดงตารางข้อมูล */}
//         <section style={{ marginTop: "10px" }}>
//           <Spin spinning={loading}>
//             <Tables
//               columns={columns}
//               dataSource={filteredData}
//               bordered
//               scrollY={0.6}
//               scrollX={"max-content"}
//             />
//           </Spin>
//         </section>
//       </div>

//       {/* ส่วนแสดง Notification และ Drawer */}
//       <section>
//         <NotificationAPI
//           openNotification={openNotification}
//           description={description}
//           message={messageNotification}
//         />
//         <MessageAPI
//           openMessage={openMessage}
//           MessageType={MessageType}
//           MessageText={MessageText}
//         />
//       </section>
//     </>
//   );
// };

// export default Monitoring;

import React, { useState, useEffect } from "react";
import { Input, Col, Row, Spin, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Tables from "../../components/Tables";
import axios from "axios";
import NotificationAPI from "../../components/NotificationAPI";
import MessageAPI from "../../components/MessageAPI";

const Monitoring = () => {
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

  // ฟังก์ชันดึงข้อมูล Monitoring
  const getMonitoring = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_MONITORING);

      const data = response.data.map((item, index) => ({
        key: `${item.MS_Serial}-${index}`,
        no: index + 1,
        trayCode: item.T_TrayNumber,
        position: item.TP_Position,
        stacker: item.S_IDStacker,
        moldCode: item.MM_MoldCode,
        typeShortName: item.MM_TypeShortName,
        serial: item.MS_Serial,
        location: item.L_LocationCode,
      }));
      console.log(response);
      setData(data);
    } catch (error) {
      if (error.status === 500) {
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
          "http://localhost:3333/api/SummaryLocationMonitoring-requests"
        );
        setSummaryData(response.data[0]); // ตั้งค่า state ด้วยข้อมูลที่ได้จาก API
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchSummaryData();
  }, []);

  // ฟังก์ชันกรอง trayCode ที่มีจำนวนไม่ถึง 8
  const getTrayCodesWithLessThanEight = (data) => {
    const trayCodeCount = data.reduce((acc, item) => {
      acc[item.trayCode] = (acc[item.trayCode] || 0) + 1;
      return acc;
    }, {});

    return Array.from(
      new Set(
        data
          .filter((item) => trayCodeCount[item.trayCode] < 8)
          .map((item) => item.trayCode)
      )
    );
  };

  const lessThanEightTrayCodes = getTrayCodesWithLessThanEight(data);

  const handleSerialChange = (value) => {
    setSelectedSerial(value);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      width: "3%",
      align: "center",
    }, 
    {
      title: "Stacker",
      dataIndex: "stacker",
      width: "8%",
      align: "center",
      filters: Array.from(new Set(data.map((item) => item.stacker))).map(
        (stacker) => ({
          text: stacker,
          value: stacker,
        })
      ),
      onFilter: (value, record) =>
        record.stacker ? record.stacker.toString().includes(value) : false,
      filterSearch: true,
    },
    {
      title: "Location",
      dataIndex: "location",
      width: "15%",
      filterSearch: true,
      align: "center",
      // filters: Array.from(new Set(data.map((item) => item.location))).map(
      //   (location) => ({
      //     text: location,
      //     value: location,
      //   })
      // ),
      onFilter: (value, record) =>
        record.location ? record.location.toString().includes(value) : false,
    },
    {
      title: "Tray Code",
      dataIndex: "trayCode",
      width: "8%",
      filterSearch: true,
      filterMode: "tree",
      filters: [
        {
          text: "Less than 8",
          value: "Less than 8",
          children: lessThanEightTrayCodes.map((trayCode, index) => ({
            text: trayCode,
            value: trayCode,
            key: `${trayCode}-${index}`,
          })),
        },
        {
          text: "Full tray",
          value: "Full tray",
          children: Array.from(new Set(data.map((item) => item.trayCode)))
            .filter((trayCode) => !lessThanEightTrayCodes.includes(trayCode))
            .map((trayCode, index) => ({
              text: trayCode,
              value: trayCode,
              key: `${trayCode}-${index}`,
            })),
        },
      ],
      onFilter: (value, record) =>
        record.trayCode ? record.trayCode.toString().includes(value) : false,
    },
    {
      title: "Position",
      dataIndex: "position",
      width: "8%",
      filters: Array.from(new Set(data.map((item) => item.position))).map(
        (position) => ({
          text: position,
          value: position,
        })
      ),
      onFilter: (value, record) =>
        record.position ? record.position.toString().includes(value) : false,
      filterSearch: true,
    },
   
    {
      title: "Mold Code",
      dataIndex: "moldCode",
      width: "10%",
      filterSearch: true,
      filters: Array.from(new Set(data.map((item) => item.moldCode))).map(
        (moldCode) => ({
          text: moldCode,
          value: moldCode,
        })
      ),
      onFilter: (value, record) =>
        record.moldCode ? record.moldCode.toString().includes(value) : false,
    },
    {
      title: "Type",
      dataIndex: "typeShortName",
      width: "8%",
      filterSearch: true,
      filters: Array.from(new Set(data.map((item) => item.typeShortName))).map(
        (typeShortName) => ({
          text: typeShortName,
          value: typeShortName,
        })
      ),
      onFilter: (value, record) =>
        record.typeShortName
          ? record.typeShortName.toString().includes(value)
          : false,
    },
    {
      title: "Serial",
      dataIndex: "serial",
      width: "20%",
      filterDropdown: () => (
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a serial"
          onChange={handleSerialChange}
          allowClear
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {Array.from(new Set(data.map((item) => item.serial))).map(
            (serial) => (
              <Select.Option key={serial} value={serial}>
                {serial}
              </Select.Option>
            )
          )}
        </Select>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
    
  ];

  const filteredData = data.filter(
    (item) =>
      Object.values(item).some((value) =>
        value
          ? value.toString().toLowerCase().includes(searchText.toLowerCase())
          : false
      ) && (selectedSerial ? item.serial === selectedSerial : true)
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    getMonitoring();
  }, []);

  // ตรวจสอบข้อมูลใหม่ทุกๆ 2 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length > 0) {
        const checkNewData = async () => {
          try {
            const response = await axios.get(
              import.meta.env.VITE_API_MONITORING
            );

            // สร้าง Set ของ trayCode ที่มีอยู่แล้ว
            const existingTrayCodes = new Set(
              data.map((item) => item.trayCode)
            );

            // สร้าง Set ของ trayCode ใหม่
            const newTrayCodes = new Set(
              response.data.map((item) => item.T_Number)
            );

            // คำนวณจำนวน tray ที่เพิ่มเข้ามา
            const newTrayCount = newTrayCodes.size - existingTrayCodes.size;

            // กรอง tray ใหม่ที่ไม่ซ้ำกับที่มีอยู่แล้ว เพื่อดูจำนวน mold ที่อยู่ใน tray ใหม่
            const newData = response.data.filter(
              (item) => !existingTrayCodes.has(item.T_Number)
            );

            if (newTrayCount > 0) {
              getMonitoring();
              setOpenNotification("info");
              setMessageNotification("New tray");
              setDescription(
                `New tray is added: ${newTrayCount} tray ${newData.length} mold`
              );
            }
          } catch (error) {
            if (error.status === 500) {
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
                <Col span={4}>
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
                </Col>
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

export default Monitoring;
