import React from "react";
import { Form, Input, Row, Col, Select } from "antd";
const General = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Mold Code"
            name="moldCode"
            rules={[{ required: true, message: "Please input mold code" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Mold Name [Lens Name]"
            name="moldName"
            rules={[{ required: true, message: "Please input mold name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            label="Mold Status"
            name="moldStatus"
            rules={[{ required: true, message: "Please select mold status" }]}
          >
            <Select placeholder="Select Mold Status">
              <Select.Option value="1">Active</Select.Option>
              <Select.Option value="2">Inactive</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Mold Group [A,B,C]"
            name="moldGroup"
            rules={[{ required: true, message: "Please select mold group" }]}
          >
            <Select placeholder="Select Mold Group">
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
              <Select.Option value="C">C</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Stock Type"
            name="stockType"
            rules={[{ required: true, message: "Please select stock type" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="DAI"
            name="dai"
            rules={[{ required: true, message: "Please input DAI" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Lens Type"
            name="lensType"
            rules={[{ required: true, message: "Please input lens type" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Lens Type Short Name"
            name="lensTypeShortName"
            rules={[
              {
                required: true,
                message: "Please input lens type short name",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Index No."
            name="indexNo"
            rules={[{ required: true, message: "Please input index no" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Index Short Name"
            name="indexShortName"
            rules={[
              {
                required: true,
                message: "Please input index short name",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Focus Type"
            name="focusType"
            rules={[{ required: true, message: "Please input focus type" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Focus Type Short Name"
            name="focusTypeShortName"
            rules={[
              {
                required: true,
                message: "Please input focus type short name",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Type No."
            name="typeNo"
            rules={[{ required: true, message: "Please input type no" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Type Short Name"
            name="typeShortName"
            rules={[
              {
                required: true,
                message: "Please input type short name",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Up/Low No."
            name="upLowNo"
            rules={[{ required: true, message: "Please input up/low no" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Up/Low Short Name"
            name="upLowShortName"
            rules={[
              {
                required: true,
                message: "Please input up/low short name",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default General;
