import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const ButtonAdd = ({ onClick }) => (
  <FloatButton
    tooltip={<div>Add</div>}
    icon={<PlusOutlined />}
    type="primary"
    onClick={onClick}
  />
);
export default ButtonAdd;
