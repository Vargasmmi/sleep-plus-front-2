import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { Show, DateField } from "@refinedev/antd";
import { useShow, useOne, useList } from "@refinedev/core";
import { Typography, Row, Col, Card, Descriptions, Tag, Space, Progress, Button, Statistic, Alert, Table, Modal, Form, DatePicker, Select, Input, } from "antd";
import { CreditCardOutlined, UserOutlined, CalendarOutlined, CheckCircleOutlined, PauseCircleOutlined, CloseCircleOutlined, EditOutlined, StopOutlined, PlayCircleOutlined, FileTextOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
const { Title, Text } = Typography;
export const SubscriptionShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const subscription = data?.data;
    const [pauseModalVisible, setPauseModalVisible] = React.useState(false);
    const [cancelModalVisible, setCancelModalVisible] = React.useState(false);
    const [form] = Form.useForm();
    // Fetch customer data
    const { data: customerData } = useOne({
        resource: "customers",
        id: subscription?.customerId || "",
        queryOptions: {
            enabled: !!subscription?.customerId,
        },
    });
    // Fetch related sales
    const { data: salesData } = useList({
        resource: "sales",
        filters: [
            {
                field: "subscriptionId",
                operator: "eq",
                value: subscription?.id,
            },
        ],
        queryOptions: {
            enabled: !!subscription?.id,
        },
    });
    const customer = customerData?.data;
    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "green";
            case "paused":
                return "orange";
            case "cancelled":
                return "red";
            case "pending":
                return "blue";
            default:
                return "default";
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case "active":
                return _jsx(CheckCircleOutlined, {});
            case "paused":
                return _jsx(PauseCircleOutlined, {});
            case "cancelled":
                return _jsx(CloseCircleOutlined, {});
            default:
                return _jsx(CalendarOutlined, {});
        }
    };
    const getPlanDetails = (plan) => {
        switch (plan) {
            case "elite":
                return {
                    color: "purple",
                    name: "ELITE",
                    description: "Máxima protección con todos los beneficios",
                };
            case "premium":
                return {
                    color: "blue",
                    name: "PREMIUM",
                    description: "Protección completa para tu colchón",
                };
            case "basic":
                return {
                    color: "default",
                    name: "BASIC",
                    description: "Protección esencial",
                };
            default:
                return {
                    color: "default",
                    name: "DESCONOCIDO",
                    description: "",
                };
        }
    };
    const planDetails = getPlanDetails(subscription?.plan);
    const handlePauseSubscription = (values) => {
        console.log("Pausar suscripción:", values);
        setPauseModalVisible(false);
        form.resetFields();
    };
    const handleCancelSubscription = (values) => {
        console.log("Cancelar suscripción:", values);
        setCancelModalVisible(false);
        form.resetFields();
    };
    return (_jsxs(Show, { isLoading: isLoading, children: [_jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { span: 24, children: _jsx(Card, { children: _jsxs(Row, { gutter: 16, align: "middle", children: [_jsx(Col, { flex: "auto", children: _jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Space, { align: "center", children: [_jsxs(Title, { level: 3, style: { margin: 0 }, children: ["Suscripci\u00F3n ", planDetails.name] }), _jsx(Tag, { color: getStatusColor(subscription?.status), icon: getStatusIcon(subscription?.status), style: { fontSize: 14 }, children: subscription?.status?.toUpperCase() })] }), _jsx(Text, { type: "secondary", children: planDetails.description })] }) }), _jsx(Col, { children: _jsxs(Space, { children: [subscription?.status === "active" && (_jsxs(_Fragment, { children: [_jsx(Button, { icon: _jsx(EditOutlined, {}), children: "Modificar Plan" }), _jsx(Button, { icon: _jsx(PauseCircleOutlined, {}), onClick: () => setPauseModalVisible(true), children: "Pausar" }), _jsx(Button, { danger: true, icon: _jsx(StopOutlined, {}), onClick: () => setCancelModalVisible(true), children: "Cancelar" })] })), subscription?.status === "paused" && (_jsx(Button, { type: "primary", icon: _jsx(PlayCircleOutlined, {}), children: "Reanudar" }))] }) })] }) }) }), _jsxs(Col, { xs: 24, lg: 8, children: [_jsx(Card, { title: "Informaci\u00F3n del Cliente", size: "small", children: customer && (_jsxs(Descriptions, { column: 1, size: "small", children: [_jsx(Descriptions.Item, { label: "Nombre", children: _jsxs(Space, { children: [_jsx(UserOutlined, {}), _jsxs(Text, { strong: true, children: [customer.firstName, " ", customer.lastName] })] }) }), _jsx(Descriptions.Item, { label: "Tel\u00E9fono", children: _jsx(Text, { copyable: true, children: customer.phone }) }), _jsx(Descriptions.Item, { label: "Email", children: _jsx(Text, { copyable: true, children: customer.email }) }), _jsx(Descriptions.Item, { label: "Tier", children: _jsx(Tag, { color: customer.tier === "gold" ? "gold" : customer.tier === "silver" ? "default" : "orange", children: customer.tier?.toUpperCase() }) }), _jsx(Descriptions.Item, { label: "Miembro Elite", children: customer.isEliteMember ? (_jsx(Tag, { color: "purple", children: "S\u00ED" })) : (_jsx(Tag, { children: "No" })) })] })) }), _jsx(Card, { title: "Informaci\u00F3n de Facturaci\u00F3n", size: "small", style: { marginTop: 16 }, children: _jsxs(Descriptions, { column: 1, size: "small", children: [_jsx(Descriptions.Item, { label: "Precio", children: _jsxs(Text, { strong: true, children: ["$", subscription?.pricing.monthly, "/mes"] }) }), _jsx(Descriptions.Item, { label: "Frecuencia", children: _jsx(Tag, { children: subscription?.billing.frequency === "monthly" ? "Mensual" : "Anual" }) }), _jsx(Descriptions.Item, { label: "Pr\u00F3ximo Cobro", children: _jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(DateField, { value: subscription?.billing.nextBillingDate, format: "DD/MM/YYYY" }), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["En ", dayjs(subscription?.billing.nextBillingDate).diff(dayjs(), "days"), " d\u00EDas"] })] }) }), _jsx(Descriptions.Item, { label: "M\u00E9todo de Pago", children: _jsxs(Space, { children: [_jsx(CreditCardOutlined, {}), subscription?.billing.paymentMethod === "card" && "Tarjeta", subscription?.billing.paymentMethod === "ach" && "ACH", subscription?.billing.paymentMethod === "cash" && "Efectivo", subscription?.billing.lastFour && ` ****${subscription.billing.lastFour}`] }) })] }) })] }), _jsxs(Col, { xs: 24, lg: 16, children: [_jsx(Card, { title: "Servicios Incluidos", children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, md: 12, children: _jsxs(Card, { size: "small", type: "inner", children: [_jsx(Statistic, { title: "Limpiezas", value: subscription?.services.cleaningsUsed || 0, suffix: `/ ${subscription?.services.cleaningsTotal || 0}` }), _jsx(Progress, { percent: ((subscription?.services.cleaningsUsed || 0) /
                                                            (subscription?.services.cleaningsTotal || 1)) *
                                                            100, strokeColor: "#52c41a" }), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: [(subscription?.services.cleaningsTotal || 0) -
                                                                (subscription?.services.cleaningsUsed || 0), " ", "limpiezas disponibles"] })] }) }), _jsx(Col, { xs: 24, md: 12, children: _jsxs(Card, { size: "small", type: "inner", children: [_jsx(Statistic, { title: "Inspecciones", value: subscription?.services.inspectionsUsed || 0, suffix: `/ ${subscription?.services.inspectionsTotal || 0}` }), _jsx(Progress, { percent: ((subscription?.services.inspectionsUsed || 0) /
                                                            (subscription?.services.inspectionsTotal || 1)) *
                                                            100, strokeColor: "#1890ff" }), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: [(subscription?.services.inspectionsTotal || 0) -
                                                                (subscription?.services.inspectionsUsed || 0), " ", "inspecciones disponibles"] })] }) }), _jsx(Col, { xs: 24, md: 12, children: _jsx(Card, { size: "small", type: "inner", children: _jsxs(Space, { direction: "vertical", children: [_jsx(Text, { strong: true, children: "Protecci\u00F3n contra Da\u00F1os" }), subscription?.services.protectionActive ? (_jsx(Tag, { color: "green", icon: _jsx(CheckCircleOutlined, {}), children: "ACTIVA" })) : (_jsx(Tag, { color: "default", icon: _jsx(CloseCircleOutlined, {}), children: "NO INCLUIDA" }))] }) }) }), _jsx(Col, { xs: 24, md: 12, children: _jsx(Card, { size: "small", type: "inner", children: _jsxs(Space, { direction: "vertical", children: [_jsx(Text, { strong: true, children: "Cr\u00E9ditos Trade & Sleep" }), _jsx(Statistic, { value: subscription?.credits.accumulated || 0, prefix: "$", valueStyle: { fontSize: 20, color: "#3f8600" } }), subscription?.credits.expiration && (_jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["Expiran: ", dayjs(subscription.credits.expiration).format("DD/MM/YYYY")] }))] }) }) })] }) }), _jsx(Card, { title: "Historial de Pagos", style: { marginTop: 16 }, children: _jsx(Table, { dataSource: salesData?.data || [], pagination: { pageSize: 5 }, columns: [
                                        {
                                            title: "Fecha",
                                            dataIndex: "createdAt",
                                            render: (date) => _jsx(DateField, { value: date, format: "DD/MM/YYYY" }),
                                        },
                                        {
                                            title: "Tipo",
                                            dataIndex: "type",
                                            render: (type) => (_jsxs(Tag, { children: [type === "new" && "Nueva", type === "renewal" && "Renovación", type === "upgrade" && "Mejora"] })),
                                        },
                                        {
                                            title: "Monto",
                                            dataIndex: ["amount", "total"],
                                            render: (amount) => _jsxs(Text, { strong: true, children: ["$", amount] }),
                                        },
                                        {
                                            title: "Estado",
                                            dataIndex: "paymentStatus",
                                            render: (status) => (_jsx(Tag, { color: status === "completed" ? "green" : "orange", children: status === "completed" ? "Pagado" : "Pendiente" })),
                                        },
                                        {
                                            title: "Acciones",
                                            render: (_) => (_jsx(Button, { size: "small", icon: _jsx(FileTextOutlined, {}), onClick: () => {
                                                    // Ver recibo
                                                }, children: "Recibo" })),
                                        },
                                    ] }) })] }), _jsx(Col, { span: 24, children: _jsx(Card, { title: "Informaci\u00F3n Adicional", children: _jsxs(Descriptions, { children: [_jsx(Descriptions.Item, { label: "ID de Suscripci\u00F3n", children: _jsx(Text, { code: true, children: subscription?.id }) }), _jsx(Descriptions.Item, { label: "Fecha de Inicio", children: _jsx(DateField, { value: subscription?.startDate, format: "DD/MM/YYYY HH:mm" }) }), _jsx(Descriptions.Item, { label: "Vendido Por", children: subscription?.soldBy }), subscription?.pausedAt && (_jsx(Descriptions.Item, { label: "Pausada Desde", children: _jsx(DateField, { value: subscription.pausedAt, format: "DD/MM/YYYY" }) })), subscription?.cancelledAt && (_jsx(Descriptions.Item, { label: "Cancelada El", children: _jsx(DateField, { value: subscription.cancelledAt, format: "DD/MM/YYYY" }) })), subscription?.cancelReason && (_jsx(Descriptions.Item, { label: "Raz\u00F3n de Cancelaci\u00F3n", span: 3, children: _jsx(Text, { children: subscription.cancelReason }) }))] }) }) })] }), _jsxs(Modal, { title: "Pausar Suscripci\u00F3n", open: pauseModalVisible, onOk: form.submit, onCancel: () => setPauseModalVisible(false), width: 500, children: [_jsx(Alert, { message: "La suscripci\u00F3n se pausar\u00E1 temporalmente", description: "No se realizar\u00E1n cobros mientras est\u00E9 pausada. Los servicios no utilizados se mantendr\u00E1n.", type: "warning", showIcon: true, style: { marginBottom: 16 } }), _jsxs(Form, { form: form, layout: "vertical", onFinish: handlePauseSubscription, children: [_jsx(Form.Item, { label: "Fecha de Pausa", name: "pauseDate", rules: [{ required: true, message: "Selecciona una fecha" }], initialValue: dayjs(), children: _jsx(DatePicker, { style: { width: "100%" }, format: "DD/MM/YYYY" }) }), _jsx(Form.Item, { label: "Fecha de Reactivaci\u00F3n (Opcional)", name: "resumeDate", children: _jsx(DatePicker, { style: { width: "100%" }, format: "DD/MM/YYYY", disabledDate: (current) => current && current < dayjs() }) }), _jsx(Form.Item, { label: "Raz\u00F3n", name: "reason", rules: [{ required: true, message: "Ingresa una razón" }], children: _jsxs(Select, { children: [_jsx(Select.Option, { value: "vacation", children: "Vacaciones" }), _jsx(Select.Option, { value: "financial", children: "Razones Financieras" }), _jsx(Select.Option, { value: "temporary", children: "Mudanza Temporal" }), _jsx(Select.Option, { value: "other", children: "Otra" })] }) })] })] }), _jsxs(Modal, { title: "Cancelar Suscripci\u00F3n", open: cancelModalVisible, onOk: form.submit, onCancel: () => setCancelModalVisible(false), width: 500, okText: "Cancelar Suscripci\u00F3n", okButtonProps: { danger: true }, children: [_jsx(Alert, { message: "\u00BFEst\u00E1s seguro de cancelar esta suscripci\u00F3n?", description: "Esta acci\u00F3n no se puede deshacer. El cliente perder\u00E1 todos los beneficios.", type: "error", showIcon: true, style: { marginBottom: 16 } }), _jsxs(Form, { form: form, layout: "vertical", onFinish: handleCancelSubscription, children: [_jsx(Form.Item, { label: "Fecha de Cancelaci\u00F3n", name: "cancelDate", rules: [{ required: true, message: "Selecciona una fecha" }], initialValue: dayjs(), children: _jsx(DatePicker, { style: { width: "100%" }, format: "DD/MM/YYYY" }) }), _jsx(Form.Item, { label: "Raz\u00F3n de Cancelaci\u00F3n", name: "cancelReason", rules: [{ required: true, message: "Ingresa una razón" }], children: _jsxs(Select, { children: [_jsx(Select.Option, { value: "price", children: "Precio muy alto" }), _jsx(Select.Option, { value: "no_use", children: "No usa los servicios" }), _jsx(Select.Option, { value: "bad_experience", children: "Mala experiencia" }), _jsx(Select.Option, { value: "competitor", children: "Se fue a la competencia" }), _jsx(Select.Option, { value: "other", children: "Otra raz\u00F3n" })] }) }), _jsx(Form.Item, { label: "Notas Adicionales", name: "notes", children: _jsx(Input.TextArea, { rows: 3, placeholder: "Detalles adicionales..." }) })] })] })] }));
};
