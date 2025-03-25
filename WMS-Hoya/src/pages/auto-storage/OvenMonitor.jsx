import React, { useState, useEffect } from "react";
import { Card, Spin, Table } from "antd";
import axios from "axios";
import moment from "moment";

const OvenMonitor = () => {
  const [loading, setLoading] = useState(true);
  const [monitor1Data, setMonitor1Data] = useState(null);
  const [monitor2Data, setMonitor2Data] = useState(null);
  const [currentTime, setCurrentTime] = useState(moment());
  const [gridData, setGridData] = useState([]);

  // เพิ่ม object สำหรับเก็บค่าสี
  const colors = {
    header: '#f0f0f0',
    text: {
      light: '#000000',
      dark: '#000000'
    }
  };

  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchData = async () => {
    try {
      setLoading(true);
      const [response1, response2, responseGrid] = await Promise.all([
        axios.get("http://localhost:1234/api/OvenMonitor1-requests"),
        axios.get("http://localhost:1234/api/OvenMonitor2-requests"),
        axios.get("http://localhost:1234/api/OvenMonitorGrid-requests")
      ]);
      
      setMonitor1Data(response1.data[0]);
      setMonitor2Data(response2.data);
      setGridData(responseGrid.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // อัพเดทข้อมูลทุก 1 นาที
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // เพิ่ม useEffect สำหรับอัพเดทเวลาทุกวินาที
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderStatusCard = (data, title) => {
    if (!data) return null;

    return (
      <Card 
        style={{ 
          marginBottom: 16,
          border: '1px solid #d9d9d9',
          borderRadius: 8, // เพิ่มความโค้งมน
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)' // เพิ่มเงา
        }}
        bodyStyle={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px' // เพิ่ม padding
        }}
        headStyle={{
          backgroundColor: colors.header,
          color: colors.text.light
        }}
      >
        {/* ส่วนหัว */}
        <div style={{ 
          backgroundColor: colors.header,
          margin: '-24px -24px 24px -24px',
          padding: '16px 24px',
          borderRadius: '8px 8px 0 0',
          color: colors.text.light
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {title === 'Daily Status' ? (
              <>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                   DATE: {currentTime.format('DD/MM/YYYY HH:mm:ss')}
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  Oven #: {data.ovenNumber || 'XXXXX'}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                DATE: {currentTime.format('DD/MM/YYYY HH:mm:ss')}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ส่วนเนื้อหา */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          textAlign: 'center',
          flex: 1,
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{ 
            flex: 1,
            padding: '16px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #d9d9d9',
            color: colors.text.dark
          }}>
            <div style={{ fontSize: '16px', marginBottom: 8 }}>Total Plan in Day</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: 8 }}>
              {data.TotalPlan || 0}
            </div>
            <div style={{ fontSize: '16px' }}>100%</div>
          </div>

          <div style={{ 
            flex: 1,
            padding: '16px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #d9d9d9',
            color: colors.text.dark
          }}>
            <div style={{ fontSize: '16px', marginBottom: 8 }}>Confirm</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: 8 }}>
              {data.Confirm || 0}
            </div>
            <div style={{ fontSize: '16px' }}>{data.ConfirmPercent || '0'}%</div>
          </div>

          <div style={{ 
            flex: 1,
            padding: '16px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #d9d9d9',
            color: colors.text.dark
          }}>
            <div style={{ fontSize: '16px', marginBottom: 8 }}>Completed</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: 8 }}>
              {data.Completed || 0}
            </div>
            <div style={{ fontSize: '16px' }}>{data.CompletedPercent || '0'}%</div>
          </div>

          <div style={{ 
            flex: 1,
            padding: '16px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #d9d9d9',
            color: colors.text.dark
          }}>
            <div style={{ fontSize: '16px', marginBottom: 8 }}>Fail</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: 8 }}>
              {data.Fail || 0}
            </div>
            <div style={{ fontSize: '16px' }}>{data.FailPercent || '0'}%</div>
          </div>

          <div style={{ 
            flex: 1,
            padding: '16px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #d9d9d9',
            color: colors.text.dark
          }}>
            <div style={{ fontSize: '16px', marginBottom: 8 }}>Cancel</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: 8 }}>
              {data.Cancel || 0}
            </div>
            <div style={{ fontSize: '16px' }}>{data.CancelPercent || '0'}%</div>
          </div>
        </div>
      </Card>
    );
  };

  // กำหนด columns สำหรับตาราง
  const columns = [
    {
      title: 'Status',
      dataIndex: 'TSO_Status',
      key: 'TSO_Status',
      width: 100,
      fixed: 'left',
    },
    {
      title: 'Order Information',
      children: [
        {
          title: 'Order ID',
          dataIndex: 'TSO_OrderID',
          key: 'TSO_OrderID',
          width: 120,
        },
        {
          title: 'Lot No',
          dataIndex: 'TSO_LotNo',
          key: 'TSO_LotNo',
          width: 120,
        },
      ]
    },
    {
      title: 'Oven Information',
      children: [
        {
          title: 'Cast Oven No',
          dataIndex: 'TSO_CastOvenNo',
          key: 'TSO_CastOvenNo',
          width: 120,
        },
        {
          title: 'Input Time',
          dataIndex: 'TSO_OvenInputTime',
          key: 'TSO_OvenInputTime',
          width: 150,
        },
        {
          title: 'HH Time',
          dataIndex: 'TSO_OvenHHTime',
          key: 'TSO_OvenHHTime',
          width: 100,
        },
        {
          title: 'MM Time',
          dataIndex: 'TSO_OvenMMTime',
          key: 'TSO_OvenMMTime',
          width: 100,
        },
        {
          title: 'Schedule On',
          dataIndex: 'TSO_ScheduleOn',
          key: 'TSO_ScheduleOn',
          width: 150,
        },
      ]
    },
    {
      title: 'Upper Position',
      children: [
        {
          title: 'Location',
          dataIndex: 'TSO_LocationUPP',
          key: 'TSO_LocationUPP',
          width: 120,
        },
        {
          title: 'Tray Number',
          dataIndex: 'TSO_TrayNumberUPP',
          key: 'TSO_TrayNumberUPP',
          width: 120,
        },
        {
          title: 'Position',
          dataIndex: 'TSO_PositionUPP',
          key: 'TSO_PositionUPP',
          width: 100,
        },
        {
          title: 'Mold Code',
          dataIndex: 'TSO_MoldCodeUPP',
          key: 'TSO_MoldCodeUPP',
          width: 120,
        },
        {
          title: 'Mold Serial',
          dataIndex: 'TSO_MoldSerialUPP',
          key: 'TSO_MoldSerialUPP',
          width: 120,
        },
      ]
    },
    {
      title: 'Lower Position',
      children: [
        {
          title: 'Location',
          dataIndex: 'TSO_LocationLOW',
          key: 'TSO_LocationLOW',
          width: 120,
        },
        {
          title: 'Tray Number',
          dataIndex: 'TSO_TrayNumberLOW',
          key: 'TSO_TrayNumberLOW',
          width: 120,
        },
        {
          title: 'Position',
          dataIndex: 'TSO_PositionLOW',
          key: 'TSO_PositionLOW',
          width: 100,
        },
        {
          title: 'Mold Code',
          dataIndex: 'TSO_MoldCodeLOW',
          key: 'TSO_MoldCodeLOW',
          width: 120,
        },
        {
          title: 'Mold Serial',
          dataIndex: 'TSO_MoldSerialLOW',
          key: 'TSO_MoldSerialLOW',
          width: 120,
        },
      ]
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Spin spinning={loading}>
        <div style={{ 
          display: 'flex', 
          gap: 24,
          minHeight: '200px'
        }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {renderStatusCard(monitor1Data, 'Daily Status')}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {renderStatusCard(monitor2Data, 'Oven Status')}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <Card > 
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Table 
                columns={columns} 
                dataSource={gridData}
                scroll={{ x: 1800, y: 400 }}
                size="small"
                bordered
                pagination={false}
              />
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>Showing 1-2 of 2 items</span>
                  <div style={{ 
                    width: '32px', 
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #d9d9d9',
                    borderRadius: '2px'
                  }}>
                    1
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>20 / page</span>
                  <select 
                    style={{ 
                      padding: '4px 8px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '2px',
                      background: 'white'
                    }}
                  >
                    <option value="20">20 / page</option>
                    <option value="50">50 / page</option>
                    <option value="100">100 / page</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Spin>
    </div>
  );
};

export default OvenMonitor;
