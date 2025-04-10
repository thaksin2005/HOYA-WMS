import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Switch, Input, Divider, notification, message } from "antd";
import axios from "axios";

const ModalEditWarehouse = ({ isEditOpen, setIsEditOpen, WarehouseRecord }) => {

    const [form] = Form.useForm();
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

            })
            .catch((errorInfo) => {
                console.error("Validation failed:", errorInfo);
            })
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