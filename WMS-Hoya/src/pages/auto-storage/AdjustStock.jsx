import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Input, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import "../../styles/autostorage.css";
import Tables from "../../components/Tables";
import DropdownActionTable from "../../components/dropdown/DropdownActionTable";
import DrawerAdd from "./components/DrawerAdd";
import ModalDetail from "./components/ModalDetail";
import axios from "axios";
import NotificationAPI from "../../components/NotificationAPI";

const Inbound = () => {
  // สร้าง state สำหรับการจัดการสถานะต่างๆ
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerDetail, setOpenDrawerDetail] = useState(false);
  const [openNotification, setOpenNotification] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataInbound, setDataInbound] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [totalItem, setTotalItem] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [searchText, setSearchText] = useState("");

  // ฟังก์ชันเปิด/ปิด Drawer
  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const onCloseDrawerDetail = () => {
    setOpenDrawerDetail(false);
  };

  const handleSearch = (e) => setSearchText(e.target.value);

  // ตัวเลือกสำหรับ Select
  const warehouseOptions = [
    { value: "1", label: "#1 - Warehouse 1" },
    { value: "2", label: "#2 - Warehouse 2" },
    { value: "3", label: "#3 - Warehouse 3" },
  ];

  const pointOptions = [
    { value: "1", label: "#1 - Point 1" },
    { value: "2", label: "#2 - Point 2" },
    { value: "3", label: "#3 - Point 3" },
  ];

  const [form] = Form.useForm();

  // ฟังก์ชันจัดการการส่งฟอร์ม
  const handleSubmit = () => {
    const formValues = form.getFieldsValue();
    const formattedDate = formValues.DateCreated
      ? moment(formValues.DateCreated).format("YYYY-MM-DD")
      : null;
    console.log("Form submitted");
    console.log({ ...formValues, DateCreated: formattedDate });
  };

  // ฟังก์ชันเมื่อคลิกดูรา��ละเอียด
  const handleDetailClick = (record) => {
    setSelectedRecord(record);
    setOpenDrawerDetail(true);
  };

  // กำหนดคอลัมน์ของตาราง
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      width: "60px",
      align: "center",
      fixed: "left",
    },
    {
      title: "Job No.",
      dataIndex: "jobNo",
      key: "jobNo",
      width: "100px",
      fixed: "left",
      filters: [
        { text: "Job 100", value: "100" },
        { text: "Job 200", value: "200" },
        { text: "Job 250", value: "250" },
      ],
      align: "center",
      onFilter: (value, record) => record.jobNo.toString().includes(value),
    },
    { title: "Lot No.", dataIndex: "lotNo", key: "lotNo", fixed: "left" },
    {
      title: "Mold Code",
      dataIndex: "moldCode",
      key: "moldCode",
      width: "110px",
    },
    { title: "Mold Serial", dataIndex: "moldSerial", key: "moldSerial" },
    {
      title: "Create at",
      dataIndex: "createAt",
      key: "createAt",
      width: `${"Create at".length * 18}px`,
    },
    {
      title: "Update at",
      dataIndex: "updateAt",
      key: "updateAt",
      width: "100px",
    },
    { title: "Status", dataIndex: "status", key: "status", width: "100px" },
    {
      title: "More",
      dataIndex: "more",
      key: "more",
      render: (text, record) => (
        <DropdownActionTable
          onDetailClick={handleDetailClick}
          record={record}
        />
      ),
      width: "80px",
      align: "center",
      fixed: "right",
    },
  ];

  // ฟังก์ชันดึงข้อมูล Inbound
  const getInbound = async () => {
    try {
      const response = await axios.get("/api/TaskInboundDetail-requests");

      const data = response.data.map((item, index) => ({
        key: item.TI_ID,
        no: (index + 1).toString(),
        jobNo: item.TI_JobNumber,
        lotNo: item.TI_LotNo,
        moldCode: item.TI_MoldCode,
        moldSerial: item.TI_MoldSerial,
        createAt: moment(item.TI_CreateOn).format("DD/MM/YYYY HH:mm:ss"),
        updateAt: item.TI_UpdateOn,
        status: item.TI_Status,
        plantNo: item.TI_PlantNo,
        stockType: item.TI_StockType,
        placeNo: item.TI_PlaceNo,
        transactionCD: item.TI_TransactionCD,
        qty: item.TI_Qty,
        programID: item.TI_ProgramID,
        empNo: item.TI_EmpNo,
        workstationNo: item.TI_WorkstationNo,
        sndrcvPlantNo: item.TI_SndrcvPlantNo,
        sndrcvStockType: item.TI_SndrcvStockType,
        sndrcvPlaceNo: item.TI_SndrcvPlaceNo,
        sndrcvTransactionCD: item.TI_SndrcvTransactionCD,
        reworkCount: item.TI_ReworkCount,
        more: <DropdownActionTable />,
      }));
      setTotalItem(data.length);
      setTotalQty(data.reduce((acc, item) => acc + item.qty, 0));
      setDataInbound(data);
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  // ใช้ useEffect เพื่อดึงข้อ��ูลเมื่อ component ถูก mount
  useEffect(() => {
    getInbound();
  }, []);

  // ตรวจสอบข้อมูลใหม่ทุกๆ 2 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(dataInbound.length);

      if (dataInbound.length > 0) {
        const checkNewData = async () => {
          const response = await axios.get("api/TaskInboundDetail-requests");

          const newData = response.data.filter(
            (item) => !dataInbound.some((data) => data.key === item.TI_ID)
          );

          if (newData.length > 0) {
            getInbound();
            console.log("New data is added " + newData.length + " record");
            setOpenNotification("info");
            setDescription("New data is added " + newData.length + " record");
          }
        };
        checkNewData();
      }
    }, 2000);

    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
  }, [dataInbound]);

  // ตรวจสอบสถานะการโหลดข้อมูล
  useEffect(() => {
    if (dataInbound.length === 0) {
      setLoading(true);
      setTimeout(() => setLoading(false), 100);
    }
    if (dataInbound.length > 0) {
      setLoading(false);
    }
  }, [dataInbound]);

  const filteredData = dataInbound.filter((item) =>
    Object.values(item).some((value) =>
      value
        ? value.toString().toLowerCase().includes(searchText.toLowerCase())
        : false
    )
  );

  return (
    <>
      {/* ส่วนหัวของหน้า */}
      <div className="table-container">
        <div className="total-section">
          <div className="total-section-header">
            <Col span={8}>
              <h2>Receive Document</h2>
              <h3 style={{ color: "#DA251C" }}>RCV2404001</h3>
              <h5>User : Admin</h5>
            </Col>
            <Col span={16}>
              <Row gutter={16}>
                <Col span={6}>
                  <center>
                    <h3>Total Item</h3>
                    <h3 style={{ color: "#DA251C" }}>{totalItem}</h3>
                  </center>
                </Col>
                <Col span={6}>
                  <center>
                    <h3>Total QTY</h3>
                    <h3 style={{ color: "#DA251C" }}>{totalQty}</h3>
                  </center>
                </Col>
                <Col span={6}>
                  <center>
                    <h3>Total Tray</h3>
                    <h3 style={{ color: "#DA251C" }}>23</h3>
                  </center>
                </Col>
                <Col span={6}>
                  <center>
                    <h3>Total Location</h3>
                    <h3 style={{ color: "#DA251C" }}>23</h3>
                  </center>
                </Col>
              </Row>
            </Col>
          </div>
        </div>

        {/* ส่วนแสดงตารางข้อมูล */}
        <div className="table-header">
          <Input
            placeholder="Search"
            style={{ width: "300px" }}
            value={searchText}
            onChange={handleSearch}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              icon={<PlusOutlined />}
              onClick={showDrawer}
              type="primary"
              style={{ float: "right" }}
            >
              Add
            </Button>
          </div>
        </div>
        <section style={{ marginTop: "10px" }}>
          <Spin spinning={loading}>
            <Tables
              columns={columns}
              dataSource={filteredData}
              bordered
              scrollY={0.5}
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
        />
        <DrawerAdd open={openDrawer} onClose={onCloseDrawer} />
        <ModalDetail
          open={openDrawerDetail}
          onClose={onCloseDrawerDetail}
          record={selectedRecord}
        />
      </section>
    </>
  );
};

export default Inbound;
