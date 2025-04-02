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
  notification,
} from "antd";
import NotificationAPI from "../../../components/NotificationAPI";
import axios from "axios";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { confirm } = Modal;

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
    try {
      await form.validateFields();
      const formData = form.getFieldsValue();
      
      confirm({
        title: 'Confirm Changes',
        content: 'Are you sure you want to save these changes?',
        okText: 'Yes',
        cancelText: 'No',
        onOk: async () => {
          try {
            // Format data for API
            const apiData = {
              P_ID: record.id,
              W_IDWarehouse: 1, // Always include W_IDWarehouse as 1
              P_Code: formData.placeCode,
              P_Name: formData.placeName,
              P_Warehouse: formData.warehouseName,
              P_IsAutoStorage: isAutoStorage,
              P_IsActive: isActive,
              UA_IDUpdateBy: 1,
              UA_Code: "ADMIN",
              UA_Fullname: "Admin"
            };

            // Only include changed fields and required fields
            const finalData = {
              P_ID: record.id,
              W_IDWarehouse: 1 // Always include W_IDWarehouse as 1
            };
            
            // Add changed fields
            Object.keys(apiData).forEach(key => {
              if (apiData[key] !== finalData[key]) {
                finalData[key] = apiData[key];
              }
            });

            console.log("Sending update data:", finalData);

            const response = await axios.put(
              "http://localhost:3334/api/editPlace",
              finalData
            );

            notification.success({
              message: 'Success',
              description: 'Place details updated successfully. Page will refresh in 5 seconds.',
              placement: 'topRight',
              icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
              duration: 4,
            });

            // Close modal and reset form
            onClose();
            form.resetFields();
            setIsEdit(false);

            // Set timeout to refresh page after 5 seconds
            setTimeout(() => {
              window.location.reload();
            }, 5000);

          } catch (error) {
            console.error("Error saving data:", error);
            
            // Show error notification in top-right corner
            notification.error({
              message: 'Error',
              description: 'Failed to update place details',
              placement: 'topRight',
              icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
              duration: 4,
            });
          }
        },
        onCancel() {
          // Do nothing, just close the confirmation dialog
        },
      });
    } catch (errorInfo) {
      console.error("Validation Failed:", errorInfo);
      
      // Show validation error notification in top-right corner
      notification.error({
        message: 'Validation Error',
        description: 'Please check your input and try again',
        placement: 'topRight',
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
        duration: 4,
      });
    }
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
                      <Input disabled={isDisabled} />
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
