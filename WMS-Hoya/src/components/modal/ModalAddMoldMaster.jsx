import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Divider,
  Row,
  Col,
  Select,
  ConfigProvider,
} from "antd";
import { Factory } from "lucide-react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

const ModalAddMoldMaster = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const [activeTabKey, setActiveTabKey] = useState("1");

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

  const styleForm = {
    overflowY: "auto",
    maxHeight: "calc(100vh - 350px)",
    padding: "0 20px",
    scrollBehavior: "smooth",
    scrollbarWidth: "thin",
    scrollbarColor: "#909090 #fff",
  };

  return (
    <Modal
      title={
        <>
          <Factory size={16} /> New Mold Master
        </>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={"Add mold"}
      width="50%"
      centered
      destroyOnClose={false}
      style={{ maxWidth: "none", width: "70%" }}
    >
      <Divider />
      <div style={styleForm}>
        <Form form={form} layout="vertical">
          <Row gutter={[16]}></Row>

          <Row gutter={[16]}>
            <Col span={12} style={{ display: "none" }}>
              <Form.Item label={"UA IDUpdateBy"} name="UA_IDUpdateBy">
                <Input placeholder="Enter Update By" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"MoldCode"} name="MM_MoldCode">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={"MinStock"} name="MinStock">
                <Input type="number" variant="filled" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={"MaxStock"} name="MaxStock">
                <Input type="number" variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"PlantNumber"} name="PlantNumber">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"StockType"} name="StockType">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"LensType"} name="LensType">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"LensTypeName"} name="LensTypeName">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"IndexNo"} name="IndexNo">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"IndexName"} name="IndexName">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"FocusType"} name="FocusType">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"FocusName"} name="FocusName">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"TypeNo"} name="TypeNo">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"TypeShortName"} name="TypeShortName">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"UpLowNo"} name="UpLowNo">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"UpLowName"} name="UpLowName">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"DIANumber"} name="DIANumber">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"LensName"} name="LensName">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"SandBlast"} name="SandBlast">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"Diaidama"} name="Diaidama">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"EngMkNo"} name="EngMkNo">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"TagTitleNo"} name="TagTitleNo">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"Create"} name="Create">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"Update"} name="Update">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"Mold Design"} name="MM_MoldDesign">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Mold Actual Diameter"}
                name="MM_MoldActualDiameter"
              >
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"Mold Slide Guide"} name="MM_MoldSlideGuide">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Mold Account Group"}
                name="MM_MoldAccountGroup"
              >
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"Mold Invoice Name"} name="MM_MoldInvoiceName">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"Sandblast1"} name="MM_Sandblast1">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"Sandblast2"} name="MM_Sandblast2">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"Sandblast3"} name="MM_Sandblast3">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"EngraveMark"} name="MM_EngraveMark">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"SvRadius"} name="MM_SvRadius">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"SvStepCut"} name="MM_SvStepCut">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"SVTapping"} name="MM_SVTapping">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"R1"} name="MM_R1">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"R2"} name="MM_R2">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"CT"} name="MM_CT">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"Acid"} name="MM_Acid">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"DiaTolerance"} name="MM_DiaTolerance">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"Total D1"} name="MM_TotalD1">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"Total D2"} name="MM_TotalD2">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"Holder D1"} name="MM_HolderD1">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"Holder D2"} name="MM_HolderD2">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"Document No"} name="MM_DocumentNo">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"SVCode"} name="MM_SVCode">
                <Input variant="filled" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"ItemNumber"} name="MM_ItemNumber">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16]}>
            <Col span={12}>
              <Form.Item label={"Class"} name="MM_Class">
                <Input variant="filled" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Divider />
    </Modal>
  );
};

export default ModalAddMoldMaster;
