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
} from "antd";
import NotificationAPI from "../../../components/NotificationAPI";
import axios from "axios";

const { Title } = Typography;
const ModalDetailFactory = ({ open, onClose, record, handleEditClick }) => {
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
    form
      .validateFields()
      .then(async () => {
        const formData = form.getFieldsValue();
        const formattedData = {
          F_ID: record.id, // หรือค่าอื่นที่เหมาะสม
          F_Code: formData.factoryCode,
          F_ShortCode: formData.factoryShortCode,
          F_Name: formData.factoryName,
          F_City: formData.factoryCity,
          F_Site: formData.factorySite,
          F_Address: formData.address,
          F_Tel: formData.tel,
          F_Email: formData.email,
          F_TaxID: formData.taxId,
          UA_IDCreateBy: formData.createBy, // หรือค่าอื่นที่เหมาะสม
          F_IsActive: formData.isActive,
          F_Remarks: formData.remark, // หรือค่าอื่นที่เหมาะสม
          C_IDCompany: formData.company, // หรือค่าอื่นที่เหมาะสม
        };
        // console.log(formattedData);

        const response = await axios.put(
          "http://192.168.195.45:3333/api/editFactory",
          formattedData
        );

        // console.log(response);

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
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        isEdit ? (
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>
        ) : (
          <Button key="edit" type="primary" onClick={() => setIsEdit(true)}>
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
              <Card bordered={true}>
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
                    <Form.Item name="isActive" label="Factory Active">
                      <Select disabled={isDisabled}>
                        <Select.Option value="true">Active</Select.Option>
                        <Select.Option value="false">Inactive</Select.Option>
                      </Select>
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
