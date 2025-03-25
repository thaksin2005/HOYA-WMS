import React, { useEffect, useState } from "react";
import Tables from "../../components/Tables";
import { Button, Input } from "antd";
import { Plus } from "lucide-react";
import ModalAddFactory from "../../components/modal/ModalAddStockLimit";
import "../../styles/global.css";
import DropdownActionTable from "../../components/dropdown/DropdownActionTable";

const handleDetailClick = (record) => {
  setSelectedRecord(record);
  setOpenDrawerDetail(true);
};

const StockLimit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);


  useEffect(() => {
    fetch("http://localhost:1234/api/MoldLimitStock-requests")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item, index) => ({
          key: index,
          WMSL_ID: item.MSL_ID,
          WMSL_MaxStock: item.MSL_MaxStock,
          WMSL_MinStock: item.MSL_MinStock,
          MM_IDMoldMaster: item.MM_IDMoldMaster,
          MM_MoldCode: item.MM_MoldCode,
          W_IDWarehouse: item.P_IDPlace,
          W_Name: item.P_Name,
        }));
        setDataSource(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const columns = [
    { title: "No.", dataIndex: "WMSL_ID", width: "60px",align: "center", },
    { title: "Warehouse ID", dataIndex: "W_IDWarehouse", align: "center",},
    { title: "Warehouse Name", dataIndex: "W_Name" },
    { title: "Mold Master ID", dataIndex: "MM_IDMoldMaster" ,align: "center",},
    { title: "Mold Code", dataIndex: "MM_MoldCode" ,align: "center",},
    { title: "Max Stock", dataIndex: "WMSL_MaxStock" ,align: "center",},
    { title: "Min Stock", dataIndex: "WMSL_MinStock" ,align: "center",},
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

  const filteredDataSource = dataSource.filter((item) =>
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
        <Button type="primary" icon={<Plus />} onClick={showModal}>
          New Data
        </Button>
        <ModalAddFactory isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
      <div className="table-content">
        <Tables columns={columns} dataSource={filteredDataSource} />
      </div>
    </div>
  );
};

export default StockLimit;
