import React from "react";
import { Button } from "antd";
const ActionFooterTable = ({ handleReset }) => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Button type="primary">Save</Button>
      <Button
        type="default"
        onClick={() => {
          handleReset();
        }}
      >
        Reset
      </Button>
    </div>
  );
};

export default ActionFooterTable;
