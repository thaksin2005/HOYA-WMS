import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Switch, Input } from "antd";

const ModalDetailPermission = ({ isModalOpen, setIsModalOpen }) => {

    const [form] = Form.useForm();

    const handleCancel = () => {
        setIsModalOpen(false)
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
        <Modal
            title="Add Permission"
            open={isModalOpen}
            onCancel={handleCancel}
        >
            <Form layout="vertical">
                <Row gutter={[24, 12]}>
                    <Col span={16}>
                        {renderFormItem("Code:", "UP_Code", "Enter Permission Code", [])}
                    </Col>
                    <Col span={8}>
                        {renderFormItem("Active:", "UP_IsActive", "Active", [], Switch)}
                    </Col>
                </Row>
                <Row gutter={[24, 12]}>
                    <Col span={24}>
                        {renderFormItem("Name:", "UP_Name", "Enter Permission Name", [])}
                    </Col>
                </Row>
                <Row gutter={[24, 12]}>
                    <Col span={24}>
                        {renderFormItem("Description:", "UP_Description", "Enter Permission Description")}
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default ModalDetailPermission