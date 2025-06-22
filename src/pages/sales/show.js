import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Show } from "@refinedev/antd";
import { useShow, useOne } from "@refinedev/core";
import { Typography, Row, Col, Card, Tag, Space, Descriptions, Statistic, Alert, Timeline, Button, Divider, } from "antd";
import { DollarOutlined, UserOutlined, ShopOutlined, CheckCircleOutlined, ClockCircleOutlined, FileTextOutlined, PhoneOutlined, ShoppingOutlined, GlobalOutlined, CreditCardOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
const { Title, Text } = Typography;
export const SaleShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const sale = data?.data;
    const { data: customerData } = useOne({
        resource: "customers",
        id: sale?.customerId || "",
        queryOptions: {
            enabled: !!sale?.customerId,
        },
    });
    const { data: employeeData } = useOne({
        resource: "employees",
        id: sale?.userId || "",
        queryOptions: {
            enabled: !!sale?.userId,
        },
    });
    const { data: storeData } = useOne({
        resource: "stores",
        id: sale?.storeId || "",
        queryOptions: {
            enabled: !!sale?.storeId,
        },
    });
    const { data: subscriptionData } = useOne({
        resource: "subscriptions",
        id: sale?.subscriptionId || "",
        queryOptions: {
            enabled: !!sale?.subscriptionId,
        },
    });
    const customer = customerData?.data;
    const employee = employeeData?.data;
    const store = storeData?.data;
    const subscription = subscriptionData?.data;
    if (isLoading || !sale) {
        return _jsx("div", { children: "Cargando..." });
    }
    const getTypeColor = (type) => {
        switch (type) {
            case "new":
                return "success";
            case "renewal":
                return "processing";
            case "upgrade":
                return "gold";
            case "winback":
                return "purple";
            default:
                return "default";
        }
    };
    const getChannelIcon = (channel) => {
        switch (channel) {
            case "phone":
                return _jsx(PhoneOutlined, {});
            case "store":
                return _jsx(ShoppingOutlined, {});
            case "online":
                return _jsx(GlobalOutlined, {});
            default:
                return _jsx(ShopOutlined, {});
        }
    };
    return (_jsx(Show, { children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, lg: 16, children: _jsx(Card, { children: _jsxs(Space, { direction: "vertical", size: "large", style: { width: "100%" }, children: [_jsx("div", { children: _jsxs(Space, { align: "start", children: [_jsx(DollarOutlined, { style: { fontSize: 24 } }), _jsxs("div", { children: [_jsxs(Title, { level: 3, style: { margin: 0 }, children: ["Venta #", sale.id] }), _jsxs(Space, { children: [_jsx(Tag, { color: getTypeColor(sale.type), children: sale.type === "new"
                                                                    ? "Nueva"
                                                                    : sale.type === "renewal"
                                                                        ? "Renovación"
                                                                        : sale.type === "upgrade"
                                                                            ? "Mejora"
                                                                            : sale.type === "winback"
                                                                                ? "Recuperación"
                                                                                : sale.type }), _jsx(Tag, { icon: getChannelIcon(sale.channel), color: sale.channel === "phone"
                                                                    ? "blue"
                                                                    : sale.channel === "store"
                                                                        ? "green"
                                                                        : "purple", children: sale.channel === "phone"
                                                                    ? "Teléfono"
                                                                    : sale.channel === "store"
                                                                        ? "Tienda"
                                                                        : "Online" })] })] })] }) }), _jsxs(Descriptions, { bordered: true, column: 2, children: [_jsx(Descriptions.Item, { label: "Cliente", span: 1, children: _jsxs(Space, { children: [_jsx(UserOutlined, {}), customer ? (_jsxs("a", { href: `/customers/show/${customer.id}`, children: [customer.firstName, " ", customer.lastName] })) : (sale.customerId)] }) }), _jsx(Descriptions.Item, { label: "Vendedor", span: 1, children: _jsxs(Space, { children: [_jsx(UserOutlined, {}), employee ? (_jsxs("a", { href: `/employees/show/${employee.id}`, children: [employee.firstName, " ", employee.lastName] })) : (sale.userId)] }) }), _jsx(Descriptions.Item, { label: "Tienda", span: 1, children: _jsxs(Space, { children: [_jsx(ShopOutlined, {}), store ? (_jsx("a", { href: `/stores/show/${store.id}`, children: store.name })) : (sale.storeId)] }) }), _jsx(Descriptions.Item, { label: "Fecha de Venta", span: 1, children: dayjs(sale.createdAt).format("DD/MM/YYYY HH:mm") }), sale.subscriptionId && (_jsx(Descriptions.Item, { label: "Suscripci\u00F3n", span: 2, children: _jsxs(Space, { children: [_jsx(CreditCardOutlined, {}), subscription ? (_jsxs("a", { href: `/subscriptions/show/${subscription.id}`, children: ["Plan ", subscription.plan, " - ", subscription.status] })) : (sale.subscriptionId)] }) })), sale.callId && (_jsx(Descriptions.Item, { label: "Llamada Asociada", span: 2, children: _jsxs(Space, { children: [_jsx(PhoneOutlined, {}), _jsx("a", { href: `/calls/show/${sale.callId}`, children: "Ver detalles de la llamada" })] }) }))] }), _jsx(Card, { title: "Desglose de Montos", size: "small", children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { span: 6, children: _jsx(Statistic, { title: "Monto Bruto", value: sale.amount.gross, prefix: "$", precision: 2 }) }), _jsx(Col, { span: 6, children: _jsx(Statistic, { title: "Descuento", value: sale.amount.discount, prefix: "-$", precision: 2, valueStyle: { color: "#cf1322" } }) }), _jsx(Col, { span: 6, children: _jsx(Statistic, { title: "Impuesto", value: sale.amount.tax, prefix: "$", precision: 2 }) }), _jsx(Col, { span: 6, children: _jsx(Statistic, { title: "Total", value: sale.amount.total, prefix: "$", precision: 2, valueStyle: { color: "#3f8600" } }) })] }) })] }) }) }), _jsxs(Col, { xs: 24, lg: 8, children: [_jsx(Card, { title: "Estado de Pago", children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, size: "large", children: [_jsx(Alert, { message: sale.paymentStatus === "completed"
                                            ? "Pago Completado"
                                            : sale.paymentStatus === "pending"
                                                ? "Pago Pendiente"
                                                : sale.paymentStatus === "failed"
                                                    ? "Pago Fallido"
                                                    : "Reembolsado", type: sale.paymentStatus === "completed"
                                            ? "success"
                                            : sale.paymentStatus === "pending"
                                                ? "warning"
                                                : "error", icon: sale.paymentStatus === "completed" ? (_jsx(CheckCircleOutlined, {})) : (_jsx(ClockCircleOutlined, {})), showIcon: true }), _jsx(Divider, {}), _jsxs("div", { children: [_jsx(Text, { strong: true, children: "Estado del Contrato" }), _jsx("br", {}), sale.contract.signed ? (_jsxs(Space, { direction: "vertical", children: [_jsx(Tag, { color: "success", icon: _jsx(CheckCircleOutlined, {}), children: "Firmado" }), sale.contract.signedAt && (_jsx(Text, { type: "secondary", children: dayjs(sale.contract.signedAt).format("DD/MM/YYYY HH:mm") })), sale.contract.documentUrl && (_jsx(Button, { type: "link", icon: _jsx(FileTextOutlined, {}), href: sale.contract.documentUrl, target: "_blank", children: "Ver documento" }))] })) : (_jsx(Tag, { color: "warning", children: "Pendiente de firma" }))] })] }) }), _jsx(Card, { title: "Comisiones", style: { marginTop: 16 }, children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Statistic, { title: "Comisi\u00F3n Base", value: sale.commission.base, prefix: "$", precision: 2 }), _jsx(Statistic, { title: "Bono", value: sale.commission.bonus, prefix: "$", precision: 2 }), _jsx(Divider, {}), _jsx(Statistic, { title: "Total de Comisi\u00F3n", value: sale.commission.total, prefix: "$", precision: 2, valueStyle: { color: "#3f8600" } }), _jsx(Alert, { message: sale.commission.status === "paid"
                                            ? "Comisión Pagada"
                                            : sale.commission.status === "approved"
                                                ? "Comisión Aprobada"
                                                : "Comisión Pendiente", type: sale.commission.status === "paid"
                                            ? "success"
                                            : sale.commission.status === "approved"
                                                ? "info"
                                                : "warning", showIcon: true })] }) }), _jsx(Card, { title: "L\u00EDnea de Tiempo", style: { marginTop: 16 }, children: _jsxs(Timeline, { children: [_jsxs(Timeline.Item, { dot: _jsx(DollarOutlined, { style: { fontSize: "16px" } }), color: "blue", children: [_jsx(Text, { type: "secondary", children: dayjs(sale.createdAt).format("DD/MM HH:mm") }), _jsx("br", {}), "Venta registrada"] }), sale.contract.signed && sale.contract.signedAt && (_jsxs(Timeline.Item, { dot: _jsx(FileTextOutlined, { style: { fontSize: "16px" } }), color: "green", children: [_jsx(Text, { type: "secondary", children: dayjs(sale.contract.signedAt).format("DD/MM HH:mm") }), _jsx("br", {}), "Contrato firmado"] })), sale.paymentStatus === "completed" && (_jsxs(Timeline.Item, { dot: _jsx(CheckCircleOutlined, { style: { fontSize: "16px" } }), color: "green", children: [_jsx(Text, { type: "secondary", children: dayjs(sale.updatedAt).format("DD/MM HH:mm") }), _jsx("br", {}), "Pago completado"] })), sale.commission.status === "paid" && (_jsx(Timeline.Item, { dot: _jsx(DollarOutlined, { style: { fontSize: "16px" } }), color: "green", children: "Comisi\u00F3n pagada" }))] }) })] })] }) }));
};
