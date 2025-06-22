import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Show } from "@refinedev/antd";
import { useShow, useMany, useOne } from "@refinedev/core";
import { Typography, Row, Col, Card, Tag, Space, Statistic, Progress, Descriptions, Alert, List, Timeline, Button, } from "antd";
import { Link } from "react-router-dom";
import { RocketOutlined, UserOutlined, PhoneOutlined, CalendarOutlined, TeamOutlined, PercentageOutlined, CheckCircleOutlined, ClockCircleOutlined, TrophyOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
const { Title, Text, Paragraph } = Typography;
export const CampaignShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const campaign = data?.data;
    const { data: employeesData } = useMany({
        resource: "employees",
        ids: campaign?.assignedTo || [],
        queryOptions: {
            enabled: !!campaign?.assignedTo?.length,
        },
    });
    const { data: creatorData } = useOne({
        resource: "employees",
        id: campaign?.createdBy || "",
        queryOptions: {
            enabled: !!campaign?.createdBy,
        },
    });
    const employees = employeesData?.data || [];
    const creator = creatorData?.data;
    if (isLoading || !campaign) {
        return _jsx("div", { children: "Cargando..." });
    }
    const calculateConversionRate = () => {
        if (campaign.metrics.contacted === 0)
            return 0;
        return ((campaign.metrics.converted / campaign.metrics.contacted) * 100).toFixed(1);
    };
    const calculateContactRate = () => {
        if (campaign.metrics.totalCalls === 0)
            return 0;
        return ((campaign.metrics.contacted / campaign.metrics.totalCalls) * 100).toFixed(1);
    };
    const getTypeColor = (type) => {
        switch (type) {
            case "retention":
                return "blue";
            case "winback":
                return "purple";
            case "upgrade":
                return "gold";
            case "seasonal":
                return "green";
            default:
                return "default";
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "success";
            case "paused":
                return "warning";
            case "completed":
                return "default";
            case "draft":
                return "default";
            default:
                return "default";
        }
    };
    const isExpired = dayjs(campaign.offer.validUntil).isBefore(dayjs());
    return (_jsx(Show, { children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { span: 24, children: _jsx(Card, { children: _jsxs(Space, { align: "start", style: { width: "100%", justifyContent: "space-between" }, children: [_jsxs(Space, { align: "start", children: [_jsx(RocketOutlined, { style: { fontSize: 24 } }), _jsxs("div", { children: [_jsx(Title, { level: 3, style: { margin: 0 }, children: campaign.name }), _jsxs(Space, { style: { marginTop: 8 }, children: [_jsx(Tag, { color: getTypeColor(campaign.type), children: campaign.type === "retention"
                                                                ? "Retención"
                                                                : campaign.type === "winback"
                                                                    ? "Recuperación"
                                                                    : campaign.type === "upgrade"
                                                                        ? "Mejora"
                                                                        : "Temporal" }), _jsx(Tag, { color: getStatusColor(campaign.status), children: campaign.status === "active"
                                                                ? "Activa"
                                                                : campaign.status === "paused"
                                                                    ? "Pausada"
                                                                    : campaign.status === "completed"
                                                                        ? "Completada"
                                                                        : "Borrador" })] })] })] }), campaign.status !== "completed" && (_jsx(Link, { to: `/campaigns/edit/${campaign.id}`, children: _jsx(Button, { type: "primary", children: "Editar Campa\u00F1a" }) }))] }) }) }), _jsxs(Col, { xs: 24, lg: 16, children: [_jsxs(Card, { title: "M\u00E9tricas de Rendimiento", children: [_jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 12, md: 6, children: _jsx(Statistic, { title: "Llamadas Totales", value: campaign.metrics.totalCalls, prefix: _jsx(PhoneOutlined, {}) }) }), _jsx(Col, { xs: 12, md: 6, children: _jsx(Statistic, { title: "Contactados", value: campaign.metrics.contacted, prefix: _jsx(UserOutlined, {}) }) }), _jsx(Col, { xs: 12, md: 6, children: _jsx(Statistic, { title: "Conversiones", value: campaign.metrics.converted, prefix: _jsx(TrophyOutlined, {}), valueStyle: { color: "#3f8600" } }) }), _jsx(Col, { xs: 12, md: 6, children: _jsx(Statistic, { title: "Ingresos Generados", value: campaign.metrics.revenue, prefix: "$", precision: 2, valueStyle: { color: "#3f8600" } }) })] }), _jsx("div", { style: { marginTop: 24 }, children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsxs("div", { children: [_jsx(Text, { children: "Tasa de Contacto" }), _jsx(Progress, { percent: Number(calculateContactRate()), format: (percent) => `${percent}%` })] }), _jsxs("div", { children: [_jsx(Text, { children: "Tasa de Conversi\u00F3n" }), _jsx(Progress, { percent: Number(calculateConversionRate()), format: (percent) => `${percent}%`, status: Number(calculateConversionRate()) >= 15 ? "success" : "active" })] })] }) })] }), _jsx(Card, { title: "Detalles de la Campa\u00F1a", style: { marginTop: 16 }, children: _jsxs(Descriptions, { bordered: true, column: 2, children: [_jsx(Descriptions.Item, { label: "Per\u00EDodo", span: 2, children: _jsxs(Space, { children: [_jsx(CalendarOutlined, {}), dayjs(campaign.startDate).format("DD/MM/YYYY"), " - ", dayjs(campaign.endDate).format("DD/MM/YYYY")] }) }), _jsx(Descriptions.Item, { label: "Segmentaci\u00F3n", span: 2, children: _jsxs(Space, { direction: "vertical", children: [_jsxs("div", { children: [_jsx(Text, { strong: true, children: "Niveles: " }), campaign.targeting.customerTiers.map(tier => (_jsx(Tag, { color: tier === "gold" ? "gold" : tier === "silver" ? "silver" : "bronze", children: tier === "gold" ? "Oro" : tier === "silver" ? "Plata" : "Bronce" }, tier)))] }), _jsxs("div", { children: [_jsx(Text, { strong: true, children: "\u00DAltima compra: " }), campaign.targeting.lastPurchaseRange.min, " - ", campaign.targeting.lastPurchaseRange.max, " d\u00EDas"] }), campaign.targeting.hasSubscription && (_jsx(Tag, { color: "blue", children: "Requiere suscripci\u00F3n activa" }))] }) }), _jsx(Descriptions.Item, { label: "Oferta", span: 2, children: _jsx(Alert, { message: _jsxs(Space, { children: [_jsx(PercentageOutlined, {}), campaign.offer.type === "percentage"
                                                        ? `${campaign.offer.value}% de descuento`
                                                        : campaign.offer.type === "fixed"
                                                            ? `$${campaign.offer.value} de descuento`
                                                            : campaign.offer.type === "freeMonth"
                                                                ? "Mes gratis"
                                                                : "Mejora de plan"] }), description: `Válida hasta: ${dayjs(campaign.offer.validUntil).format("DD/MM/YYYY")}`, type: isExpired ? "error" : "info", showIcon: true }) }), _jsx(Descriptions.Item, { label: "Creada por", span: 1, children: creator ? `${creator.firstName} ${creator.lastName}` : campaign.createdBy }), _jsx(Descriptions.Item, { label: "Fecha de creaci\u00F3n", span: 1, children: dayjs(campaign.createdAt).format("DD/MM/YYYY HH:mm") })] }) }), _jsx(Card, { title: "Script de Llamada", style: { marginTop: 16 }, children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsxs("div", { children: [_jsx(Title, { level: 5, children: "Apertura" }), _jsx(Paragraph, { children: campaign.script.opening })] }), _jsxs("div", { children: [_jsx(Title, { level: 5, children: "Propuestas de Valor" }), _jsx(List, { dataSource: campaign.script.valueProps, renderItem: (item) => (_jsxs(List.Item, { children: [_jsx(CheckCircleOutlined, { style: { color: "#52c41a", marginRight: 8 } }), item] })) })] }), _jsxs("div", { children: [_jsx(Title, { level: 5, children: "Cierre" }), _jsx(Paragraph, { children: campaign.script.closing })] }), campaign.script.objectionHandlers && (_jsxs("div", { children: [_jsx(Title, { level: 5, children: "Manejo de Objeciones" }), _jsx(List, { dataSource: Object.entries(campaign.script.objectionHandlers), renderItem: ([objection, response]) => (_jsx(List.Item, { children: _jsxs(Space, { direction: "vertical", children: [_jsxs(Text, { strong: true, children: [objection, ":"] }), _jsx(Text, { children: response })] }) })) })] }))] }) })] }), _jsxs(Col, { xs: 24, lg: 8, children: [_jsx(Card, { title: "Equipo Asignado", children: _jsx(List, { dataSource: employees, renderItem: (employee) => (_jsx(List.Item, { children: _jsxs(Space, { children: [_jsx(UserOutlined, {}), _jsxs(Link, { to: `/employees/show/${employee.id}`, children: [employee.firstName, " ", employee.lastName] })] }) })), footer: _jsxs(Space, { children: [_jsx(TeamOutlined, {}), _jsxs(Text, { strong: true, children: [campaign.assignedTo.length, " agentes asignados"] })] }) }) }), _jsx(Card, { title: "L\u00EDnea de Tiempo", style: { marginTop: 16 }, children: _jsxs(Timeline, { children: [_jsxs(Timeline.Item, { dot: _jsx(CalendarOutlined, { style: { fontSize: "16px" } }), color: "gray", children: [_jsx(Text, { type: "secondary", children: dayjs(campaign.createdAt).format("DD/MM/YYYY") }), _jsx("br", {}), "Campa\u00F1a creada"] }), _jsxs(Timeline.Item, { dot: _jsx(RocketOutlined, { style: { fontSize: "16px" } }), color: dayjs(campaign.startDate).isAfter(dayjs()) ? "gray" : "blue", children: [_jsx(Text, { type: "secondary", children: dayjs(campaign.startDate).format("DD/MM/YYYY") }), _jsx("br", {}), "Inicio de campa\u00F1a"] }), campaign.status === "active" && (_jsxs(Timeline.Item, { dot: _jsx(ClockCircleOutlined, { style: { fontSize: "16px" } }), color: "green", children: [_jsx(Text, { strong: true, children: "En progreso" }), _jsx("br", {}), calculateConversionRate(), "% de conversi\u00F3n"] })), _jsxs(Timeline.Item, { dot: _jsx(CheckCircleOutlined, { style: { fontSize: "16px" } }), color: campaign.status === "completed" ? "green" : "gray", children: [_jsx(Text, { type: "secondary", children: dayjs(campaign.endDate).format("DD/MM/YYYY") }), _jsx("br", {}), campaign.status === "completed" ? "Campaña completada" : "Fin programado"] })] }) }), _jsx(Card, { title: "Resumen de Rendimiento", style: { marginTop: 16 }, children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Statistic, { title: "ROI Estimado", value: campaign.metrics.revenue > 0 ?
                                            ((campaign.metrics.revenue / (campaign.metrics.totalCalls * 0.5)) * 100).toFixed(0) : 0, suffix: "%", valueStyle: { color: "#3f8600" } }), _jsx(Statistic, { title: "Costo por Conversi\u00F3n", value: campaign.metrics.converted > 0 ?
                                            (campaign.metrics.totalCalls * 0.5 / campaign.metrics.converted).toFixed(2) : 0, prefix: "$" }), _jsx(Statistic, { title: "Valor Promedio de Venta", value: campaign.metrics.converted > 0 ?
                                            (campaign.metrics.revenue / campaign.metrics.converted).toFixed(2) : 0, prefix: "$" })] }) })] })] }) }));
};
