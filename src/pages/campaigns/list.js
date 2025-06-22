import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, useTable } from "@refinedev/antd";
import { Table, Tag, Space, Typography, Progress, Statistic } from "antd";
import { Link } from "react-router-dom";
import { RocketOutlined, UserOutlined, PhoneOutlined, TeamOutlined, PercentageOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
const { Text } = Typography;
export const CampaignList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
        sorters: {
            initial: [
                {
                    field: "startDate",
                    order: "desc",
                },
            ],
        },
    });
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
    const calculateConversionRate = (campaign) => {
        if (!campaign.metrics || campaign.metrics.contacted === 0)
            return 0;
        return ((campaign.metrics.converted / campaign.metrics.contacted) * 100).toFixed(1);
    };
    return (_jsx(List, { children: _jsxs(Table, { ...tableProps, rowKey: "id", children: [_jsx(Table.Column, { title: "Campa\u00F1a", dataIndex: "name", render: (value, record) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Space, { children: [_jsx(RocketOutlined, {}), _jsx(Text, { strong: true, children: value })] }), _jsxs(Space, { children: [_jsx(Tag, { color: getTypeColor(record.type), children: record.type === "retention"
                                            ? "Retención"
                                            : record.type === "winback"
                                                ? "Recuperación"
                                                : record.type === "upgrade"
                                                    ? "Mejora"
                                                    : "Temporal" }), _jsx(Tag, { color: getStatusColor(record.status), children: record.status === "active"
                                            ? "Activa"
                                            : record.status === "paused"
                                                ? "Pausada"
                                                : record.status === "completed"
                                                    ? "Completada"
                                                    : "Borrador" })] })] })) }, "name"), _jsx(Table.Column, { title: "Per\u00EDodo", render: (_, record) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { children: dayjs(record.startDate).format("DD/MM/YYYY") }), _jsxs(Text, { type: "secondary", children: ["al ", dayjs(record.endDate).format("DD/MM/YYYY")] })] })), sorter: true }, "period"), _jsx(Table.Column, { title: "Segmentaci\u00F3n", dataIndex: "targeting", render: (targeting) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { children: ["Niveles:", " ", targeting.customerTiers.map(tier => tier === "gold" ? "Oro" :
                                        tier === "silver" ? "Plata" :
                                            "Bronce").join(", ")] }), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["\u00DAltima compra: ", targeting.lastPurchaseRange.min, "-", targeting.lastPurchaseRange.max, " d\u00EDas"] })] })) }, "targeting"), _jsx(Table.Column, { title: "Oferta", dataIndex: "offer", render: (offer) => (_jsxs(Space, { children: [_jsx(PercentageOutlined, {}), _jsx(Text, { strong: true, children: offer.type === "percentage"
                                    ? `${offer.value}%`
                                    : offer.type === "fixed"
                                        ? `$${offer.value}`
                                        : offer.type === "freeMonth"
                                            ? "Mes gratis"
                                            : "Mejora" })] })) }, "offer"), _jsx(Table.Column, { title: "M\u00E9tricas", render: (_, record) => (_jsxs(Space, { direction: "vertical", size: 0, style: { width: 120 }, children: [_jsxs(Space, { children: [_jsx(PhoneOutlined, {}), _jsxs(Text, { children: [record.metrics?.totalCalls || 0, " llamadas"] })] }), _jsxs(Space, { children: [_jsx(UserOutlined, {}), _jsxs(Text, { children: [record.metrics?.contacted || 0, " contactados"] })] }), _jsx(Progress, { percent: Number(calculateConversionRate(record)), size: "small", format: (percent) => `${percent}%` })] })) }, "metrics"), _jsx(Table.Column, { title: "Resultados", render: (_, record) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Statistic, { value: record.metrics?.converted || 0, prefix: _jsx(UserOutlined, {}), suffix: "conversiones", valueStyle: { fontSize: 14 } }), _jsx(Statistic, { value: record.metrics?.revenue || 0, prefix: "$", precision: 2, valueStyle: { fontSize: 14, color: "#3f8600" } })] })) }, "results"), _jsx(Table.Column, { title: "Asignados", dataIndex: "assignedTo", render: (assignedTo) => (_jsxs(Space, { children: [_jsx(TeamOutlined, {}), _jsxs(Text, { children: [assignedTo.length, " agentes"] })] })) }, "assignedTo"), _jsx(Table.Column, { title: "Acciones", dataIndex: "actions", render: (_, record) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Link, { to: `/campaigns/show/${record.id}`, children: "Ver detalles" }), record.status !== "completed" && (_jsx(Link, { to: `/campaigns/edit/${record.id}`, children: "Editar" }))] })) })] }) }));
};
