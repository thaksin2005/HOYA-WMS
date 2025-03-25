import React, { useState, useEffect } from "react";
import Tables from "../../components/Tables";
import { Button, Input } from "antd";
import { Plus } from "lucide-react";
import ModalAddFactory from "../../components/modal/ModalAddHighPerformance";
import "../../styles/global.css";
import DropdownActionTable from "../../components/dropdown/DropdownActionTable";


const handleDetailClick = (record) => {
  setSelectedRecord(record);
  setOpenDrawerDetail(true);
};
const HighPerformance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);

  // เรียก API และอัปเดตข้อมูล
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:1234/api/Highperformance-requests");
        const data = await response.json();
        
        // ตรวจสอบว่า API ส่งข้อมูลมาในรูปแบบที่ต้องการ
        if (Array.isArray(data)) {
          setDataSource(data);
        } else {
          console.error("Invalid data format from API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // useEffect ทำงานครั้งเดียวตอนโหลดหน้า

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "MHP_ID",
      width: "60px",
    },
    {
      title: "Serial Upper",
      dataIndex: "MHP_SerialUPP",
    },
    {
      title: "Updated By",
      dataIndex: "UA_UpdateBy",
    },
    {
      title: "Updated On",
      dataIndex: "MHP_UpdateOn",
    },
    {
      title: "Created By",
      dataIndex: "UA_IDCreateBy",
    },
    {
      title: "Created On",
      dataIndex: "MHP_CreateOn",
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

  // กรองข้อมูลตามข้อความค้นหา
  const filteredDataSource = dataSource.filter((item) =>
    Object.values(item).some((value) =>
      value ? value.toString().toLowerCase().includes(searchText.toLowerCase()) : false
    )
  );

  return (
    <>
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
          <ModalAddFactory
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
        <div className="table-content">
          <Tables columns={columns} dataSource={filteredDataSource} />
        </div>
      </div>
    </>
  );
};

export default HighPerformance;
