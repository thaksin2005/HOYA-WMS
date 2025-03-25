import React, { useState, useEffect } from "react";
import { Card, Input, Button, Table, DatePicker, TimePicker } from "antd";
import moment from "moment";

const OvenHistory = () => {
  const [formData, setFormData] = useState({
    place: "",
    inputDate: null,
    inputTime: null,
    ovenNo: "",
    status: ""
  });

  // เพิ่ม colors object
  const colors = {
    text: {
      dark: '#000000'
    }
  };

  // ปรับ summaryData state
  const [summaryData, setSummaryData] = useState({
    TotalPlan: 0,
    Confirm: 0,
    ConfirmPercent: 0,
    Completed: 0,
    CompletedPercent: 0,
    Fail: 0,
    FailPercent: 0,
    Cancel: 0,
    CancelPercent: 0
  });

  // ปรับ useEffect
  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await fetch('http://localhost:1234/api/OvenMonitor1-requests');
        const data = await response.json();
        if (data && data.length > 0) {
          setSummaryData(data[0]);
        }
      } catch (error) {
        console.error('Error fetching summary data:', error);
      }
    };

    fetchSummaryData();
    const interval = setInterval(fetchSummaryData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    // แปลงวันที่และเวลาเป็นรูปแบบที่ต้องการก่อนส่งไป API
    const searchData = {
      ...formData,
      inputDate: formData.inputDate ? formData.inputDate.format('YYYY-MM-DD') : '',
      inputTime: formData.inputTime ? formData.inputTime.format('HH:mm:ss') : ''
    };
    console.log("Search with:", searchData);
  };

  const handleClear = () => {
    setFormData({
      place: "",
      inputDate: null,
      inputTime: null,
      ovenNo: "",
      status: ""
    });
  };

  // เพิ่ม columns definition สำหรับตาราง
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
      <div style={{ display: 'flex', gap: '16px' }}>
        {/* Form Section - ด้านซ้าย */}
        <Card style={{ flex: '0 0 250px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <div style={{ fontSize: '13px', marginBottom: '4px' }}>Place:</div>
              <Input 
                value={formData.place}
                onChange={(e) => handleInputChange('place', e.target.value)}
                style={{ 
                  width: '100%', 
                  height: '28px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '2px'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', marginBottom: '4px' }}>Input Date:</div>
                <DatePicker
                  value={formData.inputDate}
                  onChange={(date) => handleInputChange('inputDate', date)}
                  style={{ 
                    width: '100%', 
                    height: '28px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '2px'
                  }}
                  format="YYYY-MM-DD"
                />
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', marginBottom: '4px' }}>Input Time:</div>
                <TimePicker
                  value={formData.inputTime}
                  onChange={(time) => handleInputChange('inputTime', time)}
                  style={{ 
                    width: '100%', 
                    height: '28px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '2px'
                  }}
                  format="HH:mm:ss"
                />
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '13px', marginBottom: '4px' }}>Oven No:</div>
              <Input 
                value={formData.ovenNo}
                onChange={(e) => handleInputChange('ovenNo', e.target.value)}
                style={{ 
                  width: '100%', 
                  height: '28px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '2px'
                }}
              />
            </div>
            
            <div>
              <div style={{ fontSize: '13px', marginBottom: '4px' }}>Status:</div>
              <Input 
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                style={{ 
                  width: '100%', 
                  height: '28px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '2px'
                }}
              />
            </div>
            
            <div style={{ 
              marginTop: '4px', 
              display: 'flex', 
              gap: '8px',
              justifyContent: 'flex-start'
            }}>
              <Button 
                type="primary" 
                danger 
                onClick={handleSearch} 
                style={{ 
                  width: '80px',
                  height: '28px',
                  fontSize: '13px'
                }}
              >
                SEARCH
              </Button>
              <Button 
                onClick={handleClear}
                style={{ 
                  width: '80px',
                  height: '28px',
                  fontSize: '13px'
                }}
              >
                CLEAR
              </Button>
            </div>
          </div>
        </Card>

        {/* Right Section */}
        <Card style={{ flex: 1, backgroundColor: 'white' }}>
          {/* <div style={{ 
            fontSize: '13px', 
            marginBottom: '12px'
          }}>
            DATE: {moment().format('DD/MM/YYYY HH:mm:ss')}
          </div> */}

          {/* Summary Cards */}
          <div style={{ 
            display: 'flex', 
            gap: '8px'
          }}>
            <div style={{ 
              flex: 1,
              padding: '12px',
              backgroundColor: '#F3F0F0',
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: 8 }}>Total Plan in Day</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 4, color: '#000' }}>
                {summaryData.TotalPlan || 0}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>100%</div>
            </div>

            <div style={{ 
              flex: 1,
              padding: '12px',
              backgroundColor: '#F3F0F0',
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: 8 }}>Confirm</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 4, color: '#000' }}>
                {summaryData.Confirm || 0}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>{summaryData.ConfirmPercent || 0}%</div>
            </div>

            <div style={{ 
              flex: 1,
              padding: '12px',
              backgroundColor: '#F3F0F0',
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: 8 }}>Completed</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 4, color: '#000' }}>
                {summaryData.Completed || 0}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>{summaryData.CompletedPercent || 0}%</div>
            </div>

            <div style={{ 
              flex: 1,
              padding: '12px',
              backgroundColor: '#F3F0F0',
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: 8 }}>Fail</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 4, color: '#000' }}>
                {summaryData.Fail || 0}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>{summaryData.FailPercent || 0}%</div>
            </div>

            <div style={{ 
              flex: 1,
              padding: '12px',
              backgroundColor: '#F3F0F0',
              borderRadius: '5px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: 8 }}>Cancel</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: 4, color: '#000' }}>
                {summaryData.Cancel || 0}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>{summaryData.CancelPercent || 0}%</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Table Card */}
      <Card style={{ marginTop: 16 }}>
        <Table 
          columns={columns} 
          dataSource={[]}
          loading={false}
          scroll={{ x: 1800, y: 400 }}
          size="small"
          bordered
          rowKey={(record) => record.TSO_ID || Math.random()}
          pagination={{
            size: 'small',
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`,
            showQuickJumper: false,
            style: { marginTop: 16, textAlign: 'left' }
          }}
        />
      </Card>
    </div>
  );
};

export default OvenHistory;
