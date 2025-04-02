// import React, { useState, useEffect } from "react";
// import { Select, Modal, Form, Input, Divider, Row, Col, DatePicker, notification } from "antd";
// import { Factory, FileSliders, Plus } from "lucide-react";
// import dayjs from "dayjs";

// const DrawerAdd = ({ open, onClose }) => {
//   const [form] = Form.useForm();
//   const [moldCode, setMoldCode] = useState(""); // Store selected mold code
//   const [isInterface, setIsInterface] = useState(false); // Flag for interface mode

//   useEffect(() => {
//      // Simulate fetching mold master data (replace with your actual API call)
//     const fetchMoldMasters = async () => {
//       try {
//         const response = await new Promise(resolve => setTimeout(() => resolve([
//           { id: 1, name: "Mold Master 1", code: "MM001" },
//           { id: 2, name: "Mold Master 2", code: "MM002" },
//           { id: 3, name: "Mold Master 3", code: "MM003" },
//         ]), 500)); // Simulate API delay

//         return response;
//       } catch (error) {
//         console.error("Error fetching mold masters:", error);
//         return [];
//       }
//     };
//     fetchMoldMasters().then(moldMasters => setMoldMasterOptions(moldMasters));
//   }, []);

//   const [moldMasterOptions, setMoldMasterOptions] = useState([]);

//   const handleMoldMasterChange = (value) => {
//     const selectedMold = moldMasterOptions.find(item => item.id === value);
//     if (selectedMold) {
//       setMoldCode(selectedMold.code);
//       form.setFieldsValue({ iriMoldCode: selectedMold.code }); // Update hidden field
//     } else {
//       setMoldCode("");
//       form.setFieldsValue({ iriMoldCode: "" });
//     }
//   };

//   const handleOk = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         console.log("Form Values:", values);
//         notification.success({
//           message: "Success",
//           description: "Data has been successfully saved.",
//           duration: 3,
//         });
//         onClose();
//         form.resetFields();
//         setMoldCode(""); // Reset Mold Code
//       })
//       .catch((errorInfo) => {
//         console.error("Validation Failed:", errorInfo);
//       });
//   };

//   const handleCancel = () => {
//     onClose();
//     form.resetFields();
//     setMoldCode(""); // Reset Mold Code
//   };

//   const renderFormItem = (label, name, placeholder, rules, Component = Input, props = {}) => {
//     const formItemProps = {};
//     if (isInterface && ["iriPlantNo", "iriStockType", "iriPlaceNo", "iriTransactionCD", "iriMoldSerial"].includes(name)) {
//       formItemProps.disabled = true;
//     }
//     if (["iriStatus", "uaIdUpdateBy", "iriUpdateOn", "iriQty", "iriProgramID", "iriEmpNo", "iriWorkstationNo", "iriLotNo", "iriSndrcvPlantNo", "iriSndrcvStockType", "iriSndrcvPlaceNo", "iriSndrcvTransactionCD", "iriReworkCount"].includes(name)) {
//       formItemProps.disabled = true;
//     }

//     if (name === "iriQty") {
//       form.setFieldsValue({ iriQty: 1 });
//     }

//     return (
//       <Form.Item label={label} name={name} rules={rules} {...formItemProps}>
//         <Component placeholder={placeholder} {...props} />
//       </Form.Item>
//     );
//   };

//   return (
//     <Modal
//       centered
//       title={<><FileSliders size={20} /> Add Inbound</>}
//       open={open}
//       onOk={handleOk}
//       onCancel={handleCancel}
//       okText={<div style={{ display: "flex", alignItems: "center", gap: "6px" }}><Plus size={16} /> Add</div>}
//       width={900}
//       styles={{ body: { padding: "20px 40px" } }}
//       destroyOnClose={false}
//     >
//       <Divider />
//       <Form
//         form={form}
//         layout="vertical"
//         initialValues={{
//           iriJobNumber: "",
//           mmIdMoldMaster: "",
//           iriStatus: "",
//           iriMsgError: "",
//           uaIdCreateBy: "",
//           iriCreateOn: dayjs(),
//           uaIdUpdateBy: "",
//           iriUpdateOn: dayjs(),
//           iriPlantNo: "",
//           iriStockType: "",
//           iriPlaceNo: "",
//           iriMoldCode: "",
//           iriTransactionCD: "",
//           iriQty: 1, // Default value for iriQty
//           iriProgramID: "",
//           iriEmpNo: "",
//           iriWorkstationNo: "",
//           iriLotNo: "",
//           iriSndrcvPlantNo: "",
//           iriSndrcvStockType: "",
//           iriSndrcvPlaceNo: "",
//           iriSndrcvTransactionCD: "",
//           iriMoldSerial: "",
//           iriReworkCount: "",
//           irIdInboundRequest: "",
//           relId: "",
//           relIdType: "",
//         }}
//       >
//         <Row gutter={[24, 12]}>
//           <Col span={8}>
//             {renderFormItem("Job Number", "iriJobNumber", "Enter Job Number", [])}
//           </Col>
//           <Col span={8}>
//             <Form.Item
//               name="mmIdMoldMaster"
//               label="Mold Master"
//               rules={[{ required: true, message: "Please select Mold Master" }]}
//             >
//               <Select placeholder="Select Mold Master" style={{ width: '100%' }} onChange={handleMoldMasterChange}>
//                 {moldMasterOptions.map(mold => (
//                   <Select.Option key={mold.id} value={mold.id}>{mold.name}</Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col span={8}>
//             {renderFormItem("Status", "iriStatus", "Enter Status", [])}
//           </Col>
//         </Row>

