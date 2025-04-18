import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Switch, Input, Divider, notification, message, Select } from "antd";
import axios from "axios";

const ModalEditPlace = ({ isEditOpen, setIsEditOpen, PlaceRecord }) => {

    const [warehouseOptions, setWarehouseOptions] = useState([]);
    const [form] = Form.useForm();
    const { confirm } = Modal

    const [placeID, setPlaceID] = useState(null);

    const handleCancel = () => {
        setIsEditOpen(false);
        form.resetFields
    }

    const handleOk = async () => {

        try {
            await form.validateFields();
            confirm({
                title: "Confirm",
                content: "Are you sure you want to edit this place?",
                okText: "Yes",
                cancelText: "No",
                centered: true,
                onOk: async () => {

                    try {
                        const formattedData = {
                            W_IDWarehouse: form.getFieldValue("W_ID"),
                            P_Code: form.getFieldValue("P_Code"),
                            P_Name: form.getFieldValue("P_Name"),
                            P_IsActive: form.getFieldValue("P_IsActive"),
                            P_Remarks: form.getFieldValue("P_Remarks"),
                            P_ID: placeID,
                            // P_CreateOn: formattedTime,

                            //Temporary
                            UA_IDCreateBy: 1,
                            P_IsAutoStorage: 0
                        }
                        console.log("Formatted Data:", formattedData);

                        const response = await axios.put(
                            "http://localhost:3334/api/editPlace",
                            formattedData
                        );

                        notification.success({
                            message: "Success",
                            description: "Place edited sucessfully",
                            placement: "topRight",
                            duration: 3,
                        });

                        setIsEditOpen(false);
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
                            description: "Failed to edit place",
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

    const fetchPlaceData = async (placeId) => {
        try {
            const response = await axios.get(`http://localhost:3334/api/getPlace/${placeId}`)
            if (response.data) {
                const placeData = {
                    W_ID: response.data.W_IDWarehouse,
                    P_Code: response.data.P_Code,
                    P_Name: response.data.P_Name,
                    P_IsActive: response.data.P_IsActive,
                    P_Remarks: response.data.P_Remarks,

                }
                form.setFieldsValue(placeData);
                setPlaceID(response.data.P_ID);
            }
        } catch (error) {
            console.error("Error fetching factory data:", error);
        }

    }

    const fetchWarehouseData = async () => {
        try {
            const response = await axios.get("http://localhost:3334/api/getAllWarehouse")
            if (response.data) {
                //Map factory Data into options to use in select component
                const options = response.data.map((warehouse) => ({
                    label: warehouse.W_Name,
                    value: warehouse.W_ID,
                }));
                setWarehouseOptions(options);
            }
        } catch (error) {
            console.error("Error fetching warehouse data:", error);
        }
    }

    useEffect(() => {
        if (isEditOpen) {
            fetchPlaceData(PlaceRecord.PlaceID);
            fetchWarehouseData();
        }
    }, [isEditOpen]);

    return (
        <>
            <Modal
                title="Edit Place"
                open={isEditOpen}
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
                                label={"Warehouse:"}
                                name={"W_ID"}
                                rules={[{ required: true, message: "Please Select a warehouse!" }]}
                            >
                                <Select
                                    options={warehouseOptions}
                                    placeholder="Select a Warehouse"

                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[24, 12]}>
                        <Col span={8}>
                            {renderFormItem("Place Code:", "P_Code", "Enter Place Code", [])}
                        </Col>

                        <Col span={12}>
                            {renderFormItem("Place Name:", "P_Name", "Enter Place Name", [])}
                        </Col>

                        <Col span={4}>
                            {renderFormItem("Active:", "P_IsActive", "", [], Switch,
                                { checkedChildren: "Yes", unCheckedChildren: "No" }
                            )}
                        </Col>

                    </Row>

                    <Row gutter={[24, 12]}>
                        <Col span={24}>
                            {renderFormItem("Remarks:", "P_Remarks", "Enter Place Remarks", [])}
                        </Col>
                    </Row>

                </Form>

            </Modal>
        </>
    );
}

export default ModalEditPlace;