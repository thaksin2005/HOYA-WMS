import {
  Modal,
  Form,
  Input,
  Divider,
  Row,
  Col,
  DatePicker,
  Switch,
} from "antd";
import { Factory, Plus } from "lucide-react";
import dayjs from "dayjs";

const ModalAddFactory = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();

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

  const renderFormItem = (
    label,
    name,
    placeholder,
    rules,
    Component = Input,
    props = {}
  ) => (
    <Form.Item label={label} name={name} rules={rules}>
      <Component placeholder={placeholder} {...props} />
    </Form.Item>
  );

  return (
    <Modal
      centered
      title={
        <>
          <Factory size={20} /> New Location
        </>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Plus size={16} /> Add Location
        </div>
      }
      width={900}
      style={{ padding: "20px 40px" }}
      destroyOnClose={false}
    >
      <Divider />
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          L_Code: "",
          L_Description: "",
          P_IDPlace: "",
          L_VZone: "",
          L_HZone: "",
          L_IsActive: true,
          L_IsBlock: false,
          L_IsReserve: false,
          S_IDStacker: "",
          T_IDTray: "",
          UA_IDCreateBy: "",
          L_CreateOn: dayjs(),
          UA_IDUpdateBy: "",
          L_UpdateOn: dayjs(),
          L_Remarks: "",
          Warehouse: "",
          Stacker: "",
          Row: "",
          Col: "",
          Lvl: "",
        }}
      >
        <Row gutter={[24, 12]}>
          {/* <Col span={12}>
            {renderFormItem("Location Code", "L_Code", "Location Code", [
              { required: true, message: "Please input the Location Code!" },
            ])}
          </Col> */}

          <Col span={12}>
            {renderFormItem(
              "Location Description",
              "L_Description",
              "Description",
              []
            )}
          </Col>
          <Col span={12}>
            {renderFormItem(
              "Location Vertical Zone",
              "L_VZone",
              "Location Vertical Zone",
              []
            )}
          </Col>
        </Row>

        <Row gutter={[24, 12]}>
          
          <Col span={12}>
            {renderFormItem(
              "Location Horizontal Zone",
              "L_HZone",
              "Location Horizontal Zone",
              []
            )}
          </Col>
        </Row>

        <Row gutter={[24, 12]}>
          {/* <Col span={6}>
            {renderFormItem("Place ID", "P_IDPlace", "Place ID", [])}
          </Col> */}
          <Col span={6}>
            {renderFormItem(
              "Location Is Active",
              "L_IsActive",
              "Location Is Active",
              [],
              Switch
            )}
          </Col>

          <Col span={6}>
            {renderFormItem(
              "Location Is Block",
              "L_IsBlock",
              "Location Is Block",
              [],
              Switch
            )}
          </Col>
          <Col span={6}>
            {renderFormItem(
              "Location Is Reserve",
              "L_IsReserve",
              "Location Is Reserve",
              [],
              Switch
            )}
          </Col>
        </Row>

        {/* <Row gutter={[24, 12]}>
          <Col span={12}>
            {renderFormItem("Stacker ID", "S_IDStacker", "Stacker ID", [])}
          </Col>
          <Col span={12}>
            {renderFormItem("Tray ID", "T_IDTray", "Tray ID", [])}
          </Col>
        </Row> */}

        <Row gutter={[24, 12]}>
          <Col span={12} style={{ display: "none" }}>
            {renderFormItem(
              "UA ID Create By",
              "UA_IDCreateBy",
              "UA ID Create By",
              []
            )}
          </Col>
        </Row>

        <Row gutter={[24, 12]}>
          <Col span={12} style={{ display: "none" }}>
            {renderFormItem(
              "Location Create On",
              "L_CreateOn",
              "Location Create On",
              [],
              DatePicker,
              {
                format: "YYYY-MM-DD HH:mm:ss",
                disabled: true,
                showTime: true,
              }
            )}
          </Col>
          <Col span={12} style={{ display: "none" }}>
            {renderFormItem(
              "UA ID Update By",
              "UA_IDUpdateBy",
              "UA ID Update By",
              []
            )}
          </Col>
        </Row>

        <Row gutter={[24, 12]}>
          <Col span={12} style={{ display: "none" }}>
            {renderFormItem(
              "Location Update On",
              "L_UpdateOn",
              "Location Update On",
              [],
              DatePicker,
              {
                format: "YYYY-MM-DD HH:mm:ss",
                disabled: true,
                showTime: true,
              }
            )}
          </Col>
        </Row>

        <Row gutter={[24, 12]}>
          {/* <Col span={12}>
            {renderFormItem("Warehouse", "Warehouse", "Warehouse", [])}
          </Col> */}
          {/* <Col span={12}>
            {renderFormItem("Stacker", "Stacker", "Stacker", [])}
          </Col> */}
        </Row>

        {/* <Row gutter={[24, 12]}>
          <Col span={12}>{renderFormItem("Row", "Row", "Row", [])}</Col>
          <Col span={12}>{renderFormItem("Colum", "Col", "Colum", [])}</Col>
        </Row> */}

        {/* <Row gutter={[24, 12]}>
          <Col span={12}>{renderFormItem("Level", "Lvl", "Level", [])}</Col>
          <Col span={12}>
            {renderFormItem("Remarks", "Remarks", "Remarks", [])}
          </Col>
        </Row> */}
      </Form>
      <Divider />
    </Modal>
  );
};

export default ModalAddFactory;
