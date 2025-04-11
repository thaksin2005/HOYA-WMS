import React, { useState, useEffect } from "react";
import Tables from "../../components/Tables";
import { Button, Input, Switch, Modal } from "antd";
import { FilePlus2, FilePen, SquareCheck, Square } from "lucide-react"
import "../../styles/global.css";
import axios, { Axios } from "axios";
import Item from "antd/es/list/Item";
import ModalAddFactory from "./components/ModalAddFactory";
import ModalEditFactory from "./components/ModalEditFactory";

import ModalAddWarehouse from "./components/ModalAddWarehouse";
import ModalEditWarehouse from "./components/ModalEditWarehouse";

import ModalAddPlace from "./components/ModalAddPlace";
import ModalEditPlace from "./components/ModalEditPlace";

import { render } from "less";

const CompanyInfo = () => {

  const [isAddFactoryOpen, setIsAddFactoryOpen] = useState(false);
  const [isEditFactoryOpen, setIsEditFactoryOpen] = useState(false);
  const [FactoryData, setFactoryData] = useState([]);

  const [isAddWarehouseOpen, setIsAddWarehouseOpen] = useState(false);
  const [isEditWarehouseOpen, setIsEditWarehouseOpen] = useState(false);
  const [WarehouseData, setWarehouseData] = useState([]);

  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [isEditPlaceOpen, setIsEditPlaceOpen] = useState(false);
  const [PlaceData, setPlaceData] = useState([]);

  const [CompanyData, setCompanyData] = useState([]);

  const openAddFactory = () => {
    setIsAddFactoryOpen(true);
  }
  const openAddWarehouse = () => {
    setIsAddWarehouseOpen(true);
  }

  const openAddPlace = () => {
    setIsAddPlaceOpen(true);

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
      render: (_, record) => (
        <center>
          <div>
            {record.F_IsActive === "true" ?
              (<SquareCheck />) : (<Square />)}
          </div>
        </center>
      ),
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
      render: (_, record) => (
        <center>
          <div>
            {record.W_IsActive === "true" ?
              (<SquareCheck />) : (<Square />)}
          </div>
        </center>
      ),
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
      render: (_, record) => (
        <center>
          <div>
            {record.P_IsActive === "true" ?
              (<SquareCheck />) : (<Square />)}
          </div>
        </center>
      ),
    }
  ];

  async function getFactoryData() {
    const response = await axios.get(
      "http://localhost:1234/api/FactoryDetail-requests"
    );
    const data = response.data.map((Item, index) => ({
      key: index + 1,
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
      key: index + 1,
      Warehouseno: index + 1,
      WarehouseID: Item.W_ID,
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
      key: index + 1,
      Placeno: index + 1,
      PlaceID: Item.P_IDPlace,
      PlaceCode: Item.P_Code,
      PlaceName: Item.P_Name,
      PlaceRemarks: Item.P_Remarks,
      P_IsActive: Item.P_IsActive ? "true" : "false"
    }));
    setPlaceData(data);
  }

  async function getCompanyData() {
    const response = await axios.get(
      "http://localhost:1234/api/CompanyDetail-requests"
    );
    const data = response.data.map((Item, index) => ({
      key: index + 1,
      CompanyID: Item.C_ID,
      CompanyCode: Item.C_Code,
      CompanyName: Item.C_Name
    }));
    setCompanyData(data);
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
  // console.log(filteredPlaceData);

  useEffect(() => {
    getFactoryData();
    getWarehouseData();
    getPlaceData();
    getCompanyData();

    const intervalID = setInterval(() => {

    }, 5000);

    return () => clearInterval(intervalID);
  }, [])

  //Selection Variable For Factory

  const [selectedFactoryRowKeys, setSelectedFactoryRowKeys] = useState([]);
  const [selectedFactoryData, setSelectedFactoryData] = useState(null);

  const onSelectFactoryChange = (newSelectedRowkeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowkeys);
    setSelectedFactoryRowKeys(newSelectedRowkeys);
  }
  const rowSelectionFactory = {
    selectedFactoryRowKeys,
    onChange: onSelectFactoryChange,
    type: "radio",

  };

  //Selection Variable For Warehouse

  const [selectedWarehouseRowKeys, setSelectedWarehouseRowKeys] = useState([]);
  const [selectedWarehouseData, setSelectedWarehuseData] = useState(null);

  const onSelectWarehouseChange = (newSelectedRowkeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowkeys);
    setSelectedWarehouseRowKeys(newSelectedRowkeys);
  }

  const rowSelectionWarehouse = {
    selectedWarehouseRowKeys,
    onChange: onSelectWarehouseChange,
    type: "radio",

  };

  //Selection Variable For Place
  const [selectedPlaceRowKeys, setSelectedPlaceRowKeys] = useState([]);
  const [selectedPlaceData, setSelectedPlaceData] = useState(null);

  const onSelectPlaceChange = (newSelectedRowkeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowkeys);
    setSelectedPlaceRowKeys(newSelectedRowkeys);
  }

  const rowSelectionPlace = {
    selectedPlaceRowKeys,
    onChange: onSelectPlaceChange,
    type: "radio",
  };


  return (
    <>
      <div className="table-container">
        <h2>Company Name : {CompanyData[0].CompanyName}</h2>
        <div className="factory-table">
          <h3 style={{ marginTop: "3vh", marginBottom: "1.5vh" }}>Factory</h3>
          <div className="table-menu">

            <Button
              icon={<FilePlus2 size={18} />}
              style={{ width: "100px" }}
              onClick={openAddFactory} >
              Add
            </Button>

            <Button
              icon={<FilePen size={18} />}
              style={{ width: "100px" }}
              onClick={() => {
                if (selectedFactoryRowKeys.length > 0) {
                  const selectedData = FactoryData.find(
                    (item) => item.key === selectedFactoryRowKeys[0]

                  );
                  setSelectedFactoryData(selectedData);
                  setIsEditFactoryOpen(true);
                } else {
                  console.log("Please select a row to edit.");
                }

              }}

            >
              Edit
            </Button>

          </div>

          <div className="table-content">
            <Tables
              columns={FactoryColumns}
              dataSource={filteredDataSource}
              rowSelection={rowSelectionFactory}
            />
          </div>
        </div>

        <div className="warehouse-table">
          <h3 style={{ marginTop: "3vh", marginBottom: "1.5vh" }}>Warehouse</h3>
          <div className="table-menu">

            <Button
              icon={<FilePlus2 size={18} />}
              style={{ width: "100px" }}
              onClick={openAddWarehouse} >
              Add
            </Button>

            <Button
              icon={<FilePen size={18} />}
              style={{ width: "100px" }}
              onClick={() => {

                if (selectedWarehouseRowKeys.length > 0) {
                  const selectedData = WarehouseData.find(
                    (item) => item.key === selectedWarehouseRowKeys[0]
                  );
                  setSelectedWarehuseData(selectedData);
                  setIsEditWarehouseOpen(true);
                } else {
                  console.log("Please select a row to edit.");
                }
              }}

            >
              Edit
            </Button>

          </div>

          <div className="table-content">
            <Tables
              columns={WarehouseColumns}
              dataSource={filteredWarehouseData}
              rowSelection={rowSelectionWarehouse}
            />
          </div>
        </div>

        <div className="place-table">
          <h3 style={{ marginTop: "3vh", marginBottom: "1.5vh" }}>Place</h3>
          <div className="table-menu">

            <Button
              icon={<FilePlus2 size={18} />}
              style={{ width: "100px" }}
              onClick={openAddPlace} >
              Add
            </Button>

            <Button
              icon={<FilePen size={18} />}
              style={{ width: "100px" }}
              onClick={() => {

                if (selectedPlaceRowKeys.length > 0) {
                  const selectedData = PlaceData.find(
                    (item) => item.key === selectedPlaceRowKeys[0]
                  );
                  setSelectedPlaceData(selectedData);
                  setIsEditPlaceOpen(true);
                } else {
                  console.log("Please select a row to edit.");
                }
              }}
            >
              Edit
            </Button>

          </div>

          <div className="table-content">
            <Tables
              columns={PlaceColumns}
              dataSource={filteredPlaceData}
              rowSelection={rowSelectionPlace}
            />
          </div>
        </div>

      </div>

      <section>
        <ModalAddFactory
          isAddOpen={isAddFactoryOpen}
          setIsAddOpen={setIsAddFactoryOpen}
        />

        <ModalEditFactory
          isEditOpen={isEditFactoryOpen}
          setIsEditOpen={setIsEditFactoryOpen}
          FactoryRecord={selectedFactoryData}

        />

        <ModalAddWarehouse
          isAddOpen={isAddWarehouseOpen}
          setIsAddOpen={setIsAddWarehouseOpen}
        />

        <ModalEditWarehouse
          isEditOpen={isEditWarehouseOpen}
          setIsEditOpen={setIsEditWarehouseOpen}
          WarehouseRecord={selectedWarehouseData}
        />


        <ModalAddPlace
          isAddOpen={isAddPlaceOpen}
          setIsAddOpen={setIsAddPlaceOpen}
        />

        <ModalEditPlace
          isEditOpen={isEditPlaceOpen}
          setIsEditOpen={setIsEditPlaceOpen}
          PlaceRecord={selectedPlaceData}
        />
      </section>
    </>
  )
};

export default CompanyInfo;