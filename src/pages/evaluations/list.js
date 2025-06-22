import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { List, useTable, DateField, ShowButton, CreateButton, FilterDropdown, getDefaultSortOrder, } from "@refinedev/antd";
import { Table, Space, Tag, Input, Select, Progress, Typography, Button, Tooltip } from "antd";
import { ScanOutlined, UserOutlined, DollarOutlined, ClockCircleOutlined, CheckCircleOutlined, FileImageOutlined, ReloadOutlined, } from "@ant-design/icons";
import { useMany } from "@refinedev/core";
import dayjs from "dayjs";
const { Text } = Typography;
export const EvaluationList = () => {
    const { tableProps, filters, sorters } = useTable({
        syncWithLocation: true,
        sorters: {
            initial: [
                {
                    field: "createdAt",
                    order: "desc",
                },
            ],
        },
    });
    // Fetch customers for evaluations
    const customerIds = tableProps?.dataSource?.map((item) => item.customerId) ?? [];
    const { data: customersData } = useMany({
        resource: "customers",
        ids: customerIds,
        queryOptions: {
            enabled: customerIds.length > 0,
        },
    });
    const customersMap = React.useMemo(() => {
        const map = {};
        customersData?.data?.forEach((customer) => {
            map[customer.id] = customer;
        });
        return map;
    }, [customersData]);
    const getStatusColor = (status) => {
        switch (status) {
            case "approved":
                return "blue";
            case "redeemed":
                return "green";
            case "expired":
                return "red";
            case "pending":
                return "orange";
            default:
                return "default";
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case "approved":
                return _jsx(CheckCircleOutlined, {});
            case "redeemed":
                return _jsx(DollarOutlined, {});
            case "expired":
                return _jsx(ClockCircleOutlined, {});
            default:
                return _jsx(ScanOutlined, {});
        }
    };
    const getConditionColor = (condition) => {
        switch (condition) {
            case "excellent":
                return "green";
            case "good":
                return "blue";
            case "fair":
                return "orange";
            case "poor":
                return "red";
            default:
                return "default";
        }
    };
    const getMattressSizeIcon = (size) => {
        const sizeMap = {
            twin: "🛏️",
            full: "🛏️🛏️",
            queen: "👑",
            king: "👑👑",
            "cal-king": "👑🌴",
        };
        return sizeMap[size] || "🛏️";
    };
    return (_jsx(List, { headerButtons: _jsx(CreateButton, { type: "primary", icon: _jsx(ScanOutlined, {}), children: "Nueva Evaluaci\u00F3n" }), children: _jsxs(Table, { ...tableProps, rowKey: "id", children: [_jsx(Table.Column, { title: "ID Evaluaci\u00F3n", dataIndex: "id", render: (id) => (_jsxs(Space, { children: [_jsx(ScanOutlined, {}), _jsx(Text, { code: true, copyable: true, style: { fontSize: 12 }, children: id })] })), filterDropdown: (props) => (_jsx(FilterDropdown, { ...props, children: _jsx(Input, { placeholder: "Buscar por ID..." }) })) }, "id"), _jsx(Table.Column, { title: "Cliente", dataIndex: "customerId", render: (customerId) => {
                        const customer = customersMap[customerId];
                        if (!customer)
                            return _jsx(Text, { children: "-" });
                        return (_jsxs(Space, { children: [_jsx(UserOutlined, {}), _jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { strong: true, children: [customer.firstName, " ", customer.lastName] }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: customer.phone })] })] }));
                    } }, "customer"), _jsx(Table.Column, { title: "Colch\u00F3n", dataIndex: "mattress", render: (mattress) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Space, { children: [_jsx(Text, { children: getMattressSizeIcon(mattress.size) }), _jsxs(Text, { strong: true, children: [mattress.brand, " ", mattress.model || ""] })] }), _jsxs(Space, { children: [_jsx(Tag, { children: mattress.size.toUpperCase() }), _jsxs(Tag, { children: [mattress.age, " a\u00F1os"] }), _jsx(Tag, { color: getConditionColor(mattress.condition), children: mattress.condition })] })] })) }, "mattress"), _jsx(Table.Column, { title: "Evaluaci\u00F3n IA", render: (_, record) => {
                        // Verificar si aiEvaluation existe
                        if (!record.aiEvaluation) {
                            return (_jsx(Tag, { color: "orange", children: "Pendiente de evaluaci\u00F3n" }));
                        }
                        return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Progress, { percent: record.aiEvaluation.finalScore || 0, size: "small", strokeColor: {
                                        "0%": "#108ee9",
                                        "100%": "#87d068",
                                    } }), _jsxs(Space, { children: [_jsx(Tooltip, { title: "Score de Condici\u00F3n", children: _jsxs(Tag, { children: ["C: ", record.aiEvaluation.conditionScore || 0] }) }), _jsx(Tooltip, { title: "Score de Marca", children: _jsxs(Tag, { children: ["M: ", record.aiEvaluation.brandScore || 0] }) }), _jsx(Tooltip, { title: "Confianza", children: _jsxs(Tag, { color: "blue", children: [record.aiEvaluation.confidence || 0, "%"] }) })] })] }));
                    } }, "aiScore"), _jsx(Table.Column, { title: "Cr\u00E9dito Aprobado", dataIndex: "creditApproved", render: (credit) => (_jsxs(Tag, { color: "green", style: { fontSize: 16, padding: "4px 12px" }, children: [_jsx(DollarOutlined, {}), " ", credit] })), sorter: true, defaultSortOrder: getDefaultSortOrder("creditApproved", sorters) }, "creditApproved"), _jsx(Table.Column, { title: "Estado", dataIndex: "status", render: (status) => (_jsxs(Tag, { color: getStatusColor(status), icon: getStatusIcon(status), children: [status === "approved" && "APROBADO", status === "redeemed" && "REDIMIDO", status === "expired" && "EXPIRADO", status === "pending" && "PENDIENTE"] })), filterDropdown: (props) => (_jsx(FilterDropdown, { ...props, children: _jsx(Select, { placeholder: "Seleccionar estado", style: { width: 150 }, options: [
                                { value: "approved", label: "Aprobado" },
                                { value: "redeemed", label: "Redimido" },
                                { value: "expired", label: "Expirado" },
                                { value: "pending", label: "Pendiente" },
                            ] }) })) }, "status"), _jsx(Table.Column, { title: "Fotos", dataIndex: "photos", render: (photos) => (_jsxs(Space, { children: [_jsx(FileImageOutlined, {}), _jsxs(Text, { children: [photos?.length || 0, " fotos"] })] })) }, "photos"), _jsx(Table.Column, { title: "Fecha Creaci\u00F3n", dataIndex: "createdAt", render: (date) => _jsx(DateField, { value: date, format: "DD/MM/YYYY HH:mm" }), sorter: true, defaultSortOrder: getDefaultSortOrder("createdAt", sorters) }, "createdAt"), _jsx(Table.Column, { title: "Expira", dataIndex: "expiresAt", render: (date, record) => {
                        const daysUntilExpiry = dayjs(date).diff(dayjs(), "days");
                        const isExpired = daysUntilExpiry < 0;
                        const isExpiringSoon = daysUntilExpiry >= 0 && daysUntilExpiry <= 7;
                        return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(DateField, { value: date, format: "DD/MM/YYYY" }), record.status === "approved" && (_jsxs(_Fragment, { children: [isExpired && (_jsx(Tag, { color: "red", style: { fontSize: 11 }, children: "Expirado" })), isExpiringSoon && (_jsxs(Tag, { color: "orange", style: { fontSize: 11 }, children: ["Expira en ", daysUntilExpiry, " d\u00EDas"] })), !isExpired && !isExpiringSoon && (_jsxs(Text, { type: "secondary", style: { fontSize: 11 }, children: [daysUntilExpiry, " d\u00EDas restantes"] }))] }))] }));
                    } }, "expiresAt"), _jsx(Table.Column, { title: "Acciones", dataIndex: "actions", fixed: "right", render: (_, record) => (_jsxs(Space, { children: [_jsx(ShowButton, { hideText: true, size: "small", recordItemId: record.id }), record.status === "approved" && (_jsx(Tooltip, { title: "Redimir cr\u00E9dito", children: _jsx(Button, { size: "small", type: "primary", icon: _jsx(DollarOutlined, {}), onClick: () => {
                                        // Handle redemption
                                    }, children: "Redimir" }) })), record.status === "pending" && (_jsx(Tooltip, { title: "Reenviar evaluaci\u00F3n", children: _jsx(Button, { size: "small", icon: _jsx(ReloadOutlined, {}), onClick: () => {
                                        // Handle re-evaluation
                                    } }) }))] })) }, "actions")] }) }));
};