//         {/* ... other fields */}

//         <Row gutter={[24, 12]}>
//           <Col span={8}>
//             {renderFormItem("Plant No", "iriPlantNo", "Enter Plant No", [])}
//           </Col>
//           <Col span={8}>
//             {renderFormItem("Stock Type", "iriStockType", "Enter Stock Type", [])}
//           </Col>
//           <Col span={8}>
//             {renderFormItem("Place No", "iriPlaceNo", "Enter Place No", [])}
//           </Col>
//         </Row>
//                 {/* ... other fields */}
//         <Row gutter={[24, 12]}>
//           <Col span={8}>
//             {renderFormItem("Mold Serial", "iriMoldSerial", "Enter Mold Serial", [])}
//           </Col>
//         </Row>

//         <Form.Item name="iriMoldCode" hidden>
//           <Input /> {/* Hidden input for Mold Code */}
//         </Form.Item>

//         <Form.Item name="irIdInboundRequest" hidden>
//           <Input />
//         </Form.Item>

//         <Form.Item name="relId" hidden>
//           <Input />
//         </Form.Item>

//         <Form.Item name="relIdType" hidden>
//           <Input />
//         </Form.Item>

//         <Form.Item name="iriId" hidden>
//           <Input />
//         </Form.Item>

//         <Form.Item name="iriJobNumber" hidden>
//           <Input />
//         </Form.Item>

//         <Form.Item name="iriMsgError" hidden>
//           <Input />
//         </Form.Item>

//         <Form.Item name="uaIdCreateBy" hidden>
//           <Input />
//         </Form.Item>

//         <Form.Item name="iriCreateOn" hidden>
//           <Input />
//         </Form.Item>

//       </Form>
//       <Divider />
//     </Modal>
//   );
// };

// export default DrawerAdd;




import React, { useState, useEffect } from "react";
import { Select, Modal, Form, Input, Divider, Row, Col, DatePicker, notification } from "antd";
import { Factory, FileSliders, Plus } from "lucide-react";
import dayjs from "dayjs";

