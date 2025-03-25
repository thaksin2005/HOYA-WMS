import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

// สร้าง Context สำหรับ Editable
const EditableContext = React.createContext(null);

// สร้างแถวที่สามารถแก้ไขได้
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

// สร้างเซลล์ที่สามารถแก้ไขได้
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  // โฟกัสที่ input เมื่อเริ่มแก้ไข
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  // สลับสถานะการแก้ไข
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  // บันทึกข้อมูลเมื่อแก้ไขเสร็จ
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  // กำหนดรูปแบบของเซลล์
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          style={{ width: "100%" }}
          placeholder={`Enter ${title}`}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingInlineEnd: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

// คอมโพเนนต์หลักสำหรับเพิ่มแถวในตาราง
const TableAddRow = ({ onDataChange }) => {
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);

  // ฟังก์ชันลบแถว
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  // กำหนดคอลัมน์ของตาราง
  const defaultColumns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      width: "5%",
      align: "center",
    },
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
      width: "5%",
      align: "center",
      editable: true,
    },
    {
      title: "Mold Code",
      dataIndex: "moldCode",
      key: "moldCode",
      width: "10%",
      editable: true,
    },
    {
      title: "Mold Type",
      dataIndex: "moldType",
      key: "moldType",
      width: "20%",
      editable: true,
    },
    {
      title: "Lens Name",
      dataIndex: "lensName",
      key: "lensName",
      width: "30%",
      editable: true,
    },
    {
      title: "RCV QTY",
      dataIndex: "rcvQty",
      key: "rcvQty",
      width: "10%",
      editable: true,
    },
    {
      title: "Tray Qty",
      dataIndex: "trayQty",
      key: "trayQty",
      width: "10%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: "5%",
      align: "center",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  // ฟังก์ชันเพิ่มแถวใหม่
  const handleAdd = () => {
    const newData = {
      key: count,
      no: count + 1,
      index: "1",
      moldCode: "1",
      moldType: "Type1",
      lensName: "Lens1",
      rcvQty: "1",
      trayQty: "1",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  // ฟังก์ชันบันทึกข้อมูลที่แก้ไข
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  // กำหนดคอมโพเนนต์ที่ใช้ในตาราง
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  // กำหนดคอลัมน์ที่สามารถแก้ไขได้
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  // อัพเดทข้อมูลเมื่อ dataSource เปลี่ยนแปลง
  useEffect(() => {
    onDataChange(dataSource);
  }, [dataSource, onDataChange]);

  // แสดงตาราง
  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        placeholder="No data"
      />
    </div>
  );
};

export default TableAddRow;
