import { Modal, Form, Input, Divider, Row, Col, DatePicker, Switch } from "antd";
import { Factory, Plus } from "lucide-react";
import dayjs from "dayjs";

const ModalAddFactory = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form Values:", values);
        setIsModalOpen(false);
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

  const renderFormItem = (label, name, placeholder, rules, Component = Input, props = {}) => (
    <Form.Item label={label} name={name} rules={rules}>
      <Component placeholder={placeholder} {...props} />
    </Form.Item>
  );

  return (
    <Modal
      centered
      title={
        <>
          <Factory size={20} /> New Factory
        </>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Plus size={16} /> Add Factory
        </div>
      }
      width={900}
      bodyStyle={{ padding: "20px 40px" }}
      destroyOnClose={false}
    >
      <Divider />
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          WMSL_ID: "",
          W_IDWarehouse: "",
          W_Code: "",
          W_Name: "",
          MM_IDMoldMaster: "",
          MM_MoldCode: "",
          WMSL_MaxStock: "",
          MHP_CreateOn: dayjs(),  // Set initial value to current date and time
          MHP_UpdateOn: dayjs(),  // Set initial value to current date and time
        }}
      >
        <Row gutter={[24, 12]}>
          <Col span={12}>
            {renderFormItem("WMSL ID", "WMSL_ID", "WMSL ID", [
              { required: true, message: "Please input the WMSL ID!" },
            ])}
          </Col>
          <Col span={12}>
            {renderFormItem("Warehouse ID", "W_IDWarehouse", "Warehouse ID", [
              { required: true, message: "Please input the Warehouse ID!" },
            ])}
          </Col>
        </Row>

        <Row gutter={[24, 12]}>
          <Col span={12}>
            {renderFormItem("Warehouse Code", "W_Code", "Warehouse Code", [
              { required: true, message: "Please input the Warehouse Code!" },
            ])}
          </Col>
          <Col span={12}>
            {renderFormItem("Warehouse Name", "W_Name", "Warehouse Name", [
              { required: true, message: "Please input the Warehouse Name!" },
            ])}
          </Col>
        </Row>

        <Row gutter={[24, 12]}>
          <Col span={12}>
            {renderFormItem("Mold Master ID", "MM_IDMoldMaster", "Mold Master ID", [
              { required: true, message: "Please input the Mold Master ID!" },
            ])}
          </Col>
          <Col span={12}>
            {renderFormItem("Mold Code", "MM_MoldCode", "Mold Code", [
              { required: true, message: "Please input the Mold Code!" },
            ])}
          </Col>
        </Row>

        <Row gutter={[24, 12]}>
          <Col span={12}>
            {renderFormItem("Max Stock", "WMSL_MaxStock", "Max Stock", [
              { required: true, message: "Please input the Max Stock!" },
            ])}
          </Col>
        </Row>

        <Row gutter={[24, 12]}>
          <Col span={12}>
            {renderFormItem("Created On", "MHP_CreateOn", "Created On", [], DatePicker, {
              format: "YYYY-MM-DD HH:mm:ss",
              disabled: true,
              showTime: true,
            })}
          </Col>
          <Col span={12}>
            {renderFormItem("Updated On", "MHP_UpdateOn", "Updated On", [], DatePicker, {
              format: "YYYY-MM-DD HH:mm:ss",
              disabled: true,
              showTime: true,
            })}
          </Col>
        </Row>
      </Form>
      <Divider />
    </Modal>
  );
};

export default ModalAddFactory;
