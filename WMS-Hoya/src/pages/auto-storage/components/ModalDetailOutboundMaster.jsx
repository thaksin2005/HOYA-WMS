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
const ModalDetailOutboundMaster = ({ open, onClose, record }) => {
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
      title="Outbound Detail"
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
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card bordered={true} style={{ height: '100%' }}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Basic Information
                </Title>
                <Form.Item name="OutboundNumber" label="Outbound No.">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="OutboundJobNumber" label="Job No.">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="OutboundStatus" label="Status">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="CreateDateTime" label="Create Date Time">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
              </Card>
            </Col>

            <Col span={8}>
              <Card bordered={true} style={{ height: '100%' }}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Factory & Location
                </Title>
                <Form.Item name="FactoryName" label="Factory">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="WarehouseName" label="Warehouse">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="PlaceName" label="Place">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="Warehouse" label="Storage">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
              </Card>
            </Col>

            <Col span={8}>
              <Card bordered={true} style={{ height: '100%' }}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Production Details
                </Title>
                <Form.Item name="ProductionOrder" label="Production Order">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="EndItemName" label="Item Name">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="CastOvenNo" label="Cast Oven No.">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="LotNo" label="Lot No.">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
              </Card>
            </Col>

            <Col span={8}>
              <Card bordered={true} style={{ height: '100%' }}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Upper Mold
                </Title>
                <Form.Item name="MoldUpper" label="Mold Code">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="MoldUpperName" label="Mold Name">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="MoldSerialUPP" label="Serial">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="LocationUPP" label="Location">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
              </Card>
            </Col>

            <Col span={8}>
              <Card bordered={true} style={{ height: '100%' }}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Lower Mold
                </Title>
                <Form.Item name="MoldLower" label="Mold Code">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="MoldLowerName" label="Mold Name">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="MoldSerialLOW" label="Serial">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="LocationLOW" label="Location">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
              </Card>
            </Col>

            <Col span={8}>
              <Card bordered={true} style={{ height: '100%' }}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Process Information
                </Title>
                <Form.Item name="CurrentProcessName" label="Current Process">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="CurrentProcessDateTime" label="Process DateTime">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="RouteID" label="Route ID">
                  <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                </Form.Item>
                <Form.Item name="OutboundItemStatus" label="Status">
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

export default ModalDetailOutboundMaster;
