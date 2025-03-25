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
// } from "antd";
// import NotificationAPI from "../../../components/NotificationAPI";

// const { Title } = Typography;
// const DrawerDetailLocation = ({ open, onClose, record }) => {
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

//   const handleOk = () => {
//     form
//       .validateFields()
//       .then(() => {
//         console.log(form.getFieldsValue());

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

//   return (
//     <Drawer
//       title="Location Detail"
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
//         <Form form={form} layout="vertical">
//           <Row gutter={[16]}>
//             {/* Factory Information */}
//             <Col span={4}>
//               <Card bordered={true}>
//                 <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
//                   Factory Information
//                 </Title>
//                 <Form.Item name="F_IDFactory" label="Factory ID">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="F_Code" label="Factory Code">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="F_Name" label="Factory Name">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="F_ShortCode" label="Factory Short Code">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="F_Site" label="Factory Site">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="F_IsActive" label="Factory Active">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//               </Card>
//             </Col>

//             {/* Warehouse Information */}
//             <Col span={4}>
//               <Card bordered={true}>
//                 <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
//                   Warehouse Information
//                 </Title>
//                 <Form.Item name="W_IDWarehouse" label="Warehouse ID">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="W_Code" label="Warehouse Code">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="W_Name" label="Warehouse Name">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="W_IsActive" label="Warehouse Active">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//               </Card>
//             </Col>

//             {/* Place Information */}
//             <Col span={4}>
//               <Card bordered={true}>
//                 <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
//                   Place Information
//                 </Title>
//                 <Form.Item name="P_IDPlace" label="Place ID">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="P_Code" label="Place Code">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="P_Name" label="Place Name">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="P_IsAutoStorage" label="Auto Storage">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//               </Card>
//             </Col>

//             {/* Location Information */}
//             <Col span={4}>
//               <Card bordered={true}>
//                 <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
//                   Location Information
//                 </Title>
//                 <Form.Item name="L_Code" label="Location Code">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="L_Description" label="Location Description">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="L_VZone" label="Vertical Zone">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="L_HZone" label="Horizontal Zone">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="L_IsActive" label="Location Active">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="L_IsBlock" label="Location Block">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="L_IsReserve" label="Location Reserve">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//               </Card>
//             </Col>

//             {/* Stacker Information */}
//             <Col span={4}>
//               <Card bordered={true}>
//                 <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
//                   Stacker Information
//                 </Title>
//                 <Form.Item name="S_IDStacker" label="Stacker ID">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="S_Code" label="Stacker Code">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="S_Name" label="Stacker Name">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="S_IsActive" label="Stacker Active">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//               </Card>
//             </Col>

//             {/* Tray Information */}
//             <Col span={4}>
//               <Card bordered={true}>
//                 <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
//                   Tray Information
//                 </Title>
//                 <Form.Item name="T_IDTray" label="Tray ID">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="T_Number" label="Tray Number">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
//                 <Form.Item name="T_Status" label="Tray Status">
//                   <Input disabled={isDisabled} />
//                 </Form.Item>
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

// export default DrawerDetailLocation;

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
  Select,
} from "antd";
import NotificationAPI from "../../../components/NotificationAPI";

const { Title } = Typography;
const ModalDetailLocation = ({ open, onClose, record }) => {
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
        const formData = form.getFieldsValue();
        console.log(formData);

        // API call here
        // ... your API call ...

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
      title="Location Detail"
      open={open}
      onCancel={onClose}
      width={1100}
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
          <Row gutter={[16]}>
            <Col span={24}>
              <Card bordered={true}>
                <Title level={5} style={{ marginTop: 0, color: "#DA241C" }}>
                  Location Information
                </Title>
                <Row gutter={[16]}>
                  <Col span={4}>
                    <Form.Item name="L_Code" label="Location Code">
                    <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      name="L_Description"
                      label="Description"
                    >
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="P_IDPlace" label="Place Code">
                    <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="L_VZone" label="Vertical Zone">
                    <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="L_HZone" label="Horizontal Zone">
                    <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="L_IsActive" label="Location Active">
                      <Select disabled={isDisabled}>
                        <Select.Option value={true}>Active</Select.Option>
                        <Select.Option value={false}>Inactive</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16]}>
                  <Col span={4}>
                    <Form.Item name="L_IsBlock" label="Location Block">
                      <Select disabled={isDisabled}>
                        <Select.Option value={true}>Blocked</Select.Option>
                        <Select.Option value={false}>Not Blocked</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="L_IsReserve" label="Location Reserve">
                      <Select disabled> 
                        <Select.Option value={true}>Reserved</Select.Option>
                        <Select.Option value={false}>
                          Not Reserved
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="S_IDStacker" label="Stacker Code">
                    <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="T_IDTray" label="Tray ID">
                    <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="Location" label="Location">
                    <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="L_Remarks" label="Remarks">
                      <Input disabled={isDisabled} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16]}>
                  {/* <Col span={4}>
                    <Form.Item name="UA_IDCreateBy" label="Created By">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="L_CreateOn" label="Created On">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="UA_IDUpdateBy" label="Updated By">
                      <Input disabled />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name="L_UpdateOn" label="Updated On">
                      <Input disabled />
                    </Form.Item>
                  </Col> */}
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

export default ModalDetailLocation;
