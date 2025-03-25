import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Space,
  Row,
  Col,
  Card,
  Typography,
} from "antd";
import NotificationAPI from "../../../components/NotificationAPI";

const { Title } = Typography;
const ModalDetailMoldMaster = ({ open, onClose, record, handleEditClick }) => {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [openNotification, setOpenNotification] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [record, form]);

  useEffect(() => {
    if (open) {
      setIsEdit(false);
      setIsDisabled(true);
      if (handleEditClick) {
        setIsEdit(true);
        setIsDisabled(false);
      }
    }
  }, [open]);

  useEffect(() => {
    if (isEdit) {
      setIsDisabled(false);
    }
  }, [isEdit]);

  const handleOk = () => {
    form
      .validateFields()
      .then(() => {
        console.log(form.getFieldsValue());

        setOpenNotification("success");
        setDescription("Data has been successfully saved.");

        onClose();
        form.resetFields();
        setIsEdit(false);
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);

        setOpenNotification("error");
        setDescription("There was an error processing your request.");
      });
  };

  return (
    <Modal
      title="Detail"
      open={open}
      onCancel={onClose}
      width={1200}
      footer={
        <Space>
          <Button onClick={onClose}>Close</Button>
          {isEdit ? (
            <Button type="primary" onClick={handleOk}>
              OK
            </Button>
          ) : (
            <Button type="primary" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
          )}
        </Space>
      }
    >
      <NotificationAPI
        openNotification={openNotification}
        description={description}
      />
      {open ? (
        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Mold Details
                </Title>
                <Row gutter={16}>
                  <Col span={4}>
                    <Form.Item name="Place ID" label="Mold Code">
                      <Input disabled={true} />
                    </Form.Item>
                  </Col>

                  <Col span={4}>
                    <Form.Item name="moldDesign" label="Max Stock">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      name="moldActualDiameter"
                      label="Mold Actual Diameter"
                    >
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="moldSlideGuide" label="Min Stock">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      name="moldAccountGroup"
                      label="Mold Account Group"
                    >
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="moldInvoiceName" label="Mold Invoice Name">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="engMkNo" label="Eng Mk No">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="tagTitleNo" label="Tag Title No">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="sandBlast" label="Sand Blast">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="sandblast1" label="Sandblast 1">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="sandblast2" label="Sandblast 2">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="sandblast3" label="Sandblast 3">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="engraveMark" label="Engrave Mark">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="svRadius" label="SV Radius">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="svStepCut" label="SV Step Cut">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="svTapping" label="SV Tapping">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="r1" label="R1">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="r2" label="R2">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="ct" label="CT">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="acid" label="Acid">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="diaTolerance" label="Dia Tolerance">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="totalD1" label="Total D1">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="totalD2" label="Total D2">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="holderD1" label="Holder D1">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="holderD2" label="Holder D2">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="documentNo" label="Document No">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="svCode" label="SV Code">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="itemNumber" label="Item Number">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Stock Details
                </Title>
                <Form.Item name="minMaxStock" label="Min-Max Stock">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="plantNumber" label="Plant Number">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="stockType" label="Stock Type">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="focusType" label="Focus Type">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="typeNo" label="Type No">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="upLowNo" label="Up/Low No">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="diaidama" label="Diaidama">
                  <Input disabled={isDisabled} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Lens Details
                </Title>
                <Form.Item name="lensType" label="Lens Type">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="lensName" label="Lens Name">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="diameter" label="Diameter">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="indexNo" label="Index No">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="indexName" label="Index Name">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="focusName" label="Focus Name">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="typeShortName" label="Type Short Name">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="upLowName" label="Up/Low Name">
                  <Input disabled={isDisabled} />
                </Form.Item>
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Additional Info
                </Title>
                <Form.Item name="createAt" label="Create At">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="update" label="Update">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="class" label="Class">
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item name="create" label="Create">
                  <Input disabled={isDisabled} />
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>
      ) : (
        <div>No data</div>
      )}
    </Modal>
  );
};

export default ModalDetailMoldMaster;
