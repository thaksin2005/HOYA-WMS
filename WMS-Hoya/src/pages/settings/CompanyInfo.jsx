import React, { useState, useEffect } from "react";
import Tables from "../../components/Tables";
import { Button, Input, Switch, Modal } from "antd";
import { FilePlus2, FilePen } from "lucide-react"
import "../../styles/global.css";
import axios, { Axios } from "axios";
import Item from "antd/es/list/Item";
import ModalAddFactory from "./components/ModalAddFactory";

const CompanyInfo = () => {

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [FactoryData, setFactoryData] = useState([]);
  const [WarehouseData, setWarehouseData] = useState([]);
  const [PlaceData, setPlaceData] = useState([]);

  const openAdd = () => {
    setIsAddOpen(true);
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const FactoryColumns = [
    {
      title: "Code",
      dataIndex: "FactoryCode",
      align: "center",
    },
    {
      title: "Short Code",
      dataIndex: "FactoryShortCode",
      align: "center",
    },
    {
      title: "Factory Name",
      dataIndex: "FactoryName",
      align: "center",
    },
    {
      title: "Branch",
      dataIndex: "FactoryCity",
      align: "center",
    },
    {
      title: "Site",
      dataIndex: "FactorySite",
      align: "center",
    },
    {
      title: "Remarks",
      dataIndex: "FactoryRemarks",
      align: "center",
    },
    {
      title: "IsActive",
      dataIndex: "F_IsActive",
      align: "center",
    }
  ];

  const WarehouseColumns = [
    {
      title: "Code",
      dataIndex: "WarehouseCode",
      align: "center",
    },
    {
      title: "Warehouse Name",
      dataIndex: "WarehouseName",
      align: "center",
    },
    {
      title: "Remarks",
      dataIndex: "WarehouseRemarks",
      align: "center",
    },
    {
      title: "IsActive",
      dataIndex: "W_IsActive",
      align: "center",
    }
  ];

  const PlaceColumns = [
    {
      title: "Code",
      dataIndex: "PlaceCode",
      align: "center",
    },
    {
      title: "Place Name",
      dataIndex: "PlaceName",
      align: "center",
    },
    {
      title: "Remarks",
      dataIndex: "PlaceRemarks",
      align: "center",
    },
    {
      title: "IsActive",
      dataIndex: "P_IsActive",
      align: "center",
    }
  ];

  async function getFactoryData() {
    const response = await axios.get(
      "http://localhost:1234/api/FactoryDetail-requests"
    );
    const data = response.data.map((Item, index) => ({
      Factoryno: index + 1,
      FactoryID: Item.F_ID,
      FactoryCode: Item.F_Code,
      FactoryShortCode: Item.F_ShortCode,
      FactoryName: Item.F_Name,
      FactoryCity: Item.F_City,
      FactorySite: Item.F_Site,
      FactoryRemarks: Item.F_Remarks,
      F_IsActive: Item.F_IsActive ? "true" : "false"
    }));
    setFactoryData(data);
    // console.log(FactoryData);
  };

  async function getWarehouseData() {
    const response = await axios.get(
      "http://localhost:1234/api/WarehouseDetail-requests"
    );
    const data = response.data.map((Item, index) => ({
      Warehouseno: index + 1,
      WarehouseCode: Item.W_Code,
      WarehouseName: Item.W_Name,
      WarehouseRemark: Item.W_Remarks,
      W_IsActive: Item.W_IsActive ? "true" : "false"

    }));
    setWarehouseData(data);
  }

  async function getPlaceData() {
    const response = await axios.get(
      "http://localhost:1234/api/PlaceDetail-requests"
    );
    const data = response.data.map((Item, index) => ({
      Placeno: index + 1,
      PlaceCode: Item.P_Code,
      PlaceName: Item.P_Name,
      PlaceRemarks: Item.P_Remarks,
      P_IsActive: Item.P_IsActive ? "true" : "false"
    }));
    setPlaceData(data);
  }

  const filteredDataSource = FactoryData
    .map((item, index) => ({
      ...item, key: index + 1, //Index +1 เพื่อให้ลำดับเริ่มที่ 1 แทน 0
    }))
    .map((item) => Object.keys(item).reduce((acc, key) => {
      acc[key] = item[key] === null ? "" : item[key]; //แทนค่าที่เป็น Null ด้วย string ""
      return acc;
    }, {})
    )
  // .filter((item) =>
  //   Object.values(item).some((value) =>
  //     value.toString().toLowerCase().includes(searchText.toLowerCase())
  //   )
  // )

  const filteredWarehouseData = WarehouseData
    .map((item, index) => ({
      ...item, key: index + 1, //Index +1 เพื่อให้ลำดับเริ่มที่ 1 แทน 0
    }))
    .map((item) => Object.keys(item).reduce((acc, key) => {
      acc[key] = item[key] === null ? "" : item[key]; //แทนค่าที่เป็น Null ด้วย string ""
      return acc;
    }, {})
    )

  const filteredPlaceData = PlaceData
    .map((item, index) => ({
      ...item, key: index + 1, //Index +1 เพื่อให้ลำดับเริ่มที่ 1 แทน 0
    }))
    .map((item) => Object.keys(item).reduce((acc, key) => {
      acc[key] = item[key] === null ? "" : item[key]; //แทนค่าที่เป็น Null ด้วย string ""
      return acc;
    }, {})
    )

  // console.log(filteredWarehouseData);
  console.log(filteredPlaceData);

  useEffect(() => {
    getFactoryData();
    getWarehouseData();
    getPlaceData();

    const intervalID = setInterval(() => {

    }, 5000);

    return () => clearInterval(intervalID);
  }, [])


  return (
    <>
      <div className="table-container">

        <h2>Company Name :</h2>

        <div className="factory-table">
          <h3 style={{ marginTop: "3vh", marginBottom: "1.5vh" }}>Factory</h3>
          <div className="table-menu">

            <Button icon={<FilePlus2 size={18} />} style={{ width: "100px" }} onClick={openAdd} >
              Add
            </Button>

            <Button icon={<FilePen size={18} />} style={{ width: "100px" }}>
              Edit
            </Button>

          </div>

          <div className="table-content">
            <Tables columns={FactoryColumns} dataSource={filteredDataSource} />
          </div>
        </div>

        <div className="warehouse-table">
          <h3 style={{ marginTop: "3vh", marginBottom: "1.5vh" }}>Warehouse</h3>
          <div className="table-menu">

            <Button icon={<FilePlus2 size={18} />} style={{ width: "100px" }} onClick={openModal} >
              Add
            </Button>

            <Button icon={<FilePen size={18} />} style={{ width: "100px" }}>
              Edit
            </Button>

          </div>

          <div className="table-content">
            <Tables columns={WarehouseColumns} dataSource={filteredWarehouseData} />
          </div>
        </div>

        <div className="place-table">
          <h3 style={{marginTop: "3vh", marginBottom: "1.5vh"}}>Place</h3>
          <div className="table-menu">

            <Button icon={<FilePlus2 size={18} />} style={{ width: "100px" }} onClick={openModal} >
              Add
            </Button>

            <Button icon={<FilePen size={18} />} style={{ width: "100px" }}>
              Edit
            </Button>

          </div>

          <div className="table-content">
            <Tables columns={PlaceColumns} dataSource={filteredPlaceData} />
          </div>
        </div>

      </div>

      <section>
        <ModalAddFactory
          isAddOpen={isAddOpen}
          setIsAddOpen={setIsAddOpen}
        />
      </section>
    </>
  )
};

export default CompanyInfo;
