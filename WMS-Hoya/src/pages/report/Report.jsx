import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Spin,
  Select,
  DatePicker,
  Flex,
  Dropdown,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Tables from "../../components/Tables";
import TreeSelect from "./components/TreeSelect";
import axios from "axios";

const Report = () => {
  const { RangePicker } = DatePicker;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(false);

  console.log(disabled);

  const getReport = async () => {
    setLoading(true);
    const response = await axios.get("/api/report");
    setData(response.data);
  };

  useEffect(() => {
    getReport();
    setLoading(false);
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },

    {
      title: "Column",
      dataIndex: "column",
    },
    {
      title: "Column",
      dataIndex: "column",
    },
    {
      title: "Column",
      dataIndex: "column",
    },
  ];

  return (
    <div>
      {/* <Row>


        <Col span={24}>
          <h1>Report</h1>
        </Col>
      </Row> */}
      <Row gutter={16}>
        <Col>
          <Form.Item label="Select Section" layout="vertical">
            <Select
              placeholder="Select Section"
              showSearch
              style={{ width: "160px" }}
              optionFilterProp="label"
              options={[
                { value: "section1", label: "Section 1" },
                { value: "section2", label: "Section 2" },
                { value: "section3", label: "Section 3" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Select Date Range" layout="vertical">
            <RangePicker />
          </Form.Item>
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "end",
            paddingBottom: "16px",
            gap: "16px",
          }}
        >
          <Button type="primary">Search</Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Spin spinning={loading}>
            <Tables
              columns={columns}
              dataSource={data}
              bordered
              scrollY={0.5}
              scrollX={"max-content"}
            />
          </Spin>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={24}>
          <Flex justify="end" gap="16px">
            <TreeSelect setDisabled={setDisabled} />
            <Button variant="outlined" disabled={disabled}>
              <DownloadOutlined /> Export to Excel
            </Button>
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

export default Report;
