import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Show, DateField } from "@refinedev/antd";
import { useShow, useOne, useUpdate } from "@refinedev/core";
import { Typography, Row, Col, Card, Descriptions, Tag, Space, Image, Progress, Button, Statistic, Alert, Modal, Form, InputNumber, Select, Input, notification, Divider, Empty, } from "antd";
import { ScanOutlined, UserOutlined, DollarOutlined, CheckCircleOutlined, ClockCircleOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
const { Title, Text, Paragraph } = Typography;
export const EvaluationShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const evaluation = data?.data;
    const [redeemModalVisible, setRedeemModalVisible] = useState(false);
    const [form] = Form.useForm();
    const { mutate: updateEvaluation } = useUpdate();
    // Fetch customer data
    const { data: customerData } = useOne({
        resource: "customers",
        id: evaluation?.customerId || "",
        queryOptions: {
            enabled: !!evaluation?.customerId,
        },
    });
    const customer = customerData?.data;
    const getStatusDetails = (status) => {
        switch (status) {
            case "approved":
                return {
                    color: "blue",
                    icon: _jsx(CheckCircleOutlined, {}),
                    text: "APROBADO",
                };
            case "redeemed":
                return {
                    color: "green",
                    icon: _jsx(DollarOutlined, {}),
                    text: "REDIMIDO",
                };
            case "expired":
                return {
                    color: "red",
                    icon: _jsx(ClockCircleOutlined, {}),
                    text: "EXPIRADO",
                };
            default:
                return {
                    color: "default",
                    icon: _jsx(ScanOutlined, {}),
                    text: "PENDIENTE",
                };
        }
    };
    const statusDetails = getStatusDetails(evaluation?.status);
    const getConditionColor = (condition) => {
        switch (condition) {
            case "excellent":
                return "#52c41a";
            case "good":
                return "#1890ff";
            case "fair":
                return "#faad14";
            case "poor":
                return "#f5222d";
            default:
                return "#d9d9d9";
        }
    };
    const handleRedeem = (values) => {
        if (values.amountUsed > (evaluation?.creditApproved || 0)) {
            notification.error({
                message: "Error",
                description: "El monto no puede exceder el crédito disponible",
            });
            return;
        }
        updateEvaluation({
            resource: "evaluations",
            id: evaluation?.id || "",
            values: {
                status: "redeemed",
                redeemedAt: new Date().toISOString(),
            },
        }, {
            onSuccess: () => {
                notification.success({
                    message: "Éxito",
                    description: "Crédito redimido correctamente",
                });
                setRedeemModalVisible(false);
                form.resetFields();
            },
        });
    };
    const daysUntilExpiry = evaluation?.expiresAt
        ? dayjs(evaluation.expiresAt).diff(dayjs(), "days")
        : 0;
    return (_jsxs(Show, { isLoading: isLoading, children: [_jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { span: 24, children: _jsx(Card, { children: _jsxs(Row, { gutter: 16, align: "middle", children: [_jsx(Col, { flex: "auto", children: _jsxs(Space, { align: "center", children: [_jsx(ScanOutlined, { style: { fontSize: 32, color: "#1890ff" } }), _jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Title, { level: 3, style: { margin: 0 }, children: "Evaluaci\u00F3n Trade & Sleep" }), _jsx(Text, { code: true, copyable: true, style: { fontSize: 16 }, children: evaluation?.id })] })] }) }), _jsx(Col, { children: _jsxs(Space, { direction: "vertical", align: "center", children: [_jsx(Tag, { color: statusDetails.color, icon: statusDetails.icon, style: { fontSize: 16, padding: "8px 16px" }, children: statusDetails.text }), evaluation?.status === "approved" && daysUntilExpiry > 0 && (_jsxs(Text, { type: "secondary", children: [daysUntilExpiry, " d\u00EDas para expirar"] }))] }) })] }) }) }), _jsxs(Col, { xs: 24, lg: 8, children: [_jsx(Card, { title: "Informaci\u00F3n del Cliente", size: "small", children: customer && (_jsxs(Descriptions, { column: 1, size: "small", children: [_jsx(Descriptions.Item, { label: "Nombre", children: _jsxs(Space, { children: [_jsx(UserOutlined, {}), _jsxs(Text, { strong: true, children: [customer.firstName, " ", customer.lastName] })] }) }), _jsx(Descriptions.Item, { label: "Tel\u00E9fono", children: _jsx(Text, { copyable: true, children: customer.phone }) }), _jsx(Descriptions.Item, { label: "Email", children: _jsx(Text, { copyable: true, children: customer.email }) }), _jsx(Descriptions.Item, { label: "Direcci\u00F3n", children: _jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { children: customer.address?.street }), _jsxs(Text, { children: [customer.address?.city, ", ", customer.address?.state, " ", customer.address?.zipCode] })] }) }), _jsx(Descriptions.Item, { label: "Tier", children: _jsx(Tag, { color: customer.tier === "gold"
                                                    ? "gold"
                                                    : customer.tier === "silver"
                                                        ? "default"
                                                        : "orange", children: customer.tier?.toUpperCase() }) })] })) }), _jsx(Card, { title: "Informaci\u00F3n del Colch\u00F3n", size: "small", style: { marginTop: 16 }, children: _jsxs(Descriptions, { column: 1, size: "small", children: [_jsx(Descriptions.Item, { label: "Marca", children: _jsx(Text, { strong: true, children: evaluation?.mattress.brand?.toUpperCase() }) }), evaluation?.mattress.model && (_jsx(Descriptions.Item, { label: "Modelo", children: evaluation.mattress.model })), _jsx(Descriptions.Item, { label: "Tama\u00F1o", children: _jsx(Tag, { children: evaluation?.mattress.size?.toUpperCase() }) }), _jsx(Descriptions.Item, { label: "Edad", children: _jsxs(Text, { children: [evaluation?.mattress.age, " a\u00F1os"] }) }), _jsx(Descriptions.Item, { label: "Condici\u00F3n", children: _jsx(Tag, { color: getConditionColor(evaluation?.mattress.condition), children: evaluation?.mattress.condition?.toUpperCase() }) })] }) })] }), _jsxs(Col, { xs: 24, lg: 16, children: [_jsxs(Card, { title: "Resultado de la Evaluaci\u00F3n", children: [_jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, md: 12, children: _jsxs(Card, { type: "inner", title: "Score Final", children: [_jsx(Statistic, { value: evaluation?.aiEvaluation.finalScore || 0, suffix: "/ 100", valueStyle: { fontSize: 48, color: "#1890ff" } }), _jsx(Progress, { percent: evaluation?.aiEvaluation.finalScore || 0, strokeColor: {
                                                                "0%": "#108ee9",
                                                                "100%": "#87d068",
                                                            }, showInfo: false }), _jsxs(Text, { type: "secondary", children: ["Confianza: ", evaluation?.aiEvaluation.confidence, "%"] })] }) }), _jsx(Col, { xs: 24, md: 12, children: _jsxs(Card, { type: "inner", title: "Cr\u00E9dito Aprobado", children: [_jsx(Statistic, { value: evaluation?.creditApproved || 0, prefix: "$", valueStyle: { fontSize: 48, color: "#3f8600" } }), evaluation?.status === "approved" && (_jsx(Button, { type: "primary", size: "large", icon: _jsx(DollarOutlined, {}), onClick: () => setRedeemModalVisible(true), block: true, style: { marginTop: 16 }, children: "Redimir Cr\u00E9dito" })), evaluation?.status === "redeemed" && (_jsx(Alert, { message: "Cr\u00E9dito Redimido", description: `Redimido el ${dayjs(evaluation.redeemedAt).format("DD/MM/YYYY HH:mm")}`, type: "success", showIcon: true, style: { marginTop: 16 } }))] }) })] }), _jsx(Divider, {}), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { xs: 12, md: 6, children: _jsx(Card, { size: "small", type: "inner", children: _jsx(Statistic, { title: "Condici\u00F3n", value: evaluation?.aiEvaluation.conditionScore || 0, suffix: "/ 100" }) }) }), _jsx(Col, { xs: 12, md: 6, children: _jsx(Card, { size: "small", type: "inner", children: _jsx(Statistic, { title: "Marca", value: evaluation?.aiEvaluation.brandScore || 0, suffix: "/ 100" }) }) }), _jsx(Col, { xs: 12, md: 6, children: _jsx(Card, { size: "small", type: "inner", children: _jsx(Statistic, { title: "Edad", value: evaluation?.aiEvaluation.ageScore || 0, suffix: "/ 100" }) }) }), _jsx(Col, { xs: 12, md: 6, children: _jsx(Card, { size: "small", type: "inner", children: _jsx(Statistic, { title: "Tama\u00F1o", value: evaluation?.aiEvaluation.sizeScore || 0, suffix: "/ 100" }) }) })] })] }), _jsx(Card, { title: "Fotos del Colch\u00F3n", style: { marginTop: 16 }, children: evaluation?.photos && evaluation.photos.length > 0 ? (_jsx(Row, { gutter: [16, 16], children: evaluation.photos.map((photo, index) => (_jsx(Col, { xs: 24, sm: 12, md: 8, children: _jsx(Card, { hoverable: true, cover: _jsx(Image, { src: photo.url, alt: `Foto ${index + 1}`, style: { height: 200, objectFit: "cover" } }), children: _jsx(Card.Meta, { title: photo.filename, description: dayjs(photo.uploadDate).format("DD/MM/YYYY HH:mm") }) }) }, index))) })) : (_jsx(Empty, { description: "Sin fotos" })) })] }), _jsx(Col, { span: 24, children: _jsx(Card, { title: "Informaci\u00F3n Adicional", children: _jsxs(Descriptions, { children: [_jsx(Descriptions.Item, { label: "Creado Por", children: evaluation?.employeeId || "Sistema" }), _jsx(Descriptions.Item, { label: "Tienda", children: evaluation?.storeId || "Online" }), _jsx(Descriptions.Item, { label: "Fecha de Creaci\u00F3n", children: _jsx(DateField, { value: evaluation?.createdAt, format: "DD/MM/YYYY HH:mm:ss" }) }), _jsx(Descriptions.Item, { label: "Fecha de Expiraci\u00F3n", children: _jsx(DateField, { value: evaluation?.expiresAt, format: "DD/MM/YYYY HH:mm:ss" }) }), evaluation?.redeemedAt && (_jsx(Descriptions.Item, { label: "Fecha de Redenci\u00F3n", children: _jsx(DateField, { value: evaluation.redeemedAt, format: "DD/MM/YYYY HH:mm:ss" }) })), _jsx(Descriptions.Item, { label: "\u00DAltima Actualizaci\u00F3n", children: _jsx(DateField, { value: evaluation?.updatedAt, format: "DD/MM/YYYY HH:mm:ss" }) })] }) }) })] }), _jsxs(Modal, { title: "Redimir Cr\u00E9dito Trade & Sleep", open: redeemModalVisible, onOk: form.submit, onCancel: () => setRedeemModalVisible(false), width: 600, children: [_jsx(Alert, { message: `Crédito Disponible: $${evaluation?.creditApproved || 0}`, description: "Ingresa los detalles de la redenci\u00F3n", type: "info", showIcon: true, style: { marginBottom: 16 } }), _jsxs(Form, { form: form, layout: "vertical", onFinish: handleRedeem, children: [_jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Monto a Usar", name: "amountUsed", rules: [
                                                { required: true, message: "Ingresa el monto" },
                                                {
                                                    max: evaluation?.creditApproved || 0,
                                                    type: "number",
                                                    message: "No puede exceder el crédito disponible",
                                                },
                                            ], children: _jsx(InputNumber, { min: 0, max: evaluation?.creditApproved || 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00" }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Total de la Venta", name: "saleTotal", rules: [{ required: true, message: "Ingresa el total" }], children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00" }) }) })] }), _jsx(Form.Item, { label: "Tipo de Producto", name: "productType", rules: [{ required: true, message: "Selecciona el tipo de producto" }], children: _jsxs(Select, { placeholder: "Seleccionar...", children: [_jsx(Select.Option, { value: "mattress", children: "Colch\u00F3n Nuevo" }), _jsx(Select.Option, { value: "base", children: "Base Ajustable" }), _jsx(Select.Option, { value: "accessories", children: "Accesorios" }), _jsx(Select.Option, { value: "protection", children: "Plan de Protecci\u00F3n" })] }) }), _jsx(Form.Item, { label: "M\u00E9todo de Pago Adicional", name: "paymentMethod", rules: [{ required: true, message: "Selecciona el método de pago" }], children: _jsxs(Select, { placeholder: "Seleccionar...", children: [_jsx(Select.Option, { value: "card", children: "Tarjeta de Cr\u00E9dito/D\u00E9bito" }), _jsx(Select.Option, { value: "cash", children: "Efectivo" }), _jsx(Select.Option, { value: "finance", children: "Financiamiento" })] }) }), _jsx(Form.Item, { label: "Notas", name: "notes", children: _jsx(Input.TextArea, { rows: 3, placeholder: "Notas adicionales..." }) })] })] })] }));
};
