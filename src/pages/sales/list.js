import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, useTable } from "@refinedev/antd";
import { useMany } from "@refinedev/core";
import { Table, Tag, Space, Typography, Statistic } from "antd";
import { UserOutlined, ShopOutlined, CheckCircleOutlined, ClockCircleOutlined, SyncOutlined, PhoneOutlined, ShoppingOutlined, GlobalOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
const { Text } = Typography;
export const SaleList = () => {
    const { tableProps } = useTable({
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
    const customerIds = tableProps?.dataSource?.map((item) => item.customerId) ?? [];
    const { data: customersData } = useMany({
        resource: "customers",
        ids: customerIds,
        queryOptions: {
            enabled: customerIds.length > 0,
        },
    });
    const userIds = tableProps?.dataSource?.map((item) => item.userId) ?? [];
    const { data: employeesData } = useMany({
        resource: "employees",
        ids: userIds,
        queryOptions: {
            enabled: userIds.length > 0,
        },
    });
    const storeIds = tableProps?.dataSource?.map((item) => item.storeId) ?? [];
    const { data: storesData } = useMany({
        resource: "stores",
        ids: storeIds,
        queryOptions: {
            enabled: storeIds.length > 0,
        },
    });
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
    const getPaymentStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "success";
            case "pending":
                return "warning";
            case "failed":
                return "error";
            case "refunded":
                return "default";
            default:
                return "default";
        }
    };
    return (_jsx(List, { children: _jsxs(Table, { ...tableProps, rowKey: "id", children: [_jsx(Table.Column, { title: "Fecha", dataIndex: "createdAt", render: (value) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { children: dayjs(value).format("DD/MM/YYYY") }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: dayjs(value).format("HH:mm") })] })), sorter: true }, "createdAt"), _jsx(Table.Column, { title: "Cliente", dataIndex: "customerId", render: (value) => {
                        const customer = customersData?.data?.find((c) => c.id === value);
                        return (_jsxs(Space, { children: [_jsx(UserOutlined, {}), _jsx("a", { href: `/customers/show/${value}`, children: customer
                                        ? `${customer.firstName} ${customer.lastName}`
                                        : value })] }));
                    } }, "customerId"), _jsx(Table.Column, { title: "Vendedor", dataIndex: "userId", render: (value) => {
                        const employee = employeesData?.data?.find((e) => e.id === value);
                        return (_jsxs(Space, { children: [_jsx(UserOutlined, {}), employee
                                    ? `${employee.firstName} ${employee.lastName}`
                                    : value] }));
                    } }, "userId"), _jsx(Table.Column, { title: "Tienda", dataIndex: "storeId", render: (value) => {
                        const store = storesData?.data?.find((s) => s.id === value);
                        return (_jsxs(Space, { children: [_jsx(ShopOutlined, {}), store ? store.name : value] }));
                    } }, "storeId"), _jsx(Table.Column, { title: "Tipo", dataIndex: "type", render: (value) => (_jsx(Tag, { color: getTypeColor(value), children: value === "new"
                            ? "Nueva"
                            : value === "renewal"
                                ? "Renovación"
                                : value === "upgrade"
                                    ? "Mejora"
                                    : value === "winback"
                                        ? "Recuperación"
                                        : value })) }, "type"), _jsx(Table.Column, { title: "Canal", dataIndex: "channel", render: (value) => (_jsxs(Space, { children: [getChannelIcon(value), _jsx(Text, { children: value === "phone"
                                    ? "Teléfono"
                                    : value === "store"
                                        ? "Tienda"
                                        : value === "online"
                                            ? "Online"
                                            : value })] })) }, "channel"), _jsx(Table.Column, { title: "Total", dataIndex: ["amount", "total"], render: (value) => (_jsx(Statistic, { value: value, prefix: "$", precision: 2, valueStyle: { fontSize: 14 } })), sorter: true }, "total"), _jsx(Table.Column, { title: "Comisi\u00F3n", dataIndex: ["commission", "total"], render: (value, record) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { strong: true, children: ["$", value] }), _jsx(Tag, { color: record.commission.status === "paid"
                                    ? "success"
                                    : record.commission.status === "approved"
                                        ? "processing"
                                        : "warning", children: record.commission.status === "paid"
                                    ? "Pagada"
                                    : record.commission.status === "approved"
                                        ? "Aprobada"
                                        : "Pendiente" })] })) }, "commission"), _jsx(Table.Column, { title: "Estado de Pago", dataIndex: "paymentStatus", render: (value) => (_jsx(Tag, { icon: value === "completed" ? (_jsx(CheckCircleOutlined, {})) : value === "pending" ? (_jsx(ClockCircleOutlined, {})) : value === "failed" ? (_jsx(ClockCircleOutlined, {})) : (_jsx(SyncOutlined, {})), color: getPaymentStatusColor(value), children: value === "completed"
                            ? "Completado"
                            : value === "pending"
                                ? "Pendiente"
                                : value === "failed"
                                    ? "Fallido"
                                    : value === "refunded"
                                        ? "Reembolsado"
                                        : value })) }, "paymentStatus"), _jsx(Table.Column, { title: "Contrato", dataIndex: ["contract", "signed"], render: (signed, record) => (_jsx(Tag, { color: signed ? "success" : "warning", children: signed ? "Firmado" : "Pendiente" })) }, "contract"), _jsx(Table.Column, { title: "Acciones", dataIndex: "actions", render: (_, record) => (_jsxs(Space, { children: [_jsx("a", { href: `/sales/show/${record.id}`, children: "Ver detalles" }), record.callId && (_jsx("a", { href: `/calls/show/${record.callId}`, children: "Ver llamada" }))] })) })] }) }));
};
