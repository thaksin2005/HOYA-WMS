import React from "react";
import Tables from "../../components/Tables";
import { Button, Input } from "antd";
import { FilePlus2, FilePen } from "lucide-react"
import "../../styles/global.css";

const Permission = () => {

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

          <Button icon={<FilePlus2 size={18} />} style={{width:"100px"}}>
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
    </>
  );
};

export default Permission;
 