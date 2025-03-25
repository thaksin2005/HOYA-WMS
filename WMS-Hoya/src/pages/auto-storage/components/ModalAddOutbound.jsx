import React from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Space,
  Row,
  Col,
  notification,
} from "antd";

const ModalAddOutbound = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(() => {
        console.log(form.getFieldsValue());
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
    <Modal
      title="Add"
      open={open}
      onCancel={onClose}
      footer={
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
            {/* First Row - Updated Fields */}
            <Row gutter={24}>
              <Col span={4}>
                <Form.Item
                  label="Job Number"
                  name="ORI_JobNumber"
                  rules={[
                    { required: true, message: "Please enter Job Number" },
                  ]}
                >
                  <Input placeholder="Enter Job Number" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Mold Master ID Upper"
                  name="MS_IDUpperMold"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Mold Master ID Upper Mold",
                    },
                  ]}
                >
                  <Input placeholder="Enter Upper Mold" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Mold Master ID Lower"
                  name="MS_IDLowerMold"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Mold Master ID Lower",
                    },
                  ]}
                >
                  <Input placeholder="Enter Lower Mold" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Status"
                  name="ORI_Status"
                  rules={[{ required: true, message: "Please enter Status" }]}
                >
                  <Input placeholder="Enter Status" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label=" Production Order"
                  name="ORI_ProductionOrder"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Production Order",
                    },
                  ]}
                >
                  <Input placeholder="Enter Production Order" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="ORI Order Date"
                  name="ORI_OrderDate"
                  rules={[
                    { required: true, message: "Please enter Order Date" },
                  ]}
                >
                  <Input placeholder="Enter Order Date" />
                </Form.Item>
              </Col>
            </Row>

            {/* Second Row - Updated Fields */}
            <Row gutter={24}>
              <Col span={4}>
                <Form.Item
                  label="Input Date"
                  name="ORI_InputDate"
                  rules={[
                    { required: true, message: "Please enter Input Date" },
                  ]}
                >
                  <Input placeholder="Enter Input Date" />
                </Form.Item>
              </Col>
              {/* <Col span={4}>
                <Form.Item label="Factory ID" name="ORI_FactoryID" rules={[{ required: true, message: "Please enter Factory ID" }]}>
                  <Input placeholder="Enter ORI Factory ID" />
                </Form.Item>
              </Col> */}
              <Col span={4}>
                <Form.Item
                  label="Stie"
                  name="ORI_Stie"
                  rules={[{ required: true, message: "Please enter Stie" }]}
                >
                  <Input placeholder="Enter Stie" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Production Type"
                  name="ORI_ProductionType"
                  rules={[
                    { required: true, message: "Please enter Production Type" },
                  ]}
                >
                  <Input placeholder="Enter Production Type" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Production No"
                  name="ORI_ProductionNo"
                  rules={[
                    { required: true, message: "Please enter Production No" },
                  ]}
                >
                  <Input placeholder="Enter ORI Production No" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Request Date"
                  name="ORI_RequestDate"
                  rules={[
                    { required: true, message: "Please enter Request Date" },
                  ]}
                >
                  <Input placeholder="Enter ORI Request Date" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Test"
                  name="ORI_Test"
                  rules={[{ required: true, message: "Please enter Test" }]}
                >
                  <Input placeholder="Enter Test" />
                </Form.Item>
              </Col>
              {/* <Col span={4}>
                <Form.Item label="Input ID" name="ORI_InputID" rules={[{ required: true, message: "Please enter Input ID" }]}>
                  <Input placeholder="Enter Input ID" />
                </Form.Item>
              </Col> */}
              {/* <Col span={4}>
                <Form.Item label="Send ID" name="ORI_SendID" rules={[{ required: true, message: "Please enter Send ID" }]}>
                  <Input placeholder="Enter Send ID" />
                </Form.Item>
              </Col> */}
            </Row>

            {/* Third Row - Updated Fields */}
            <Row gutter={24}>
              {/* <Col span={4}>
                <Form.Item label="Send ID" name="ORI_SendID" rules={[{ required: true, message: "Please enter Send ID" }]}>
                  <Input placeholder="Enter ORI Send ID" />
                </Form.Item>
              </Col> */}
              {/* <Col span={4}>
                <Form.Item label="Input ID" name="ORI_InputID" rules={[{ required: true, message: "Please enter Input ID" }]}>
                  <Input placeholder="Enter Input ID" />
                </Form.Item>
              </Col> */}
              {/* <Col span={4}>
                <Form.Item label="Test" name="ORI_Test" rules={[{ required: true, message: "Please enter Test" }]}>
                  <Input placeholder="Enter Test" />
                </Form.Item>
              </Col> */}
              <Col span={4}>
                <Form.Item
                  label="Edge"
                  name="ORI_Edge"
                  rules={[{ required: true, message: "Please enter Edge" }]}
                >
                  <Input placeholder="Enter Edge" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Lot Msg"
                  name="ORI_LotMsg"
                  rules={[{ required: true, message: "Please enter Lot Msg" }]}
                >
                  <Input placeholder="Enter Lot Msg" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Lot Type"
                  name="ORI_LotType"
                  rules={[{ required: true, message: "Please enter Lot Type" }]}
                >
                  <Input placeholder="Enter Lot Type" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label=" Route ID"
                  name="ORI_RouteID"
                  rules={[{ required: true, message: "Please enter Route ID" }]}
                >
                  <Input placeholder="Enter Route ID" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Lens Flag"
                  name="ORI_LensFlag"
                  rules={[
                    { required: true, message: "Please enter Lens Flag" },
                  ]}
                >
                  <Input placeholder="Enter Lens Flag" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Lens Flag Desc"
                  name="ORI_LensFlagDesc"
                  rules={[
                    { required: true, message: "Please enter Lens Flag Desc" },
                  ]}
                >
                  <Input placeholder="Enter Lens Flag Desc" />
                </Form.Item>
              </Col>
            </Row>

            {/* Fourth Row - Updated Fields */}
            <Row gutter={24}>
              {/* <Col span={4}>
                <Form.Item label=" Route ID" name="ORI_RouteID" rules={[{ required: true, message: "Please enter Route ID" }]}>
                  <Input placeholder="Enter Route ID" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Lens Flag" name="ORI_LensFlag" rules={[{ required: true, message: "Please enter Lens Flag" }]}>
                  <Input placeholder="Enter Lens Flag" />
                </Form.Item>
              </Col> */}
              {/* <Col span={4}>
                <Form.Item label="Lens Flag Desc" name="ORI_LensFlagDesc" rules={[{ required: true, message: "Please enter Lens Flag Desc" }]}>
                  <Input placeholder="Enter Lens Flag Desc" />
                </Form.Item>
              </Col> */}
              <Col span={4}>
                <Form.Item
                  label="Product DIA"
                  name="ORI_ProductDIA"
                  rules={[
                    { required: true, message: "Please enter Product DIA" },
                  ]}
                >
                  <Input placeholder="Enter Product DIA" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="End Item Name"
                  name="ORI_EndItemName"
                  rules={[
                    { required: true, message: "Please enter End Item Name" },
                  ]}
                >
                  <Input placeholder="Enter End Item Name" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Mold Upper"
                  name="ORI_MoldUpper"
                  rules={[
                    { required: true, message: "Please enter Mold Upper" },
                  ]}
                >
                  <Input placeholder="Enter Mold Upper" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Mold Upper Name"
                  name="ORI_MoldUpperName"
                  rules={[
                    { required: true, message: "Please enter Mold Upper Name" },
                  ]}
                >
                  <Input placeholder="Enter ORI Mold Upper Name" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Mold Upper DIA"
                  name="ORI_MoldUpperDIA"
                  rules={[
                    { required: true, message: "Please enter Mold Upper DIA" },
                  ]}
                >
                  <Input placeholder="Enter ORI Mold Upper DIA" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Mold Lower"
                  name="ORI_MoldLower"
                  rules={[
                    { required: true, message: "Please enter Mold Lower" },
                  ]}
                >
                  <Input placeholder="Enter Mold Lower" />
                </Form.Item>
              </Col>
            </Row>

            {/* Fifth Row - Additional Fields */}
            <Row gutter={24}>
              {/* <Col span={4}>
                <Form.Item label="Mold Upper Name" name="ORI_MoldUpperName" rules={[{ required: true, message: "Please enter Mold Upper Name" }]}>
                  <Input placeholder="Enter ORI Mold Upper Name" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Mold Upper DIA" name="ORI_MoldUpperDIA" rules={[{ required: true, message: "Please enter Mold Upper DIA" }]}>
                  <Input placeholder="Enter ORI Mold Upper DIA" />
                </Form.Item>
              </Col> */}
              {/* <Col span={4}>
                <Form.Item label="Mold Lower" name="ORI_MoldLower" rules={[{ required: true, message: "Please enter Mold Lower" }]}>
                  <Input placeholder="Enter Mold Lower" />
                </Form.Item>
              </Col> */}
              <Col span={4}>
                <Form.Item
                  label="Mold Lower Name"
                  name="ORI_MoldLowerName"
                  rules={[
                    { required: true, message: "Please enter Mold Lower Name" },
                  ]}
                >
                  <Input placeholder="Enter Mold Lower Name" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Mold Lower DIA"
                  name="ORI_MoldLowerDIA"
                  rules={[
                    { required: true, message: "Please enter Mold Lower DIA" },
                  ]}
                >
                  <Input placeholder="Enter Mold Lower DIA" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Cast Oven No"
                  name="ORI_CastOvenNo"
                  rules={[
                    { required: true, message: "Please enter Cast Oven No" },
                  ]}
                >
                  <Input placeholder="Enter Cast Oven No" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Oven Input Time"
                  name="ORI_OvenInputTime"
                  rules={[
                    { required: true, message: "Please enter Oven Input Time" },
                  ]}
                >
                  <Input placeholder="Enter Oven Input Time" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Oven Time"
                  name="ORI_OvenHHTime"
                  rules={[
                    { required: true, message: "Please enter Oven Time" },
                  ]}
                >
                  <Input placeholder="Enter Oven HH Time" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Oven Time"
                  name="ORI_OvenMMTime"
                  rules={[
                    { required: true, message: "Please enter Oven Time" },
                  ]}
                >
                  <Input placeholder="Enter Oven MM Time" />
                </Form.Item>
              </Col>
            </Row>

            {/* Sixth Row - Additional Fields */}
            <Row gutter={24}>
              {/* <Col span={4}>
                <Form.Item label="Oven Input Time" name="ORI_OvenInputTime" rules={[{ required: true, message: "Please enter Oven Input Time" }]}>
                  <Input placeholder="Enter Oven Input Time" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Oven Time" name="ORI_OvenHHTime" rules={[{ required: true, message: "Please enter Oven Time" }]}>
                  <Input placeholder="Enter Oven HH Time" />
                </Form.Item>
              </Col> */}
              <Col span={4}>
                <Form.Item
                  label="Oven Time"
                  name="ORI_OvenMMTime"
                  rules={[
                    { required: true, message: "Please enter Oven Time" },
                  ]}
                >
                  <Input placeholder="Enter Oven MM Time" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Mold Place"
                  name="ORI_MoldPlace"
                  rules={[
                    { required: true, message: "Please enter Mold Place" },
                  ]}
                >
                  <Input placeholder="Enter Mold Place" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Warehouse"
                  name="ORI_Warehouse"
                  rules={[
                    { required: true, message: "Please enter Warehouse" },
                  ]}
                >
                  <Input placeholder="Enter Warehouse" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Instruction"
                  name="ORI_Instruction"
                  rules={[
                    { required: true, message: "Please enter Instruction" },
                  ]}
                >
                  <Input placeholder="Enter Instruction" />
                </Form.Item>
              </Col>
            </Row>

            {/* Continue with all the rest of the fields in similar fashion */}
          </Form>
        </>
      ) : (
        <div>No data</div>
      )}
    </Modal>
  );
};

export default ModalAddOutbound;
