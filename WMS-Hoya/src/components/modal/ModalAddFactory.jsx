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
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const ModalAddFactory = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log("Form Values:", values);

        try {
          const response = await axios.post(
            "http://192.168.195.45:3333/api/addFactory",
            values
          );
          console.log(response);
        } catch (error) {
          console.log(error);
        }

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
          <Factory size={20} /> New Factory
        </>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Plus size={16} /> Add Factory
        </div>
      }
      width={900}
      styles={{
        body: { padding: "20px 40px" },
      }}
      destroyOnClose={false}
    >
      <Divider />
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          F_Code: "AYT01",
          F_ShortCode: "AYT",
          F_Name: "HOYA LENS AYUTTHAYA 01",
          F_City: "AYUTTHAYA",
          F_Site: "A732",
          F_Address:
            "123/123 Moo 123, Tambon Nong Prue, Amphoe Mueang Ayutthaya, ",
          F_Tel: "081234567890",
          F_Email: "ayutthaya01@hoya.com",
          F_TaxID: "123456789012345",
          F_IsActive: true,
          F_Remarks: "",
          F_CreateOn: dayjs(), // Set initial value to current date and time
          UA_IDCreateBy: 1,
        }}
      >
        <Row gutter={[24, 12]}>
          <Col span={12}>
            {renderFormItem("Factory Code", "F_Code", "Factory Code", [
              { required: true, message: "Please input the Factory Code!" },
            ])}
          </Col>
          <Col span={12}>
            {renderFormItem("Factory Name", "F_Name", "Factory Name", [
              { required: true, message: "Please input the Factory Name!" },
            ])}
          </Col>
        </Row>

        <Row gutter={[24, 12]}>
          <Col span={12}>
            {renderFormItem(
              "Factory ShortCode",
              "F_ShortCode",
              "Factory ShortCode",
              [
                {
                  required: true,
                  message: "Please input the Factory ShortCode!",
                },
              ]
            )}
          </Col>
          <Col span={12}>
            {renderFormItem("Factory Site", "F_Site", "Factory Site", [
              { required: true, message: "Please input the Factory Site!" },
            ])}
          </Col>
        </Row>

        <Row gutter={[24, 12]}>
          <Col span={12}>
            {renderFormItem("Factory City", "F_City", "Factory City", [
              { required: true, message: "Please input the Factory City!" },
            ])}
          </Col>
          <Col span={12}>
            {renderFormItem(
              "Factory Address",
              "F_Address",
              "Factory Address",
              []
            )}
          </Col>
        </Row>

        <Row gutter={[24, 12]}>
          <Col span={12}>
            {renderFormItem("Factory Tel", "F_Tel", "Factory Tel", [])}
          </Col>
          <Col span={12}>
            {renderFormItem("Factory Email", "F_Email", "Factory Email", [])}
          </Col>
        </Row>

        {/* <Row gutter={[24, 12]}>
          <Col span={12}>
            {renderFormItem("Company ID", "C_IDCompany", "Company ID", [
              { required: true, message: "Please input the Company ID!" },
            ])}
          </Col>
          <Col span={12}>
            {renderFormItem("Factory Tax ID", "F_TaxID", "Factory Tax ID", [])}
          </Col>
        </Row> */}

        <Row gutter={[24, 12]}>
          <Col span={12}>
            {renderFormItem("Remarks", "F_Remarks", "Remarks", [])}
          </Col>
          <Col span={12}>
            {renderFormItem("Is Active", "F_IsActive", "Is Active", [], Switch)}
          </Col>
          <Col span={12} style={{ display: "none" }}>
            {renderFormItem(
              "Created By",
              "UA_IDCreateBy",
              "Created By",
              [],
              Switch
            )}
          </Col>
          <Col span={12} style={{ display: "none" }}>
            {renderFormItem(
              "Created On",
              "F_CreateOn",
              "Created On",
              [],
              Switch
            )}
          </Col>
        </Row>
      </Form>
      <Divider />
    </Modal>
  );
};

export default ModalAddFactory;
