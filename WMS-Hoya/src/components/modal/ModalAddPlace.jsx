import { Modal, Form, Input, Divider, Row, Col, Switch } from "antd";
import { Factory, Plus } from "lucide-react";
import axios from "axios";
import NotificationAPI from "../NotificationAPI";

const ModalAddPlace = ({ isModalOpen, setIsModalOpen, addedPlace }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    form
      .validateFields()
      .then(async () => {
        const formData = form.getFieldsValue();

        const response = await axios.post(
          "http://192.168.195.45:3333/api/addPlace",
          formData
        );
        setIsModalOpen(false);
        addedPlace(true);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const renderFormItem = (
    label,
    name,
    placeholder,
    rules,
    Component = Input,
    props = {}
  ) => (
    <Form.Item label={label} name={name} rules={rules}>
      <Component placeholder={placeholder} {...props} />
    </Form.Item>
  );

  return (
    <Modal
      centered
      title={
        <>
          <Factory size={20} /> New Place
        </>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Plus size={16} /> Add Place
        </div>
      }
      width={900}
      style={{ padding: "20px 40px" }}
      destroyOnClose={false}
    >
      <Divider />
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          P_ID: "", // Replace with P_ID
          P_Code: "", // Replace with P_Code
          P_IsAutoStorage: true, // Replace with P_IsAutoStorage
          P_IsActive: true, // Replace with P_IsActive
          UA_IDCreateBy: 1, // Replace with UA_IDCreateBy
          P_Remarks: "", // Replace with P_Remarks
        }}
      >
        <Row gutter={[24, 12]}>
          <Col span={12}>
            {renderFormItem("Place Code", "P_Code", "Place Code", [
              { required: true, message: "Please input the P_Code!" },
            ])}
          </Col>
          <Col span={12}>
            {renderFormItem("Place Name", "P_Name", "Place Name", [
              { required: true, message: "Please input the P_Name!" },
            ])}
          </Col>
        </Row>

        <Row gutter={[24, 12]}>
          {/* <Col span={12}>
            {renderFormItem(
              "Place WarehouseID",
              "W_IDWarehouse",
              "Place WarehouseID",
              [{ required: true, message: "Please input the WarehouseID!" }]
            )}
          </Col> */}
          <Col span={12}>
            {renderFormItem("Remarks", "P_Remarks", "Remarks", [])}
          </Col>
          <Col span={6}>
            {renderFormItem(
              "Place IsAuto Storage",
              "P_IsAutoStorage",
              "Place IsAuto Storage",
              [],
              Switch
            )}
          </Col>
          <Col span={6}>
            {renderFormItem(
              "Place IsActive",
              "P_IsActive",
              "Place IsActive",
              [],
              Switch
            )}
          </Col>
        </Row>

        {/* <Row gutter={[24, 12]}>
          <Col span={6}>
            {renderFormItem(
              "Place IsAuto Storage",
              "P_IsAutoStorage",
              "Place IsAuto Storage",
              [],
              Switch
            )}
          </Col>
          <Col span={6}>
            {renderFormItem(
              "Place IsActive",
              "P_IsActive",
              "Place IsActive",
              [],
              Switch
            )}
          </Col>
        </Row> */}

        <Row gutter={[24, 12]}>
          <Col span={12} style={{ display: "none" }}>
            {renderFormItem("UA IdCreateBy", "UA_IDCreateBy", "UA IdCreateBy", [
              { required: true, message: "Please input the UA_IDCreateBy!" },
            ])}
          </Col>
        </Row>
      </Form>
      <Divider />
    </Modal>
  );
};

export default ModalAddPlace;
