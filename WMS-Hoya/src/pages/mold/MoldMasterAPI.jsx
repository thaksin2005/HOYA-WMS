import { useState, useEffect } from "react";
import Tables from "../../components/Tables";
import DropdownActionTable from "../../components/dropdown/DropdownActionTable";
import { Button, Input } from "antd";
import { Plus, Upload } from "lucide-react";
import ModalAddMoldMaster from "../../components/modal/ModalAddMoldMaster";
import ModalImport from "../../components/modal/ModalImport"; // Import ใหม่
import "../../styles/global.css";
import axios from "axios";
import { Spin } from "antd";
import DrawerDetailMoldMaster from "./components/DrawerDetailMoldMaster";
import NotificationAPI from "../../components/NotificationAPI";

const MoldMaster = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false); // State สำหรับ Import Modal
  const [openNotification, setOpenNotification] = useState(false);
  const [description, setDescription] = useState("");
  const [searchText, setSearchText] = useState("");
  const [moldMasterData, setMoldMasterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDrawerDetail, setOpenDrawerDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const onCloseDrawerDetail = () => {
    setOpenDrawerDetail(false);
  };

  const showModal = () => setIsModalOpen(true);
  const showImportModal = () => setIsImportModalOpen(true);

  const handleSearch = (e) => setSearchText(e.target.value);
  const handleDetailClick = (record) => {
    setSelectedRecord(record);
    setOpenDrawerDetail(true);
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      width: `${"No.".length * 14}px`,
      align: "center",
      fixed: "left",
    },
    {
      title: "Mold Code",
      dataIndex: "moldCode",
      width: `${"Mold Code".length * 10}px`,
      align: "center",
      fixed: "left",
    },
    {
      title: "Lens Name",
      dataIndex: "lensName",
      width: `${"Lens Name".length * 10}px`,
      fixed: "left",
    },
    {
      title: "Lens Type",
      dataIndex: "lensType",
      width: `${"Lens Type".length * 8}px`,
      filters: [
        { text: "SF", value: "SF" },
        { text: "FN", value: "FN" },
      ],
      onFilter: (value, record) => record.lensType.toString().includes(value),
    },
    {
      title: "Class",
      dataIndex: "class",
      width: `${"Class".length * 14}px`,
      align: "center",
      filters: [
        { text: "A", value: "A" },
        { text: "B", value: "B" },
        { text: "C", value: "C" },
      ],
      onFilter: (value, record) => record.class.toString().includes(value),
    },
    {
      title: "Up/Low Name",
      dataIndex: "upLowName",
      width: `${"Up/Low".length * 14}px`,
      filters: [
        { text: "UPP", value: "UPP" },
        { text: "LOW", value: "LOW" },
      ],
      onFilter: (value, record) => record.upLowName.toString().includes(value),
    },
    {
      title: "Diameter",
      dataIndex: "diameter",
      width: `${"Diameter".length * 10}px`,
    },
    {
      title: "Min-Max Stock",
      dataIndex: "minMaxStock",
      width: `${"Min-Max".length * 14}px`,
      align: "center",
    },
    {
      title: "More",
      dataIndex: "more",
      key: "more",
      render: (text, record) => (
        <DropdownActionTable
          onDetailClick={handleDetailClick}
          record={record}
        />
      ),
      width: `${"More".length * 14}px`,
      align: "center",
      fixed: "right",
    },
  ];

  const getMoldMaster = async () => {
    try {
      const response = await axios.get("/api/MoldMaster-requests");
      const data = response.data.map((item, index) => ({
        key: item.MM_ID,
        no: (index + 1).toString(),
        moldCode: item.MM_MoldCode,
        minMaxStock: `${item.MM_MinStock}-${item.MM_MaxStock}`,
        lensType: item.MM_LensTypeName,
        indexNo: item.MM_IndexNo,
        indexName: item.MM_IndexName,
        focusName: item.MM_FocusName,
        typeShortName: item.MM_TypeShortName,
        upLowName: item.MM_UpLowName,
        diameter: item.MM_DIANumber,
        lensName: item.MM_LensName,
        class: item.MM_Class,
        createAt:
          new Date(item.MM_CreateOn).toLocaleDateString("en-EN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }) +
          " " +
          new Date(item.MM_CreateOn).toLocaleTimeString("en-EN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }),
        more: <DropdownActionTable />,
        plantNumber: item.MM_PlantNumber,
        stockType: item.MM_StockType,
        focusType: item.MM_FocusType,
        typeNo: item.MM_TypeNo,
        upLowNo: item.MM_UpLowNo,
        sandBlast: item.MM_SandBlast,
        diaidama: item.MM_Diaidama,
        engMkNo: item.MM_EngMkNo,
        tagTitleNo: item.MM_TagTitleNo,
        create: item.MM_Create,
        update: item.MM_Update,
        moldDesign: item.MM_MoldDesign,
        moldActualDiameter: item.MM_MoldActualDiameter,
        moldSlideGuide: item.MM_MoldSlideGuide,
        moldAccountGroup: item.MM_MoldAccountGroup,
        moldInvoiceName: item.MM_MoldInvoiceName,
        sandblast1: item.MM_Sandblast1,
        sandblast2: item.MM_Sandblast2,
        sandblast3: item.MM_Sandblast3,
        engraveMark: item.MM_EngraveMark,
        svRadius: item.MM_SvRadius,
        svStepCut: item.MM_SvStepCut,
        svTapping: item.MM_SVTapping,
        r1: item.MM_R1,
        r2: item.MM_R2,
        ct: item.MM_CT,
        acid: item.MM_Acid,
        diaTolerance: item.MM_DiaTolerance,
        totalD1: item.MM_TotalD1,
        totalD2: item.MM_TotalD2,
        holderD1: item.MM_HolderD1,
        holderD2: item.MM_HolderD2,
        documentNo: item.MM_DocumentNo,
        svCode: item.MM_SVCode,
        itemNumber: item.MM_ItemNumber,
      }));
      setMoldMasterData(data);
    } catch (error) {
      // console.error("Error fetching mold master data:", error);
    }
  };

  useEffect(() => {
    getMoldMaster();
  }, []);

  // ตรวจสอบข้อมูลใหม่ทุกๆ 2 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(moldMasterData.length);

      if (moldMasterData.length > 0) {
        const checkNewData = async () => {
          const response = await axios.get("/api/MoldMaster-requests");

          const newData = response.data.filter(
            (item) => !moldMasterData.some((data) => data.key === item.MM_ID)
          );

          if (newData.length > 0) {
            getMoldMaster();
            console.log("New data is added " + newData.length + " record");
            setOpenNotification("info");
            setDescription("New data is added " + newData.length + " record");
          }
        };
        checkNewData();
      }
    }, 2000);

    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
  }, [moldMasterData]);

  // ตรวจสอบสถานะการโหลดข้อมูล
  useEffect(() => {
    if (moldMasterData.length === 0) {
      setLoading(true);
      setTimeout(() => setLoading(false), 100);
    }
  }, [moldMasterData]);

  const filteredDataSource = moldMasterData.filter((item) =>
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
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              type="primary"
              icon={<Plus size={16} />}
              onClick={showModal}
            >
              New Mold
            </Button>
            <Button
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: "none",
              }}
              icon={<Upload size={16} />}
              onClick={showImportModal}
            >
              Import
            </Button>
          </div>
          <ModalAddMoldMaster
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          <ModalImport
            isModalOpen={isImportModalOpen}
            setIsModalOpen={setIsImportModalOpen}
          />
        </div>
        <div className="table-content">
          <Spin spinning={loading}>
            <Tables
              columns={columns}
              dataSource={filteredDataSource}
              scrollY={0.6}
              scrollX={"max-content"}
              bordered={true}
            />
          </Spin>
        </div>
      </div>

      <section>
        <NotificationAPI
          openNotification={openNotification}
          description={description}
        />
        <DrawerDetailMoldMaster
          open={openDrawerDetail}
          onClose={onCloseDrawerDetail}
          record={selectedRecord}
        />
      </section>
    </>
  );
};

export default MoldMaster;
