import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Switch, Input, Divider, notification, message } from "antd";

const ModalEditPlace = ({ isEditOpen, setIsEditOpen }) => {

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
                    description: "Place Edited successfully",
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
                title="Edit Place"
                open={isEditOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                width={"33%"}
                destroyOnClose={true}
            >

                <Divider style={{ background: "#000000" }} />

                <Form layout="vertical" >
                    <Row gutter={[24, 12]}>
                        <Col span={24}>
                            {renderFormItem("Warehouse:", "W_Name", "", [])}
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
                                {checkedChildren:"Yes", unCheckedChildren:"No"}
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