// import React, { useState, useEffect } from "react";
// import {
//   Drawer,
//   Form,
//   Input,
//   Button,
//   Space,
//   Row,
//   Col,
//   Card,
//   Typography,
//   Select,
// } from "antd";
// import NotificationAPI from "../../../components/NotificationAPI";
// import axios from "axios";

// const { Title } = Typography;
// const DrawerDetailWarehouse = ({ open, onClose, record }) => {
//   const [form] = Form.useForm();
//   const [isEdit, setIsEdit] = useState(false);
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [openNotification, setOpenNotification] = useState(null);
//   const [description, setDescription] = useState(null);

//   useEffect(() => {
//     if (record) {
//       form.setFieldsValue(record);
//     }
//   }, [record, form]);

//   useEffect(() => {
//     if (open) {
//       setIsEdit(false);
//       setIsDisabled(true);
//     }
//   }, [open]);

//   useEffect(() => {
//     if (isEdit) {
//       setIsDisabled(false);
//     }
//   }, [isEdit]);

//   const handleOk = async () => {
//     form
//       .validateFields()
//       .then(async () => {
//         const formData = form.getFieldsValue();
//         const formattedData = {
//           F_ID: record.id, // หรือค่าอื่นที่เหมาะสม
//           F_Code: formData.factoryCode,
//           F_ShortCode: formData.factoryShortCode,
//           F_Name: formData.factoryName,
//           F_City: formData.factoryCity,
//           F_Site: formData.factorySite,
//           F_Address: formData.address,
//           F_Tel: formData.tel,
//           F_Email: formData.email,
//           F_TaxID: formData.taxId,
//           UA_IDCreateBy: formData.createBy, // หรือค่าอื่นที่เหมาะสม
//           F_IsActive: formData.isActive,
//           F_Remarks: formData.remark, // หรือค่าอื่นที่เหมาะสม
//           C_IDCompany: formData.company, // หรือค่าอื่นที่เหมาะสม
//         };
//         // console.log(formattedData);

//         const response = await axios.put(
//           "http://192.168.195.45:3333/api/editFactory",
//           formattedData
//         );

//         // console.log(response);

//         setOpenNotification("success");
//         setDescription("Data has been successfully saved.");

//         onClose();
//         form.resetFields();
//         setIsEdit(false);
//       })
//       .catch((errorInfo) => {
//         console.error("Validation Failed:", errorInfo);

//         setOpenNotification("error");
//         setDescription("There was an error processing your request.");
//       });
//   };

//   const colLayout = {
//     labelCol: { span: 6 },
//     wrapperCol: { span: 18 },
//   };