const DrawerAdd = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const [moldCode, setMoldCode] = useState(""); // Store selected mold code
  const [isInterface, setIsInterface] = useState(false); // Flag for interface mode

  useEffect(() => {
     // Simulate fetching mold master data (replace with your actual API call)
    const fetchMoldMasters = async () => {
      try {
        const response = await new Promise(resolve => setTimeout(() => resolve([
          { id: 1, name: "Mold Master 1", code: "MM001" },
          { id: 2, name: "Mold Master 2", code: "MM002" },
          { id: 3, name: "Mold Master 3", code: "MM003" },
        ]), 500)); // Simulate API delay

        return response;
      } catch (error) {
        console.error("Error fetching mold masters:", error);
        return [];
      }
    };
    fetchMoldMasters().then(moldMasters => setMoldMasterOptions(moldMasters));
  }, []);

  const [moldMasterOptions, setMoldMasterOptions] = useState([]);

  const handleMoldMasterChange = (value) => {
    const selectedMold = moldMasterOptions.find(item => item.id === value);
    if (selectedMold) {
      setMoldCode(selectedMold.code);
      form.setFieldsValue({ iriMoldCode: selectedMold.code }); // Update hidden field
    } else {
      setMoldCode("");
      form.setFieldsValue({ iriMoldCode: "" });
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form Values:", values);
        notification.success({
          message: "Success",
          description: "Data has been successfully saved.",
          duration: 3,
        });
        onClose();
        form.resetFields();
        setMoldCode(""); // Reset Mold Code
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
    setMoldCode(""); // Reset Mold Code
  };

  const renderFormItem = (label, name, placeholder, rules, Component = Input, props = {}) => {
    const formItemProps = {};
    if (isInterface && ["iriPlantNo", "iriStockType", "iriPlaceNo", "iriTransactionCD", "iriMoldSerial"].includes(name)) {
      formItemProps.disabled = true;
    }
    if (["iriStatus", "uaIdUpdateBy", "iriUpdateOn", "iriQty", "iriProgramID", "iriEmpNo", "iriWorkstationNo", "iriLotNo", "iriSndrcvPlantNo", "iriSndrcvStockType", "iriSndrcvPlaceNo", "iriSndrcvTransactionCD", "iriReworkCount"].includes(name)) {
      formItemProps.disabled = true;
    }

    if (name === "iriQty") {
      form.setFieldsValue({ iriQty: 1 });
    }

    return (
      <Form.Item label={label} name={name} rules={rules} {...formItemProps}>
        <Component placeholder={placeholder} {...props} />
      </Form.Item>
    );
  };

  return (
    <Modal
      centered
      title={<><FileSliders size={20} /> Add Inbound</>}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={<div style={{ display: "flex", alignItems: "center", gap: "6px" }}><Plus size={16} /> Add</div>}
      width={900}
      styles={{ body: { padding: "20px 40px" } }}
      destroyOnClose={false}
    >
      <Divider />
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          iriJobNumber: "",
          mmIdMoldMaster: "",
          iriStatus: "",
          iriMsgError: "",
          uaIdCreateBy: "",
          iriCreateOn: dayjs(),
          uaIdUpdateBy: "",
          iriUpdateOn: dayjs(),
          iriPlantNo: "",
          iriStockType: "",
          iriPlaceNo: "",
          iriMoldCode: "",
          iriTransactionCD: "",
          iriQty: 1, // Default value for iriQty
          iriProgramID: "",
          iriEmpNo: "",
          iriWorkstationNo: "",
          iriLotNo: "",
          iriSndrcvPlantNo: "",
          iriSndrcvStockType: "",
          iriSndrcvPlaceNo: "",
          iriSndrcvTransactionCD: "",
          iriMoldSerial: "",
          iriReworkCount: "",
          irIdInboundRequest: "",
          relId: "",
          relIdType: "",
        }}
      >
        <Row gutter={[24, 12]}>
          <Col span={8}>
            {renderFormItem("Job Number", "iiJobNumber", "Enter Job Number", [])}
          </Col>
          <Col span={8}>
            <Form.Item
              name="mmIdMoldMaster"
              label="Mold Master"
              rules={[{ required: true, message: "Please select Mold Master" }]}
            >
              <Select placeholder="Select Mold Master" style={{ width: '100%' }} onChange={handleMoldMasterChange}>
                {moldMasterOptions.map(mold => (
                  <Select.Option key={mold.id} value={mold.id}>{mold.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            {renderFormItem("Status", "iriStatus", "Enter Status", [])}
          </Col>
        </Row>

        {/* ... other fields */}

        <Row gutter={[24, 12]}>
          <Col span={8}>
            {renderFormItem("Plant No", "iriPlantNo", "Enter Plant No", [])}
          </Col>
          <Col span={8}>
            {renderFormItem("Stock Type", "iriStockType", "Enter Stock Type", [])}
          </Col>
          <Col span={8}>
            {renderFormItem("Place No", "iriPlaceNo", "Enter Place No", [])}
          </Col>
        </Row>
                {/* ... other fields */}
        <Row gutter={[24, 12]}>
          <Col span={8}>
            {renderFormItem("Mold Serial", "iriMoldSerial", "Enter Mold Serial", [])}
          </Col>
        </Row>

        <Form.Item name="iriMoldCode" hidden>
          <Input /> {/* Hidden input for Mold Code */}
        </Form.Item>

        <Form.Item name="irIdInboundRequest" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="relId" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="relIdType" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="iriId" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="iriJobNumber" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="iriMsgError" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="uaIdCreateBy" hidden>
          <Input />
        </Form.Item>

        <Form.Item name="iriCreateOn" hidden>
          <Input />
        </Form.Item>

      </Form>
      <Divider />
    </Modal>
  );
};

export default DrawerAdd;