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
          MHP_ID: "",
          MHP_SerialUPP: "",
          MHP_SerialLOW: "",
          UA_IDCreateBy: "",
          MHP_CreateOn: dayjs(),  // Set initial value to current date and time
          UA_UpdateBy: "",
          MHP_UpdateOn: dayjs(),  // Set initial value to current date and time
        }}
      >
        <Row gutter={[24, 12]}>
          <Col span={12}>
            {renderFormItem("MHP ID", "MHP_ID", "MHP ID", [
              { required: true, message: "Please input the MHP ID!" },
            ])}
          </Col>
          <Col span={12}>
            {renderFormItem("Serial UPP", "MHP_SerialUPP", "Serial UPP", [
              { required: true, message: "Please input the Serial UPP!" },
            ])}
          </Col>
        </Row>

        <Row gutter={[24, 12]}>
          <Col span={12}>
            {renderFormItem("Serial LOW", "MHP_SerialLOW", "Serial LOW", [
              { required: true, message: "Please input the Serial LOW!" },
            ])}
          </Col>
          <Col span={12}>
            {renderFormItem("Created By", "UA_IDCreateBy", "Created By", [
              { required: true, message: "Please input the Created By!" },
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
            {renderFormItem("Updated By", "UA_UpdateBy", "Updated By", [])}
          </Col>
        </Row>

        <Row gutter={[24, 12]}>
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
