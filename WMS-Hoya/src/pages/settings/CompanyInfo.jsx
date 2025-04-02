import React, { useState, useEffect } from "react";
import Tables from "../../components/Tables";
import { Button, Input, Switch, Modal } from "antd";
import { FilePlus2, FilePen } from "lucide-react"
import "../../styles/global.css";

const CompanyInfo = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const FactoryColumns = [
    {
      title: "Code",
      dataIndex: "F_Code"
    },
    {
      title: "Short Code",
      dataIndex: "F_ShortCode"
    },
    {
      title: "Factory Name",
      dataIndex: "F_Name"
    },
    {
      title: "Branch",
      dataIndex: "F_City"
    },
    {
      title: "Site",
      dataIndex: "F_Site"
    },
    {
      title: "Remarks",
      dataIndex: "F_Remarks"
    },
    {
      title: "IsActive",
      dataIndex: "F_IsActive"
    }
  ]

  const WarehouseColumns = [
    {
      title: "Code",
      dataIndex: "W_Code"
    },
    {
      title: "Warehouse Name",
      dataIndex: "W_Name"
    },
    {
      title: "Remarks",
      dataIndex: "W_Remarks"
    },
    {
      title: "IsActive",
      dataIndex: "W_IsActive"
    }
  ]

  const PlaceColumns = [
    {
      title: "Code",
      dataIndex: "P_Code"
    },
    {
      title: "Place Name",
      dataIndex: "P_Name"
    },
    {
      title: "Remarks",
      dataIndex: "P_Remarks"
    },
    {
      title: "IsActive",
      dataIndex: "P_IsActive"
    }
  ]



  return (
    <>
      <div className="table-container">

        <div>Company Name :</div>

        <div className="factory-table">
          <div>Factory</div>
          <div className="table-menu">

            <Button icon={<FilePlus2 size={18} />} style={{ width: "100px" }} onClick={openModal} >
              Add
            </Button>

            <Button icon={<FilePen size={18} />} style={{ width: "100px" }}>
              Edit
            </Button>

          </div>

          <div className="table-content">
            <Tables columns={FactoryColumns}></Tables>
          </div>
        </div>

        <div className="warehouse-table">
          <div>Warehouse</div>
          <div className="table-menu">

            <Button icon={<FilePlus2 size={18} />} style={{ width: "100px" }} onClick={openModal} >
              Add
            </Button>

            <Button icon={<FilePen size={18} />} style={{ width: "100px" }}>
              Edit
            </Button>

          </div>

          <div className="table-content">
            <Tables columns={WarehouseColumns}></Tables>
          </div>
        </div>

        <div className="place-table">
          <div>Place</div>
          <div className="table-menu">

            <Button icon={<FilePlus2 size={18} />} style={{ width: "100px" }} onClick={openModal} >
              Add
            </Button>

            <Button icon={<FilePen size={18} />} style={{ width: "100px" }}>
              Edit
            </Button>

          </div>

          <div className="table-content">
            <Tables columns={PlaceColumns}></Tables>
          </div>
        </div>

      </div>

      <section>

      </section>
    </>
  )
};

export default CompanyInfo;
