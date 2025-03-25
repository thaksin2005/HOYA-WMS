import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Divider,
  Row,
  Col,
  Upload,
  Button,
  Flex,
  Space,
  message,
  Table,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Upload as LucideUpload, FileText, CheckCircle } from "lucide-react";

const ModalImportExcel = ({ isModalOpen, setIsModalOpen }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
    setUploadedFile(false);
    setMessageUploaded("");
    setFileList([]);
  };

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(false);
  const [messageUploaded, setMessageUploaded] = useState("");

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const importExcel = (file) => {
    console.log(file);
    setUploadedFile(true);
    setMessageUploaded("File uploaded");
    setFileList([]);
  };

  return (
    <>
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <LucideUpload size={20} />
            Import From Excel
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Flex justify="center" align="center" gap={16} vertical>
          <Space
            direction="vertical"
            style={{
              width: "100%",
              marginTop: "20px",
            }}
            size="large"
          >
            <Upload
              action={importExcel}
              listType="file"
              maxCount={1}
              fileList={fileList}
              onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Upload File</Button>
            </Upload>
          </Space>
          {uploadedFile && <p>{messageUploaded}</p>}
          {uploadedFile && (
            <Button type="primary" onClick={handleCancel}>
              Done
            </Button>
          )}
        </Flex>
      </Modal>
    </>
  );
};
export default ModalImportExcel;
