import React from "react";
import Tables from "../../components/Tables";
import DropdownActionTable from "../../components/dropdown/DropdownActionTable";
import { Button, Input } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import ModalAddFactory from "../../components/modal/ModalAddFactory";
import "../../styles/global.css";
import { useState } from "react";

const Factory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "100px",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
    },
    {
      title: "Factory ID",
      dataIndex: "factoryId",
    },
    {
      title: "Factory Name",
      dataIndex: "factoryName",
    },
    {
      title: "Factory Branch",
      dataIndex: "factoryBranch",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "More",
      dataIndex: "action",
      width: "100px",
    },
  ];
  const dataSource = Array.from({ length: 500 }, (_, index) => ({
    key: index.toString(),
    id: index.toString(),
    companyName: `Company ${index + 1}`,
    factoryId: `FACTORY${index + 1}`,
    factoryName: `Factory ${index + 1}`,
    factoryBranch: `Branch ${index + 1}`,
    createdAt: "2024-11-27",
    action: <DropdownActionTable />,
  }));

  const filteredDataSource = dataSource.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <>
      <div className="table-container">
        <div className="table-header">
          <Input
            placeholder="Search"
            style={{ width: "300px" }}
            value={searchText}
            onChange={handleSearch}
          />
          <Button type="primary" icon={<UserAddOutlined />} onClick={showModal}>
            New Factory
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

export default Factory;
