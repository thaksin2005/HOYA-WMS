import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Space,
  Row,
  Col,
  Card,
  Typography,
} from "antd";
import NotificationAPI from "../../../components/NotificationAPI";

const { Title } = Typography;
const ModalDetail = ({ open, onClose, record }) => {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [openNotification, setOpenNotification] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    if (record) {
      const { id, key, no, ...filteredRecord } = record;
      form.setFieldsValue(filteredRecord);
    }
  }, [record, form]);

  useEffect(() => {
    if (open) {
      setIsEdit(false);
      setIsDisabled(true);
    }
  }, [open]);

  useEffect(() => {
    if (isEdit) {
      setIsDisabled(false);
    }
  }, [isEdit]);

  const handleOk = () => {
    form
      .validateFields()
      .then(() => {
        console.log(form.getFieldsValue());

        setOpenNotification("success");
        setDescription("Data has been successfully saved.");

        onClose();
        form.resetFields();
        setIsEdit(false);
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);

        setOpenNotification("error");
        setDescription("There was an error processing your request.");
      });
  };

  return (
    <Modal
      title="Inbound Detail"
      open={open}
      onCancel={onClose}
      width={1200}
      footer={
        <Space>
          <Button onClick={onClose}>Close</Button>
          {isEdit ? (
            <Button type="primary" onClick={handleOk} disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
              OK
            </Button>
          ) : (
            <Button type="primary" onClick={() => setIsEdit(true)} disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
              Edit
            </Button>
          )}
        </Space>
      

      }
    >
      <NotificationAPI
        openNotification={openNotification}
        description={description}
      />
      {open ? (
        <Form form={form} layout="vertical">
          <Row gutter={24}>
            <Col span={8}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  General Details
                </Title>
                <Form.Item name="InboundNo" label="Inbound No.">
                <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="JobNumber" label="Job Number">
                <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="Status" label="Status">
                <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="FactoryName" label="Factory Name">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Location Details
                </Title>
                <Form.Item name="WarehouseName" label="Warehouse Name">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="PlantName" label="Plant Name">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="InterfaceFile" label="Interface File">
                    <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  User Information
                </Title>
                <Form.Item name="UserCode" label="User Code">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="UserFullName" label="User Name">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: " normal" }} />
                </Form.Item>
                <Form.Item name="RecordOn" label="Record On">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>
      ) : (
        <div>No data</div>
      )}
    </Modal>
  );
};

export default ModalDetail;
