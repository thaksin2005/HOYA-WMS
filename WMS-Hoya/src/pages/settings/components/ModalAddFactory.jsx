import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Switch, Input, Divider } from "antd";

const ModalAddFactory = ({ isAddOpen, setIsAddOpen }) => {

    const [form] = Form.useForm();
    const handleCancel = () => {
        setIsAddOpen(false);
        form.resetFields
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
                title="Adding Factory"
                open={isAddOpen}
                onCancel={handleCancel}
                width={"33%"}
            >

                <Divider style={{background: "#000000"}}/>
                
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
                            {renderFormItem("Active:", "F_IsActive", "Active", [], Switch)}
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