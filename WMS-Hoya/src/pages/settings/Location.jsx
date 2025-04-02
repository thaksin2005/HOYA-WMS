import React, { useState, useEffect } from "react";
import axios from "axios";
import Tables from "../../components/Tables";
import DropdownActionTable from "../../components/dropdown/DropdownActionTable";
import ModalDetailLocation from "./components/ModalDetailLocation";
import {
  Button,
  Input,
  Spin,
  Switch,
  Modal,
  Checkbox,
  notification,
  Row,
  Col,
} from "antd";
import { Plus } from "lucide-react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import ModalAddLocation from "./components/ModalAddLocation";
import "../../styles/global.css";
import calculateColumnWidth from "../../function/CalcWidth";
import filters from "../../function/FilterTable";
import { SearchOutlined } from "@ant-design/icons";

const Location = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDrawerDetail, setOpenDrawerDetail] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    items: 0,
    columns: 0,
    levels: 0,
    active: 0,
    inactive: 0,
    trays: 0
  });
  const [originalData, setOriginalData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredCount, setFilteredCount] = useState(0);
  const [isFilteredWithTray, setIsFilteredWithTray] = useState(false);
  const [filteredWithTrayCount, setFilteredWithTrayCount] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    if (!searchValue) {
      setLocationData(originalData);
      updateStatusCounts(originalData);
      return;
    }

    const filtered = originalData.filter((item) => {
      return (
        String(item.P_Code)?.toLowerCase().includes(searchValue) ||
        String(item.S_Code)?.toLowerCase().includes(searchValue) ||
        String(item.S_Name)?.toLowerCase().includes(searchValue) ||
        String(item.L_Code)?.toLowerCase().includes(searchValue) ||
        String(item.L_Class)?.toLowerCase().includes(searchValue) ||
        String(item.Col)?.toLowerCase().includes(searchValue) ||
        String(item.Lvl)?.toLowerCase().includes(searchValue) ||
        String(item.T_Number)?.toLowerCase().includes(searchValue) ||
        (item.L_IsActive && "active".includes(searchValue)) ||
        (!item.L_IsActive && "inactive".includes(searchValue)) ||
        (item.L_IsBlock === 1 && "block".includes(searchValue)) ||
        (item.L_IsBlock === 0 && "unblock".includes(searchValue))
      );
    });

    setLocationData(filtered);
    updateStatusCounts(filtered);
  };

  const onCloseDrawerDetail = () => {
    setOpenDrawerDetail(false);
  };

  const handleDetailClick = (record) => {
    setSelectedRecord(record);
    setOpenDrawerDetail(true);
  };

  const handleEditClick = (record) => {
    console.log("Edit clicked for record:", record);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);

      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      width: "3%",
      align: "center",
      fixed: "left",
    },
    {
      title: "Place Information",
      children: [
        {
          title: "Place Code",
          dataIndex: "P_Code",
          key: "P_Code",
          width: calculateColumnWidth("Place Code"),
          align: "center",
          filters: filters(locationData, "P_Code"),
          onFilter: (value, record) => record.P_Code === value,
          sorter: (a, b) => a.P_Code.localeCompare(b.P_Code),
        },
        {
          title: "Auto Storage",
          dataIndex: "P_IsAutoStorage",
          key: "P_IsAutoStorage",
          width: calculateColumnWidth("Auto Storage"),
          align: "center",
          render: (text) => (
            <Switch
              checked={text}
              disabled
              checkedChildren="Yes"
              unCheckedChildren="No"
            />
          ),
        },
      ],
    },
    {
      title: "Stacker Information",
      children: [
        {
          title: "Stacker Code",
          dataIndex: "S_Code",
          key: "S_Code",
          width: calculateColumnWidth("Stacker Code"),
          align: "center",
        },
        {
          title: "Stacker Name",
          dataIndex: "S_Name",
          key: "S_Name",
          width: calculateColumnWidth("Stacker Name"),
          align: "center",
          filters: filters(locationData, "S_Name"),
          onFilter: (value, record) => record.S_Name === value,
          sorter: (a, b) => a.S_Name.localeCompare(b.S_Name),
        },
      ],
    },
    {
      title: "Location Information",
      children: [
        {
          title: "Class",
          dataIndex: "L_Class",
          key: "L_Class",
          width: calculateColumnWidth("Class"),
          align: "center",
          filters: filters(locationData, "L_Class"),
          onFilter: (value, record) => record.L_Class === value,
          sorter: (a, b) => a.L_Class.localeCompare(b.L_Class),
        },
        {
          title: "Column",
          dataIndex: "Col",
          key: "Col",
          width: calculateColumnWidth("Column"),
          align: "center",
          filters: filters(locationData, "Col"),
          onFilter: (value, record) => record.Col === value,
          sorter: (a, b) => a.Col.localeCompare(b.Col),
        },
        {
          title: "Layer",
          dataIndex: "Lvl",
          key: "Lvl",
          width: calculateColumnWidth("Level"),
          align: "center",
          filters: filters(locationData, "Lvl"),
          onFilter: (value, record) => record.Lvl === value,
          sorter: (a, b) => a.Lvl.localeCompare(b.Lvl),
        },
        {
          title: "Tray Number",
          dataIndex: "T_Number",
          key: "T_Number",
          width: calculateColumnWidth("Tray Number"),
          align: "center",
          filters: filters(locationData, "T_Number"),
          onFilter: (value, record) => record.T_Number === value,
          sorter: (a, b) => {
            const aValue = a.T_Number || "-";
            const bValue = b.T_Number || "-";
            return aValue.localeCompare(bValue);
          },
          render: (text) => text || "-"
        },
        {
          title: "Active",
          dataIndex: "L_IsActive",
          key: "L_IsActive",
          width: calculateColumnWidth("Active"),
          align: "center",
          filters: [
            { text: "Active", value: true },
            { text: "Inactive", value: false },
          ],
          onFilter: (value, record) => {
            const isActive = record.L_IsActive === true || record.L_IsActive === 1;
            return value ? isActive : !isActive;
          },
          sorter: (a, b) => Number(a.L_IsActive) - Number(b.L_IsActive),
          render: (text, record) => (
            <Switch
              checked={text === 1 || text === true}
              onChange={(checked) => handleStatusChange(record, checked)}
              checkedChildren="Active"
              unCheckedChildren="Inactive"
            />
          ),
        },
        {
          title: "Block",
          dataIndex: "L_IsBlock",
          key: "L_IsBlock",
          width: calculateColumnWidth("Block"),
          align: "center",
          render: (text) => (
            <Switch
              checked={text === 1}
              disabled
              checkedChildren="Block"
              unCheckedChildren="Unblock"
            />
          ),
        },
        {
          title: "Location Code",
          dataIndex: "L_Code",
          key: "L_Code",
          width: calculateColumnWidth("Location Code"),
          align: "center",
          sorter: (a, b) => a.L_Code.localeCompare(b.L_Code),
        },
      ],
    },
    {
      title: "More",
      dataIndex: "more",
      key: "more",
      width: "60px",
      align: "center",
      fixed: "right",
      render: (text, record) => (
        <DropdownActionTable
          onDetailClick={() => handleDetailClick(record)}
          record={record}
          menu={[
            {
              key: "detail",
              label: "Detail",
              onClick: () => handleDetailClick(record),
            },
            {
              key: "edit",
              label: "Edit",
              onClick: () => handleEditClick(record),
            },
          ]}
        />
      ),
    },
  ];

  const getLocation = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:1234/api/LocationDetail-requests"
      );

      const mappedData = response.data.map((item, index) => ({
        key: item.L_IDLocation,
        no: (index + 1).toString(),
        ...item,
      }));

      setOriginalData(mappedData);
      setLocationData(mappedData);
      updateStatusCounts(mappedData);

    } catch (error) {
      console.error("Error fetching data:", error);
      notification.error({
        message: "Error",
        description: "Failed to fetch location data"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const filteredLocationData = locationData.map((item, index) => ({
    ...item,
    no: (index + 1).toString()
  }));

  const showNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      duration: 4.5,
      placement: "topRight",
      icon:
        type === "success" ? (
          <CheckCircleOutlined style={{ color: "#52c41a" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
        ),
    });
  };

  const handleStatusChange = async (record, checked) => {
    if (!checked && record.T_Number && record.T_Number.trim() !== '') {
      notification.warning({
        message: "Cannot Deactivate",
        description: `Cannot deactivate location ${record.L_Code} because it has a Tray Number (${record.T_Number})`,
        duration: 4.5,
        placement: "topRight",
        icon: <ExclamationCircleOutlined style={{ color: "#faad14" }} />
      });
      return;
    }

    Modal.confirm({
      title: `${checked ? "Activate" : "Deactivate"} Location`,
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to ${
        checked ? "activate" : "deactivate"
      } location ${record.L_Code}?`,
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await axios.put(
            "http://192.168.0.122:3334/api/Location-Active",
            {
              L_ID: record.L_IDLocation,
              L_IsActive: checked ? "1" : "0",
            }
          );

          if (response.status === 200) {
            showNotification(
              "success",
              "Status Updated",
              `Successfully ${checked ? "activated" : "deactivated"} location ${
                record.L_Code
              }`
            );
            getLocation();
            setSelectedRowKeys([]);
          }
        } catch (error) {
          console.error("Error updating status:", error);
          showNotification(
            "error",
            "Update Failed",
            `Failed to ${checked ? "activate" : "deactivate"} location ${
              record.L_Code
            }`
          );
        }
      },
    });
  };

  const onSelectAll = (e) => {
    if (e.target.checked) {
      const allKeys = filteredLocationData.map((item) => item.key);
      setSelectedRowKeys(allKeys);
    } else {
      setSelectedRowKeys([]);
    }
  };

  const confirmActivate = () => {
    Modal.confirm({
      title: "Activate Selected Locations",
      content: `Are you sure you want to activate ${selectedRowKeys.length} selected locations?`,
      onOk: async () => {
        try {
          await Promise.all(
            selectedRowKeys.map((key) =>
              axios.put("http://192.168.0.122:3334/api/Location-Active", {
                L_ID: key,
                L_IsActive: "1",
              })
            )
          );
          showNotification(
            "success",
            "Bulk Update Successful",
            `Successfully activated ${selectedRowKeys.length} locations`
          );
          setSelectedRowKeys([]);
          getLocation();
        } catch (error) {
          console.error("Error activating locations:", error);
          showNotification(
            "error",
            "Bulk Update Failed",
            "Failed to activate selected locations"
          );
        }
      },
    });
  };

  const updateStatusCounts = (data) => {
    const columns = data.reduce((max, item) => {
      const colNumber = parseInt(item.Col.replace(/\D/g, ''));
      return Math.max(max, colNumber);
    }, 0);

    const levels = data.reduce((max, item) => {
      const lvlNumber = parseInt(item.Lvl.replace(/\D/g, ''));
      return Math.max(max, lvlNumber);
    }, 0);

    const activeCount = data.filter(item => item.L_IsActive === 1 || item.L_IsActive === true).length;
    const inactiveCount = data.length - activeCount;
    
    const trayCount = data.filter(item => item.T_Number && item.T_Number.trim() !== '').length;

    setStatusCounts({
      items: data.length,
      columns: columns,
      levels: levels,
      active: activeCount,
      inactive: inactiveCount,
      trays: trayCount
    });
  };

  const handleFilter = () => {
    setIsFiltered(!isFiltered);
    
    if (!isFiltered) {
      const filtered = originalData.filter(item => 
        (item.L_IsActive === 1 || item.L_IsActive === true) && 
        (!item.T_Number || item.T_Number.trim() === '')
      );
      setLocationData(filtered);
      setFilteredCount(filtered.length);
      updateStatusCounts(filtered);
    } else {
      setLocationData(originalData);
      setFilteredCount(0);
      updateStatusCounts(originalData);
    }
  };

  const handleFilterWithTray = () => {
    setIsFilteredWithTray(!isFilteredWithTray);
    
    if (!isFilteredWithTray) {
      const filtered = originalData.filter(item => 
        (item.L_IsActive === 1 || item.L_IsActive === true) && 
        (item.T_Number && item.T_Number.trim() !== '')
      );
      setLocationData(filtered);
      setFilteredWithTrayCount(filtered.length);
      updateStatusCounts(filtered);
    } else {
      setLocationData(originalData);
      setFilteredWithTrayCount(0);
      updateStatusCounts(originalData);
    }
  };

  return (
    <>
      <div className="table-container">
        <div className="table-header2">
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Input
              placeholder="Search in all columns..."
              allowClear
              style={{ width: "300px" }}
              value={searchText}
              onChange={handleSearch}
              suffix={searchText ? null : <SearchOutlined />}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                type={isFiltered ? "primary" : "default"}
                onClick={handleFilter}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  backgroundColor: isFiltered ? '#722ed1' : undefined,
                  borderColor: isFiltered ? '#722ed1' : undefined
                }}
              >
                Filter Active & Empty Tray
                {isFiltered && (
                  <span style={{ 
                    background: '#fff', 
                    color: '#722ed1', 
                    padding: '0 6px', 
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {filteredCount}
                  </span>
                )}
              </Button>
              <Button
                type={isFilteredWithTray ? "primary" : "default"}
                onClick={handleFilterWithTray}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  backgroundColor: isFilteredWithTray ? '#1890ff' : undefined,
                  borderColor: isFilteredWithTray ? '#1890ff' : undefined
                }}
              >
                Filter Active with Tray
                {isFilteredWithTray && (
                  <span style={{ 
                    background: '#fff', 
                    color: '#1890ff', 
                    padding: '0 6px', 
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {filteredWithTrayCount}
                  </span>
                )}
              </Button>
            </div>
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
                }}>{statusCounts.items}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>Trays:</span>
                <span style={{ 
                  background: '#722ed1', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '4px',
                  minWidth: '28px',
                  textAlign: 'center'
                }}>{statusCounts.trays}</span>
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
                }}>{statusCounts.active}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>Inactive:</span>
                <span style={{ 
                  background: '#ff4d4f', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '4px',
                  minWidth: '28px',
                  textAlign: 'center'
                }}>{statusCounts.inactive}</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {selectedRowKeys.length > 0 && (
              <>
                <Button
                  type="primary"
                  onClick={confirmActivate}
                >
                  Activate Selected
                </Button>
                <Button
                  style={{
                    backgroundColor: "#8c8c8c",
                    borderColor: "#8c8c8c",
                    color: "white",
                  }}
                  onClick={() => {
                    const locationsWithTray = selectedRowKeys
                      .map(key => locationData.find(item => item.key === key))
                      .filter(item => item.T_Number && item.T_Number.trim() !== '');

                    if (locationsWithTray.length > 0) {
                      notification.warning({
                        message: "Cannot Deactivate Some Locations",
                        description: `Cannot deactivate ${locationsWithTray.length} location(s) because they have Tray Numbers`,
                        duration: 4.5,
                        placement: "topRight",
                        icon: <ExclamationCircleOutlined style={{ color: "#faad14" }} />
                      });
                      return;
                    }

                    Modal.confirm({
                      title: "Deactivate Selected Locations",
                      content: `Are you sure you want to deactivate ${selectedRowKeys.length} selected locations?`,
                      onOk: async () => {
                        try {
                          await Promise.all(
                            selectedRowKeys.map((key) =>
                              axios.put("http://192.168.0.122:3334/api/Location-Active", {
                                L_ID: key,
                                L_IsActive: "0",
                              })
                            )
                          );
                          showNotification(
                            "success",
                            "Bulk Update Successful",
                            `Successfully deactivated ${selectedRowKeys.length} locations`
                          );
                          setSelectedRowKeys([]);
                          getLocation();
                        } catch (error) {
                          console.error("Error deactivating locations:", error);
                          showNotification(
                            "error",
                            "Bulk Update Failed",
                            "Failed to deactivate selected locations"
                          );
                        }
                      },
                    });
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#595959";
                    e.currentTarget.style.borderColor = "#595959";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#8c8c8c";
                    e.currentTarget.style.borderColor = "#8c8c8c";
                  }}
                >
                  Deactivate Selected
                </Button>
              </>
            )}
            <Button
              type="primary"
              icon={<Plus size={16} />}
              onClick={showModal}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              New Location
            </Button>
          </div>
        </div>
        <div className="table-content">
          <Spin spinning={loading}>
            <Tables
              columns={columns}
              dataSource={filteredLocationData}
              scrollY={0.6}
              scrollX={"max-content"}
              bordered={true}
              rowSelection={rowSelection}
            />
          </Spin>
        </div>
      </div>

      <section>
        <ModalDetailLocation
          open={openDrawerDetail}
          onClose={onCloseDrawerDetail}
          record={selectedRecord}
        />
        <ModalAddLocation
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          getLocation={getLocation}
        />
      </section>
    </>
  );
};

export default Location;
