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
  Upload,
} from "antd";
import {
  PlusOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import moment from "moment-timezone";
import "../../styles/autostorage.css";
import Tables from "../../components/Tables";
import DropdownActionTable from "../../components/dropdown/DropdownActionTable";
import ModalAdd from "./components/ModalAddOutbound";
import axios from "axios";
import NotificationAPI from "../../components/NotificationAPI";
import calculateColumnWidth from "../../function/CalcWidth";
import ActionHeaderTableIR from "./components/ActionHeaderTableIR";
import ModalImportExcel from "../../components/modal/ModalImportExcel";
import ActionFooterTable from "../../components/ActionFooterTable";
import { Link } from "react-router-dom";
import { Space } from "antd";
import ModalDetailOutbound from "./components/ModalDetailOutbound";
const Outbound = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openNotification, setOpenNotification] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataOutbound, setDataOutbound] = useState([]);
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
  const [totalOnProcess, setTotalOnProcess] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const dataOutboundRef = useRef(dataOutbound);
  const [cancelLoading, setCancelLoading] = useState(false);
  const showModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);
  const onCloseModalDetail = () => setOpenModalDetail(false);
  const [form] = Form.useForm();

  const handleSubmit = () => {
    // ...
  };

  const handleDetailClick = (record) => {
    setSelectedRecord(record);
    setOpenModalDetail(true);
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

  const handleConfirm = (record) => {
    confirm({
      title: "Confirm Action",
      icon: <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />,
      content: `Are you sure you want to confirm Outbound No: ${record.OR_Number}?`,
      okText: "Confirm",
      cancelText: "Cancel",
      okButtonProps: {
        danger: true,
      },
      onOk: async () => {
        try {
          setConfirmLoading(true);
          
          const response = await axios.put(
            "http://192.168.0.122:3334/api/confirm-outbound",
            {
              OR_ID: record.OR_IDOutboundRequest.toString(),
              OR_Status: "Process"
            }
          );

          if (response.status === 200) {
            setOpenNotification("success");
            setDescription(
              `Successfully confirmed Outbound No: ${record.OR_Number}`
            );
            await getOutbound();
          }
        } catch (error) {
          console.error("Error confirming outbound:", error);
          setOpenNotification("error");
          setDescription(`Failed to confirm Outbound No: ${record.OR_Number}`);
        } finally {
          setConfirmLoading(false);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
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
        'http://192.168.0.122:3334/api/outbound-import-csv',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setOpenNotification('success');
        setDescription('Successfully imported Outbound CSV file');
        getOutbound();
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

  const handleCancelTasks = async () => {
    // Get the selected records and filter out any records that are already cancelled
    const selectedRecords = dataOutbound.filter(record => 
      selectedRows.includes(record.key) && record.OR_Status !== "Cancel"
    );

    // If no valid records to cancel, show error
    if (selectedRecords.length === 0) {
      setOpenNotification("error");
      setDescription("No valid tasks to cancel. Please select tasks that are not already cancelled.");
      return;
    }

    confirm({
      title: "Confirm Cancel Tasks",
      icon: <ExclamationCircleOutlined style={{ color: "#ff4d4f", fontSize: "20px" }} />,
      content: (
        <div style={{ marginTop: '20px' }}>
          <p>Are you sure you want to cancel the following tasks?</p>
          <div style={{ maxHeight: '200px', overflowY: 'auto', margin: '10px 0', padding: '10px', border: '1px solid #f0f0f0', borderRadius: '4px' }}>
            {selectedRecords.map((record, index) => (
              <div key={record.key} style={{ marginBottom: '8px' }}>
                {index + 1}. Outbound No: <strong>{record.OR_Number}</strong>
                {record.OR_Status && <span style={{ marginLeft: '8px', color: '#666' }}>({record.OR_Status})</span>}
              </div>
            ))}
          </div>
          <p style={{ color: '#ff4d4f', marginTop: '10px' }}>
            This action cannot be undone!
          </p>
        </div>
      ),
      okText: "Yes, Cancel Tasks",
      okButtonProps: {
        danger: true,
        loading: cancelLoading
      },
      cancelText: "No, Keep Tasks",
      width: 500,
      onOk: async () => {
        try {
          setCancelLoading(true);

          // Prepare the data for API
          const tasksToCancel = selectedRecords.map(record => ({
            JobNumber: record.OR_JobNumber || "",
            BatchID: "",
            OrderID: "",
            UPPSerial: "",
            LOWSerial: ""
          }));

          console.log("Sending cancel request with data:", tasksToCancel);

          const response = await axios.post(
            "http://192.168.0.122:3334/api/cancel-task",
            tasksToCancel[0], // ส่งเฉพาะรายการแรก เนื่องจาก API รับเป็น object เดียว
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );

          console.log("API Response:", response);

          if (response.status === 200) {
            setOpenNotification("success");
            setDescription(`Successfully cancelled ${selectedRows.length} task(s)`);
            setSelectedRows([]); // Clear selection
            await getOutbound(); // Refresh data
          } else {
            throw new Error(`Server responded with status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error cancelling tasks:", error);
          let errorMessage = "Failed to cancel selected tasks";
          
          if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            errorMessage = error.response.data.message || errorMessage;
          } else if (error.request) {
            console.error("No response received:", error.request);
            errorMessage = "No response received from server";
          } else {
            console.error("Error setting up request:", error.message);
            errorMessage = error.message;
          }

          setOpenNotification("error");
          setDescription(errorMessage);
        } finally {
          setCancelLoading(false);
        }
      },
      onCancel() {
        // Do nothing, just close the modal
      },
    });
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
          disabled={record.OR_Status === "Cancel"}
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
      title: "Outbound No",
      dataIndex: "OR_Number",
      key: "OR_Number",
      width: calculateColumnWidth("Outbound No"),
      sorter: (a, b) => a.OR_Number.localeCompare(b.OR_Number),
      fixed: "left",
      align: "center",
      sticky: true,
      render: (text, record) => {
        console.log("Rendering link for record:", record);
        return (
          <Link
            to={`/auto-storage/outbound-master?orId=${record.OR_IDOutboundRequest}`}
            style={{ color: "#1890ff", textDecoration: "underline" }}
          >
            {text || record.OR_Number}
          </Link>
        );
      },
    },
    {
      title: "Job Number",
      dataIndex: "OR_JobNumber",
      key: "OR_JobNumber",
      width: calculateColumnWidth("Job Number"),
      sorter: (a, b) => a.OR_JobNumber - b.OR_JobNumber,
      fixed: "left",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "OR_Status",
      key: "OR_Status",
      width: calculateColumnWidth("Status"),
      sorter: (a, b) => a.OR_Status.localeCompare(b.OR_Status),
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
      title: "Plant Name",
      dataIndex: "P_Name",
      key: "P_Name",
      width: calculateColumnWidth("Plant Name"),
      sorter: (a, b) => a.P_Name.localeCompare(b.P_Name),
      align: "center",
    },
    {
      title: "Interface File",
      dataIndex: "OR_InterfaceFile",
      key: "OR_InterfaceFile",
      width: calculateColumnWidth("Interface File"),
      align: "center",
    },
    {
      title: "User Full Name",
      dataIndex: "UA_Fullname",
      key: "UA_Fullname",
      width: calculateColumnWidth("User Full Name"),
      sorter: (a, b) => a.UA_Fullname.localeCompare(b.UA_Fullname),
      align: "center",
    },
    {
      title: "Record On",
      dataIndex: "OR_RecordOn",
      key: "OR_RecordOn",
      width: calculateColumnWidth("Record On"),
      sorter: (a, b) => a.OR_RecordOn.localeCompare(b.OR_RecordOn),
      align: "center",
      render: (text, record) => (
        <span style={{
          fontSize: "0.90em",
          color: "#666",
          backgroundColor: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          border: "1px solid #d9d9d9"
        }}>
          {moment(text).tz('Asia/Bangkok').format("YYYY-MM-DD HH:mm:ss")}
        </span>
      ),
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

  const getOutbound = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1234/api/OutboundDetail-requests"
      );

      console.log("API Response:", response.data);

      const data = response.data.map((item, index) => ({
        key: item.OR_IDOutboundRequest,
        no: (index + 1).toString(),
        OR_IDOutboundRequest: item.OR_IDOutboundRequest,
        OR_Number: item.OR_Number || "N/A",
        OR_JobNumber: item.OR_JobNumber || "N/A",
        OR_Status: item.OR_Status || "N/A",
        F_Name: item.F_Name || "N/A",
        W_Name: item.W_Name || "N/A",
        P_Name: item.P_Name || "N/A",
        OR_InterfaceFile: item.OR_InterfaceFile || "N/A",
        UA_Code: item.UA_Code || "N/A",
        UA_Fullname: item.UA_Fullname || "N/A",
        OR_RecordOn: item.OR_RecordOn
      }));

      console.log("Mapped Data:", data);

      setDataOutbound(data);
      setTotalItem(data.length);

      const onProcess = data.filter(
        (item) => item.OR_Status === "Process"
      ).length;
      const completed = data.filter(
        (item) => item.OR_Status === "Completed"
      ).length;
      const newStatus = data.filter((item) => item.OR_Status === "New").length;

      setOnProcessCount(onProcess);
      setCompletedCount(completed);
      setTotalOnProcess(onProcess);
      setTotalCompleted(completed);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getOutbound();
  }, []);

  useEffect(() => {
    dataOutboundRef.current = dataOutbound;
  }, [dataOutbound]);

  const checkNewData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1234/api/OutboundDetail-requests"
      );
      const newData = response.data.filter(
        (item) =>
          !dataOutboundRef.current.some(
            (data) => data.key === item.OR_IDOutboundRequest
          )
      );

      if (newData.length > 0) {
        getOutbound();
        setOpenNotification("info");
        setDescription(`New data is added: ${newData.length} record(s)`);
      }
    } catch (error) {
      console.error("Error checking new data:", error);
    }
  };

  useEffect(() => {
    setLoading(dataOutbound.length === 0);
  }, [dataOutbound]);

  const filteredData = dataOutbound
    .filter((item) =>
      Object.values(item).some((value) =>
        value
          ? value.toString().toLowerCase().includes(searchText.toLowerCase())
          : false
      )
    )
    .sort((a, b) => {
      // เรียงลำดับตาม RecordOn จากใหม่ไปเก่า
      return moment(b.OR_RecordOn).valueOf() - moment(a.OR_RecordOn).valueOf();
    });

  const tableHeaderStyle = {
    backgroundColor: "#f0f0f0",
    padding: "8px",
    border: "1px solid #ddd",
    textAlign: "left",
  };

  const tableCellStyle = {
    padding: "8px",
    border: "1px solid #ddd",
  };

  const getRowClassName = (record) => {
    return selectedRows.includes(record.key) ? 'selected-row' : '';
  };

  return (
    <>
      <div className="table-container">
        <div className="table-header">
          <Row style={{
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Space size="middle">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showModal}
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

                {selectedRows.length > 0 && (
                  <Button
                    type="primary"
                    danger
                    onClick={handleCancelTasks}
                    loading={cancelLoading}
                  >
                    Cancel Selected ({selectedRows.length})
                  </Button>
                )}
              </Space>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
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
          </Row>
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
              rowClassName={getRowClassName}
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
        <ModalAdd open={openModal} onClose={onCloseModal} />
        <ModalDetailOutbound
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
        onCancel={handleImportCancel}
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
          <Upload
            accept=".csv"
            beforeUpload={(file) => {
              const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");
              if (!isCSV) {
                setOpenNotification("error");
                setDescription("You can only upload CSV files!");
                return Upload.LIST_IGNORE;
              }
              handleFileRead(file);
              setSelectedFile(file);
              return false;
            }}
            onRemove={() => {
              setSelectedFile(null);
              setPreviewData([]);
              setShowPreview(false);
            }}
            fileList={selectedFile ? [selectedFile] : []}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </div>

        {showPreview && previewData.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>File Preview:</h3>
            <div style={{ maxHeight: "300px", overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {Object.keys(previewData[0]).map((header) => (
                      <th key={header} style={tableHeaderStyle}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td key={i} style={tableCellStyle}>
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
    </>
  );
};

export default Outbound;
