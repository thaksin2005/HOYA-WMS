import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Switch, Input, Divider, notification, message } from "antd";
import axios from "axios";

const ModalEditPlace = ({ isEditOpen, setIsEditOpen, PlaceRecord }) => {

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
                
                // Refresh page after 2 seconds
                setTimeout(() => {
                    window.location.reload();
                }, 2000);

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

    const fetchPlaceData = async (placeId) => {
        try {
            const response = await axios.get(`http://localhost:3334/api/getPlace/${placeId}`)
            if (response.data) {
                const placeData = {
                    warehouseId: response.data.W_IDWarehouse,
                    placeCode: response.data.P_Code,
                    placeName: response.data.P_Name,
                    placeIsActive: response.data.P_IsActive,
                    placeRemarks: response.data.P_Remarks,

                }
                form.setFieldsValue(placeData);
            }
        } catch (error) {
            console.error("Error fetching factory data:", error);
        }

    }

    useEffect(() => {
        if (isEditOpen) {
            fetchPlaceData(PlaceRecord.PlaceID);
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
                            {renderFormItem("Warehouse:", "warehouseId", "", [])}
                        </Col>
                    </Row>

                    <Row gutter={[24, 12]}>
                        <Col span={8}>
                            {renderFormItem("Place Code:", "placeCode", "Enter Place Code", [])}
                        </Col>

                        <Col span={12}>
                            {renderFormItem("Place Name:", "placeName", "Enter Place Name", [])}
                        </Col>

                        <Col span={4}>
                            {renderFormItem("Active:", "placeIsActive", "", [], Switch,
                                { checkedChildren: "Yes", unCheckedChildren: "No" }
                            )}
                        </Col>

                    </Row>

                    <Row gutter={[24, 12]}>
                        <Col span={24}>
                            {renderFormItem("Remarks:", "placeRemarks", "Enter Place Remarks", [])}
                        </Col>
                    </Row>

                </Form>

            </Modal>
        </>
    );
}

export default ModalEditPlace;