//   return (
//     <Drawer
//       title="Detail"
//       open={open}
//       onClose={onClose}
//       placement="bottom"
//       closable={false}
//       height={600}
//       extra={
//         <Space>
//           <Button onClick={onClose}>Close</Button>
//           {isEdit ? (
//             <Button type="primary" onClick={handleOk}>
//               OK
//             </Button>
//           ) : (
//             <Button type="primary" onClick={() => setIsEdit(true)}>
//               Edit
//             </Button>
//           )}
//         </Space>
//       }
//     >
//       <NotificationAPI
//         openNotification={openNotification}
//         description={description}
//       />
//       {open ? (
//         <Form form={form} layout="horizontal" {...colLayout}>
//           <Row gutter={[16, 16]}>
//             <Col span={24}>
//               <Card bordered={true}>
//                 <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
//                   Warehouse Details
//                 </Title>
//                 <Row gutter={16}>
//                   <Col span={12}>
//                     <Form.Item name="warehouseCode" label="Warehouse Code">
//                       <Input disabled={true} />
//                     </Form.Item>
//                   </Col>
//                   <Col span={12}>
//                     <Form.Item
//                       name="warehouseShortCode"
//                       label="Warehouse Short Code"
//                     >
//                       <Input disabled={isDisabled} />
//                     </Form.Item>
//                   </Col>
//                 </Row>
//                 <Row gutter={16}>
//                   <Col span={12}>
//                     <Form.Item name="warehouseName" label="Warehouse Name">
//                       <Input disabled={isDisabled} />
//                     </Form.Item>
//                   </Col>
//                   <Col span={12}>
//                     <Form.Item name="warehouseCity" label="Warehouse City">
//                       <Input disabled={isDisabled} />
//                     </Form.Item>
//                   </Col>
//                 </Row>
//                 <Row gutter={16}>
//                   <Col span={12}>
//                     <Form.Item name="warehouseSite" label="Warehouse Site">
//                       <Input disabled={isDisabled} />
//                     </Form.Item>
//                   </Col>
//                   <Col span={12}>
//                     <Form.Item name="createdOn" label="Warehouse Created On">
//                       <Input disabled />
//                     </Form.Item>
//                   </Col>
//                 </Row>
//                 <Row gutter={16}>
//                   <Col span={12}>
//                     <Form.Item name="isActive" label="Warehouse Active">
//                       <Select disabled={isDisabled}>
//                         <Select.Option value="true">Active</Select.Option>
//                         <Select.Option value="false">Inactive</Select.Option>
//                       </Select>
//                     </Form.Item>
//                   </Col>
//                   <Col span={12}>
//                     <Form.Item name="address" label="Warehouse Address">
//                       <Input disabled={isDisabled} />
//                     </Form.Item>
//                   </Col>
//                 </Row>
//                 <Row gutter={16}>
//                   <Col span={12}>
//                     <Form.Item name="tel" label="Warehouse Tel">
//                       <Input disabled={isDisabled} />
//                     </Form.Item>
//                   </Col>
//                   <Col span={12}>
//                     <Form.Item name="email" label="Warehouse Email">
//                       <Input disabled={isDisabled} />
//                     </Form.Item>
//                   </Col>
//                 </Row>
//                 <Row gutter={16}>
//                   <Col span={12}>
//                     <Form.Item name="taxId" label="Warehouse Tax ID">
//                       <Input disabled={isDisabled} />
//                     </Form.Item>
//                   </Col>
//                   <Col span={12}>
//                     <Form.Item name="remark" label="Warehouse Remarks">
//                       <Input disabled={isDisabled} />
//                     </Form.Item>
//                   </Col>
//                 </Row>
//                 <Row gutter={16}>
//                   <Col span={12}>
//                     <Form.Item name="company" label="ID Company">
//                       <Input disabled={isDisabled} />
//                     </Form.Item>
//                   </Col>
//                   <Col span={12}>
//                     <Form.Item name="createBy" label="Create By">
//                       <Input disabled={isDisabled} />
//                     </Form.Item>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//           </Row>
//         </Form>
//       ) : (
//         <div>No data</div>
//       )}
//     </Drawer>
//   );
// };

// export default DrawerDetailWarehouse;

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
  Switch,
} from "antd";
import NotificationAPI from "../../../components/NotificationAPI";
import axios from "axios";

const { Title } = Typography;
const ModalDetailWarehouse = ({ open, onClose, record, handleEditClick }) => {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [openNotification, setOpenNotification] = useState(null);
  const [description, setDescription] = useState(null);
  const [warehouseActive, setWarehouseActive] = useState(false);

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
      setWarehouseActive(record.warehouseActive === "true");
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

  const handleOk = async () => {
    form
      .validateFields()
      .then(async () => {
        const formData = form.getFieldsValue();
        const formattedData = {
          W_Code: formData.warehouseCode,
          W_Name: formData.warehouseName,
          F_IDFactory: formData.factory, // Assuming 'factory' field holds F_IDFactory
          UA_IDCreateBy: formData.createBy,
          W_IsActive: formData.isActive,
          W_Remarks: formData.remark,
        };

        try {
          const response = await axios.put(
            "http://192.168.195.45:3333/api/editWarehouse", // Changed API endpoint
            formattedData
          );

          setOpenNotification("success");
          setDescription("Data has been successfully saved.");

          onClose();
          form.resetFields();
          setIsEdit(false);
        } catch (error) {
          console.error("Error updating warehouse:", error);
          setOpenNotification("error");
          setDescription("There was an error processing your request.");
        }
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
        setOpenNotification("error");
        setDescription("There was an error processing your request.");
      });
  };

  const colLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <Modal
      title="Detail"
      open={open}
      onCancel={onClose}
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
      width={1100} // ปรับขนาด modal ตามต้องการ
    >
      <NotificationAPI
        openNotification={openNotification}
        description={description}
      />
      {open ? (
        <Form form={form} layout="horizontal" {...colLayout}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Warehouse Details
                </Title>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="warehouseCode" label="Warehouse Code">
                      <Input disabled={true} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="warehouseName" label="Warehouse Name">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="warehouseActive" label="Warehouse Active">
                      <Switch
                        checkedChildren="Active"
                        unCheckedChildren="Inactive"
                        checked={warehouseActive}
                        onChange={(checked) => {
                          setWarehouseActive(checked);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="remark" label="Warehouse Remarks">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="factory" label="Factory">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="site" label="Factory Site">
                      <Input disabled={true} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="uaFullName" label="Create By">
                      <Input disabled={true} />
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

export default ModalDetailWarehouse;
