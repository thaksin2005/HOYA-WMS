import React, { useEffect } from "react";
import { Button, Col, Row, Input, Select, Form, Divider } from "antd";

const ActionHeaderTableOR = ({
  AddButton,
  setIsModalImportExcelOpen,
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
             style={{ backgroundColor: 'green', color: 'white' }}>
              Add
            </Button>

            <Button type="primary" onClick={AddButton}
             variant="solid"
             style={{ backgroundColor: 'orange', color: 'white' }}>
              Edit
            </Button>

            <Button
              variant="solid"
              style={{ backgroundColor: 'red', color: 'white' }}
              onClick={() => setIsModalImportExcelOpen(true)}
            >
              Delete
            </Button>

          </div>
        </Col>
        {/* <Col span={4} xs={24} sm={24} md={12} lg={4} xl={4}>
          <div className="detail-input">
            <span>Item:</span>
            <strong>2080</strong>
          </div>
        </Col>

        <Col span={4} xs={24} sm={24} md={12} lg={5} xl={4}>
          <div className="detail-input">
            <span>On Process:</span>
            <strong>0</strong>
          </div>
        </Col>
        <Col span={4} xs={24} sm={24} md={24} lg={5} xl={4}>
          <div className="detail-input">
            <span>Completed:</span>
            <strong>2060</strong>
          </div>
        </Col> */}
      </Row>

      <Divider />
    </>
  );
};

export default ActionHeaderTableOR;
