import {
  Modal,
  Form,
  Input,
  Divider,
  Button,
  Select,
  DatePicker,
  Switch,
} from "antd";
import { Warehouse, Plus } from "lucide-react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const ModalAddWarehouse = ({ isModalOpen, setIsModalOpen }) => {
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

  return (
    <>
      <Modal
        centered
        title={
          <>
            <Warehouse size={16} /> New Warehouse
          </>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Plus size={16} /> Add Warehouse
          </div>
        }
        width={800}
        destroyOnClose={false}
      >
        <Divider />
        <Form
          name="addWarehouse_form"
          form={form}
          onFinish={handleOk}
          layout="vertical"
          initialValues={{
            W_Code: "",
            W_Name: "",
            F_Factory: "",
            UA_IDCreateBy: "",
            W_CreateOn: dayjs(), // ใช้ dayjs() เพื่อดึงวันที่และเวลาในปัจจุบัน
            W_IsActive: true,
            W_Remarks: "",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px 20px",
            }}
          >
            <Form.Item
              label="Warehouse Code"
              name="W_Code"
              rules={[
                { required: true, message: "Warehouse Code is required" },
              ]}
            >
              <Input placeholder="Warehouse Code" />
            </Form.Item>

            <Form.Item
              label="Warehouse Name"
              name="W_Name"
              rules={[
                { required: true, message: "Warehouse Name is required" },
              ]}
            >
              <Input placeholder="Warehouse Name" />
            </Form.Item>

            <Form.Item
              label="Factory"
              name="F_Factory"
              rules={[{ required: true, message: "Factory is required" }]}
            >
              <Select placeholder="Select Factory">
                <Select.Option value="0">1</Select.Option>
                <Select.Option value="1">2</Select.Option>
                <Select.Option value="2">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
                
              </Select>
            </Form.Item>

            <Form.Item label="Created On" name="W_CreateOn">
              <DatePicker
                showTime // เพิ่มการแสดงเวลา
                style={{ width: "100%" }}
                disabled
                value={form.getFieldValue("W_CreateOn")} // ใช้วันที่และเวลาในปัจจุบัน
              />
            </Form.Item>

            <Form.Item label="Remarks" name="W_Remarks">
              <Input placeholder="Remarks" />
            </Form.Item>

            <Form.Item
              label="Created By"
              name="UA_IDCreateBy"
              rules={[{ required: true, message: "Created By is required" }]}
            >
              <Input placeholder="Administrator" 
              disabled/>
            </Form.Item>

            <Form.Item
              label="Is Active"
              name="W_IsActive"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>
        </Form>
        <Divider />
      </Modal>
    </>
  );
};

export default ModalAddWarehouse;
