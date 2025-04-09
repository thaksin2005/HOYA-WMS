import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Switch, Input, Divider, notification, message } from "antd";

const ModalEditFactory = ({ isEditOpen, setIsEditOpen }) => {

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
                    description: "Factory successfully",
                    duration: 3,
                });
                setIsEditOpen(false);
                form.resetFields();

            })
            .catch((errorInfo) =>{
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

    return (
        <>
            <Modal
                title="Edit Factory"
                open={isEditOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                okText="Add"
                width={"33%"}
                destroyOnClose={true}
            >

                <Divider style={{ background: "#000000" }} />

                <Form layout="vertical" >
                    <Row gutter={[24, 12]}>
                        <Col span={8}>
                            {renderFormItem("Factory Code:", "F_Code", "Enter Factory Code", [])}
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
                            {renderFormItem("Factory Name:", "F_Name", "Enter Factory Name", [])}
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
                            {renderFormItem("Mobile:", "F_Mobile", "Enter Factory Mobile", [])}
                        </Col>

                        <Col span={4}>
                            {renderFormItem("Active:", "F_IsActive", "Active", [], Switch,{
                                checkedChildren:"Yes", unCheckedChildren:"No"
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