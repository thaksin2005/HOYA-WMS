import { Modal, Form, Input, Divider, Upload, Button } from "antd";
import { Upload as LucideUpload, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";
import Tables from "../Tables";

const ModalImportMoldMaster = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ fileList }) => {
    console.log("Uploaded Files:", fileList);
    setFileList(fileList);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (fileList.length === 0) {
          message.error("Please upload a file!");
          return;
        }
        console.log("Form Values:", values);
        console.log("Uploaded File List:", fileList);
        setIsModalOpen(false);
        form.resetFields();
        setFileList([]);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
  };

  const columns = [
    // {
    //   title: "Warehouse ID",
    //   dataIndex: "WarehouseID",
    // },
    // {
    //   title: "Place ID",
    //   dataIndex: "PlaceID",
    // },
    // {
    //   title: "Mold ID",
    //   dataIndex: "MoldID",
    // },
    // {
    //   title: "Mold Name",
    //   dataIndex: "MoldName",
    // },
    // {
    //   title: "Mold Type",
    //   dataIndex: "MoldType",
    // },
    // {
    //   title: "Mold Size",
    //   dataIndex: "MoldSize",
    // },
  ];

  const dataSource = [
    {
      WarehouseID: "1",
      PlaceID: "1",
      MoldID: "1",
      MoldName: "-200",
      MoldType: "0",
      MoldSize: "55mm",
    },
  ];

  return (
    <Modal
      centered
      title={
        <>
          <LucideUpload size={16} /> Import Mold Master{" "}
        </>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <CheckCircle size={16} /> Import Data
        </div>
      }
      width="760px" // เพิ่มความกว้าง 15% (จาก 400px เป็น 460px)
      height={`calc(100vh - 300px)`}
      destroyOnClose={false}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          disabled={fileList.length === 0}
        >
          Import Data
        </Button>,
      ]}
    >
      <Divider />
      <Form form={form} layout="vertical">
        {/* Input Warehouse ID */}
        {/* <Form.Item
          label="Warehouse ID"
          name="WarehouseID"
          rules={[{ required: true, message: "Please input Warehouse ID!" }]}
        >
          <Input placeholder="Enter Warehouse ID" />
        </Form.Item> */}

        {/* Input Point ID */}
        {/* <Form.Item
          label="Place ID"
          name="PlaceID"
          rules={[{ required: true, message: "Please input Place ID!" }]}
        >
          <Input placeholder="Enter Place ID" />
        </Form.Item> */}

        {/* Upload File Excel */}
        <Form.Item
          label="Upload File"
          name="FileUpload"
          rules={[{ required: true, message: "Please upload a file!" }]}
        >
          <Upload.Dragger
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleFileChange}
            accept=".xlsx,.csv"
            onRemove={() => setFileList([])}
          >
            <p>
              <FileText size={16} /> Click or drag to upload!
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
      <Divider />
      <Tables columns={columns} dataSource={dataSource} pagination={"close"} />
    </Modal>
  );
};

export default ModalImportMoldMaster;
