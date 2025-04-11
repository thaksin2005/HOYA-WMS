import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Switch, Input, Divider, notification, message } from "antd";
import axios from "axios";

const ModalAddFactory = ({ isAddOpen, setIsAddOpen }) => {

    const [form] = Form.useForm();
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
                content: "Are you sure you want to add this factory?",
                okText: "Yes",
                cancelText: "No",
                centered: true,
                onOk: async () => {
                    try {
                        const formattedData = {
                            F_Code: form.getFieldValue("F_Code"),
                            F_ShortCode: form.getFieldValue("F_ShortCode"),
                            F_Name: form.getFieldValue("F_Name"),
                            F_City: form.getFieldValue("F_City"),
                            F_Site: form.getFieldValue("F_Site"),
                            F_Address: form.getFieldValue("F_Address"),
                            F_Tel: form.getFieldValue("F_Tel"),
                            F_Email: form.getFieldValue("F_Email"),
                            F_TaxID: form.getFieldValue("F_TaxID"),
                            F_Remarks: form.getFieldValue("F_Remarks"),
                            F_IsActive: form.getFieldValue("F_IsActive") ? 1 : 0,
                            //Temporary
                            UA_IDCreateBy: 1,
                            C_IDCompany: 1,

                        };

                        console.log("Formatted Data:", formattedData);

                        const response = await axios.post(
                            "http://localhost:3334/api/addFactory",
                            formattedData
                        );

                        notification.success({
                            message: "Success",
                            description: "Factory added successfully",
                            placement: "topRight",
                            duration: 3,
                        });

                        setIsAddOpen(false);
                        form.resetFields();

                    } catch (error) {
                        console.error("Error saving data:", error);
                        message.error("Error saving data:", error);
                        

                        notification.error({
                            message: "Error",
                            description: "Failed to add factory",
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

    return (
        <>
            <Modal
                title="Add Factory"
                open={isAddOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                okText="Add"
                width={"33%"}
                destroyOnClose={true}
            >

                <Divider style={{ background: "#000000" }} />

                <Form layout="vertical" form={form} >
                    <Row gutter={[24, 12]}>
                        <Col span={8}>
                            {renderFormItem("Factory Code:", "F_Code", "Enter Factory Code", [{ required: true, message: "Require Factory Code" }])}
                        </Col>
                        <Col span={8}>
                            {renderFormItem("Short Code:", "F_ShortCode", "Enter Factory Short Code", [])}
                        </Col>
                        <Col span={8}>
                            {renderFormItem("Site", "F_Site", "Enter Factory Site", [])}
                        </Col>
                    </Row>

                    <Row gutter={[24, 12]}>
                        <Col span={12}>
                            {renderFormItem("Factory Name:", "F_Name", "Enter Factory Name", [{ required: true, message: "Require Factory Name" }])}
                        </Col>

                        <Col span={12}>
                            {renderFormItem("Tax ID:", "F_TaxID", "Enter Factory Tax ID", [])}
                        </Col>

                    </Row>

                    <Row gutter={[24, 12]}>
                        <Col span={24}>
                            {renderFormItem("Address:", "F_Address", "Enter Factory Address", [])}
                        </Col>
                    </Row>

                    <Row gutter={[24, 12]}>
                        <Col span={11}>
                            {renderFormItem("Email:", "F_Email", "Enter Factory Email", [])}
                        </Col>

                        <Col span={9}>
                            {renderFormItem("Mobile:", "F_Tel", "Enter Factory Mobile", [])}
                        </Col>

                        <Col span={4}>
                            {renderFormItem("Active:", "F_IsActive", "Active", [], Switch, {
                                checkedChildren: "Yes", unCheckedChildren: "No"
                            })}
                        </Col>
                    </Row>

                    <Row gutter={[24, 12]}>
                        <Col span={24}>
                            {renderFormItem("Remarks:", "F_Remarks", "Enter Factory Remarks", [])}
                        </Col>
                    </Row>

                </Form>

            </Modal>
        </>
    );
}

export default ModalAddFactory;