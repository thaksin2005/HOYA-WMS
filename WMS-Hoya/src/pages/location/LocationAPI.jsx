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
} from "antd";
import { Plus } from "lucide-react";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import ModalAddLocation from "../../components/modal/ModalAddLocation";
import "../../styles/global.css";
import calculateColumnWidth from "../../function/CalcWidth";
import filters from "../../function/FilterTable";

const Location = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDrawerDetail, setOpenDrawerDetail] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
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
    // {
    //   title: () => (
    //     <Checkbox
    //       onChange={onSelectAll}
    //       checked={selectedRowKeys.length === filteredLocationData.length}
    //     />
    //   ),
    //   dataIndex: "checkbox",
    //   key: "checkbox",
    //   width: "2%",
    //   align: "center",
    //   fixed: "left",
    //   render: (text, record) => (
    //     <Checkbox
    //       checked={selectedRowKeys.includes(record.key)}
    //       onChange={(e) => {
    //         const checked = e.target.checked;
    //         if (checked) {
    //           setSelectedRowKeys([...selectedRowKeys, record.key]);
    //         } else {
    //           setSelectedRowKeys(
    //             selectedRowKeys.filter((key) => key !== record.key)
    //           );
    //         }
    //       }}
    //     />
    //   ),
    // },
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      width: "3%",
      align: "center",
      fixed: "left",
    },
    {
      title: "Warehouse Information",
      align: "center",
      children: [
        {
          title: "Warehouse Name",
          dataIndex: "W_Fullname",
          key: "W_Fullname",
          width: calculateColumnWidth("Warehouse Name"),
          align: "center",
          width: "250px",
          filters: filters(locationData, "W_Fullname"),
          onFilter: (value, record) => record.W_Fullname === value,
          sorter: (a, b) => a.W_Fullname.localeCompare(b.W_Fullname),
        },
      ],
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
          title: "Place Name",
          dataIndex: "P_Name",
          key: "P_Name",
          width: calculateColumnWidth("Place Name"),
          align: "center",
          filters: filters(locationData, "P_Name"),
          onFilter: (value, record) => record.P_Name === value,
          sorter: (a, b) => a.P_Name.localeCompare(b.P_Name),
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
          // ,
          // filters: filters(locationData, "P_IsAutoStorage"),
          // onFilter: (value, record) => record.P_IsAutoStorage === value,
          // sorter: (a, b) => a.P_IsAutoStorage - b.P_IsAutoStorage
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
        },
        // {
        //   title: "Status",
        //   dataIndex: "S_IsActive",
        //   key: "S_IsActive",
        //   width: calculateColumnWidth("Stacker Status"),
        //   align: "center",
        //   render: (text) => (
        //     <Switch checked={text} disabled checkedChildren="Active" unCheckedChildren="Inactive" />
        //   )
        // }
      ],
    },
    {
      title: "Location Information",
      children: [
        {
          title: "Location Code",
          dataIndex: "L_Code",
          key: "L_Code",
          width: calculateColumnWidth("Location Code"),
          align: "center",
          sorter: (a, b) => a.L_Code.localeCompare(b.L_Code),
        },
        {
          title: "Description",
          dataIndex: "L_Description",
          key: "L_Description",
          width: calculateColumnWidth("Description"),
          align: "center",
          //   filters: filters(locationData, "L_Description"),
          //   onFilter: (value, record) => record.L_Description === value,
          sorter: (a, b) => a.L_Description.localeCompare(b.L_Description),
        },
        {
          title: "Zone",
          dataIndex: "L_VZone",
          key: "L_VZone",
          width: calculateColumnWidth("Zone"),
          align: "center",
          filters: filters(locationData, "L_VZone"),
          onFilter: (value, record) => record.L_VZone === value,
          sorter: (a, b) => a.L_VZone.localeCompare(b.L_VZone),
        },
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
          title: "Position",
          children: [
            // {
            //   title: "Row",
            //   dataIndex: "Row",
            //   key: "Row",
            //   width: calculateColumnWidth("Row"),
            //   align: "center",
            // },
            {
              title: "Column",
              dataIndex: "Col",
              key: "Col",
              width: calculateColumnWidth("Column"),
              align: "center",
            },
            {
              title: "Level",
              dataIndex: "Lvl",
              key: "Lvl",
              width: calculateColumnWidth("Level"),
              align: "center",
            },
          ],
        },
        {
          title: "Status",
          children: [
            {
              title: "Active",
              dataIndex: "L_IsActive",
              key: "L_IsActive",
              width: calculateColumnWidth("Active"),
              align: "center",
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
            // {
            //   title: "Reserve",
            //   dataIndex: "L_IsReserve",
            //   key: "L_IsReserve",
            //   width: calculateColumnWidth("Reserve"),
            //   align: "center",
            //   render: (text) => (
            //     <Switch checked={text} disabled checkedChildren="Yes" unCheckedChildren="No" />
            //   )
            // }
          ],
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
        "http://192.168.195.45:1234/api/LocationDetail-requests"
      );

      const mappedData = response.data.map((item, index) => ({
        key: item.L_IDLocation,
        no: (index + 1).toString(),
        ...item, // เพิ่มข้อมูลทั้งหมดจาก API
      }));

      setLocationData(mappedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setOpenNotification("error");
      setDescription("Failed to fetch location data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const filteredLocationData = locationData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

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
            "http://192.168.195.45:3333/api/Location-Active",
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
              axios.put("http://192.168.195.45:3333/api/Location-Active", {
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

  return (
    <>
      <div className="table-container">
        <div className="table-header2">
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <Input
              placeholder="Search"
              style={{ width: "300px" }}
              value={searchText}
              onChange={handleSearch}
            />
            {selectedRowKeys.length > 0 && (
              <span style={{ color: "#1890ff" }}>
                Selected {selectedRowKeys.length} items
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {selectedRowKeys.length > 0 && (
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    confirmActivate();
                  }}
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
                    Modal.confirm({
                      title: "Deactivate Selected Locations",
                      content: `Are you sure you want to deactivate ${selectedRowKeys.length} selected locations?`,
                      onOk: async () => {
                        try {
                          await Promise.all(
                            selectedRowKeys.map((key) =>
                              axios.put(
                                "http://192.168.195.45:3333/api/Location-Active",
                                {
                                  L_ID: key,
                                  L_IsActive: "0",
                                }
                              )
                            )
                          );
                          showNotification(
                            "success",
                            "Bulk Update Successful",
                            `Successfully deactivated ${selectedRowKeys.length} locations`
                          );
                          setSelectedRowKeys([]);
                          getLocation();
                          console.log("selectedRowKeys: ", selectedRowKeys);
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
          <ModalAddLocation
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
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
      </section>
    </>
  );
};

export default Location;
