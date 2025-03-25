import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Spin,
  Checkbox,
  Modal,
  Space,
  Upload,
  notification,
} from "antd";
import {
  PlusOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "../../styles/autostorage.css";
import Tables from "../../components/Tables";
import DropdownActionTable from "../../components/dropdown/DropdownActionTable";
import DrawerAdd from "./components/DrawerAddInbound";
import ModalDetail from "./components/ModalDetail";
import axios from "axios";
import NotificationAPI from "../../components/NotificationAPI";
import calculateColumnWidth from "../../function/CalcWidth";
import ActionHeaderTableIR from "./components/ActionHeaderTableIR";
import ModalImportExcel from "../../components/modal/ModalImportExcel";
import ActionFooterTable from "../../components/ActionFooterTable";
import { Link } from "react-router-dom";

const Inbound = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
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
  const [handleResetClick, setHandleResetClick] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { confirm } = Modal;
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const dataInboundRef = useRef(dataInbound);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [confirmRecord, setConfirmRecord] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const showDrawer = () => setOpenDrawer(true);
  const onCloseDrawer = () => setOpenDrawer(false);
  const onCloseModalDetail = () => setOpenModalDetail(false);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    // ...
  };

  const handleDetailClick = (record) => {
    setSelectedRecord(record);
    setOpenModalDetail(true);
    console.log(record);
  };

  const filters = (dataSource, searchText) => {
    // ...
  };

  const handleConfirm = (record) => {
    setConfirmRecord(record);
    setIsConfirmModalVisible(true);
  };

  const handleConfirmModal = async () => {
    try {
      setConfirmLoading(true);
      
      const response = await axios.put(
        "http://192.168.0.122:3334/api/confirm-inbound",
        {
          IR_ID: confirmRecord.id,
          IR_Status: "Process",
        }
      );

      if (response.status === 200) {
        notification.success({
          message: 'Confirm Successful',
          description: `Successfully confirmed Inbound No: ${confirmRecord.InboundNo}`,
          placement: 'topRight',
          duration: 3,
        });
        
        await getInbound();
        setIsConfirmModalVisible(false);
      }
    } catch (error) {
      console.error("Error confirming inbound:", error);
      notification.error({
        message: 'Confirm Failed',
        description: `Failed to confirm Inbound No: ${confirmRecord.InboundNo}`,
        placement: 'topRight',
        duration: 3,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const showImportModal = () => {
    setIsImportModalVisible(true);
  };

  const handleImportCancel = () => {
    setSelectedFile(null);
    setIsImportModalVisible(false);
  };

  const handleFileRead = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n');
      const headers = lines[0].split(',');
      const data = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(',');
          const row = {};
          headers.forEach((header, index) => {
            row[header.trim()] = values[index]?.trim() || '';
          });
          data.push(row);
        }
      }
      
      setPreviewData(data);
      setShowPreview(true);
    };
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setOpenNotification('error');
      setDescription('Please select a file first!');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(
        'http://192.168.0.122:3334/api/inbound-import-csv',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setOpenNotification('success');
        setDescription('Successfully imported Inbound CSV file');
        getInbound();
        setIsImportModalVisible(false);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error('Error uploading CSV:', error);
      setOpenNotification('error');
      setDescription('Failed to import CSV file');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "http://192.168.0.122:3334/api/download-template";
    link.download = "inbound_template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      title: "✓",
      dataIndex: "checkbox",
      key: "checkbox",
      width: "3%",
      align: "center",
      fixed: "left",
      render: (text, record) => (
        <Checkbox
          checked={selectedRows.includes(record.key)}
          onChange={(e) => {
            const checked = e.target.checked;
            setSelectedRows(
              checked
                ? [...selectedRows, record.key]
                : selectedRows.filter((key) => key !== record.key)
            );
          }}
        />
      ),
    },
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      width: "3%",
      align: "center",
      fixed: "left",
    },
    {
      title: "Inbound No",
      dataIndex: "InboundNo",
      key: "InboundNo",
      width: calculateColumnWidth("Inbound No"),
      sorter: (a, b) => a.InboundNo.localeCompare(b.InboundNo),
      fixed: "left",
      align: "center",
      sticky: true,
      render: (text, record) => (
        <Link
          to={`/auto-storage/inbound-master?irId=${record.id}`}
          state={{
            inboundNo: text,
            irId: record.id,
          }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Job Number",
      dataIndex: "JobNumber",
      key: "JobNumber",
      width: calculateColumnWidth("Job Number"),
      sorter: (a, b) => a.JobNumber - b.JobNumber,
      fixed: "left",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: calculateColumnWidth("Status"),
      sorter: (a, b) => a.Status.localeCompare(b.Status),
      align: "center",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{text}</span>
          {text === "New" && (
            <Button
              type="primary"
              icon={<CheckOutlined />}
              size="small"
              loading={confirmLoading}
              onClick={() => handleConfirm(record)}
              style={{ marginLeft: 8 }}
            >
              Confirm
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "Factory Name",
      dataIndex: "FactoryName",
      key: "FactoryName",
      width: calculateColumnWidth("Factory Name"),
      sorter: (a, b) => a.FactoryName.localeCompare(b.FactoryName),
      align: "center",
    },
    {
      title: "Warehouse Name",
      dataIndex: "WarehouseName",
      key: "WarehouseName",
      width: calculateColumnWidth("Warehouse Name"),
      sorter: (a, b) => a.WarehouseName.localeCompare(b.WarehouseName),
      align: "center",
    },
    {
      title: "Plant Name",
      dataIndex: "PlantName",
      key: "PlantName",
      width: calculateColumnWidth("Plant Name"),
      sorter: (a, b) => a.PlantName.localeCompare(b.PlantName),
      align: "center",
    },
    {
      title: "Interface File",
      dataIndex: "InterfaceFile",
      key: "InterfaceFile",
      width: calculateColumnWidth("Interface File"),
      align: "center",
    },
    // {
    //   title: "User Code",
    //   dataIndex: "UserCode",
    //   key: "UserCode",
    //   width: calculateColumnWidth("User Code"),
    //   sorter: (a, b) => a.UserCode.localeCompare(b.UserCode),
    //   align: "center",
    // },
    {
      title: "User Full Name",
      dataIndex: "UserFullName",
      key: "UserFullName",
      width: calculateColumnWidth("User Full Name"),
      sorter: (a, b) => a.UserFullName.localeCompare(b.UserFullName),
      align: "center",
    },
    {
      title: "Record On",
      dataIndex: "IR_RecordOn",
      key: "  ",
      width: calculateColumnWidth("Record On"),
      sorter: (a, b) => a.RecordOn.localeCompare(b.IR_RecordOn),
      align: "center",
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
      width: "60px",
      align: "center",
      fixed: "right",
    },
  ];

  const getInbound = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3333/api/InboundDetail-requests"
      );

      const data = response.data.map((item, index) => ({
        id: item.IR_IDInboundRequest,
        key: item.IR_IDInboundRequest,
        no: (index + 1).toString(),
        InboundNo: item.IR_Number || "N/A",
        JobNumber: item.IR_JobNumber || "N/A",
        Status: item.IR_Status || "N/A",
        FactoryName: item.F_Name || "N/A",
        WarehouseName: item.W_Name || "N/A",
        PlantName: item.P_Name || "N/A",
        InterfaceFile: item.IR_InterfaceFile || "N/A",
        UserCode: item.UA_Code || "N/A",
        UserFullName: item.UA_Fullname || "N/A",
        IR_RecordOn: item.IR_RecordOn
        //? moment(item.IR_RecordOn).add(7, 'hours').format("YYYY-MM-DD HH:mm:ss")
        //  : "N/A",
      }));

      setDataInbound(data);
      setTotalItem(data.length);

      const onProcess = data.filter((item) => item.Status === "Process").length;
      const completed = data.filter(
        (item) => item.Status === "Completed"
      ).length;

      setOnProcessCount(onProcess);
      setCompletedCount(completed);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getInbound();
  }, []);

  useEffect(() => {
    dataInboundRef.current = dataInbound;
  }, [dataInbound]);

  const checkNewData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3333/api/TaskInboundDetail-requests"
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

  const filteredData = dataInbound.filter((item) =>
    Object.values(item).some((value) =>
      value
        ? value.toString().toLowerCase().includes(searchText.toLowerCase())
        : false
    )
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div className="table-container">
        <div className="table-header2">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Space size="middle">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showDrawer}
              >
                Add New
              </Button>

              <Button
                type="primary"
                icon={<UploadOutlined />}
                onClick={showImportModal}
                style={{
                  backgroundColor: "#52c41a",
                  borderColor: "#52c41a",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#389e0d";
                  e.currentTarget.style.borderColor = "#389e0d";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#52c41a";
                  e.currentTarget.style.borderColor = "#52c41a";
                }}
              >
                Import CSV
              </Button>
            </Space>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {/* <Input
              placeholder="Search"
              style={{ width: "300px" }}
              value={searchText}
              onChange={handleSearch}
            /> */}
            <div style={{ display: 'flex', gap: '16px' }}>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>On Process:</span>
                <span style={{ 
                  background: '#52c41a', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '4px',
                  minWidth: '28px',
                  textAlign: 'center'
                }}>{onProcessCount}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>Completed:</span>
                <span style={{ 
                  background: '#faad14', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '4px',
                  minWidth: '28px',
                  textAlign: 'center'
                }}>{completedCount}</span>
              </div>
            </div>
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
              maxHeight={"480px"}
            />
          </Spin>
        </section>

        <div className="action-footer-table">
          {/* <ActionFooterTable handleReset={() => setHandleResetClick(true)} /> */}
        </div>
      </div>

      <section>
        <NotificationAPI
          openNotification={openNotification}
          description={description}
        />
        <DrawerAdd open={openDrawer} onClose={onCloseDrawer} />
        <ModalDetail
          open={openModalDetail}
          onClose={onCloseModalDetail}
          record={selectedRecord}
        />
      </section>

      <ModalImportExcel
        isModalOpen={isModalImportExcelOpen}
        setIsModalOpen={setIsModalImportExcelOpen}
      />

      <Modal
        title="Import CSV File"
        open={isImportModalVisible}
        onCancel={() => {
          handleImportCancel();
          setShowPreview(false);
          setPreviewData([]);
        }}
        width={800}
        footer={[
          <Button key="cancel" onClick={handleImportCancel}>
            Cancel
          </Button>,
          <Button
            key="import"
            type="primary"
            loading={uploading}
            onClick={handleUpload}
            disabled={!selectedFile}
            style={{
              backgroundColor: "#52c41a",
              borderColor: "#52c41a",
            }}
          >
            Import
          </Button>,
        ]}
      >
        <div style={{ marginBottom: "16px" }}>
          <p>Please select a CSV file to import:</p>
        </div>
        <Upload
          accept=".csv"
          beforeUpload={(file) => {
            const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");
            if (!isCSV) {
              setOpenNotification("error");
              setDescription("You can only upload CSV files!");
              return Upload.LIST_IGNORE;
            }
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
              setOpenNotification("error");
              setDescription("File must be smaller than 5MB!");
              return Upload.LIST_IGNORE;
            }
            handleFileRead(file);
            setSelectedFile(file);
            return false;
          }}
          onRemove={() => {
            setSelectedFile(null);
            setShowPreview(false);
            setPreviewData([]);
          }}
          fileList={selectedFile ? [selectedFile] : []}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>

        {showPreview && previewData.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>File Preview:</h3>
            <div style={{ maxHeight: "300px", overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {Object.keys(previewData[0]).map((header) => (
                      <th 
                        key={header} 
                        style={{
                          backgroundColor: "#f0f0f0",
                          padding: "8px",
                          border: "1px solid #ddd",
                          position: "sticky",
                          top: 0
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td 
                          key={i} 
                          style={{
                            padding: "8px",
                            border: "1px solid #ddd"
                          }}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: "10px", color: "#666" }}>
              Total records: {previewData.length}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title={
          <div>
            <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />
            <span>
              {" "}
              Confirm Inbound No: {confirmRecord ? confirmRecord.InboundNo : ""}
            </span>
          </div>
        }
        open={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        // footer={null}
        okText="Confirm"
        cancelText="Cancel"
        onOk={handleConfirmModal}
        width={400}
      >
        <p>Are you sure you want to confirm this action?</p>
      </Modal>
    </>
  );
};

export default Inbound;
