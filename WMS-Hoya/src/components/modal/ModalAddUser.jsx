import { Modal, Form, Input, Select, Divider } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

const ModalAddUser = ({ isModalOpen, setIsModalOpen }) => {
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

  const renderFormItem = (
    label,
    name,
    placeholder,
    rules,
    isPassword = false
  ) => (
    <Form.Item label={label} name={name} rules={rules}>
      {isPassword ? (
        <Input.Password placeholder={placeholder} />
      ) : (
        <Input placeholder={placeholder} />
      )}
    </Form.Item>
  );

  return (
    <Modal
      title={
        <>
          <UserAddOutlined /> New User
        </>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <UserAddOutlined />
            <span>Add New User</span>
          </div>
        </>
      }
    >
      <Divider />
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          Password: "123456",
          Role: "Admin",
        }}
      >
        {renderFormItem("Employee ID", "EmployeeID", "123456", [
          { required: true, message: "Please input the Employee ID!" },
        ])}
        {renderFormItem("Name", "Name", "John Doe", [
          { required: true, message: "Please input the Name!" },
        ])}
        {renderFormItem("Email", "Email", "john.doe@example.com", [
          {
            required: true,
            type: "email",
            message: "Please input a valid Email!",
          },
        ])}
        {renderFormItem(
          "Password",
          "Password",
          "Please input the Password!",
          [{ required: true, message: "Please input the Password!" }],
          true
        )}
        <Form.Item
          label="Role"
          name="Role"
          rules={[{ required: true, message: "Please select the Role!" }]}
        >
          <Select placeholder="Please select the Role!">
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="User">User</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <Divider />
    </Modal>
  );
};

export default ModalAddUser;
