import React, { useEffect, useState } from "react";
import Tables from "../../components/Tables";
import DropdownActionTable from "../../components/dropdown/DropdownActionTable";
import { Button, Input, message, ConfigProvider } from "antd";
import { Plus, Edit, RefreshCw } from "lucide-react";
import ModalAddFactory from "../../components/modal/ModalAddFactory";
import "../../styles/global.css";
import calculateColumnWidth from "../../function/CalcWidth";
import axios from "axios";
import filters from "../../function/FilterTable";
import ModalDetailFactory from "./components/ModalDetailFactory";
import handleDelete from "../../function/HandleDelete";

const Factory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [handleEdit, setHandleEdit] = useState(false);

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

  const onCloseModalDetail = () => {
    setOpenModalDetail(false);
    setHandleEdit(false);
  };

  const handleDetailClick = (record) => {
    setSelectedRecord(record);
    setOpenModalDetail(true);
  };

  const handleEditClick = (record) => {
    setSelectedRecord(record);
    setOpenModalDetail(true);
    setHandleEdit(true);
  };

  const handleReset = () => {
    setSelectedRowKeys([]);
  };

  const handleDeleteClick = async (record) => {
    const target = "deleteFactory";
    const result = await handleDelete(record.id, target);
    messageApi.open({
      type: result.messageType,
      content: result.messageText,
      duration: 3,
    });
    getFactoryData();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // console.log(filters(dataSource, "factoryCode"));
  //"http://192.168.0.122:1234/api/FactoryDetail-requests"

  const getFactoryData = async () => {
    const response = await axios.get(
      "http://localhost:1234/api/FactoryDetail-requests"
    );
    const data = response.data.map((item, index) => ({
      no: index + 1,
      id: item.F_ID,
      key: index + 1,
      factoryCode: item.F_Code,
      factoryShortCode: item.F_ShortCode,
      factoryName: item.F_Name,
      factoryCity: item.F_City,
      factorySite: item.F_Site,
      createdOn: new Date(item.F_CreateOn).toLocaleString("en-GB", {
        timeZone: "Asia/Bangkok",
      }),
      createBy: item.UA_IDCreateBy,
      isActive: item.F_IsActive == true ? "true" : "false",
      remark: item.F_Remarks,
      company: item.C_IDCompany,
      address: item.F_Address,
      tel: item.F_Tel,
      email: item.F_Email,
      taxId: item.F_TaxID,
    }));
    setDataSource(data);
    // console.log(dataSource);
  };

  useEffect(() => {
    getFactoryData();

    const intervalId = setInterval(() => {
      getFactoryData();
    }, 5000); // เรียกใช้งานทุกๆ 5 วินาที

    return () => clearInterval(intervalId); // ล้าง interval เมื่อ component ถูก unmount
  }, []);

  const columns = [
    {
      title: "#",
      width: "30px",
      dataIndex: "no",
      align: "center",
    },
    {
      title: "Code",
      dataIndex: "factoryCode",
      width: calculateColumnWidth("Factory Code"),
      filters: filters(dataSource, "factoryCode"),
      sorter: (a, b) => a.factoryCode.localeCompare(b.factoryCode),
      onFilter: (value, record) => record.factoryCode.includes(value),
      filterSearch: true,
    },
    {
      title: "Short Code",
      dataIndex: "factoryShortCode",
      width: calculateColumnWidth("Factory Short Code"),
      filters: filters(dataSource, "factoryShortCode"),
      sorter: (a, b) => a.factoryShortCode.localeCompare(b.factoryShortCode),
      onFilter: (value, record) => record.factoryShortCode.includes(value),
      filterSearch: true,
    },

    {
      title: "Name",
      dataIndex: "factoryName",
      width: calculateColumnWidth("Factory Name"),
      filters: filters(dataSource, "factoryName"),
      sorter: (a, b) => a.factoryName.localeCompare(b.factoryName),
      onFilter: (value, record) => record.factoryName.includes(value),
      filterSearch: true,
    },
    {
      title: "City",
      dataIndex: "factoryCity",
      width: calculateColumnWidth("Factory City"),
      filters: filters(dataSource, "factoryCity"),
      sorter: (a, b) => a.factoryCity.localeCompare(b.factoryCity),
      onFilter: (value, record) => record.factoryCity.includes(value),
      filterSearch: true,
    },
    {
      title: "Site",
      dataIndex: "factorySite",
      width: calculateColumnWidth("Factory Site"),
      filters: filters(dataSource, "factorySite"),
      sorter: (a, b) => a.factorySite.localeCompare(b.factorySite),
      onFilter: (value, record) => record.factorySite.includes(value),
      filterSearch: true,
    },

    {
      title: "Created On",
      dataIndex: "createdOn",
      width: calculateColumnWidth("Created On"),
      filters: filters(dataSource, "createdOn"),
      sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
      onFilter: (value, record) => record.createdOn.includes(value),
      filterSearch: true,
      align: "center",
    },

    {
      title: "Create By",
      dataIndex: "createBy",
      width: calculateColumnWidth("Create By"),
      render: (text) => (text === 1 ? "Administrator" : text),
      align: "center",
    },
    {
      title: "More",
      dataIndex: "action",
      width: "50px",
      align: "center",
      render: (text, record) => (
        <DropdownActionTable
          onDetailClick={() => handleDetailClick(record)}
          record={record}
          onDeleteClick={() => handleDeleteClick(record)}
        />
      ),
    },
  ];

  const filteredDataSource = dataSource
    .map((item, index) => ({
      ...item,
      key: index + 1, // เพิ่มลำดับ ID โดยเริ่มที่ 1
    }))
    .map((item) =>
      Object.keys(item).reduce((acc, key) => {
        acc[key] = item[key] === null ? "" : item[key];
        return acc;
      }, {})
    )
    .filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );

  return (
    <>
      {contextHolder}
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
              New Factory
            </Button>
          </div>
          <ModalAddFactory
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
            rowSelection={rowSelection}
          />
        </div>
      </div>
      <ModalDetailFactory
        open={openModalDetail}
        onClose={onCloseModalDetail}
        record={selectedRecord}
        handleEditClick={handleEdit}
      />
    </>
  );
};

