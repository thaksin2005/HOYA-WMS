import { useState, useEffect } from "react";
import Tables from "../../components/Tables";
import DropdownActionTable from "../../components/dropdown/DropdownActionTable";
import { Button, Input, ConfigProvider, Modal, Upload, notification } from "antd";
import { Plus, Edit, RefreshCw } from "lucide-react";
import ModalAddMoldMaster from "../../components/modal/ModalAddMoldMaster";
import ModalImportMoldMaster from "../../components/modal/ModalImportMoldMaster";
import "../../styles/global.css";
import { Spin } from "antd";
import ModalDetailMoldMaster from "./components/ModalDetailMoldMaster";
import NotificationAPI from "../../components/NotificationAPI";
import calculateColumnWidth from "../../function/CalcWidth";
import filters from "../../function/FilterTable";
import axios from 'axios';

const MoldMaster = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false); // State สำหรับ Import Modal
  const [openNotification, setOpenNotification] = useState(false);
  const [description, setDescription] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [handleEdit, setHandleEdit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    upp: 0,
    low: 0
  });
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "radio",
  };
  const hasSelectedForEdit = selectedRowKeys.length === 1;
  const hasSelected = selectedRowKeys.length > 0;

  const onCloseModalDetail = () => {
    setOpenModalDetail(false);
    setHandleEdit(false);
  };

  const handleEditClick = (record) => {
    setSelectedRecord(record);
    setOpenModalDetail(true);
    setHandleEdit(true);
  };

  const handleReset = () => {
    setSelectedRowKeys([]);
  };

  const showImportModal = () => setIsImportModalOpen(true);

  const handleSearch = (e) => setSearchText(e.target.value);
  const handleDetailClick = (record) => {
    setSelectedRecord(record);
    setOpenModalDetail(true);
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
      setOpenNotification(true);
      setDescription('Please select a file first!');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(
        'http://192.168.0.122:3334/api/moldMaster-import-csv',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setIsImportModalOpen(false);
        setSelectedFile(null);
        setShowPreview(false);
        setPreviewData([]);
        
        notification.success({
          message: 'Import Successful',
          description: 'Successfully imported Mold Master CSV file',
          placement: 'topRight',
          duration: 3,
        });
        
        getMoldMasterData();
      }
    } catch (error) {
      console.error('Error uploading CSV:', error);
      notification.error({
        message: 'Import Failed',
        description: 'Failed to import Mold Master CSV file',
        placement: 'topRight',
        duration: 3,
      });
    } finally {
      setUploading(false);
    }
  };

  const columns = [
    {
      title: "No.",
      width: "60px",
      dataIndex: "no",
      align: "center",
      fixed: "left",
    },
    {
      title: "Mold Type",
      dataIndex: "MM_UpLowName",
      align: "center",
      width: calculateColumnWidth("Up/Low Name"),
      fixed: "left",
      filters: filters(dataSource, "MM_UpLowName"),
      onFilter: (value, record) => record.MM_UpLowName === value,
      sorter: (a, b) => a.MM_UpLowName.localeCompare(b.MM_UpLowName),

    },
    {
      title: "Mold Code",
      dataIndex: "MM_MoldCode",
      align: "center",
      width: calculateColumnWidth("Mold Code"),
      fixed: "left",
    },
    {
      title: "Type",
      dataIndex: "MM_TypeShortName",
      align: "center",
      width: calculateColumnWidth("Type"),
      filters: filters(dataSource, "MM_TypeShortName"),
      onFilter: (value, record) => record.MM_TypeShortName === value,
      sorter: (a, b) => a.MM_TypeShortName.localeCompare(b.MM_TypeShortName),
    },
    {
      title: "Lens Name",
      dataIndex: "MM_LensName",
      width: calculateColumnWidth("Lens Name"),
    },
    {
      title: "Min Stock",
      dataIndex: "MM_MinStock",
      align: "center",
      width: calculateColumnWidth("Min Stock"),
    },
    {
      title: "Max Stock",
      dataIndex: "MM_MaxStock",
      align: "center",
      width: calculateColumnWidth("Max Stock"),
    },
    {
      title: "Plant Number",
      dataIndex: "MM_PlantNumber",
      align: "center",
      width: calculateColumnWidth("Plant Number"),
    },
    {
      title: "Item Number",
      dataIndex: "MM_ItemNumber",
      align: "center",
      width: calculateColumnWidth("Item Number"),
    },
    {
      title: "Class",
      dataIndex: "MM_Class",
      align: "center",
      width: calculateColumnWidth("Class"),
    },
    {
      title: "Update By",
      dataIndex: "UA_CodeUpdateBy",
      align: "center",
      width: calculateColumnWidth("Update By"),
    },
    {
      title: "Updated On",
      dataIndex: "MM_UpdateOn",
      align: "center",
      width: calculateColumnWidth("Updated On"),
    },
    {
      title: "More",
      dataIndex: "more",
      width: "60px",
      render: (text, record) => (
        <DropdownActionTable
          onDetailClick={handleDetailClick}
          record={record}
        />
      ),
      align: "center",
      fixed: "right",
    },
  ];

  const updateCounts = (data) => {
    const total = data.length;
    const upp = data.filter(item => item.MM_UpLowName === 'UPP').length;
    const low = data.filter(item => item.MM_UpLowName === 'LOW').length;
    setCounts({ total, upp, low });
  };

  // http://192.168.0.122:1234/api/MoldMaster-requests

  const getMoldMasterData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:1234/api/MoldMaster-requests');
      if (response.status === 200) {
        const formattedData = response.data.map(item => ({
          key: item.MM_ID,
          MM_ID: item.MM_ID,
          MM_UpLowName: item.MM_UpLowName || '-',
          MM_MoldCode: item.MM_MoldCode || '-',
          MM_TypeShortName: item.MM_TypeShortName || '-',
          MM_LensName: item.MM_LensName || '-',
          MM_MinStock: item.MM_MinStock || 0,
          MM_MaxStock: item.MM_MaxStock || 0,
          MM_PlantNumber: item.MM_PlantNumber || '-',
          MM_ItemNumber: item.MM_ItemNumber || '-',
          MM_Class: item.MM_Class || '-',
          UA_CodeUpdateBy: item.UA_CodeUpdateBy || '-',
          MM_UpdateOn: item.MM_UpdateOn || '-',
        }));
        setDataSource(formattedData);
        updateCounts(formattedData);
      }
    } catch (error) {
      console.error('Error fetching mold master data:', error);
      setOpenNotification(true);
      setDescription('Failed to fetch mold master data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMoldMasterData();
  }, []);

  const filteredDataSource = dataSource
    .filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
    )
    .map((item, index) => ({
      ...item,
      no: (index + 1).toString()
    }));

  const handleRefreshData = () => {
    getMoldMasterData();
  };

  return (
    <>
      <div className="table-container">
        <div className="table-header2">
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Input
            placeholder="Search"
            style={{ width: "300px" }}
            value={searchText}
            onChange={handleSearch}
          />
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>Total Items:</span>
                <span style={{ 
                  background: '#1890ff', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '4px',
                  minWidth: '28px',
                  textAlign: 'center'
                }}>{counts.total}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>UPP:</span>
                <span style={{ 
                  background: '#52c41a', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '4px',
                  minWidth: '28px',
                  textAlign: 'center'
                }}>{counts.upp}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>LOW:</span>
                <span style={{ 
                  background: '#faad14', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '4px',
                  minWidth: '28px',
                  textAlign: 'center'
                }}>{counts.low}</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {hasSelected && (
              <>
                <Button 
                  icon={<RefreshCw size={16} />} 
                  onClick={handleReset}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  Reset
                </Button>
              </>
            )}
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimaryHover: "#faad14",
                  },
                },
              }}
            >
              {hasSelectedForEdit && (
                <Button
                  icon={<Edit size={16} />}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  onClick={() => {
                    const selectedData = dataSource.find(
                      (item) => item.key === selectedRowKeys[0]
                    );
                    if (selectedData) {
                      handleEditClick(selectedData);
                    }
                  }}
                >
                  Edit
                </Button>
              )}
            </ConfigProvider>
            <Button
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: "none",
              }}
              icon={<Upload size={16} />}
              onClick={showImportModal}
            >
              Import
            </Button>
          </div>
          <ModalAddMoldMaster
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          <Modal
            title="Import CSV File"
            open={isImportModalOpen}
            onCancel={() => {
              setIsImportModalOpen(false);
              setSelectedFile(null);
              setShowPreview(false);
              setPreviewData([]);
            }}
            width={800}
            footer={[
              <Button key="cancel" onClick={() => setIsImportModalOpen(false)}>
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
                    setOpenNotification(true);
                    setDescription('You can only upload CSV files!');
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
                <Button icon={<Upload size={16} />}>Select File</Button>
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
        </div>
        <div className="table-content">
          <Spin spinning={loading}>
            <Tables
              columns={columns}
              dataSource={filteredDataSource}
              scrollY={0.6}
              scrollX={"max-content"}
              bordered={true}
              rowSelection={rowSelection}
            />
          </Spin>
        </div>
      </div>

      <section>
        <NotificationAPI
          openNotification={openNotification}
          description={description}
        />
        <ModalDetailMoldMaster
          open={openModalDetail}
          onClose={onCloseModalDetail}
          record={selectedRecord}
          handleEditClick={handleEdit}
        />
      </section>
    </>
  );
};

export default MoldMaster;
