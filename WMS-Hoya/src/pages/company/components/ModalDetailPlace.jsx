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
  Select,
  Switch,
} from "antd";
import NotificationAPI from "../../../components/NotificationAPI";
import axios from "axios";

const { Title } = Typography;
const ModalDetailPlace = ({ open, onClose, record, handleEdit }) => {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [openNotification, setOpenNotification] = useState(null);
  const [description, setDescription] = useState(null);
  const [isAutoStorage, setIsAutoStorage] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
      setIsAutoStorage(record.isAutoStorage);
      setIsActive(record.isActive);
    }
  }, [record, form]);

  useEffect(() => {
    if (open) {
      setIsEdit(false);
      setIsDisabled(true);
      if (handleEdit) {
        setIsEdit(true);
        setIsDisabled(false);
      }
    }
  }, [open]);

  useEffect(() => {
    if (isEdit) {
      setIsDisabled(false);
    }
  }, [isEdit]);

  const handleOk = async () => {
    form
      .validateFields()
      .then(async () => {
        const formData = form.getFieldsValue();
        const formattedData = {
          P_ID: record.id, // หรือค่าอื่นที่เหมาะสม
          P_Name: formData.placeName,
          P_Code: formData.placeCode,
          P_IsActive: formData.isActive,
          P_IsAutoStorage: formData.isAutoStorage,
          UA_Code: 1,
          UA_Fullname: "Admin",
        };
        console.log(formattedData);

        const response = await axios.put(
          "http://192.168.195.45:3333/api/editPlace",
          formattedData
        );

        console.log(response);

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

  const colLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <Modal
      title="Detail"
      open={open}
      onCancel={onClose}
      width={1100}
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
        <Form form={form} layout="horizontal" {...colLayout}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Place Details
                </Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="warehouseName" label="Warehouse Name">
                      <Input disabled={true} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="placeCode" label="Place Code">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="placeName" label="Place Name">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      name="isAutoStorage"
                      label="Is Auto Storage"
                      labelCol={{ span: 15 }}
                    >
                      <Switch
                        checked={isAutoStorage}
                        onChange={(value) => setIsAutoStorage(value)}
                        disabled={isDisabled}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="isActive" label="Is Active" labelCol={6}>
                      <Switch
                        checked={isActive}
                        onChange={(value) => setIsActive(value)}
                        disabled={isDisabled}
                      />
                    </Form.Item>
                  </Col>
                </Row>
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

export default ModalDetailPlace;