export default Factory;






// import React, { useEffect, useState } from "react";
// import Tables from "../../components/Tables";
// import DropdownActionTable from "../../components/dropdown/DropdownActionTable";
// import { Button, Input, message, Checkbox } from "antd";
// import { Plus } from "lucide-react";
// import ModalAddFactory from "../../components/modal/ModalAddFactory";
// import "../../styles/global.css";
// import calculateColumnWidth from "../../function/CalcWidth";
// import axios from "axios";
// import filters from "../../function/FilterTable";
// import DrawerDetailFactory from "./components/DrawerDetailFactory";
// import Delete from "../../function/Delete";

// const Factory = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [dataSource, setDataSource] = useState([]);
//   const [openDrawerDetail, setOpenDrawerDetail] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);
//   const [messageApi, contextHolder] = message.useMessage();
//   const [selectedRows, setSelectedRows] = useState([]);

//   const onCloseDrawerDetail = () => {
//     setOpenDrawerDetail(false);
//   };

//   const handleDetailClick = (record) => {
//     setSelectedRecord(record);
//     setOpenDrawerDetail(true);
//   };

//   const handleDeleteClick = async (record) => {
//     const target = "deleteFactory";
//     const result = await Delete(record.id, target);
//     messageApi.open({
//       type: result.messageType,
//       content: result.messageText,
//       duration: 3,
//     });
//     getFactoryData();
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleSearch = (e) => {
//     setSearchText(e.target.value);
//   };

//   const getFactoryData = async () => {
//     const response = await axios.get(
//       "http://localhost:1234/api/FactoryDetail-requests"
//     );
//     const data = response.data.map((item, index) => ({
//       no: index + 1,
//       id: item.F_ID,
//       key: item.F_ID,
//       factoryCode: item.F_Code,
//       factoryShortCode: item.F_ShortCode,
//       factoryName: item.F_Name,
//       factoryCity: item.F_City,
//       factorySite: item.F_Site,
//       createdOn: new Date(item.F_CreateOn).toLocaleString("en-GB", {
//         timeZone: "Asia/Bangkok",
//       }),
//       createBy: item.UA_IDCreateBy,
//       isActive: item.F_IsActive == true ? "true" : "false",
//       remark: item.F_Remarks,
//       company: item.C_IDCompany,
//       address: item.F_Address,
//       tel: item.F_Tel,
//       email: item.F_Email,
//       taxId: item.F_TaxID,
//     }));
//     setDataSource(data);
//   };

//   useEffect(() => {
//     getFactoryData();

//     const intervalId = setInterval(() => {
//       getFactoryData();
//     }, 5000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const columns = [
//     {
//       title: "🗸",
//       dataIndex: "select",
//       key: "select",
//       width: "30px",
//       align: "center",
//       render: (text, record) => (
//         <Checkbox
//           checked={selectedRows.includes(record.key)}
//           onChange={(e) => {
//             const checked = e.target.checked;
//             setSelectedRows(
//               checked
//                 ? [...selectedRows, record.key]
//                 : selectedRows.filter((key) => key !== record.key)
//             );
//           }}
//         />
//       ),
//     },
//     {
//       title: "No.",
//       width: "30px",
//       dataIndex: "no",
//       align: "center",
//     },
//     {
//       title: "Factory Code",
//       dataIndex: "factoryCode",
//       width: calculateColumnWidth("Factory Code"),
//       filters: filters(dataSource, "factoryCode"),
//       sorter: (a, b) => a.factoryCode.localeCompare(b.factoryCode),
//       onFilter: (value, record) => record.factoryCode.includes(value),
//       filterSearch: true,
//     },
//     {
//       title: "Factory Short Code",
//       dataIndex: "factoryShortCode",
//       width: calculateColumnWidth("Factory Short Code"),
//       filters: filters(dataSource, "factoryShortCode"),
//       sorter: (a, b) => a.factoryShortCode.localeCompare(b.factoryShortCode),
//       onFilter: (value, record) => record.factoryShortCode.includes(value),
//       filterSearch: true,
//     },
//     {
//       title: "Factory Name",
//       dataIndex: "factoryName",
//       width: calculateColumnWidth("Factory Name"),
//       filters: filters(dataSource, "factoryName"),
//       sorter: (a, b) => a.factoryName.localeCompare(b.factoryName),
//       onFilter: (value, record) => record.factoryName.includes(value),
//       filterSearch: true,
//     },
//     {
//       title: "Factory City",
//       dataIndex: "factoryCity",
//       width: calculateColumnWidth("Factory City"),
//       filters: filters(dataSource, "factoryCity"),
//       sorter: (a, b) => a.factoryCity.localeCompare(b.factoryCity),
//       onFilter: (value, record) => record.factoryCity.includes(value),
//       filterSearch: true,
//     },
//     {
//       title: "Factory Site",
//       dataIndex: "factorySite",
//       width: calculateColumnWidth("Factory Site"),
//       filters: filters(dataSource, "factorySite"),
//       sorter: (a, b) => a.factorySite.localeCompare(b.factorySite),
//       onFilter: (value, record) => record.factorySite.includes(value),
//       filterSearch: true,
//       align: "center",
//     },
//     {
//       title: "Created On",
//       dataIndex: "createdOn",
//       width: calculateColumnWidth("Created On"),
//       filters: filters(dataSource, "createdOn"),
//       sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
//       onFilter: (value, record) => record.createdOn.includes(value),
//       filterSearch: true,
//       align: "center",
//     },
//     {
//       title: "Create By",
//       dataIndex: "createBy",
//       width: calculateColumnWidth("Create By"),
//       render: (text) => (text === "1" ? "Administrator" : text),
//       align: "center",
//     },
//     {
//       title: "More",
//       dataIndex: "action",
//       width: "40px",
//       align: "center",
//       render: (text, record) => (
//         <DropdownActionTable
//           onDetailClick={() => handleDetailClick(record)}
//           record={record}
//           onDeleteClick={() => handleDeleteClick(record)}
//         />
//       ),
//     },
//   ];

//   const filteredDataSource = dataSource
//     .map((item) =>
//       Object.keys(item).reduce((acc, key) => {
//         acc[key] = item[key] === null ? "" : item[key];
//         return acc;
//       }, {})
//     )
//     .filter((item) =>
//       Object.values(item).some((value) =>
//         value.toString().toLowerCase().includes(searchText.toLowerCase())
//       )
//     );

//   return (
//     <>
//       {contextHolder}
//       <div className="table-container">
//         <div className="table-header2">
//           <Input
//             placeholder="Search"
//             style={{ width: "300px" }}
//             value={searchText}
//             onChange={handleSearch}
//           />
//           <Button
//             type="primary"
//             icon={<Plus size={16} />}
//             onClick={showModal}
//             style={{ display: "flex", alignItems: "center", gap: "6px" }}
//           >
//             New Factory
//           </Button>
//           <ModalAddFactory
//             isModalOpen={isModalOpen}
//             setIsModalOpen={setIsModalOpen}
//           />

//           {/* <ActionHeaderTable AddButton={showModal} /> */}
//         </div>
//         <div className="table-content">
//           <Tables
//             columns={columns}
//             dataSource={filteredDataSource}
//             scrollY={0.5}
//             bordered={true}
//           />
//         </div>
//       </div>
//       <DrawerDetailFactory
//         open={openDrawerDetail}
//         onClose={onCloseDrawerDetail}
//         record={selectedRecord}
//       />
//     </>
//   );
// };

// export default Factory;
