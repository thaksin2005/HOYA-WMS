import React, { useState, useEffect } from "react";
import {
  Drawer,
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
const DrawerDetail = ({ open, onClose, record }) => {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [openNotification, setOpenNotification] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
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
    <Drawer
      title="Inbound Detail"
      open={open}
      onClose={onClose}
      placement="bottom"
      closable={false}
      height={600}
      extra={
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
            <Col span={6}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Job Details
                </Title>
                <Form.Item name="jobNo" label="Job No.">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="lotNo" label="Lot No.">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="moldCode" label="Mold Code">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="moldSerial" label="Mold Serial">
                  <Input disabled={isDisabled} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Location Details
                </Title>
                <Form.Item name="plantNo" label="Plant No.">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="stockType" label="Stock Type">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="placeNo" label="Place No.">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="transactionCD" label="Transaction CD">
                  <Input disabled={isDisabled} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Status & Quantity
                </Title>
                <Form.Item name="createAt" label="Create At">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="updateAt" label="Update At">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="status" label="Status">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="qty" label="Quantity">
                  <Input disabled={isDisabled} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Additional Info
                </Title>
                <Form.Item name="programID" label="Program ID">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="empNo" label="Employee No.">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="workstationNo" label="Workstation No.">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="sndrcvPlantNo"
                  label="Sender/Receiver Plant No."
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="sndrcvStockType"
                  label="Sender/Receiver Stock Type"
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="sndrcvPlaceNo"
                  label="Sender/Receiver Place No."
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  name="sndrcvTransactionCD"
                  label="Sender/Receiver Transaction CD"
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="reworkCount" label="Rework Count">
                  <Input disabled={isDisabled} />
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>
      ) : (
        <div>No data</div>
      )}
    </Drawer>
  );
};

export default DrawerDetail;
