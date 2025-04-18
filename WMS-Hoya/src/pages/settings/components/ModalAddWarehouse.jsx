import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Switch, Input, Divider, notification, message, Select } from "antd";
import axios from "axios";
const ModalAddWarehouse = ({ isAddOpen, setIsAddOpen }) => {

    const [form] = Form.useForm();
    const [factoryOptions, setFactoryOptions] = useState([]);
    const handleCancel = () => {
        setIsAddOpen(false);
        form.resetFields
    }
    const { confirm } = Modal;

    const handleOk = async () => {

        try {
            await form.validateFields();
            confirm({
                title: "Confirm",
                content: "Are you sure you want to add this warehouse?",
                okText: "Yes",
                cancelText: "No",
                centered: true,
                onOk: async () => {

                    //get current date and time in ISO format
                    const time = new Date();

                    //Split Iso format into each string variable
                    const year = time.getFullYear();
                    const month = String(time.getMonth() + 1).padStart(2, '0');
                    const day = String(time.getDate()).padStart(2, '0');
                    const hours = String(time.getHours()).padStart(2, '0');
                    const minutes = String(time.getMinutes()).padStart(2, '0');
                    const seconds = String(time.getSeconds()).padStart(2, '0');
                    const milliseconds = String(time.getMilliseconds()).padStart(3, '0');

                    //Combine string into datetime2 format for Microsoft Sql server
                    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`

                    try {
                        const formattedData = {
                            F_IDFactory: form.getFieldValue("F_ID"),
                            W_Code: form.getFieldValue("W_Code"),
                            W_Name: form.getFieldValue("W_Name"),
                            W_IsActive: form.getFieldValue("W_IsActive"),
                            W_Remarks: form.getFieldValue("W_Remarks"),
                            W_CreateOn: formattedTime,
                            //Temporary
                            UA_IDCreateBy: 1,
                        }
                        console.log("Formatted Data:", formattedData);

                        const response = await axios.post(
                            "http://localhost:3334/api/addWarehouse",
                            formattedData
                        );

                        notification.success({
                            message: "Success",
                            description: "Factory added sucessfully",
                            placement: "topRight",
                            duration: 3,
                        });

                        setIsAddOpen(false);
                        form.resetFields();

                        // Refresh page after 2 seconds
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    }
                    catch (error) {
                        console.error("Error saving data:", error);
                        message.error("Error saving data:", error);

                        notification.error({
                            message: "Error",
                            description: "Failed to add warehouse",
                            placement: "topRight",
                            duration: 3,
                        });
                    }
                },

                onCancel: () => {
                    // Do nothing, just close the confirmation dialog
                },

            }

            )

        }
        catch (error) {
            console.error("Error in confirmation:", error);
        }
    }

    const renderFormItem = (
        label,
        name,
        placeholder,
        rules,
        Component = Input,
        props = {}
    ) => (
        <Form.Item label={label} name={name} rules={rules}>
            <Component placeholder={placeholder} {...props} />
        </Form.Item>
    );

    const fetchFactoryData = async () => {
        try {
            const response = await axios.get("http://localhost:3334/api/getAllFactory")
            if (response.data) {

                //Map factory Data into options to use in select component
                const options = response.data.map((factory) => ({
                    label: factory.F_Name,
                    value: factory.F_ID,
                }));
                setFactoryOptions(options);
            }
        } catch (error) {
            console.error("Error fetching factory data:", error);
        }
    }

    useEffect(() => {
        if (isAddOpen = true) {
            fetchFactoryData();
        }
    }, [isAddOpen]);

    return (
        <>
            <Modal
                title="Add Warehouse"
                open={isAddOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                width={"33%"}
                destroyOnClose={true}
            >

                <Divider style={{ background: "#000000" }} />

                <Form layout="vertical" form={form} >
                    <Row gutter={[24, 12]}>
                        <Col span={24}>
                            <Form.Item
                                label={"Factory:"}
                                name={"F_ID"}
                                rules={[{ required: true, message: "Please Select a factory!" }]}
                            >
                                <Select
                                    options={factoryOptions}
                                    placeholder="Select a Factory"

                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[24, 12]}>
                        <Col span={9}>
                            {renderFormItem("Warehouse Code:", "W_Code", "Enter Warehouse Code", [{ required: true, message: "Require Warehouse Code" }])}
                        </Col>

                        <Col span={11}>
                            {renderFormItem("Warehouse Name:", "W_Name", "Enter Warehouse Name", [{ required: true, message: "Require Warehouse Name" }])}
                        </Col>

                        <Col span={4}>
                            {renderFormItem("Active:", "W_IsActive", "", [], Switch,
                                { checkedChildren: "Yes", unCheckedChildren: "No" }
                            )}
                        </Col>

                    </Row>

                    <Row gutter={[24, 12]}>
                        <Col span={24}>
                            {renderFormItem("Remarks:", "W_Remarks", "Enter Warehouse Remarks", [])}
                        </Col>
                    </Row>

                </Form>

            </Modal>
        </>
    );
}

export default ModalAddWarehouse;