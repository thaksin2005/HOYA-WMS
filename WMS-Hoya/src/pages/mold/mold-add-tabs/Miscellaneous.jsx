import React, { useState } from "react";
import { Form, Input, Row, Col, Divider, Switch } from "antd";

const Miscellaneous = () => {
  const [codeDateControl, setCodeDateControl] = useState(false);

  return (
    <>
      <Row gutter={[16, 16]}>
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
      <Row>
        <Col span={12}>
          <Divider
            orientation="center"
            style={{ borderColor: "#DA251C", color: "#DA251C" }}
          >
            Refill Control
          </Divider>
        </Col>
        <Col span={12}>
          <Divider
            orientation="center"
            style={{ borderColor: "#DA251C", color: "#DA251C" }}
          >
            Code Date / Shelf Life
          </Divider>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Base Stock"
            name="baseStock"
            rules={[{ required: true, message: "Please input base stock" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Code Date Control"
            name="codeDateControl"
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Safety Stock"
            name="safetyStock"
            rules={[{ required: true, message: "Please input safety stock" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Shelf Life [Days]"
            name="shelfLife"
            rules={[{ required: true, message: "Please input shelf life" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Divider
          orientation="center"
          style={{ borderColor: "#DA251C", color: "#DA251C" }}
        >
          Other Control
        </Divider>
        <Col span={12}>
          <Form.Item
            label="Put Away Movement Indicator"
            name="putAwayMovementIndicator"
            rules={[
              {
                required: true,
                message: "Please input put away movement indicator",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Serial Control"
            name="serialControl"
            valuePropName="checked"
          >
            <Switch checkedChildren="Yes" unCheckedChildren="No" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Put Away Anchor ID [A:6-10,B:3-5,C:0-2]"
            name="putAwayAnchorId"
            rules={[
              { required: true, message: "Please input put away anchor id" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default Miscellaneous;
