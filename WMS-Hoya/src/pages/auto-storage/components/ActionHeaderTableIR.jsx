import React, { useEffect } from "react";
import { Button, Col, Row, Input, Select, Form, Divider } from "antd";

const ActionHeaderTable = ({
  AddButton,
  EditButton,
  DeleteButton,
  handleResetClick,
  setHandleResetClick,
}) => {
  const [form] = Form.useForm();
  const handleReset = () => {
    form.resetFields();
    setHandleResetClick(false);
  };

  useEffect(() => {
    handleReset();
  }, [handleResetClick]);

  return (
    <>
      <Form form={form}>
        <Row gutter={[16, 16]}>

        </Row>
      </Form>
      <Row align="middle" gutter={[16, 16]}>
        <Col span={12} justify="end" xs={24} sm={24} md={24} lg={9} xl={12}>
          <div className="header-button-group">

            <Button type="primary" onClick={AddButton}
             variant="solid"
             style={{ backgroundColor: 'red', color: 'white' }}>
              Add
            </Button>

            <Button type="primary" onClick={EditButton}
             variant="solid"
             style={{ backgroundColor: 'orange', color: 'white' }}>
              Edit
            </Button>

            <Button type="primary" onClick={DeleteButton}
             variant="solid"
             style={{ backgroundColor: 'gray', color: 'white' }}>
              Delete
            </Button>

          </div>
        </Col>
      </Row>

      <Divider />
    </>
  );
};

export default ActionHeaderTable;
