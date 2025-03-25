import React, { useEffect } from "react";
import { Button, Col, Row, Input, Select, Form, Divider } from "antd";

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
        <Row gutter={[16, 16]}>
          <Col>
            <Form.Item name="doc" label="Doc" labelAlign="left">
              <Input placeholder="Doc" variant="filled" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="jobType" label="Job Type" labelAlign="left">
              <Select placeholder="Job Type" variant="filled">
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="place" label="Place" labelAlign="left">
              <Select placeholder="Place" variant="filled">
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="createBy" label="Create By" labelAlign="left">
              <Input placeholder="Create By" variant="filled" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="interfaceFile"
              label="Interface file"
              labelAlign="left"
            >
              <Input placeholder="Interface file" variant="filled" />
            </Form.Item>
          </Col>
          {/* <Col span={4} xs={24} sm={24} md={24} lg={12} xl={4} xxl={4}>
            <div>
              <Form.Item
                name="doc"
                label="Doc"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 8 }}
                labelAlign="left"
              >
                <Input placeholder="Doc" variant="filled" />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                name="jobType"
                label="Job Type"
                labelCol={{ span: 6 }}
                labelAlign="left"
              >
                <Select placeholder="Job Type" variant="filled">
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </Col>

          <Col span={4} xs={24} sm={24} md={24} lg={11} xl={4} xxl={4}>
            <div>
              <Form.Item
                name="place"
                label="Place"
                labelCol={{ span: 5 }}
                labelAlign="left"
              >
                <Select placeholder="Place" variant="filled">
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </Col>
          <Col span={4} xs={24} sm={24} md={24} lg={12} xl={4} xxl={4}>
            <div>
              <Form.Item
                name="createBy"
                label="Create By"
                labelCol={{ span: 4 }}
                labelAlign="left"
              >
                <Input placeholder="Create By" variant="filled" />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                name="interfaceFile"
                label="Interface file"
                labelCol={{ span: 5 }}
                labelAlign="left"
              >
                <Input placeholder="Interface file" variant="filled" />
              </Form.Item>
            </div>
          </Col> */}
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
            style={{ backgroundColor: 'green', color: 'white' }}>
              Add
            </Button>

            <Button type="primary" onClick={AddButton}
            variant="solid"
            style={{ backgroundColor: 'orange', color: 'white' }}>
              Edit
            </Button>

            <Button type="primary" onClick={AddButton}
            variant="solid"
            style={{ backgroundColor: 'red', color: 'white' }}>
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
