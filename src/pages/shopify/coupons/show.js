import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Show, DateField } from "@refinedev/antd";
import { Card, Descriptions, Space, Tag, Typography, Progress, Badge, Statistic, Row, Col } from "antd";
import { TagOutlined, PercentageOutlined, GiftOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useShow } from "@refinedev/core";
const { Text } = Typography;
export const ShopifyCouponShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;
    const getDiscountDisplay = () => {
        if (!record)
            return null;
        switch (record.discountType) {
            case "percentage":
                return (_jsx(Statistic, { title: "Descuento", value: record.value, suffix: "%", prefix: _jsx(PercentageOutlined, {}) }));
            case "fixed_amount":
                return (_jsx(Statistic, { title: "Descuento", value: record.value, prefix: "$" }));
            case "free_shipping":
                return (_jsx(Statistic, { title: "Descuento", value: "Env\u00EDo Gratis", prefix: _jsx(GiftOutlined, {}) }));
            default:
                return null;
        }
    };
    return (_jsx(Show, { isLoading: isLoading, title: `Cupón: ${record?.title || ""}`, children: record && (_jsxs(_Fragment, { children: [_jsx(Card, { children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, sm: 12, md: 6, children: _jsx(Card, { bordered: false, children: _jsxs(Space, { direction: "vertical", align: "center", style: { width: "100%" }, children: [_jsx(TagOutlined, { style: { fontSize: 32, color: "#1890ff" } }), _jsx(Text, { strong: true, style: { fontSize: 18 }, children: record.code }), _jsx(Tag, { color: record.status === "active" ? "green" :
                                                    record.status === "expired" ? "red" : "default", children: record.status === "active" ? "Activo" :
                                                    record.status === "expired" ? "Expirado" : "Desactivado" })] }) }) }), _jsx(Col, { xs: 24, sm: 12, md: 6, children: getDiscountDisplay() }), _jsxs(Col, { xs: 24, sm: 12, md: 6, children: [_jsx(Statistic, { title: "Usos", value: record.usageCount, suffix: record.usageLimit ? `/ ${record.usageLimit}` : "" }), record.usageLimit && (_jsx(Progress, { percent: (record.usageCount / record.usageLimit) * 100, size: "small", showInfo: false }))] }), _jsx(Col, { xs: 24, sm: 12, md: 6, children: _jsx(Statistic, { title: "Tasa de Uso", value: record.usageLimit ? ((record.usageCount / record.usageLimit) * 100).toFixed(1) : "∞", suffix: record.usageLimit ? "%" : "" }) })] }) }), _jsx(Card, { style: { marginTop: 16 }, title: "Detalles del Cup\u00F3n", children: _jsxs(Descriptions, { column: 2, bordered: true, children: [_jsx(Descriptions.Item, { label: "ID de Shopify", span: 2, children: record.shopifyId }), _jsx(Descriptions.Item, { label: "Aplica a", children: record.appliesTo === "all_products" ? "Todos los productos" :
                                    record.appliesTo === "specific_products" ? "Productos específicos" :
                                        "Colecciones específicas" }), _jsx(Descriptions.Item, { label: "Elegibilidad", children: record.customerEligibility === "all" ? "Todos los clientes" :
                                    record.customerEligibility === "specific_customers" ? "Clientes específicos" :
                                        "Grupos de clientes" }), _jsx(Descriptions.Item, { label: "Requisito M\u00EDnimo", children: record.minimumRequirement.type === "none" ? "Sin requisitos" :
                                    record.minimumRequirement.type === "minimum_amount" ? `Compra mínima $${record.minimumRequirement.value}` :
                                        `Mínimo ${record.minimumRequirement.value} productos` }), _jsx(Descriptions.Item, { label: "Una vez por cliente", children: record.oncePerCustomer ? (_jsx(Badge, { status: "success", text: "S\u00ED" })) : (_jsx(Badge, { status: "default", text: "No" })) }), _jsx(Descriptions.Item, { label: "Fecha de Inicio", children: _jsx(DateField, { value: record.startsAt, format: "DD/MM/YYYY HH:mm" }) }), _jsx(Descriptions.Item, { label: "Fecha de Fin", children: record.endsAt ? (_jsx(DateField, { value: record.endsAt, format: "DD/MM/YYYY HH:mm" })) : (_jsx(Text, { type: "secondary", children: "Sin fecha de fin" })) }), _jsx(Descriptions.Item, { label: "Creado", children: _jsx(DateField, { value: record.createdAt, format: "DD/MM/YYYY HH:mm" }) }), _jsx(Descriptions.Item, { label: "Actualizado", children: _jsx(DateField, { value: record.updatedAt, format: "DD/MM/YYYY HH:mm" }) })] }) }), record.targetSelection && record.targetSelection.length > 0 && (_jsx(Card, { style: { marginTop: 16 }, title: "Aplicaci\u00F3n Espec\u00EDfica", children: _jsx(Space, { wrap: true, children: record.targetSelection.map((target, index) => (_jsx(Tag, { color: "blue", children: target }, index))) }) })), _jsx(Card, { style: { marginTop: 16 }, title: "Estad\u00EDsticas de Uso", children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { span: 12, children: _jsx(Card, { bordered: false, style: { textAlign: "center" }, children: _jsx(Statistic, { title: "Total de Usos", value: record.usageCount, prefix: _jsx(CheckCircleOutlined, { style: { color: "#52c41a" } }) }) }) }), _jsx(Col, { span: 12, children: _jsx(Card, { bordered: false, style: { textAlign: "center" }, children: _jsx(Statistic, { title: "Usos Restantes", value: record.usageLimit ? record.usageLimit - record.usageCount : "∞", prefix: record.usageLimit && record.usageLimit - record.usageCount <= 0 ?
                                            _jsx(CloseCircleOutlined, { style: { color: "#f5222d" } }) : undefined }) }) })] }) })] })) }));
};
