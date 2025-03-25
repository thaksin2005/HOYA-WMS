import React, { useState } from "react";
import { Drawer, Form, Input, Button, Space, Row, Col, Select, notification } from "antd";


const InboundDetail = ({ open, onClose, record }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [record, form]);

  return (
    <Drawer
      title="Inbound Detail"
      open={open}
      onClose={onClose}
      placement="right"
      width="100%"
      extra={
        <Space>
          <Button onClick={onClose}>Close</Button>
        </Space>
      }
    >
      {/* Form content จากไฟล์เดิม */}
      {/* ... */}
    </Drawer>
  );
};

export default InboundDetail;
