import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Switch, Input } from "antd";

const ModalAddFactory = ({ isModalOpen, setIsModalOpen }) => {
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
        <>
            <Modal title="Add Factory"
                open={isModalOpen}
                onCancel={handleCancel}>
                <Form layout="vertical">
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>

                    <Row>

                    </Row>

                    <Row>

                    </Row>

                    <Row>

                    </Row>

                    <Row>

                    </Row>

                </Form>

            </Modal>
        </>
    );
}

export default ModalAddFactory;