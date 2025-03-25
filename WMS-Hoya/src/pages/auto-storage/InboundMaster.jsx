import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Spin,
  Checkbox,
  Select,
  Space,
  Modal,
  message,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import "../../styles/autostorage.css";
import Tables from "../../components/Tables";
import DropdownActionTable from "../../components/dropdown/DropdownActionTable";
import DrawerAdd from "./components/DrawerAddInbound";
import axios from "axios";
import NotificationAPI from "../../components/NotificationAPI";
import calculateColumnWidth from "../../function/CalcWidth";
import ActionHeaderTable from "./components/ActionHeaderTableIRI";
import ModalImportExcel from "../../components/modal/ModalImportExcel";
import ActionFooterTable from "../../components/ActionFooterTable";
import ModalDetailInboundMaster from "./components/ModalDetailInboundMaster";
const { Option } = Select;

const InboundMaster = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerDetail, setOpenDrawerDetail] = useState(false);
  const [openNotification, setOpenNotification] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataInbound, setDataInbound] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [totalItem, setTotalItem] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [onProcessCount, setOnProcessCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [isModalImportExcelOpen, setIsModalImportExcelOpen] = useState(false);
  const [selectedInboundId, setSelectedInboundId] = useState(null);
  const [inboundIds, setInboundIds] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [statusCounts, setStatusCounts] = useState({
    waiting: 0,
    process: 0,
    completed: 0,
    // Order Status counts
    orderNew: 0,
    orderProcess: 0,
    orderComplete: 0,
    orderCancel: 0,
    // Machine Status counts
    machineNew: 0,
    machineWaiting: 0,
    machineProcess: 0,
    machineComplete: 0,
    machineCancel: 0
  });
  const dataInboundMasterRef = useRef(dataInbound);

  const [searchParams] = useSearchParams();
  const irId = searchParams.get("irId");

  const showDrawer = () => setOpenDrawer(true);
  const onCloseDrawer = () => setOpenDrawer(false);
  const onCloseDrawerDetail = () => setOpenDrawerDetail(false);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const formValues = form.getFieldsValue();
    const formattedDate = formValues.DateCreated
      ? moment(formValues.DateCreated).format("YYYY-MM-DD")
      : null;
    console.log("Form submitted");
    console.log({ ...formValues, DateCreated: formattedDate });
  };

  const handleDetailClick = (record) => {
    console.log(record);
    setSelectedRecord(record);
    setOpenDrawerDetail(true);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleInboundIdChange = (value) => {
    setSelectedInboundId(value);
  };

  const filters = (dataSource, searchText) => {
    return dataSource.filter((item) =>
      Object.values(item).some((value) =>
        value
          ? value.toString().toLowerCase().includes(searchText.toLowerCase())
          : false
      )
    );
  };

  const handleCheckboxChange = (record) => {
    setSelectedRow(selectedRow?.key === record.key ? null : record);
  };

  const handleResetClick = () => {
    if (!selectedRow) {
      message.warning("Please select a record to reset");
      return;
    }
    setIsPasswordModalVisible(true);
  };

  const handlePasswordSubmit = async () => {
    if (password !== "admin") {
      message.error("Invalid password");
      return;
    }

    setResetLoading(true);
    message.loading("Processing reset request...", 0);

    try {
      message.info(`Resetting mold task for Serial: ${selectedRow.moldSerial}`);
      
      const response = await axios.post("http://192.168.0.122:3334/api/reset-mold-task", {
        UA_ID: "1",
        IRI_ID: selectedRow.id.toString(),
        MoldSerial: selectedRow.moldSerial
      });

      if (response.status === 200) {
        message.destroy(); // Clear all previous messages
        message.success(`Reset successful for Mold Serial: ${selectedRow.moldSerial}`);
        Modal.success({
          title: 'Reset Successful',
          content: (
            <div>
              <p>Reset operation completed successfully</p>
              <p>Mold Serial: {selectedRow.moldSerial}</p>
              <p>ID: {selectedRow.id}</p>
              <p>Status: Success</p>
            </div>
          ),
        });
        setSelectedRow(null);
        getInbound(); // Refresh the data
      } else {
        message.destroy();
        message.error("Reset failed");
        Modal.error({
          title: 'Reset Failed',
          content: 'The reset operation could not be completed.',
        });
      }
    } catch (error) {
      console.error("Reset error:", error);
      message.destroy();
      message.error("Reset failed: " + error.message);
      Modal.error({
        title: 'Reset Error',
        content: `Error: ${error.message}`,
      });
    } finally {
      setResetLoading(false);
      setIsPasswordModalVisible(false);
      setPassword("");
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      key: "checkbox",
      width: "3%",
      align: "center",
      fixed: "left",
      render: (text, record) => (
        <Checkbox
          checked={selectedRow?.key === record.key}
          onChange={() => handleCheckboxChange(record)}
        />
      ),
    },
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      width: "4%",
      align: "center",
      fixed: "left",
      render: (text) => text
    },
    {
      title: "Mold Code",
      dataIndex: "moldCode",
      key: "moldCode",
      width: calculateColumnWidth("Mold Code"),
      sorter: (a, b) => a.moldCode.localeCompare(b.moldCode),
      fixed: "left",
      align: "center",
      filters: Array.from(new Set(dataInbound.map((item) => item.moldCode)))
        .filter(Boolean)
        .map((moldCode) => ({
          text: moldCode,
          value: moldCode,
        })),
      onFilter: (value, record) =>
        record.moldCode ? record.moldCode.toString().includes(value) : false,
      filterSearch: true,
    },
    {
      title: "Mold Serial",
      dataIndex: "moldSerial",
      key: "moldSerial",
      width: calculateColumnWidth("Mold Serial"),
      sorter: (a, b) => a.moldSerial.localeCompare(b.moldSerial),
      fixed: "left",
      align: "center",
      filters: Array.from(new Set(dataInbound.map((item) => item.moldSerial)))
        .filter(Boolean)
        .map((moldSerial) => ({
          text: moldSerial,
          value: moldSerial,
        })),
      onFilter: (value, record) =>
        record.moldSerial
          ? record.moldSerial.toString().includes(value)
          : false,
      filterSearch: true,
    },
    {
      title: "Order Status",
      dataIndex: "InboundItemStatus",
      key: "InboundItemStatus",
      width: calculateColumnWidth("Status"),
      sorter: (a, b) => a.InboundItemStatus.localeCompare(b.InboundItemStatus),
      fixed: "left",
      align: "center",
      filters: Array.from(
        new Set(dataInbound.map((item) => item.InboundItemStatus))
      )
        .filter(Boolean)
        .map((status) => ({
          text: status,
          value: status,
        })),
      onFilter: (value, record) =>
        record.InboundItemStatus
          ? record.InboundItemStatus.toString().includes(value)
          : false,
      filterSearch: true,
    },
    {
      title: "Machine Status",
      dataIndex: "taskStatus",
      key: "taskStatus",
      width: calculateColumnWidth("Task Status"),
      sorter: (a, b) => a.taskStatus.localeCompare(b.taskStatus),
      fixed: "left",
      align: "center",
      filters: Array.from(new Set(dataInbound.map((item) => item.taskStatus)))
        .filter(Boolean)
        .map((status) => ({
          text: status,
          value: status,
        })),
      onFilter: (value, record) =>
        record.taskStatus
          ? record.taskStatus.toString().includes(value)
          : false,
      filterSearch: true,
    },
    {
      title: "Tray Position",
      dataIndex: "trayposiyion",
      key: "trayposiyion",
      width: calculateColumnWidth("Tray Position"),
      sorter: (a, b) => a.trayposiyion.localeCompare(b.trayposiyion),
      fixed: "left",
      align: "center",
      filters: Array.from(new Set(dataInbound.map((item) => item.trayposiyion)))
        .filter(Boolean)
        .map((position) => ({
          text: position,
          value: position,
        })),
      onFilter: (value, record) =>
        record.trayposiyion
          ? record.trayposiyion.toString().includes(value)
          : false,
      filterSearch: true,
    },
    {
      title: "Tray Number",
      dataIndex: "TrayNumber",
      key: "TrayNumber",
      width: calculateColumnWidth("Tray Number"),
      sorter: (a, b) => a.trayNumber.localeCompare(b.TrayNumber),
      fixed: "left",
      align: "center",
      filters: Array.from(
        new Set(dataInbound.map((item) => item.TrayNumber))
      )
        .filter(Boolean)
        .map((location) => ({
          text: location,
          value: location,
        })),
      onFilter: (value, record) =>
        record.totalLocation
          ? record.totalLocation.toString().includes(value)
          : false,
      filterSearch: true,
    },
    {
      title: "Total Location",
      dataIndex: "totalLocation",
      key: "totalLocation",
      width: calculateColumnWidth("Total Location"),
      sorter: (a, b) => a.totalLocation.localeCompare(b.totalLocation),
      fixed: "left",
      align: "center",
      filters: Array.from(
        new Set(dataInbound.map((item) => item.totalLocation))
      )
        .filter(Boolean)
        .map((location) => ({
          text: location,
          value: location,
        })),
      onFilter: (value, record) =>
        record.totalLocation
          ? record.totalLocation.toString().includes(value)
          : false,
      filterSearch: true,
    },
    {
      title: "More",
      dataIndex: "more",
      key: "more",
      render: (text, record) => (
        <DropdownActionTable
          onDetailClick={() => handleDetailClick(record)}
          record={record}
        />
      ),
      width: "4%",
      align: "center",
      fixed: "right",
    },
  ];

  const getInbound = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3333/api/InboundItempDetail-requests"
      );

      const data = response.data.map((item, index) => ({
        id: item.IRI_IDInboundRequestItem,
        key: item.IRI_IDInboundRequestItem,
        no: (index + 1).toString(),
        InboundNo: item.InboundNumber,
        moldCode: item.MoldCode,
        moldSerial: item.MoldSerial,
        InboundItemStatus: item.InboundItemStatus,
        taskStatus: item.TaskStatus,
        trayposiyion: item.TrayPosition,
        totalLocation: item.ToLocation || '-',
        irId: item.IR_IDInboundRequest,
        TrayNumber:item.TrayNumber,
        all: item,
      }));

      const filteredData = irId
        ? data.filter((item) => item.irId === irId)
        : data;

      const counts = {
        waiting: filteredData.filter(
          (item) => item.InboundItemStatus === "Waiting"
        ).length,
        process: filteredData.filter(
          (item) => item.InboundItemStatus === "Process"
        ).length,
        completed: filteredData.filter(
          (item) => item.InboundItemStatus === "Completed"
        ).length,
        // Order Status counts
        orderNew: filteredData.filter(
          (item) => item.InboundItemStatus === "New"
        ).length,
        orderProcess: filteredData.filter(
          (item) => item.InboundItemStatus === "Process"
        ).length,
        orderComplete: filteredData.filter(
          (item) => item.InboundItemStatus === "Completed"
        ).length,
        orderCancel: filteredData.filter(
          (item) => item.InboundItemStatus === "Cancel"
        ).length,
        // Machine Status counts
        machineNew: filteredData.filter(
          (item) => item.taskStatus === "New"
        ).length,
        machineWaiting: filteredData.filter(
          (item) => item.taskStatus === "Waiting"
        ).length,
        machineProcess: filteredData.filter(
          (item) => item.taskStatus === "Process"
        ).length,
        machineComplete: filteredData.filter(
          (item) => item.taskStatus === "Completed"
        ).length,
        machineCancel: filteredData.filter(
          (item) => item.taskStatus === "Cancel"
        ).length,
      };

      setStatusCounts(counts);
      setTotalItem(filteredData.length);
      setTotalQty(filteredData.reduce((acc, item) => acc + item.qty, 0));

      const onProcess = filteredData.filter(
        (item) => item.status === "On Process"
      ).length;
      const completed = filteredData.filter(
        (item) => item.status === "Completed"
      ).length;

      setOnProcessCount(onProcess);
      setCompletedCount(completed);

      setDataInbound(filteredData);

      const ids = filteredData.map((item) => item.id);
      setInboundIds(ids);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getInbound();
  }, [irId]);

  useEffect(() => {
    dataInboundMasterRef.current = dataInbound;
  }, [dataInbound]);

  const checkNewData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3333/api/InboundItempDetail-requests"
      );
      const newData = response.data.filter(
        (item) =>
          !dataInboundRef.current.some(
            (data) => data.key === item.IR_IDInboundRequest
          )
      );

      if (newData.length > 0) {
        getInbound();
        setOpenNotification("info");
        setDescription(`New data is added: ${newData.length} record(s)`);
      }
    } catch (error) {
      console.error("Error checking new data:", error);
    }
  };

  useEffect(() => {
    setLoading(dataInbound.length === 0);
  }, [dataInbound]);

  const filteredData = filters(dataInbound, searchText).map((item, index) => ({
    ...item,
    no: (index + 1).toString()
  }));

  const filteredDataById = selectedInboundId
    ? filteredData.filter((item) => item.id === selectedInboundId).map((item, index) => ({
        ...item,
        no: (index + 1).toString()
      }))
    : filteredData;

  return (
    <>
      <div className="table-container">
        <div className="table-header">
          <div className="table-header2">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Input
                placeholder="Search"
                style={{ width: "300px" }}
                value={searchText}
                onChange={handleSearch}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showDrawer}
              >
                Add New
              </Button>
              <Button
                type="primary"
                danger
                onClick={handleResetClick}
                disabled={!selectedRow}
                loading={resetLoading}
              >
                Reset Mold
              </Button>
            </div>
          </div>
        </div>

        <section style={{ marginTop: "10px" }}>
          <Spin spinning={loading}>
            <Tables
              columns={columns}
              dataSource={filteredDataById}
              bordered
              scrollY={0.5}
              scrollX={"max-content"}
              maxHeight={"480px"}
            />
          </Spin>
        </section>

        <div className="action-footer-table">
          {/* Status Tables Container */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            marginTop: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 'bold' }}>Items:</span>
              <span style={{ 
                background: '#1890ff', 
                color: 'white', 
                padding: '2px 8px', 
                borderRadius: '4px',
                minWidth: '28px',
                textAlign: 'center'
              }}>{totalItem}</span>
            </div>
            
            {/* Order Status Table */}
            <div style={{ borderLeft: '1px solid #d9d9d9', paddingLeft: '16px' }}>
              <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>Order Status</div>
              <table style={{ 
                borderCollapse: 'collapse', 
                background: 'white',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>New</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', textAlign: 'center', minWidth: '40px', background: '#1890ff', color: 'white', fontSize: '12px' }}>{statusCounts.orderNew}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>Process</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', textAlign: 'center', minWidth: '40px', background: '#faad14', color: 'white', fontSize: '12px' }}>{statusCounts.orderProcess}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>Complete</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', textAlign: 'center', minWidth: '40px', background: '#52c41a', color: 'white', fontSize: '12px' }}>{statusCounts.orderComplete}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 8px', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>Cancel</td>
                    <td style={{ padding: '4px 8px', textAlign: 'center', minWidth: '40px', background: '#ff4d4f', color: 'white', fontSize: '12px' }}>{statusCounts.orderCancel}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Machine Status Table */}
            <div style={{ borderLeft: '1px solid #d9d9d9', paddingLeft: '16px' }}>
              <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>Machine Status</div>
              <table style={{ 
                borderCollapse: 'collapse', 
                background: 'white',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>New</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', textAlign: 'center', minWidth: '40px', background: '#1890ff', color: 'white', fontSize: '12px' }}>{statusCounts.machineNew}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>Waiting</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', textAlign: 'center', minWidth: '40px', background: '#faad14', color: 'white', fontSize: '12px' }}>{statusCounts.machineWaiting}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>Process</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', textAlign: 'center', minWidth: '40px', background: '#722ed1', color: 'white', fontSize: '12px' }}>{statusCounts.machineProcess}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>Complete</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', textAlign: 'center', minWidth: '40px', background: '#52c41a', color: 'white', fontSize: '12px' }}>{statusCounts.machineComplete}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 8px', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>Cancel</td>
                    <td style={{ padding: '4px 8px', textAlign: 'center', minWidth: '40px', background: '#ff4d4f', color: 'white', fontSize: '12px' }}>{statusCounts.machineCancel}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <section>
        <NotificationAPI
          openNotification={openNotification}
          description={description}
        />
        <DrawerAdd open={openDrawer} onClose={onCloseDrawer} />
        <ModalDetailInboundMaster
          open={openDrawerDetail}
          onClose={onCloseDrawerDetail}
          record={selectedRecord}
        />
      </section>

      <Modal
        title="Password Confirmation"
        open={isPasswordModalVisible}
        onOk={handlePasswordSubmit}
        onCancel={() => {
          setIsPasswordModalVisible(false);
          setPassword("");
        }}
        confirmLoading={resetLoading}
      >
        <Form>
          <Form.Item
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </Form.Item>
        </Form>
      </Modal>

      <ModalImportExcel
        isModalOpen={isModalImportExcelOpen}
        setIsModalOpen={setIsModalImportExcelOpen}
      />
    </>
  );
};

export default InboundMaster;
