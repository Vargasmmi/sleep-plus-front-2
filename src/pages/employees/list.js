import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { List, useTable, DateField, ShowButton, EditButton, FilterDropdown, getDefaultSortOrder, } from "@refinedev/antd";
import { Table, Space, Tag, Input, Select, Avatar, Typography, Progress } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, PhoneFilled, CheckCircleOutlined, ClockCircleOutlined, PauseCircleOutlined, } from "@ant-design/icons";
import { useMany } from "@refinedev/core";
const { Text } = Typography;
export const EmployeeList = () => {
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
    // Fetch stores for employees
    const storeIds = tableProps?.dataSource?.map((item) => item.storeId) ?? [];
    const { data: storesData } = useMany({
        resource: "stores",
        ids: [...new Set(storeIds)], // Remove duplicates
        queryOptions: {
            enabled: storeIds.length > 0,
        },
    });
    const storesMap = React.useMemo(() => {
        const map = {};
        storesData?.data?.forEach((store) => {
            map[store.id] = store;
        });
        return map;
    }, [storesData]);
    const getRoleColor = (role) => {
        switch (role) {
            case "admin":
                return "red";
            case "manager":
                return "gold";
            case "agent":
                return "blue";
            default:
                return "default";
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case "active":
                return _jsx(CheckCircleOutlined, {});
            case "break":
                return _jsx(PauseCircleOutlined, {});
            case "calling":
                return _jsx(PhoneFilled, {});
            default:
                return _jsx(ClockCircleOutlined, {});
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "green";
            case "break":
                return "orange";
            case "calling":
                return "blue";
            case "inactive":
                return "red";
            default:
                return "default";
        }
    };
    return (_jsx(List, { children: _jsxs(Table, { ...tableProps, rowKey: "id", children: [_jsx(Table.Column, { title: "Empleado", dataIndex: "firstName", render: (_, record) => (_jsxs(Space, { children: [_jsxs(Avatar, { src: record.avatar, icon: _jsx(UserOutlined, {}), size: 40, children: [record.firstName?.[0], record.lastName?.[0]] }), _jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { strong: true, children: [record.firstName, " ", record.lastName] }), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["ID: ", record.employeeId] })] })] })), filterDropdown: (props) => (_jsx(FilterDropdown, { ...props, children: _jsx(Input, { placeholder: "Buscar por nombre..." }) })) }, "employee"), _jsx(Table.Column, { title: "Contacto", render: (_, record) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Space, { children: [_jsx(MailOutlined, {}), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: record.email })] }), record.phoneExtension && (_jsxs(Space, { children: [_jsx(PhoneOutlined, {}), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["Ext: ", record.phoneExtension] })] }))] })) }, "contact"), _jsx(Table.Column, { title: "Rol", dataIndex: "role", render: (role) => (_jsxs(Tag, { color: getRoleColor(role), children: [role === "admin" && "Administrador", role === "manager" && "Manager", role === "agent" && "Agente"] })), filterDropdown: (props) => (_jsx(FilterDropdown, { ...props, children: _jsx(Select, { placeholder: "Seleccionar rol", style: { width: 150 }, options: [
                                { value: "admin", label: "Administrador" },
                                { value: "manager", label: "Manager" },
                                { value: "agent", label: "Agente" },
                            ] }) })) }, "role"), _jsx(Table.Column, { title: "Tienda", dataIndex: "storeId", render: (storeId) => {
                        const store = storesMap[storeId];
                        return store ? (_jsx(Text, { children: store.name })) : (_jsx(Text, { type: "secondary", children: "-" }));
                    }, filterDropdown: (props) => (_jsx(FilterDropdown, { ...props, children: _jsx(Select, { placeholder: "Seleccionar tienda", style: { width: 150 }, options: storesData?.data?.map((store) => ({
                                value: store.id,
                                label: store.name,
                            })) || [] }) })) }, "store"), _jsx(Table.Column, { title: "Estado", dataIndex: "status", render: (status) => (_jsxs(Tag, { color: getStatusColor(status), icon: getStatusIcon(status), children: [status === "active" && "Activo", status === "inactive" && "Inactivo", status === "break" && "En descanso", status === "calling" && "En llamada"] })), filterDropdown: (props) => (_jsx(FilterDropdown, { ...props, children: _jsx(Select, { placeholder: "Seleccionar estado", style: { width: 150 }, options: [
                                { value: "active", label: "Activo" },
                                { value: "inactive", label: "Inactivo" },
                                { value: "break", label: "En descanso" },
                                { value: "calling", label: "En llamada" },
                            ] }) })) }, "status"), _jsx(Table.Column, { title: "Rendimiento Hoy", render: (_, record) => {
                        const performance = record.performance;
                        if (!performance)
                            return _jsx(Text, { type: "secondary", children: "-" });
                        const callsProgress = (performance.callsToday / performance.callsTarget) * 100;
                        return (_jsxs(Space, { direction: "vertical", size: "small", children: [_jsxs(Space, { children: [_jsx(PhoneFilled, {}), _jsxs(Text, { children: [performance.callsToday, "/", performance.callsTarget, " llamadas"] })] }), _jsx(Progress, { percent: callsProgress, size: "small", strokeColor: callsProgress >= 100 ? "#52c41a" : "#1890ff", showInfo: false }), _jsx(Space, { children: _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["Conversi\u00F3n: ", performance.conversionRate, "%"] }) })] }));
                    } }, "performance"), _jsx(Table.Column, { title: "Comisiones", render: (_, record) => {
                        const commissions = record.commissions;
                        if (!commissions)
                            return _jsx(Text, { type: "secondary", children: "-" });
                        return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { strong: true, children: ["$", commissions.currentMonthCommission] }), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["Este mes (", commissions.currentMonthEvaluations, " ventas)"] }), _jsxs(Tag, { color: "green", style: { fontSize: 11 }, children: ["Total: $", commissions.totalCommissionEarned] })] }));
                    }, sorter: true }, "commissions"), _jsx(Table.Column, { title: "Turno", dataIndex: "shift", render: (shift) => (_jsxs(Tag, { children: [shift === "morning" && "Mañana", shift === "afternoon" && "Tarde", shift === "full" && "Completo"] })) }, "shift"), _jsx(Table.Column, { title: "Antig\u00FCedad", dataIndex: "hiredAt", render: (date) => _jsx(DateField, { value: date, format: "DD/MM/YYYY" }), sorter: true, defaultSortOrder: getDefaultSortOrder("hiredAt", sorters) }, "hiredAt"), _jsx(Table.Column, { title: "Acciones", dataIndex: "actions", fixed: "right", render: (_, record) => (_jsxs(Space, { children: [_jsx(ShowButton, { hideText: true, size: "small", recordItemId: record.id }), _jsx(EditButton, { hideText: true, size: "small", recordItemId: record.id })] })) }, "actions")] }) }));
};
