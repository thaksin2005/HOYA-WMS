import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Spin,
  Checkbox,
  Modal,
  Space,
  notification,
} from "antd";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import "moment-timezone";
import "../../styles/autostorage.css";
import Tables from "../../components/Tables";
import DropdownActionTable from "../../components/dropdown/DropdownActionTable";
import ModalAddOutbound from "./components/ModalAddOutbound";
import ModalDetailOutboundMaster from "./components/ModalDetailOutboundMaster";
import axios from "axios";
import NotificationAPI from "../../components/NotificationAPI";
import calculateColumnWidth from "../../function/CalcWidth";
import ActionHeaderTable from "./components/ActionHeaderTable";
import ActionFooterTable from "../../components/ActionFooterTable";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";

const OutboundMaster = () => {
  const [searchParams] = useSearchParams();
  const orId = searchParams.get("orId");
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openNotification, setOpenNotification] = useState(null);
  const [description, setDescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataOutbound, setDataOutbound] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [totalItem, setTotalItem] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [totalOnProcess, setTotalOnProcess] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [handleResetClick, setHandleResetClick] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [totalGroups, setTotalGroups] = useState(0);
  const [percentData, setPercentData] = useState({});
  const { confirm } = Modal;
  const [statusCounts, setStatusCounts] = useState({
    new: 0,
    process: 0,
    matching: 0,
    waitConfirm: 0,
    confirm: 0,
    completed: 0,
    cancel: 0
  });
  const [returnCounts, setReturnCounts] = useState({
    upperReturn: 0,
    lowerReturn: 0
  });

  const showModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onCloseModalDetail = () => {
    setOpenModalDetail(false);
  };

  const warehouseOptions = [
    { value: "1", label: "#1 - Warehouse 1" },
    { value: "2", label: "#2 - Warehouse 2" },
    { value: "3", label: "#3 - Warehouse 3" },
  ];

  const pointOptions = [
    { value: "1", label: "#1 - Point 1" },
    { value: "2", label: "#2 - Point 2" },
    { value: "3", label: "#3 - Point 3" },
  ];

  const [form] = Form.useForm();

  const handleSubmit = () => {
    const formValues = form.getFieldsValue();
    const formattedDate = formValues.DateCreated
      ? moment(formValues.DateCreated).format("YYYY-MM-DD")
      : null;
    console.log("Form submitted");
    console.log({ ...formValues, DateCreated: formattedDate });
  };

  const handleDetailClick = (record) => {
    setSelectedRecord(record);
    setOpenModalDetail(true);
  };

  const onSelectAll = (e) => {
    if (e.target.checked) {
      const allItems = getAllNonGroupItems();
      const allKeys = allItems.map((item) => item.key);
      setSelectedRowKeys(allKeys);
    } else {
      setSelectedRowKeys([]);
    }
  };

  const onSelect = (record, selected) => {
    if (selected) {
      setSelectedRowKeys([...selectedRowKeys, record.key]);
    } else {
      setSelectedRowKeys(selectedRowKeys.filter((key) => key !== record.key));
    }
  };

  // Helper function to handle N/A values
  const formatValue = (value) => {
    return value === "N/A" ? "" : value || "";
  };

  const columns = [
    {
      title: "✓",
      dataIndex: "checkbox",
      key: "checkbox",
      width: "2%",
      align: "center",
      fixed: "left",
      render: (text, record) => {
        if (record.isGroup) {
          const groupChildren =
            record.children?.map((child) => child.key) || [];
          const isAllSelected = groupChildren.every((key) =>
            selectedRowKeys.includes(key)
          );
          const isPartialSelected = groupChildren.some((key) =>
            selectedRowKeys.includes(key)
          );
          
          // ตรวจสอบว่ามีรายการที่มีสถานะ Confirm หรือไม่
          const hasConfirmedItems = record.children?.some(item => item.TaskStatus === "Confirm");
          
          return (
            <Checkbox
              checked={isAllSelected}
              indeterminate={!isAllSelected && isPartialSelected}
              disabled={hasConfirmedItems}
              onChange={(e) => {
                const checked = e.target.checked;
                if (checked) {
                  // เลือกเฉพาะรายการที่ไม่ได้อยู่ในสถานะ Confirm
                  const selectableItems = record.children
                    .filter(item => item.TaskStatus !== "Confirm")
                    .map(item => item.key);
                  setSelectedRowKeys([...selectedRowKeys, ...selectableItems]);
                } else {
                  setSelectedRowKeys(
                    selectedRowKeys.filter(
                      (key) => !groupChildren.includes(key)
                    )
                  );
                }
              }}
            />
          );
        }
        
        // สำหรับรายการปกติ
        const isConfirmed = record.TaskStatus === "Confirm";
        return (
          <Checkbox
            checked={selectedRowKeys.includes(record.key)}
            disabled={isConfirmed}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedRowKeys([...selectedRowKeys, record.key]);
              } else {
                setSelectedRowKeys(
                  selectedRowKeys.filter((key) => key !== record.key)
                );
              }
            }}
          />
        );
      },
    },
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      width: "3%",
      align: "center", 
      fixed: "left", 
      render: (text, record) => {
        if (record.isGroup) return null;
        return text;
      },
    },
    {
      title: "Cast Oven Information",
      key: "castOvenGroup",
      fixed: "left",
      children: [
        {
          title: "Create Date Time",
          dataIndex: "CreateDateTime",
          key: "CreateDateTime",
          width: "13%",
          align: "center",
          render: (text, record) => {
            if (record.isGroup) {
              const statusCounts = record.statusCounts;
              const createDateTime = record.children[0]?.CreateDateTime;
              
              // Calculate Upper and Lower Return counts for this group
              const upperReturnCount = record.children.filter(item => item.UpperReturn && item.UpperReturn !== "N/A").length;
              const lowerReturnCount = record.children.filter(item => item.LowerReturn && item.LowerReturn !== "N/A").length;
              
              return {
                children: (
                  <div style={{
                    backgroundColor: "#f0f0f0",
                    padding: "8px",
                    fontWeight: "bold",
                  }}>
                    <div style={{ 
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span>Oven# {record.ORI_CastOvenNo}</span>
                        <span style={{
                          fontSize: "0.85em",
                          color: "#666",
                          backgroundColor: "white",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          border: "1px solid #d9d9d9"
                        }}>
                          {moment(createDateTime).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ 
                          fontSize: "0.8em",
                          backgroundColor: "#1890ff",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "4px"
                        }}>
                          Items: {statusCounts.Total}
                        </span>
                      </div>
                    </div>

                    <table style={{ 
                      width: '100%', 
                      borderCollapse: 'collapse',
                      backgroundColor: 'white',
                      fontSize: '0.85em',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <thead>
                        <tr style={{ backgroundColor: '#fafafa' }}>
                          <th style={{ padding: '4px', textAlign: 'center', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0' }}>Process</th>
                          <th style={{ padding: '4px', textAlign: 'center', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0' }}>Matching</th>
                          <th style={{ padding: '4px', textAlign: 'center', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0' }}>Wait</th>
                          <th style={{ padding: '4px', textAlign: 'center', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0' }}>Picking</th>
                          <th style={{ padding: '4px', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>Completed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ 
                            padding: '4px', 
                            textAlign: 'center',
                            backgroundColor: '#e6fffb',
                            color: '#13c2c2',
                            borderRight: '1px solid #f0f0f0'
                          }}>
                            {statusCounts.Process}
                          </td>
                          <td style={{ 
                            padding: '4px', 
                            textAlign: 'center',
                            backgroundColor: '#f9f0ff',
                            color: '#722ed1',
                            borderRight: '1px solid #f0f0f0'
                          }}>
                            {statusCounts.Matching}
                          </td>
                          <td style={{ 
                            padding: '4px', 
                            textAlign: 'center',
                            backgroundColor: '#fff0f6',
                            color: '#eb2f96',
                            borderRight: '1px solid #f0f0f0'
                          }}>
                            {statusCounts.WaitConfirm}
                          </td>
                          <td style={{ 
                            padding: '4px', 
                            textAlign: 'center',
                            backgroundColor: '#fff7e6',
                            color: '#fa8c16',
                            borderRight: '1px solid #f0f0f0'
                          }}>
                            {statusCounts.Picking}
                          </td>
                          <td style={{ 
                            padding: '4px', 
                            textAlign: 'center',
                            backgroundColor: '#f6ffed',
                            color: '#a0d911'
                          }}>
                            {statusCounts.Completed}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5" style={{
                            padding: '4px',
                            textAlign: 'center',
                            backgroundColor: '#f0f0f0',
                            borderTop: '1px solid #f0f0f0',
                            fontSize: '0.85em',
                            color: '#666'
                          }}>
                            UPP Return: {upperReturnCount} | LOW Return: {lowerReturnCount}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5" style={{
                            padding: '4px',
                            textAlign: 'center',
                            backgroundColor: '#f0f0f0',
                            borderTop: '1px solid #f0f0f0'
                          }}>
                            Progress: {Math.round((statusCounts.Completed / statusCounts.Total) * 100)}%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ),
                props: {
                  colSpan: 1,
                  style: {
                    backgroundColor: "#f0f0f0",
                    fontWeight: "bold",
                  },
                },
              };
            }
            return moment(text).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
          },
        },
        {
          title: "Mold Upper",
          dataIndex: "MoldUpper",
          key: "MoldUpper",
          width: calculateColumnWidth("Mold Upper"),
          align: "center",
          render: (text, record) => {
            if (record.isGroup) return null;
            return (
              <div style={{ 
                padding: '4px',
                fontSize: '0.85em',
                color: '#666'
              }}>
                {formatValue(text)}
              </div>
            );
          },
        },
      ],
    },
    {
      title: "Mold Information",
      key: "moldGroup",
      children: [
        {
          title: "Mold Serial Upper",
          dataIndex: "MoldSerialUPP",
          key: "MoldSerialUPP",
          width: calculateColumnWidth("Mold Serial Upper"),
          align: "center",
          render: (text, record) => {
            if (record.isGroup) return null;
            return (
              <div style={{ 
                padding: '4px',
                fontSize: '0.85em',
                color: '#666'
              }}>
                {text}
              </div>
            );
          },
        },
        {
          title: "Tray Number Upper",
          dataIndex: "TrayNumberUPP",
          key: "TrayNumberUPP",
          width: calculateColumnWidth("Tray Number Upper"),
          align: "center",
          render: (text, record) => {
            if (record.isGroup) return null;
            return (
              <div style={{ 
                padding: '4px',
                fontSize: '0.85em',
                color: '#666'
              }}>
                {text}
              </div>
            );
          },
        },
        {
          title: "Upper Return",
          dataIndex: "UpperReturn",
          key: "UpperReturn",
          width: calculateColumnWidth("Upper Return"),
          align: "center",
          render: (text, record) => {
            if (record.isGroup) return null;
            return text;
          },
        },
        {
          title: "Mold Serial Lower",
          dataIndex: "MoldSerialLOW",
          key: "MoldSerialLOW",
          width: calculateColumnWidth("Mold Serial Lower"),
          align: "center",
          render: (text, record) => {
            if (record.isGroup) return null;
            return (
              <div style={{ 
                padding: '4px',
                fontSize: '0.85em',
                color: '#666'
              }}>
                {text}
              </div>
            );
          },
        },
        {
          title: "Tray Number Lower",
          dataIndex: "TrayNumberLOW",
          key: "TrayNumberLOW",
          width: calculateColumnWidth("Tray Number Lower"),
          align: "center",
          render: (text, record) => {
            if (record.isGroup) return null;
            return (
              <div style={{ 
                padding: '4px',
                fontSize: '0.85em',
                color: '#666'
              }}>
                {text}
              </div>
            );
          },
        },
        {
          title: "Lower Return",
          dataIndex: "LowerReturn",
          key: "LowerReturn",
          width: calculateColumnWidth("Lower Return"),
          align: "center",
          render: (text, record) => {
            if (record.isGroup) return null;
            return text;
          },
        },
      ],
    },
    {
      title: "Location Information",
      key: "locationGroup",
      children: [
        {
          title: "Location Upper",
          dataIndex: "LocationUPP",
          key: "LocationUPP",
          width: calculateColumnWidth("Location Upper"),
          align: "center",
          render: (text, record) => {
            if (record.isGroup) return null;
            return (
              <div style={{ 
                padding: '4px',
                fontSize: '0.85em',
                color: '#666'
              }}>
                {text}
              </div>
            );
          },
        },
        {
          title: "Location Lower",
          dataIndex: "LocationLOW",
          key: "LocationLOW",
          width: calculateColumnWidth("Location Lower"),
          align: "center",
          render: (text, record) => {
            if (record.isGroup) return null;
            return (
              <div style={{ 
                padding: '4px',
                fontSize: '0.85em',
                color: '#666'
              }}>
                {text}
              </div>
            );
          },
        },
        {
          title: "Status",
          dataIndex: "TaskStatus",
          key: "TaskStatus",
          width: calculateColumnWidth("Status"),
          align: "center",
          render: (text, record) => {
            if (record.isGroup) {
              return {
                props: {
                  colSpan: 1,
                },
              };
            }

            const statusColors = {
              'New': '#faad14',
              'Process': '#13c2c2',
              'Matching': '#722ed1',
              'Wait Confirm': '#eb2f96',
              'Confirm': '#fa8c16',
              'Completed': '#a0d911',
              'Cancel': '#f5222d'
            };

            return (
              <span style={{ 
                color: statusColors[text] || 'rgba(0, 0, 0, 0.65)',
                fontWeight: 'bold'
              }}>
                {text}
              </span>
            );
          },
        },
        {
          title: "Process",
          key: "processProgress",
          width: "90px",
          align: "center",
          render: (text, record) => {
            if (record.isGroup) return null;
            return (
              <div style={{ 
                padding: '4px',
                fontSize: '14px',
                color: record.DetailProcess ? '#13c2c2' : '#666',
                backgroundColor: record.DetailProcess ? '#e6fffb' : 'transparent'
              }}>
                {record.DetailProcess ? '100%' : '0%'}
              </div>
            );
          }
        },
        {
          title: "Matching",
          key: "matchingProgress",
          width: "90px",
          align: "center",
          render: (text, record) => {
            if (record.isGroup) return null;
            return (
              <div style={{ 
                padding: '4px',
                fontSize: '14px',
                color: record.DetailMatching ? '#722ed1' : '#666',
                backgroundColor: record.DetailMatching ? '#f9f0ff' : 'transparent'
              }}>
                {record.DetailMatching ? '100%' : '0%'}
              </div>
            );
          }
        },
        {
          title: "Wait",
          key: "waitProgress",
          width: "90px",
          align: "center",
          render: (text, record) => {
            if (record.isGroup) return null;
            return (
              <div style={{ 
                padding: '4px',
                fontSize: '14px',
                color: record.DetailWaitConfirm ? '#eb2f96' : '#666',
                backgroundColor: record.DetailWaitConfirm ? '#fff0f6' : 'transparent'
              }}>
                {record.DetailWaitConfirm ? '100%' : '0%'}
              </div>
            );
          }
        },
        {
          title: "Picking",
          key: "pickingProgress",
          width: "90px",
          align: "center",
          render: (text, record) => {
            if (record.isGroup) return null;
            return (
              <div style={{ 
                padding: '4px',
                fontSize: '14px',
                color: record.DetailPicking ? '#fa8c16' : '#666',
                backgroundColor: record.DetailPicking ? '#fff7e6' : 'transparent'
              }}>
                {record.DetailPicking ? '100%' : '0%'}
              </div>
            );
          }
        },
        {
          title: "Completed",
          key: "completedProgress",
          width: "90px",
          align: "center",
          render: (text, record) => {
            if (record.isGroup) return null;
            return (
              <div style={{ 
                padding: '4px',
                fontSize: '14px',
                color: record.DetailCompleted ? '#a0d911' : '#666',
                backgroundColor: record.DetailCompleted ? '#f6ffed' : 'transparent'
              }}>
                {record.DetailCompleted ? '100%' : '0%'}
              </div>
            );
          }
        }
      ],
    },
    {
      title: "More",
      dataIndex: "more",
      key: "more",
      width: "60px",
      align: "center",
      fixed: "right",
      render: (text, record) => {
        if (record.isGroup) return null;
        return (
          <DropdownActionTable
            onDetailClick={() => handleDetailClick(record)}
            record={record}
          />
        );
      },
    },
  ];

  const getOutbound = async () => {
    try {
      console.log("Current orId:", orId);

      if (!orId) {
        console.log("No orId provided");
        setDataOutbound([]);
        setLoading(false);
        return;
      }

      // Fetch data from both APIs
      const [uppLowResponse, detailResponse] = await Promise.all([
        axios.get(`http://localhost:1234/api/UppLowReturn-requests`),
        axios.get(`http://localhost:1234/api/OutboundItemDetail-requests`)
      ]);

      console.log("Raw UppLow API Response:", uppLowResponse.data);
      console.log("Raw Detail API Response:", detailResponse.data);

      const filteredData = uppLowResponse.data.filter((item) => {
        return String(item.REL_ID) === String(orId);
      });

      // Create a map of detail data by CastOvenNo
      const detailDataMap = detailResponse.data.reduce((acc, item) => {
        if (item.CastOvenNo) {
          if (!acc[item.CastOvenNo]) {
            acc[item.CastOvenNo] = [];
          }
          acc[item.CastOvenNo].push(item);
        }
        return acc;
      }, {});

      // จัดกลุ่มตาม Cast Oven No
      const grouped = filteredData.reduce((acc, item) => {
        const castOvenNo = item.ORI_CastOvenNo || "";
        if (!acc[castOvenNo]) {
          acc[castOvenNo] = [];
        }
        acc[castOvenNo].push(item);
        return acc;
      }, {});

      let allMappedData = [];
      Object.entries(grouped).forEach(([castOvenNo, items], groupIndex) => {
        // Get matching detail data for this CastOvenNo
        const detailItems = detailDataMap[castOvenNo] || [];
        
        const combinedChildren = items.map((item, index) => {
          // Find matching detail item
          const detailItem = detailItems.find(detail => 
            detail.CastOvenNo === parseInt(item.ORI_CastOvenNo)
          );

          return {
            key: `${item.ORI_ID}-${index}`,
            no: index + 1,
            OR_IDOutboundRequest: item.REL_ID,
            ORI_IDOutboundRequestItem: item.ORI_ID,
            ORI_CastOvenNo: formatValue(item.ORI_CastOvenNo),
            CreateDateTime: item.ORI_CreateDateTime || "",
            MoldUpper: formatValue(detailItem?.MoldUpperName || item.ORI_MoldUpperName),
            MoldSerialUPP: formatValue(detailItem?.MoldSerialUPP || item.ORI_MoldUpper),
            TrayNumberUPP: formatValue(detailItem?.TrayNumberUPP || item.ORI_MoldPlace),
            MoldSerialLOW: formatValue(detailItem?.MoldSerialLOW || item.ORI_MoldLower),
            TrayNumberLOW: formatValue(detailItem?.TrayNumberLOW || item.ORI_MoldPlace),
            LocationUPP: formatValue(detailItem?.LocationUPP || item.ORI_Warehouse),
            LocationLOW: formatValue(detailItem?.LocationLOW || item.ORI_Warehouse),
            TaskStatus: formatValue(item.ORI_Status),
            UpperReturn: formatValue(item.UPP_ReturnOn),
            LowerReturn: formatValue(item.LOW_ReturnOn),
            DetailStatus: formatValue(detailItem?.OutboundItemStatus),
            DetailProcess: detailItem?.OutboundItemStatus === "Process",
            DetailMatching: detailItem?.OutboundItemStatus === "Matching",
            DetailWaitConfirm: detailItem?.OutboundItemStatus === "Wait Confirm",
            DetailPicking: detailItem?.OutboundItemStatus === "Picking",
            DetailCompleted: detailItem?.OutboundItemStatus === "Completed"
          };
        });

        allMappedData.push({
          key: `group-${castOvenNo}`,
          no: "",
          ORI_CastOvenNo: castOvenNo,
          groupIndex: groupIndex + 1,
          isGroup: true,
          statusCounts: {
            Total: items.length,
            Process: items.filter(item => item.ORI_Status === "Process").length,
            Matching: items.filter(item => item.ORI_Status === "Matching").length,
            WaitConfirm: items.filter(item => item.ORI_Status === "Wait Confirm").length,
            Picking: items.filter(item => item.ORI_Status === "Picking").length,
            Completed: items.filter(item => item.ORI_Status === "Completed").length
          },
          children: combinedChildren,
        });
      });

      // เรียงลำดับตาม Cast Oven No
      allMappedData.sort((a, b) => {
        const aOven = parseInt(a.ORI_CastOvenNo.toString()) || 0;
        const bOven = parseInt(b.ORI_CastOvenNo.toString()) || 0;
        return aOven - bOven;
      });

      console.log("Combined and mapped data:", allMappedData);

      setDataOutbound(allMappedData);
      setGroupedData(grouped);

      const totalItems = filteredData.length;
      
      // Update status counts
      const counts = {
        new: filteredData.filter((item) => item.ORI_Status === "New").length,
        process: filteredData.filter((item) => item.ORI_Status === "Process").length,
        matching: filteredData.filter((item) => item.ORI_Status === "Matching").length,
        waitConfirm: filteredData.filter((item) => item.ORI_Status === "Wait Confirm").length,
        confirm: filteredData.filter((item) => item.ORI_Status === "Confirm").length,
        completed: filteredData.filter((item) => item.ORI_Status === "Completed").length,
        cancel: filteredData.filter((item) => item.ORI_Status === "Cancel").length
      };

      setTotalItem(totalItems);
      setStatusCounts(counts);
      
      // คำนวณจำนวนรายการที่มี Return
      const upperReturnCount = filteredData.reduce((count, item) => {
        if (item.children) {
          return count + item.children.filter(child => child.UpperReturn && child.UpperReturn !== "N/A").length;
        }
        return count;
      }, 0);

      const lowerReturnCount = filteredData.reduce((count, item) => {
        if (item.children) {
          return count + item.children.filter(child => child.LowerReturn && child.LowerReturn !== "N/A").length;
        }
        return count;
      }, 0);

      setReturnCounts({
        upperReturn: upperReturnCount,
        lowerReturn: lowerReturnCount
      });

    } catch (error) {
      console.error("Error fetching data:", error);
      setDataOutbound([]);
      setTotalGroups(0);
      setStatusCounts({
        new: 0,
        process: 0,
        matching: 0,
        waitConfirm: 0,
        confirm: 0,
        completed: 0,
        cancel: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPercentData = async () => {
    try {
      const response = await axios.get('http://192.168.0.122:1234/api/PercentOutboundItemDetail-requests');
      const percentByOven = response.data.reduce((acc, item) => {
        acc[item.ORI_CastOvenNo] = {
          Percent: item.Percent,
          PercentMatching: item.PercentMatching,
          PercentWaitConfirm: item.PercentWaitConfirm,
          PercentProcess: item.PercentProcess,
          PercentPicking: item.PercentPicking,
          PercentCompleted: item.PercentCompleted,
          PercentMoldSerialUPP: item.PercentMoldSerialUPP,
          PercentMoldSerialLOW: item.PercentMoldSerialLOW,
          PercentTrayNumberUPP: item.PercentTrayNumberUPP,
          PercentTrayNumberLOW: item.PercentTrayNumberLOW,
          PercentLocationUPP: item.PercentLocationUPP,
          PreLocationLOW: item.PreLocationLOW,
          
        };
        return acc;
      }, {});
      setPercentData(percentByOven);
    } catch (error) {
      console.error('Error fetching percent data:', error);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered with orId:", orId);
    if (orId) {
      getOutbound();
      fetchPercentData();
    }
  }, [orId]);

  useEffect(() => {
    if (dataOutbound.length === 0) {
      setLoading(true);
      setTimeout(() => setLoading(false), 100);
    }
    if (dataOutbound.length > 0) {
      setLoading(false);
    }
  }, [dataOutbound]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredData = dataOutbound.filter((item) => {
    if (item.isGroup) {
      const groupMatch = Object.values(item).some((value) =>
        value
          ? value.toString().toLowerCase().includes(searchText.toLowerCase())
          : false
      );

      const childrenMatch = item.children?.some((child) =>
        Object.values(child).some((value) =>
          value
            ? value.toString().toLowerCase().includes(searchText.toLowerCase())
            : false
        )
      );

      return groupMatch || childrenMatch;
    }

    return Object.values(item).some((value) =>
      value
        ? value.toString().toLowerCase().includes(searchText.toLowerCase())
        : false
    );
  });

  const handleConfirmGroup = (castOvenNo) => {
    const group = dataOutbound.find(
      (group) => group.ORI_CastOvenNo === castOvenNo
    );
    
    // ตรวจสอบว่ามีรายการที่มีสถานะ Confirm หรือไม่
    const hasConfirmedItems = group.children.some(item => item.TaskStatus === "Confirm");
    
    if (hasConfirmedItems) {
      notification.warning({
        message: "Cannot Cancel",
        description: `Cannot cancel Oven Group ${group.groupIndex} because it contains confirmed items`,
        duration: 4.5,
        placement: "topRight"
      });
      return;
    }


  // Total Oven  
    confirm({
      title: "Confirm Action",
      icon: <ExclamationCircleOutlined style={{ color: "#1890ff" }} />,
      content: `Are you sure you want to Cancel Oven Group ${group.groupIndex}?`,
      okText: "Confirm",
      cancelText: "Cancel",
      okButtonProps: {
        style: {
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
        },
      },
      onOk: async () => {
        try {
          // หา items ทั้งหมดในกลุ่ม
          const groupItems =
            dataOutbound.find((group) => group.ORI_CastOvenNo === castOvenNo)
              ?.children || [];

          // ส่ง request สำหรับแต่ละ item ในกลุ่ม
          await Promise.all(
            groupItems.map((item) =>
              axios.put("http://192.168.0.122:3334/api/confirm-outbounditem", {
                ORI_ID: item.ORI_IDOutboundRequestItem,
                ORI_Status: "Cance",
              })
            )
          );

          // แสดง notification เมื่อสำเร็จ
          setOpenNotification("success");
          setDescription(
            `Successfully Canceled items from Oven Group ${group.groupIndex}`
          );

          // รีเฟรชข้อมูล
          getOutbound();
        } catch (error) {
          console.error("Error Cancel group:", error);
          setOpenNotification("error");
          setDescription(`Failed to Cancel Oven Group ${group.groupIndex}`);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleConfirmSelected = () => {
    if (selectedRowKeys.length === 0) return;

    // รวบรวม items ที่ถูกเลือก
    const selectedItems = selectedRowKeys
      .map((key) => {
        for (const group of dataOutbound) {
          const item = group.children?.find((child) => child.key === key);
          if (item) return item;
        }
        return null;
      })
      .filter((item) => item !== null);

    // ตรวจสอบว่ามีรายการที่มีสถานะ Confirm หรือไม่
    const confirmedItems = selectedItems.filter(item => item.TaskStatus === "Confirm");
    
    if (confirmedItems.length > 0) {
      notification.warning({
        message: "Cannot Cancel Confirmed Items",
        description: `${confirmedItems.length} selected item(s) are in Confirm status and cannot be cancelled`,
        duration: 4.5,
        placement: "topRight"
      });
      return;
    }

    /// Inside Oven
    confirm({
      title: "Confirm Selected Items",
      icon: <ExclamationCircleOutlined style={{ color: "#1890ff" }} />,
      content: `Are you sure you want to cancel ${selectedItems.length} selected items?`,
      okText: "Confirm",
      cancelText: "Cancel",
      okButtonProps: {
        style: {
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
        },
      },
      onOk: async () => {
        try {
          // ส่ง request สำหรับแต่ละ item ที่เลือก
          await Promise.all(
            selectedItems.map((item) =>
              axios.put("http://192.168.0.122:3334/api/confirm-outbounditem", {
                ORI_ID: item.ORI_IDOutboundRequestItem,
                ORI_Status: "Cancel",
              })
            )
          );

          setOpenNotification("success");
          setDescription(`Successfully Canceled ${selectedItems.length} items`);

          // รีเฟรชข้อมูลและล้างการเลือก
          getOutbound();
          setSelectedRowKeys([]);
        } catch (error) {
          console.error("Error Cancel items:", error);
          setOpenNotification("error");
          setDescription("Failed to Cancel selected items");
        }
      },
    });
  };

  const getAllNonGroupItems = () => {
    let items = [];
    dataOutbound.forEach((group) => {
      if (group.children) {
        items = [...items, ...group.children];
      }
    });
    return items;
  };
  

  return (
    <>
      <div className="table-container">
        <div className="table-header">
          <div className="table-header2">
            {/* ด้านซ้าย - ช่องค้นหาและปุ่ม */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Input
                placeholder="Search"
                style={{ width: "300px" }}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Checkbox
                onChange={onSelectAll}
                checked={
                  selectedRowKeys.length > 0 &&
                  selectedRowKeys.length === getAllNonGroupItems().length
                }
                indeterminate={
                  selectedRowKeys.length > 0 &&
                  selectedRowKeys.length < getAllNonGroupItems().length
                }
              >
                Select All
              </Checkbox>
              {selectedRowKeys.length > 0 && (
                <Button
                  type="primary"
                  onClick={handleConfirmSelected}
                  style={{
                    backgroundColor: "#f5222d",
                    borderColor: "#f5222d",
                  }}
                >
                  Cancel Selected ({selectedRowKeys.length} items)
                </Button>
              )}
            </div>

          </div>
        </div>
        <section style={{ marginTop: "10px" }}>
          <Spin spinning={loading}>
            <Tables
              columns={columns}
              dataSource={filteredData}
              bordered
              scrollY={0.5}
              scrollX={"max-content"}
              maxHeight={"480px"}
              expandable={{
                defaultExpandAllRows: true,
              }}
            />
          </Spin>
        </section>

        <div className="action-footer-table">
          {/* Status Tables Container */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            marginTop: '16px',
            marginBottom: '16px'
          }}>
       
            {/* ด้านขวา - แสดงสถานะต่างๆ */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>Total Items:</span>
                <span style={{ 
                  background: '#1890ff', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '4px',
                  minWidth: '28px',
                  textAlign: 'center'
                }}>{totalItem}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>Total Oven:</span>
                <span style={{ 
                  background: '#52c41a', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '4px',
                  minWidth: '28px',
                  textAlign: 'center'
                }}>{totalGroups}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>Upper Return:</span>
                <span style={{ 
                  backgroundColor: '#1890ff',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  minWidth: '28px',
                  textAlign: 'center'
                }}>
                  {returnCounts.upperReturn}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>Lower Return:</span>
                <span style={{ 
                  backgroundColor: '#52c41a',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  minWidth: '28px',
                  textAlign: 'center'
                }}>
                  {returnCounts.lowerReturn}
                </span>
              </div>
            </div>

            {/* Status Table */}
            <div style={{ borderLeft: '1px solid #d9d9d9', paddingLeft: '16px' }}>
              <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>Status</div>
              <table style={{ 
                borderCollapse: 'collapse', 
                background: 'white',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>New</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', textAlign: 'center', minWidth: '40px', background: '#faad14', color: 'white', fontSize: '12px' }}>{statusCounts.new}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>Process</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', textAlign: 'center', minWidth: '40px', background: '#13c2c2', color: 'white', fontSize: '12px' }}>{statusCounts.process}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>Matching</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', textAlign: 'center', minWidth: '40px', background: '#722ed1', color: 'white', fontSize: '12px' }}>{statusCounts.matching}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>Wait Confirm</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', textAlign: 'center', minWidth: '40px', background: '#eb2f96', color: 'white', fontSize: '12px' }}>{statusCounts.waitConfirm}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>Confirm</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', textAlign: 'center', minWidth: '40px', background: '#fa8c16', color: 'white', fontSize: '12px' }}>{statusCounts.confirm}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>Completed</td>
                    <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', textAlign: 'center', minWidth: '40px', background: '#a0d911', color: 'white', fontSize: '12px' }}>{statusCounts.completed}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '4px 8px', borderRight: '1px solid #f0f0f0', fontSize: '12px' }}>Cancel</td>
                    <td style={{ padding: '4px 8px', textAlign: 'center', minWidth: '40px', background: '#f5222d', color: 'white', fontSize: '12px' }}>{statusCounts.cancel}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <section>
        <NotificationAPI
          openNotification={openNotification}
          description={description}
        />
        <ModalAddOutbound open={openModal} onClose={onCloseModal} />
        <ModalDetailOutboundMaster
          open={openModalDetail}
          onClose={onCloseModalDetail}
          record={selectedRecord}
        />
      </section>

      <style jsx>{`
        .status-count {
          text-align: center;
          padding: 8px;
          background: white;
          border-radius: 4px;
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05);
        }
        .status-count span {
          display: block;
          margin-bottom: 4px;
          color: rgba(0, 0, 0, 0.65);
        }
        .status-count strong {
          font-size: 20px;
          font-weight: 600;
        }
        .detail-input {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #fafafa;
          padding: 4px 12px;
          border-radius: 4px;
        }
        .detail-input span {
          color: rgba(0, 0, 0, 0.65);
        }
        .detail-input strong {
          color: rgb(24, 28, 255);
        }
      `}</style>
    </>
  );
};

export default OutboundMaster;
