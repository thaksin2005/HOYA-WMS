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
const ModalDetailInboundMaster = ({ open, onClose, record }) => {
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
      title="Inbound Detail"
      open={open}
      onCancel={onClose}
      width={1200}
      footer={
        <Space>
          <Button onClick={onClose}>Close</Button>
          {isEdit ? (
            <Button type="primary" onClick={handleOk} disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
              OK
            </Button>
          ) : (
            <Button type="primary" onClick={() => setIsEdit(true)} disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
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
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            // Basic Information
            InboundNumber: record.all.InboundNumber,
            InboundStatus: record.all.InboundStatus,
            InboundRecordOn: record.all.InboundRecordOn,
            InboundJobNumber: record.all.InboundJobNumber,
            InboundInterfaceFile: record.all.InboundInterfaceFile,
            OrderNo: record.all.OrderNo,

            // User Information
            UserAccountID_IR: record.all.UserAccountID_IR,
            UserAccountCode_IR: record.all.UserAccountCode_IR,
            UserAccountFullName_IR: record.all.UserAccountFullName_IR,
            UserAccountID_IRI: record.all.UserAccountID_IRI,
            UserAccountCode_IRI: record.all.UserAccountCode_IRI,
            UserAccountFullName_IRI: record.all.UserAccountFullName_IRI,

            // Factory Information
            F_IDFactory: record.all.F_IDFactory,
            FactoryCode: record.all.FactoryCode,
            FactoryName: record.all.FactoryName,

            // Warehouse Information
            W_IDWarehouse: record.all.W_IDWarehouse,
            WarehouseCode: record.all.WarehouseCode,
            WarehouseName: record.all.WarehouseName,

            // Place Information
            P_IDPlace: record.all.P_IDPlace,
            PlaceCode: record.all.PlaceCode,
            PlaceName: record.all.PlaceName,

            // Mold Information
            MoldCode: record.all.MoldCode,
            MoldSerial: record.all.MoldSerial,
            MoldQty: record.all.MoldQty,
            MoldLotNo: record.all.MoldLotNo,
            MoldReworkCount: record.all.MoldReworkCount,

            // Location Details
            MoldPlantNo: record.all.MoldPlantNo,
            MoldStockType: record.all.MoldStockType,
            MoldPlaceNo: record.all.MoldPlaceNo,
            MoldTransactionCD: record.all.MoldTransactionCD,
            TrayNumber: record.all.TrayNumber,
            TrayPosition: record.all.TrayPosition,
            ToLocation: record.all.ToLocation,

            // Additional Details
            MoldProgramID: record.all.MoldProgramID,
            EmpNo: record.all.EmpNo,
            MoldWorkStation: record.all.MoldWorkStation,

            // Status Information
            InboundItemStatus: record.all.InboundItemStatus,
            InboundItemMsgError: record.all.InboundItemMsgError,
            TaskStatus: record.all.TaskStatus,
            IRI_UpdateOn: record.all.IRI_UpdateOn,

            // Sender/Receiver Information
            MoldSndrcvPlantNo: record.all.MoldSndrcvPlantNo,
            MoldSndrcvStockType: record.all.MoldSndrcvStockType,
            MoldSndrcvPlaceNo: record.all.MoldSndrcvPlaceNo,
            MoldSndrcvTransactionCD: record.all.MoldSndrcvTransactionCD,
          }}
        >
          <Row gutter={[16, 4]}>
            <Col span={24}>
              <Card 
                bordered
                title={<Title level={5} style={{ color: "#DA241C", margin: 0, fontSize: '14px' }}>Basic Information</Title>}
                style={{ marginBottom: '4px' }}
                bodyStyle={{ padding: '8px' }}
                headStyle={{ padding: '4px 8px', minHeight: '32px' }}
              >
                <Row gutter={[8, 0]}>
                  <Col span={4}>
                    <Form.Item name="InboundNumber" label="Inbound No." style={{ marginBottom: '4px' }}>
                    <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="InboundJobNumber" label="Job No." style={{ marginBottom: '4px' }}>
                    <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="OrderNo" label="Order No." style={{ marginBottom: '4px' }}>
                    <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="InboundInterfaceFile" label="Interface File" style={{ marginBottom: '4px' }}>
                    <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="InboundRecordOn" label="Record On" style={{ marginBottom: '4px' }}>
                    <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card 
                bordered
                title={<Title level={5} style={{ color: "#DA241C", margin: 0, fontSize: '14px' }}>Factory & Location</Title>}
                style={{ marginBottom: '4px' }}
                bodyStyle={{ padding: '8px' }}
                headStyle={{ padding: '4px 8px', minHeight: '32px' }}
              >
                <Row gutter={[8, 0]}>
                  <Col span={8}>
                    <Form.Item name="FactoryName" label="Factory" style={{ marginBottom: '4px' }}>
                    <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="FactoryCode" label="Factory Code" style={{ marginBottom: '4px' }}>
                    <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="WarehouseName" label="Warehouse" style={{ marginBottom: '4px' }}>
                    <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="WarehouseCode" label="WH Code" style={{ marginBottom: '4px' }}>
                    <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[8, 0]}>
                  <Col span={8}>
                    <Form.Item name="PlaceName" label="Place" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="PlaceCode" label="Place Code" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="ToLocation" label="Location" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item name="TrayNumber" label="Tray No." style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item name="TrayPosition" label="Tray Pos." style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card 
                bordered
                title={<Title level={5} style={{ color: "#DA241C", margin: 0, fontSize: '14px' }}>Mold Information</Title>}
                style={{ marginBottom: '4px' }}
                bodyStyle={{ padding: '8px' }}
                headStyle={{ padding: '4px 8px', minHeight: '32px' }}
              >
                <Row gutter={[8, 0]}>
                  <Col span={4}>
                    <Form.Item name="MoldCode" label="Mold Code" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="MoldSerial" label="Mold Serial" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="MoldLotNo" label="Lot No." style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="MoldQty" label="Quantity" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="MoldReworkCount" label="Rework Count" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card 
                bordered
                title={<Title level={5} style={{ color: "#DA241C", margin: 0, fontSize: '14px' }}>Status Information</Title>}
                style={{ marginBottom: '4px' }}
                bodyStyle={{ padding: '8px' }}
                headStyle={{ padding: '4px 8px', minHeight: '32px' }}
              >
                <Row gutter={[8, 0]}>
                  <Col span={6}>
                    <Form.Item name="InboundStatus" label="Inbound Status" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="InboundItemStatus" label="Item Status" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="TaskStatus" label="Task Status" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="IRI_UpdateOn" label="Last Update" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[8, 0]}>
                  <Col span={24}>
                    <Form.Item name="InboundItemMsgError" label="Error Message" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card 
                bordered
                title={<Title level={5} style={{ color: "#DA241C", margin: 0, fontSize: '14px' }}>Additional Details</Title>}
                style={{ marginBottom: '4px' }}
                bodyStyle={{ padding: '8px' }}
                headStyle={{ padding: '4px 8px', minHeight: '32px' }}
              >
                <Row gutter={[8, 0]}>
                  <Col span={6}>
                    <Form.Item name="MoldProgramID" label="Program ID" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="EmpNo" label="Employee No." style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="MoldWorkStation" label="Workstation" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="UserAccountFullName_IR" label="Created By" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>

              <Card 
                bordered
                title={<Title level={5} style={{ color: "#DA241C", margin: 0, fontSize: '14px' }}>Transaction Details</Title>}
                bodyStyle={{ padding: '8px' }}
                headStyle={{ padding: '4px 8px', minHeight: '32px' }}
              >
                <Row gutter={[8, 0]}>
                  <Col span={6}>
                    <Form.Item name="MoldPlantNo" label="Plant No." style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="MoldStockType" label="Stock Type" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="MoldPlaceNo" label="Place No." style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="MoldTransactionCD" label="Transaction CD" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[8, 0]}>
                  <Col span={6}>
                    <Form.Item name="MoldSndrcvPlantNo" label="Snd/Rcv Plant No." style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="MoldSndrcvStockType" label="Snd/Rcv Stock Type" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="MoldSndrcvPlaceNo" label="Snd/Rcv Place No." style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="MoldSndrcvTransactionCD" label="Snd/Rcv Trans CD" style={{ marginBottom: '4px' }}>
                      <Input disabled style={{ color: "black", backgroundColor: "#f5f5f5", fontWeight: "normal" }} />
                    </Form.Item>
                  </Col>
                </Row>
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

export default ModalDetailInboundMaster;
