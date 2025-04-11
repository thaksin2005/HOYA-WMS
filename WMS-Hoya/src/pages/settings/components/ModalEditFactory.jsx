import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Switch, Input, Divider, notification, message } from "antd";
import axios from "axios";
import { Factory } from "lucide-react";

const ModalEditFactory = ({ isEditOpen, setIsEditOpen, FactoryRecord }) => {

    const [form] = Form.useForm();
    const [factoryID, setFactoryID] = useState(null);
    const [companyID, setCompanyID] = useState(null);
    const [userID, setUserID] = useState(null);
    const { confirm } = Modal;

    const handleCancel = () => {
        setIsEditOpen(false);
        form.resetFields
    }

    const handleOk = async () => {
        try {
            await form.validateFields();
            confirm({
                title: "Confirm",
                content: "Are you sure you want to Edit this factory?",
                okText: "Yes",
                cancelText: "No",
                centered: true,
                onOk: async () => {
                    try {
                        const formattedData = {
                            F_Code: form.getFieldValue("factoryCode"),
                            F_ShortCode: form.getFieldValue("factoryShortCode"),
                            F_Name: form.getFieldValue("factoryName"),
                            F_City: form.getFieldValue("factoryCity"),
                            F_Site: form.getFieldValue("factorySite"),
                            F_Address: form.getFieldValue("factoryAddress"),
                            F_Tel: form.getFieldValue("factoryTel"),
                            F_Email: form.getFieldValue("factoryEmail"),
                            F_TaxID: form.getFieldValue("factoryTaxID"),
                            F_Remarks: form.getFieldValue("factoryRemarks"),
                            F_IsActive: form.getFieldValue("factoryIsActive") ? 1 : 0,
                            F_ID: factoryID,

                            //Temporary
                            UA_IDCreateBy: userID,
                            C_IDCompany: companyID,


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

    const fetchFactoryData = async (factoryId) => {
        try {
            const response = await axios.get(`http://localhost:3334/api/getFactory/${factoryId}`)
            if (response.data) {
                const factoryData = {
                    factoryCode: response.data.F_Code,
                    factoryShortCode: response.data.F_ShortCode,
                    factoryName: response.data.F_Name,
                    factoryCity: response.data.F_City,
                    factorySite: response.data.F_Site,
                    factoryAddress: response.data.F_Address,
                    factoryTel: response.data.F_Tel,
                    factoryEmail: response.data.F_Email,
                    factoryTaxId: response.data.F_TaxID,
                    factoryIsActive: response.data.F_IsActive,
                    factoryRemarks: response.data.F_Remarks,

                }
                form.setFieldsValue(factoryData);
                setFactoryID(response.data.F_ID);
                setCompanyID(response.data.C_IDCompany);
                setUserID(response.data.UA_IDCreateBy);
            }
        } catch (error) {
            console.error("Error fetching factory data:", error);
        }

    }

    useEffect(() => {
        if (isEditOpen) {
            fetchFactoryData(FactoryRecord.FactoryID);
        }
    }, [isEditOpen]);

    return (
        <>
            <Modal
                title="Edit Factory"
                open={isEditOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                okText="Edit"
                width={"33%"}
                destroyOnClose={true}
            >

                <Divider style={{ background: "#000000" }} />

                <Form form={form} layout="vertical" >
                    <Row gutter={[24, 12]}>
                        <Col span={8}>
                            {renderFormItem("Factory Code:", "factoryCode", "Enter Factory Code", [])}
                        </Col>
                        <Col span={8}>
                            {renderFormItem("Short Code:", "factoryShortCode", "Enter Factory Short Code", [])}
                        </Col>
                        <Col span={8}>
                            {renderFormItem("Site", "factorySite", "Enter Factory Site", [])}
                        </Col>
                    </Row>

                    <Row gutter={[24, 12]}>
                        <Col span={12}>
                            {renderFormItem("Factory Name:", "factoryName", "Enter Factory Name", [])}
                        </Col>

                        <Col span={12}>
                            {renderFormItem("Tax ID:", "factoryTaxId", "Enter Factory Tax ID", [])}
                        </Col>

                    </Row>

                    <Row gutter={[24, 12]}>
                        <Col span={24}>
                            {renderFormItem("Address:", "factoryAddress", "Enter Factory Address", [])}
                        </Col>
                    </Row>

                    <Row gutter={[24, 12]}>
                        <Col span={11}>
                            {renderFormItem("Email:", "factoryEmail", "Enter Factory Email", [])}
                        </Col>

                        <Col span={9}>
                            {renderFormItem("Mobile:", "factoryTel", "Enter Factory Mobile", [])}
                        </Col>

                        <Col span={4}>
                            {renderFormItem("Active:", "factoryIsActive", "Active", [], Switch, {
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

export default ModalEditFactory;