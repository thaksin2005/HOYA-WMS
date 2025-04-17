import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Switch, Input, Divider, notification, message } from "antd";
import axios from "axios";

const ModalEditWarehouse = ({ isEditOpen, setIsEditOpen, WarehouseRecord }) => {

    const [form] = Form.useForm();
    const [userID, setUserID] = useState(null);
    const handleCancel = () => {
        setIsEditOpen(false);
        form.resetFields
    }

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                console.log("Form values:", values);
                notification.success({
                    message: "Success",
                    description: "Warehouse Edited successfully",
                    duration: 3,
                });
                setIsEditOpen(false);
                form.resetFields();

                // Refresh page after 2 seconds
                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            })
            .catch((errorInfo) => {
                console.error("Validation failed:", errorInfo);
            })
    }

    const handleOk2 = async () => {
        try {
            await form.validateFields();
            confirm({
                title: "Confirm",
                content: "Are you sure you want to Edit this Warehouse",
                okText: "Yes",
                cancelText: "No",
                centered: true,
                onOk: async () => {
                    try {
                        const formattedData = {
                            W_Code: form.getFieldValue("warehouseCode"),
                            W_Name: form.getFieldValue("warehouseName"),
                            W_Remarks: form.getFieldValue("factoryRemarks"),
                            W_IsActive: form.getFieldValue("factoryIsActive") ? 1 : 0,
                            F_ID: factoryID,

                            //Temporary
                            UA_IDCreateBy: userID,


                        };

                        console.log("Formatted Data:", formattedData);

                        const response = await axios.put(
                            "http://localhost:3334/api/editFactory",
                            formattedData
                        );

                        notification.success({
                            message: "Success",
                            description: "Factory Edited successfully",
                            placement: "topRight",
                            duration: 3,
                        });

                        setIsEditOpen(false);
                        form.resetFields();

                        // Refresh page after 2 seconds
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);

                    } catch (error) {
                        console.error("Error saving data:", error);
                        message.error("Error saving data:", error);


                        notification.error({
                            message: "Error",
                            description: "Failed to Edit factory",
                            placement: "topRight",
                            duration: 3,
                        });
                    }
                },
                onCancel: () => {
                    // Do nothing, just close the confirmation dialog
                },
            })
        } catch (error) {
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

const fetchWarehouseData = async (warehouseId) => {
    try {
        const response = await axios.get(`http://localhost:3334/api/getWarehouse/${warehouseId}`)
        if (response.data) {
            const warehouseData = {
                factoryID: response.data.F_IDFactory,
                warehouseCode: response.data.W_Code,
                warehouseName: response.data.W_Name,
                warehouseIsActive: response.data.W_IsActive,
                warehouseRemarks: response.data.W_Remarks,

            }
            form.setFieldsValue(warehouseData);
        }
    } catch (error) {
        console.error("Error fetching factory data:", error);
    }

}

useEffect(() => {
    if (isEditOpen) {
        fetchWarehouseData(WarehouseRecord.WarehouseID);
    }
}, [isEditOpen]);

return (
    <>
        <Modal
            title="Edit Warehouse"
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
                        {renderFormItem("Factory:", "factoryID", "", [])}
                    </Col>
                </Row>

                <Row gutter={[24, 12]}>
                    <Col span={8}>
                        {renderFormItem("Warehouse Code:", "warehouseCode", "Enter Warehouse Code", [])}
                    </Col>

                    <Col span={12}>
                        {renderFormItem("Warehouse Name:", "warehouseName", "Enter Warehouse Name", [])}
                    </Col>

                    <Col span={4}>
                        {renderFormItem("Active:", "warehouseIsActive", "", [], Switch,
                            { checkedChildren: "Yes", unCheckedChildren: "No" }
                        )}
                    </Col>

                </Row>

                <Row gutter={[24, 12]}>
                    <Col span={24}>
                        {renderFormItem("Remarks:", "warehouseRemarks", "Enter Warehouse Remarks", [])}
                    </Col>
                </Row>

            </Form>

        </Modal>
    </>
);
}

export default ModalEditWarehouse;