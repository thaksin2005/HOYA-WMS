import React, { useEffect } from "react";
import { Button, Col, Row, Input, Select, Form, Divider } from "antd";
import dayjs from "dayjs";

const ActionHeaderTable = ({
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
        <Row gutter={[15, 15]}>
        <Col span={4}>
        <Form.Item 
          name="doc" 
          label="Doc" 
          labelAlign="left"
          initialValue={dayjs().format("YYYY-MM-DD HH:mm:ss")} // วันที่และเวลาปัจจุบัน
        >
          <Input 
            placeholder="Doc" 
            variant="filled" 
            style={{ width: "100%" }} 
            disabled // ปิดการแก้ไข
          />
        </Form.Item>

        </Col>

        <Col span={4}>
          <Form.Item name="jobType" label="Job Type" labelAlign="left">
            <Select placeholder="Job Type" variant="filled" style={{ width: "60%" }}>
              <Select.Option value="1">100</Select.Option>
              <Select.Option value="1">250</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="place" label="Place" labelAlign="left">
            <Select placeholder="Place" variant="filled" style={{ width: "60%" }}>
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
            </Select>
          </Form.Item>
        </Col>
          <Col span={4}>
              <Form.Item name="createBy" label="CreateBy" labelAlign="left">
                <Input placeholder="Administrator" variant="filled" style={{ width: "60%" }} />
              </Form.Item>
            </Col>

        <Col span={4}>
          <Form.Item name="interfaceFile" label="Interface file" labelAlign="left">
            <Input placeholder="Interface file" variant="filled" style={{ width: "60%" }} />
          </Form.Item>
        </Col>

          {/* <Col span={3} xs={24} sm={24} md={24} lg={12} xl={3} xxl={3}>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button type="primary">Save</Button>
              <Button
                type="default"
                onClick={() => {
                  handleReset();
                }}
              >
                Reset
              </Button>
            </div>
          </Col> */}
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

            <Button type="primary" onClick={AddButton}
            variant="solid"
            style={{ backgroundColor: 'orange', color: 'white' }}
            >
              Edit
            </Button>

            <Button type="primary" onClick={AddButton}
            variant="solid"
            style={{ backgroundColor: 'gray', color: 'white' }}>
              Delete
            </Button>

            <Button
              variant="solid"
              style={{ backgroundColor: 'gray', color: 'white' }}
              onClick={() => setIsModalImportExcelOpen(true)}
            >
              Import
            </Button>
            <Button
                variant="solid"
                style={{ backgroundColor: 'green', color: 'white' }}
              >
                Confirm Task
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

export default ActionHeaderTable;
