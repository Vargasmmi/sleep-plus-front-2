import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { List, useTable, DateField, ShowButton, EditButton, DeleteButton, FilterDropdown, getDefaultSortOrder, } from "@refinedev/antd";
import { Table, Space, Tag, Input, Select, Typography, Tooltip, Avatar } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, DollarOutlined } from "@ant-design/icons";
import { useMany } from "@refinedev/core";
const { Text } = Typography;
export const CustomerList = () => {
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
    // Fetch subscriptions for customers
    const customerIds = tableProps?.dataSource?.map((item) => item.id) ?? [];
    const { data: subscriptionsData } = useMany({
        resource: "subscriptions",
        ids: customerIds,
        queryOptions: {
            enabled: customerIds.length > 0,
        },
    });
    const subscriptionsByCustomer = React.useMemo(() => {
        const map = {};
        subscriptionsData?.data?.forEach((sub) => {
            if (!map[sub.customerId]) {
                map[sub.customerId] = [];
            }
            map[sub.customerId].push(sub);
        });
        return map;
    }, [subscriptionsData]);
    const getTierColor = (tier) => {
        switch (tier) {
            case "gold":
                return "gold";
            case "silver":
                return "default";
            case "bronze":
                return "orange";
            default:
                return "default";
        }
    };
    const getTierIcon = (tier) => {
        switch (tier) {
            case "gold":
                return "🥇";
            case "silver":
                return "🥈";
            case "bronze":
                return "🥉";
            default:
                return "👤";
        }
    };
    return (_jsx(List, { children: _jsxs(Table, { ...tableProps, rowKey: "id", children: [_jsx(Table.Column, { title: "Cliente", dataIndex: "firstName", render: (_, record) => (_jsxs(Space, { children: [_jsxs(Avatar, { icon: _jsx(UserOutlined, {}), style: { backgroundColor: "#1890ff" }, children: [record.firstName?.[0], record.lastName?.[0]] }), _jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { strong: true, children: [record.firstName, " ", record.lastName] }), _jsxs(Space, { size: "small", children: [_jsxs(Tag, { color: getTierColor(record.tier), children: [getTierIcon(record.tier), " ", record.tier?.toUpperCase()] }), record.isEliteMember && _jsx(Tag, { color: "purple", children: "Elite" })] })] })] })), filterDropdown: (props) => (_jsx(FilterDropdown, { ...props, children: _jsx(Input, { placeholder: "Buscar por nombre..." }) })) }, "customer"), _jsx(Table.Column, { title: "Contacto", render: (_, record) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Space, { children: [_jsx(PhoneOutlined, {}), _jsx(Text, { children: record.phone })] }), _jsxs(Space, { children: [_jsx(MailOutlined, {}), _jsx(Text, { type: "secondary", children: record.email })] })] })) }, "contact"), _jsx(Table.Column, { title: "Ubicaci\u00F3n", dataIndex: ["address", "city"], render: (city, record) => (_jsxs(Text, { children: [city, ", ", record.address?.state] })), filterDropdown: (props) => (_jsx(FilterDropdown, { ...props, children: _jsx(Select, { placeholder: "Seleccionar ciudad", style: { width: 200 }, options: [
                                { value: "Los Angeles", label: "Los Angeles" },
                                { value: "Studio City", label: "Studio City" },
                                { value: "Santa Monica", label: "Santa Monica" },
                            ] }) })) }, "location"), _jsx(Table.Column, { title: "Valor de Vida", dataIndex: "lifetimeValue", render: (value) => (_jsx(Tooltip, { title: "Total gastado en la tienda", children: _jsxs(Space, { children: [_jsx(DollarOutlined, {}), _jsxs(Text, { strong: true, children: ["$", value?.toLocaleString() || 0] })] }) })), sorter: true, defaultSortOrder: getDefaultSortOrder("lifetimeValue", sorters) }, "lifetimeValue"), _jsx(Table.Column, { title: "\u00DAltima Compra", dataIndex: "lastPurchaseDate", render: (value) => _jsx(DateField, { value: value, format: "DD/MM/YYYY" }), sorter: true, defaultSortOrder: getDefaultSortOrder("lastPurchaseDate", sorters) }, "lastPurchaseDate"), _jsx(Table.Column, { title: "Cr\u00E9dito Actual", dataIndex: "currentCredit", render: (value) => (_jsxs(Tag, { color: value > 0 ? "green" : "default", children: ["$", value || 0] })) }, "currentCredit"), _jsx(Table.Column, { title: "Suscripci\u00F3n", render: (_, record) => {
                        const subs = subscriptionsByCustomer[record.id] || [];
                        const activeSub = subs.find((s) => s.status === "active");
                        if (activeSub) {
                            return (_jsx(Tag, { color: "blue", children: activeSub.plan.toUpperCase() }));
                        }
                        return _jsx(Tag, { children: "Sin suscripci\u00F3n" });
                    } }, "subscription"), _jsx(Table.Column, { title: "Estado", dataIndex: "membershipStatus", render: (status) => (_jsx(Tag, { color: status === "active" ? "green" : "red", children: status === "active" ? "Activo" : "Inactivo" })), filterDropdown: (props) => (_jsx(FilterDropdown, { ...props, children: _jsx(Select, { placeholder: "Seleccionar estado", style: { width: 150 }, options: [
                                { value: "active", label: "Activo" },
                                { value: "inactive", label: "Inactivo" },
                            ] }) })) }, "status"), _jsx(Table.Column, { title: "Acciones", dataIndex: "actions", fixed: "right", render: (_, record) => (_jsxs(Space, { children: [_jsx(ShowButton, { hideText: true, size: "small", recordItemId: record.id }), _jsx(EditButton, { hideText: true, size: "small", recordItemId: record.id }), _jsx(DeleteButton, { hideText: true, size: "small", recordItemId: record.id })] })) }, "actions")] }) }));
};
