import React, { useEffect } from "react";
import Tables from "../../components/Tables";
import DropdownActionTable from "../../components/dropdown/DropdownActionTable";
import ModalAddWarehouse from "../../components/modal/ModalAddWarehouse";
import "../../styles/global.css";
import { useState } from "react";
import calculateColumnWidth from "../../function/CalcWidth";
import { Button, Input, ConfigProvider } from "antd";
import { Plus, Edit, RefreshCw } from "lucide-react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
// import ActionHeaderTable from "../../components/ActionHeaderTable";
import filters from "../../function/FilterTable";
import axios from "axios";
import ModalDetailWarehouse from "./components/ModalDetailWarehouse";
const Warehouse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [handleEdit, setHandleEdit] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setHandleEdit(false);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDetailWarehouse = (record) => {
    setSelectedWarehouse(record);
    setOpenModal(true);
  };

  const handleDeleteWarehouse = (record) => {
    console.log(record);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleReset = () => {
    setSelectedRowKeys([]);
  };

  const handleEditClick = (record) => {
    setSelectedWarehouse(record);
    setOpenModal(true);
    setHandleEdit(true);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "radio",
  };

  const hasSelectedForEdit = selectedRowKeys.length === 1;
  const hasSelected = selectedRowKeys.length > 0;

  const columns = [
    {
      title: "#",
      dataIndex: "no",
      width: "50px",
      align: "center",
    },
    {
      title: "Factory Name",
      dataIndex: "factory",
      width: calculateColumnWidth("Factory Name"),
      filters: filters(dataSource, "factory"),
      onFilter: (value, record) => record.factory === value,
      sorter: (a, b) => a.factory.localeCompare(b.factory),
    },
    {
      title: "Factory Site",
      dataIndex: "site",
      align: "center",
      width: "110px",
      filters: filters(dataSource, "site"),
      onFilter: (value, record) => record.site === value,
      sorter: (a, b) => a.site.localeCompare(b.site),
    },
    {
      title: "Warehouse Code",
      dataIndex: "warehouseCode",
      align: "center",
      width: "115px",
      filters: filters(dataSource, "warehouseCode"),
      onFilter: (value, record) => record.warehouseCode === value,
      sorter: (a, b) => a.warehouseCode.localeCompare(b.warehouseCode),
    },

    {
      title: "Warehouse Name",
      dataIndex: "warehouseName",
      align: "center",
      width: "115px",
      filters: filters(dataSource, "warehouseName"),
      onFilter: (value, record) => record.warehouseName === value,
      sorter: (a, b) => a.warehouseName.localeCompare(b.warehouseName),
    },

    {
      title: "Warehouse Active",
      dataIndex: "warehouseActive",
      align: "center",
      width: "120px",
      filters: filters(dataSource, "warehouseActive"),
      onFilter: (value, record) => record.warehouseActive === value,
      sorter: (a, b) => a.warehouseActive.localeCompare(b.warehouseActive),
      render: (_, record) => (
        <center>
          <div className={`isActive ${record.warehouseActive}`}>
            {record.warehouseActive === "true" ? (
              <CheckCircleOutlined style={{fontSize:30}} />
            ) : (
              <CloseCircleOutlined style={{fontSize:30}} />
            )}
          </div>
        </center>
      ),
    },

    {
      title: "Warehouse Remarks",
      dataIndex: "warehouseRemark",
      align: "center",
      width: calculateColumnWidth("Warehouse Remarks"),
      filters: filters(dataSource, "warehouseRemark"),
      onFilter: (value, record) => record.warehouseRemark === value,
      sorter: (a, b) => a.warehouseRemark.localeCompare(b.warehouseRemark),
    },

    {
      title: "Username",
      dataIndex: "uaFullName",
      align: "center",
      width: "110px",
      filters: filters(dataSource, "uaFullName"),
      onFilter: (value, record) => record.uaFullName === value,
      sorter: (a, b) => a.uaFullName.localeCompare(b.uaFullName),
    },
    // {
    //   title: "Created At",
    //   dataIndex: "createdAt",
    // },

    // {
    //   title: "Create By",
    //   dataIndex: "createBy",
    // },
    {
      title: "More",
      dataIndex: "action",
      width: "50px",
      align: "center",
      render: (text, record) => (
        <DropdownActionTable
          onDetailClick={() => handleDetailWarehouse(record)}
          record={record}
          onDeleteClick={() => handleDeleteWarehouse(record)}
        />
      ),
    },
  ];

        // "http://192.168.0.122:1234/api/WarehouseDetail-requests"

  const getWarehouseData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1234/api/WarehouseDetail-requests"
      );
      const data = response.data;

      // ตั้งค่า dataSource ด้วยข้อมูลที่ได้รับมา
      setDataSource(
        data.map((item, index) => ({
          no: index + 1,
          id: item.W_IDWarehouse,
          key: index + 1,
          factory: item.F_Name,
          site: item.F_Site,
          warehouseName: item.W_Name,
          warehouseCode: item.W_Code,
          warehouseActive: item.W_IsActive ? "true" : "false",
          warehouseRemark: item.W_Remarks || "",
          uaCode: item.UA_Code,
          uaFullName: item.UA_Fullname,
        }))
      );
    } catch (error) {
      console.error("Error fetching warehouse data:", error);
    }
  };

  useEffect(() => {
    getWarehouseData();
  }, []);

  // ฟังก์ชันกรองค่า NULL และ undefined
  const filteredDataSource = dataSource
    .map((item) => {
      return Object.keys(item).reduce((acc, key) => {
        acc[key] =
          item[key] === null || item[key] === undefined ? "" : item[key];
        return acc;
      }, {});
    })
    .filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );

  return (
    <div className="table-container">
      <div className="table-header2">
        <Input
          placeholder="Search"
          style={{ width: "300px" }}
          value={searchText}
          onChange={handleSearch}
        />
        <div style={{ display: "flex", gap: "6px" }}>
          {hasSelected && (
            <Button icon={<RefreshCw size={16} />} onClick={handleReset}>
              Reset
            </Button>
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
                  ); // ค้นหา record ของแถวที่ถูกเลือก
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
            type="primary"
            icon={<Plus size={16} />}
            onClick={showModal}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            New Warehouse
          </Button>
        </div>
        <ModalAddWarehouse
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        {/* <ActionHeaderTable AddButton={showModal} /> */}
      </div>
      <div className="table-content">
        <Tables
          columns={columns}
          dataSource={filteredDataSource}
          scrollY={0.5}
          bordered={true}
          responsive={true}
          rowSelection={rowSelection}
        />
      </div>
      <ModalDetailWarehouse
        open={openModal}
        onClose={onCloseModal}
        record={selectedWarehouse}
        handleEditClick={handleEdit}
      />
    </div>
  );
};

export default Warehouse;
