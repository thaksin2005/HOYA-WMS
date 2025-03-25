import React from "react";
import { Form, Input, Row, Col } from "antd";

const Detail = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Mold Code"
            name="moldCode"
            rules={[{ required: true, message: "Please input the Mold Code!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Mold Name [Lens Name]"
            name="moldName"
            rules={[{ required: true, message: "Please input the Mold Name!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Form.Item
            label="Send Blast"
            name="sendBlast"
            rules={[
              { required: true, message: "Please input the Send Blast!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Daidama"
            name="daidama"
            rules={[{ required: true, message: "Please input the Daidama!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Tag Title No."
            name="tagTitleNo"
            rules={[
              { required: true, message: "Please input the Tag Title No!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="ENG-MK No."
            name="engMkNo"
            rules={[{ required: true, message: "Please input the ENG-MK No!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Send Blast 1"
            name="sendBlast1"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Send Blast 2"
            name="sendBlast2"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Send Blast 3"
            name="sendBlast3"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Engrave Mark"
            name="engraveMark"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="SV Code"
            name="svCode"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SV Radius"
            name="svRadius"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SV Step Cut"
            name="svStepCut"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="SV Tapping"
            name="svTapping"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Form.Item
            label="R1"
            name="r1"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="R2"
            name="r2"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="CT"
            name="ct"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ACID"
            name="acid"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="DIA Tolerance"
            name="diaTolerance"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Mold Design"
            name="moldDesign"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mold Actual Diameter"
            name="moldActualDiameter"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mold Slide Guide"
            name="moldSlideGuide"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mold Account Group"
            name="moldAccountGroup"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mold Invoice"
            name="moldInvoice"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Form.Item
            label="Tool D1"
            name="toolD1"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tool D2"
            name="toolD2"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Holder D1"
            name="holderD1"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Holder D2"
            name="holderD2"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Document No."
            name="documentNo"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Create YMD"
            name="createYmd"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Update YMD"
            name="updateYmd"
            layout="horizontal"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default Detail;
