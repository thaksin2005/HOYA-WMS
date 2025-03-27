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

const ModalDetailFactory = ({ open, onClose, record, handleEditClick }) => {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [openNotification, setOpenNotification] = useState(null);
  const [description, setDescription] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchFactoryDetails = async (factoryId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3334/api/getFactory/${factoryId}`);
      
      if (response.data) {
        const factoryData = {
          factoryCode: response.data.F_Code,
          factoryShortCode: response.data.F_ShortCode,
          factoryName: response.data.F_Name,
          factoryCity: response.data.F_City,
          factorySite: response.data.F_Site,
          address: response.data.F_Address,
          tel: response.data.F_Tel,
          email: response.data.F_Email,
          taxId: response.data.F_TaxID,
          isActive: response.data.F_IsActive,
          remark: response.data.F_Remarks,
          company: response.data.C_IDCompany,
          createdOn: response.data.F_CreateOn,
          createBy: response.data.UA_IDCreateBy
        };

        form.setFieldsValue(factoryData);
        setIsActive(response.data.F_IsActive);
      }
    } catch (error) {
      console.error("Error fetching factory details:", error);
      notification.error({
        message: 'Error',
        description: 'Failed to fetch factory details',
        placement: 'topRight',
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
        duration: 4,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && record?.id) {
      fetchFactoryDetails(record.id);
    }
  }, [open, record]);

  useEffect(() => {
    if (open) {
      setIsEdit(false);
      setIsDisabled(true);
      if (handleEditClick) {
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
      
      // Confirm Edit //
      confirm({
        title: 'Confirm Changes',
        content: 'Are you sure you want to save these changes?',
        okText: 'Yes',
        cancelText: 'No',
        onOk: async () => {
          try {
            const formattedData = {
              F_ID: record.id,
              F_Code: formData.factoryCode,
              F_ShortCode: formData.factoryShortCode,
              F_Name: formData.factoryName,
              F_City: formData.factoryCity,
              F_Site: formData.factorySite,
              F_Address: formData.address,
              F_Tel: formData.tel,
              F_Email: formData.email,
              F_TaxID: formData.taxId,
              UA_IDCreateBy: formData.createBy,
              F_IsActive: isActive,
              F_Remarks: formData.remark,
              C_IDCompany: formData.company,
            };
            const response = await axios.put(
              "http://localhost:3334/api/editFactory",
              formattedData
            );

            // Show success notification in top-right corner
            notification.success({
              message: 'Success',
              description: 'Factory details updated successfully',
              placement: 'topRight',
              icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
              duration: 4,
            });

            onClose();
            form.resetFields();
            setIsEdit(false);

            // Refresh page after 5 seconds
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          } catch (error) {
            console.error("Error saving data:", error);
            setOpenNotification("error");
            setDescription("There was an error saving your changes.");
            
            // Show error notification in top-right corner
            notification.error({
              message: 'Error',
              description: 'Failed to update factory details',
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
      setOpenNotification("error");
      setDescription("Please check your input and try again.");
      
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
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        isEdit ? (
          <Button key="ok" type="primary" onClick={handleOk} loading={loading}>
            OK
          </Button>
        ) : (
          <Button key="edit" type="primary" onClick={() => setIsEdit(true)} loading={loading}>
            Edit
          </Button>
        ),
      ]}
    >
      <NotificationAPI
        openNotification={openNotification}
        description={description}
      />
      {open ? (
        <Form form={form} layout="horizontal" {...colLayout}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card bordered={true} loading={loading}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Factory Details
                </Title>
                <Row gutter={16}>
                  <Col span={10}>
                    <Form.Item name="factoryCode" label="Factory Code">
                      <Input disabled={true} />
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item
                      name="factoryShortCode"
                      label="Factory Short Code"
                    >
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={10}>
                    <Form.Item name="factoryName" label="Factory Name">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item name="factoryCity" label="Factory City">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={10}>
                    <Form.Item name="factorySite" label="Factory Site">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item name="createdOn" label="Factory Created On">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={10}>
                    <Form.Item 
                      name="isActive" 
                      label="Factory Active"
                      valuePropName="checked"
                    >
                      <Switch
                        checked={isActive}
                        onChange={(checked) => setIsActive(checked)}
                        disabled={isDisabled}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item name="address" label="Factory Address">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={10}>
                    <Form.Item name="tel" label="Factory Tel">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item name="email" label="Factory Email">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={10}>
                    <Form.Item name="taxId" label="Factory Tax ID">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item name="remark" label="Factory Remarks">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={10}>
                    <Form.Item name="company" label="ID Company">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item name="createBy" label="Create By">
                      <Input disabled={isDisabled} />
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

export default ModalDetailFactory;
