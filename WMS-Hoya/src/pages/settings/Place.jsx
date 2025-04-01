import React from "react";
import Tables from "../../components/Tables";
import DropdownActionTable from "../../components/dropdown/DropdownActionTable";
import ModalAddPlace from "../../components/modal/ModalAddPlace";
import "../../styles/global.css";
import { useState, useEffect } from "react";
import calculateColumnWidth from "../../function/CalcWidth";
import { Button, Input, Modal, message, ConfigProvider } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Plus, RefreshCw, Edit } from "lucide-react";
import filters from "../../function/FilterTable";
import axios from "axios";
import ModalDetailPlace from "./components/ModalDetailPlace";
// import ActionHeaderTable from "../../components/ActionHeaderTable"

const Place = () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [addedPlace, setAddedPlace] = useState(false);
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

  const handleDetailPlace = (record) => {
    setSelectedPlace(record);
    setOpenModal(true);
  };

  const handleDeletePlace = (record) => {
    console.log(record);
  };

  const handleReset = () => {
    setSelectedRowKeys([]);
  };

  const handleEditClick = (record) => {
    setSelectedPlace(record);
    setOpenModal(true);
    setHandleEdit(true);
  };

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

  useEffect(() => {
    if (addedPlace) {
      messageApi.success("Place added successfully");
      getPlaceData();
      setAddedPlace(false);
    }
  }, [addedPlace]);

  const columns = [
    {
      title: "ID", // เพิ่มคอลัมน์ ID
      dataIndex: "id",
      width: "5%",
      align: "center",
    },
    {
      title: "Warehouse Name",
      dataIndex: "warehouseName",
      width: "30%",
      filters: filters(dataSource, "warehouseName"),
      onFilter: (value, record) => record.warehouseName === value,
      sorter: (a, b) =>
        a.warehouseName ? a.warehouseName.localeCompare(b.warehouseName) : 0,
    },

    {
      title: "Place Code",
      dataIndex: "placeCode",
      align: "center",
      width: "10%",
      filters: filters(dataSource, "placeCode"),
      onFilter: (value, record) => record.placeCode === value,
      sorter: (a, b) => a.placeCode.localeCompare(b.placeCode),
    },

    {
      title: "Place Name",
      dataIndex: "placeName",
      align: "center",
      width: "20%",
      filters: filters(dataSource, "placeName"),
      onFilter: (value, record) => record.placeName === value,
      sorter: (a, b) => a.placeName.localeCompare(b.placeName),
    },

    {
      title: "Place Is Auto Storage",
      dataIndex: "isAutoStorage",
      align: "center",
      width: "15%",
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],

      onFilter: (value, record) => record.isAutoStorage === value,
      sorter: (a, b) =>
        a.isAutoStorage === b.isAutoStorage ? 0 : a.isAutoStorage ? 1 : -1,
      render: (_, record) => (
        <center>
          <div className={`isAutoStorage ${record.isAutoStorage}`}>
            {record.isAutoStorage === true ? (
              <CheckCircleOutlined style={{fontSize:30}}/>
            ) : (
              <CloseCircleOutlined style={{fontSize:30}}/>
            )}
          </div>
        </center>
      ),
    },
    {
      title: "Place Is Active",
      dataIndex: "isActive",
      align: "center",
      width: "15%",
      render: (_, record) => (
        <center>
          <div className={`isActive ${record.isActive}`}>
            {record.isActive === true ? (
              <CheckCircleOutlined style={{fontSize:30}} />
            ) : (
              <CloseCircleOutlined style={{fontSize:30}} />
            )}
          </div>
        </center>
      ),
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
      sorter: (a, b) => (a.isActive === b.isActive ? 0 : a.isActive ? 1 : -1),
    },

    {
      title: "More",
      dataIndex: "action",
      width: "5%",
      align: "center",
      render: (text, record) => (
        <DropdownActionTable
          onDetailClick={() => handleDetailPlace(record)}
          record={record}
          onDeleteClick={() => handleDeletePlace(record)}
        />
      ),
    },
  ];

      // "http://192.168.0.122:1234/api/PlaceDetail-requests"

  const getPlaceData = async () => {
    const response = await axios.get(
      "http://localhost:1234/api/PlaceDetail-requests"
    );
    const data = response.data.map((item, index) => ({
      key: item.P_IDPlace,
      id: item.P_IDPlace,
      placeCode: item.P_Code,
      placeName: item.P_Name,
      warehouseName: item.W_Fullname,
      isAutoStorage: item.P_IsAutoStorage,
      isActive: item.P_IsActive,
    }));
    setDataSource(data);
  };

  useEffect(() => {
    getPlaceData();
  }, []);

  const filteredDataSource = dataSource
    .map((item) => ({
      ...item,
      placeCode: item.placeCode || "", // เปลี่ยน NULL เป็นช่องว่าง
      placeName: item.placeName || "", // เปลี่ยน NULL เป็นช่องว่าง
    }))
    .filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );

  return (
    <div className="table-container">
      {messageContextHolder}
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
          {hasSelectedForEdit && (
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimaryHover: "#faad14",
                  },
                },
              }}
            >
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
            </ConfigProvider>
          )}
          <Button
            type="primary"
            icon={<Plus size={16} />}
            onClick={showModal}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            New Place
          </Button>
        </div>
        <ModalAddPlace
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          addedPlace={setAddedPlace}
        />
        {/* <ActionHeaderTable AddButton={showModal} /> */}
      </div>
      <div className="table-content">
        <Tables
          columns={columns}
          dataSource={filteredDataSource}
          scrollY={0.5}
          bordered={true}
          rowSelection={rowSelection}
        />
      </div>
      <ModalDetailPlace
        open={openModal}
        onClose={onCloseModal}
        record={selectedPlace}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default Place;
