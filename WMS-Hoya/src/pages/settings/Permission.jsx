import React,{useState, useEffect} from "react";
import Tables from "../../components/Tables";
import { Button, Input, Switch, Modal } from "antd";
import { FilePlus2, FilePen } from "lucide-react"
import "../../styles/global.css";
import ModalDetailPermission from "./components/ModalDetailPermission";
import ModalDetailLocation from "./components/ModalDetailLocation";

const Permission = () => {

  const[isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () =>{
    setIsModalOpen(true);
  }

  const Tablecolumns = [
    {
      title: "Code",
      dataIndex: "UP_Code"
    },
    {
      title: "Description",
      dataIndex: "UP_Description"
    },
    {
      title: "Remarks",
      dataIndex: "UP_Remark"
    },
    {
      title: "IsActive",
      dataIndex: "UP_IsActive"
    }
  ]

  return (
    <>
      <div className="table-container">

        <div className="table-menu">

          <Button icon={<FilePlus2 size={18} />} style={{width:"100px"}} onClick={openModal} >
            Add
          </Button>
          
          <Button icon={<FilePen size={18} />} style={{width:"100px"}}>
            Edit
          </Button>
          
        </div>

        <div className="table-content">
          <Tables columns={Tablecolumns}></Tables>
        </div>

      </div>

      <section>
        <ModalDetailPermission
        isModalOpen = {isModalOpen}
        setIsModalOpen = {setIsModalOpen}
        />
      </section>
    </>
  );
};

export default Permission;
 