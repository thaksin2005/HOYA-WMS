import React, { useEffect } from "react";
import { Drawer, Form, Input, Button, Space, Row, Col } from "antd";

const InboundDetail = ({ open, onClose, record }) => {
  const [form] = Form.useForm();

  useEffect(() => {
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
      width={500}
      extra={
        <Space>
          <Button onClick={onClose}>Close</Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Mold Code" name="moldCode">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Mold Serial" name="moldSerial">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Lot No." name="moldLotNo">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Transaction CD" name="moldTransactionCD">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Emp No." name="empNo">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Work Station" name="moldWorkStation">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Sndrcv Plant No." name="moldSndrcvPlantNo">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Sndrcv Stock Type" name="moldSndrcvStockType">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Sndrcv Place No." name="moldSndrcvPlaceNo">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Sndrcv Transaction CD" name="moldSndrcvTransactionCD">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Status" name="status">
          <Input disabled />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default InboundDetail;
