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
      title="Outbound Master Detail"
      open={open}
      onCancel={onClose}
      width={1200}
      footer={
        <Space>
          <Button onClick={onClose}>Close</Button>
          {isEdit ? (
            <Button type="primary" onClick={handleOk}>
              OK
            </Button>
          ) : (
            <Button type="primary" onClick={() => setIsEdit(true)}>
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
                <Form.Item
                  name="OR_IDOutboundRequest"
                  label="Outbound Request ID"
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="ORI_IDOutboundRequestItem"
                  label="Outbound Request Item ID"
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="ORI_CastOvenNo" label="Cast Oven No.">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="CreateDateTime" label="Create Date Time">
                  <Input disabled={isDisabled} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Production Details
                </Title>
                <Form.Item name="TrayNumberUPP" label="Tray Number UPP">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="LocationUPP" label="Location UPP">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="MoldSerialUPP" label="Mold Serial UPP">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="ProductionOrder" label="Production Order">
                  <Input disabled={isDisabled} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Mold Information
                </Title>
                <Form.Item name="MoldUpper" label="Mold Upper">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="TaskStatus" label="Task Status">
                  <Input disabled={isDisabled} />
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
