import React, { useState } from "react";
import { Drawer, Form, Input, Button, Space, Row, Col, Select } from "antd";
import TableAddRow from "./TableAddRow";
import { notification } from "antd";

const DrawerAdd = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);

  const warehouseOptions = [
    { value: "1", label: "#1 - Warehouse 1" },
    { value: "2", label: "#2 - Warehouse 2" },
    { value: "3", label: "#3 - Warehouse 3" },
  ];

  const pointOptions = [
    { value: "1", label: "#1 - Point 1" },
    { value: "2", label: "#2 - Point 2" },
    { value: "3", label: "#3 - Point 3" },
  ];

  const handleOk = () => {
    form
      .validateFields()
      .then(() => {
        console.log(form.getFieldsValue());
        console.log("Table Data:", tableData);
        notification.success({
          message: "Success",
          description: "Data has been successfully saved.",
          duration: 3,
        });
        onClose();
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  return (
    <Drawer
      title="Add"
      open={open}
      onClose={onClose}
      placement="bottom"
      closable={false}
      height={600}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={handleOk}>
            OK
          </Button>
        </Space>
      }
    >
      {open ? (
        <>
          <Form form={form} layout="vertical">
            <Row gutter={24}>
              <Col span={4}>
                <Row>
                  <Form.Item
                    label="Warehouse ID"
                    name="warehouseId"
                    style={{ width: "100%" }}
                    rules={[
                      { required: true, message: "Please select warehouse" },
                    ]}
                  >
                    <Select
                      options={warehouseOptions}
                      placeholder="Select Warehouse"
                    />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item
                    label="Point ID"
                    name="pointId"
                    style={{ width: "100%" }}
                    rules={[{ required: true, message: "Please select point" }]}
                  >
                    <Select options={pointOptions} placeholder="Select Point" />
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item
                    label="REF .DOC"
                    name="refDoc"
                    style={{ width: "100%" }}
                    rules={[
                      { required: true, message: "Please enter REF .DOC" },
                    ]}
                  >
                    <Input placeholder="Enter REF .DOC" />
                  </Form.Item>
                </Row>
              </Col>
              <Col span={20}>
                <TableAddRow onDataChange={setTableData} />
              </Col>
            </Row>
          </Form>
        </>
      ) : (
        <div>No data</div>
      )}
    </Drawer>
  );
};

export default DrawerAdd;
