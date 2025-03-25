import React, { useState } from "react";
import Tables from "../../components/Tables";
import { Button, Input } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import "../../styles/global.css";
import DropdownActionTable from "../../components/dropdown/DropdownActionTable";
import ModalAddUser from "../../components/modal/ModalAddUser";

const User = () => {
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
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Employee ID",
      dataIndex: "employeeId",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Registered At",
      dataIndex: "registeredAt",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "",
      dataIndex: "action",
      width: "100px",
    },
  ];
  const dataSource = Array.from({ length: 100 }, (_, index) => ({
    key: (index + 1).toString(),
    id: (index + 1).toString(),
    name: `User ${index + 1}`,
    employeeId: `EMP${index + 1}`,
    email: `user${index + 1}@example.com`,
    registeredAt: "2024-11-27",
    role: "User",
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
        <div className="table-header2">
          <Input
            placeholder="Search"
            style={{ width: "300px" }}
            value={searchText}
            onChange={handleSearch}
          />
          <Button type="primary" icon={<UserAddOutlined />} onClick={showModal}>
            New User
          </Button>
          <ModalAddUser
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
        <div className="table-content">
          <Tables
            columns={columns}
            dataSource={filteredDataSource}
            scrollY={0.5}
          />
        </div>
      </div>
    </>
  );
};

export default User;
