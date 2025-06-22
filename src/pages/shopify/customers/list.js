import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { List, useTable, ShowButton, EditButton, DateField } from "@refinedev/antd";
import { Table, Space, Tag, Button, Avatar, Typography, Badge } from "antd";
import { UserOutlined, SyncOutlined, MailOutlined, PhoneOutlined, DollarOutlined } from "@ant-design/icons";
import { useNotification, useInvalidate } from "@refinedev/core";
import { shopifyService } from "../../../services/shopifyService";
const { Text } = Typography;
export const ShopifyCustomerList = () => {
    const { tableProps } = useTable({
        resource: "shopifyCustomers",
        sorters: {
            initial: [{ field: "updatedAt", order: "desc" }],
        },
    });
    const { open } = useNotification();
    const invalidate = useInvalidate();
    const [syncLoading, setSyncLoading] = useState(false);
    const handleSync = async () => {
        setSyncLoading(true);
        try {
            await shopifyService.syncCustomers();
            open?.({
                type: "success",
                message: "Sincronización completada",
                description: "Los clientes se han sincronizado con Shopify",
            });
            // Refrescar la tabla
            invalidate({
                resource: "shopifyCustomers",
                invalidates: ["list"],
            });
        }
        catch (error) {
            open?.({
                type: "error",
                message: "Error al sincronizar",
                description: error.message || "No se pudieron sincronizar los clientes",
            });
        }
        finally {
            setSyncLoading(false);
        }
    };
    const handleMergeWithLocal = () => {
        open?.({
            type: "success",
            message: "Función en desarrollo",
            description: "La fusión de clientes estará disponible próximamente",
        });
    };
    const columns = [
        {
            title: "Cliente",
            key: "customer",
            render: (_, record) => (_jsxs(Space, { children: [_jsxs(Avatar, { icon: _jsx(UserOutlined, {}), style: { backgroundColor: "#1890ff" }, children: [record.firstName?.[0], record.lastName?.[0]] }), _jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { strong: true, children: [record.firstName, " ", record.lastName] }), _jsxs(Space, { size: 4, children: [_jsx(MailOutlined, { style: { fontSize: 12, color: "#8c8c8c" } }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: record.email }), record.verifiedEmail && (_jsx(Tag, { color: "green", style: { fontSize: 10, padding: "0 4px" }, children: "Verificado" }))] })] })] })),
        },
        {
            title: "Teléfono",
            dataIndex: "phone",
            key: "phone",
            width: 150,
            render: (value) => value ? (_jsxs(Space, { size: 4, children: [_jsx(PhoneOutlined, { style: { fontSize: 12, color: "#8c8c8c" } }), _jsx(Text, { children: value })] })) : "-",
        },
        {
            title: "Estado",
            dataIndex: "state",
            key: "state",
            width: 120,
            render: (value) => {
                const config = {
                    enabled: { color: "green", text: "Activo" },
                    disabled: { color: "red", text: "Desactivado" },
                    invited: { color: "blue", text: "Invitado" },
                    declined: { color: "orange", text: "Rechazado" },
                };
                return _jsx(Tag, { color: config[value]?.color, children: config[value]?.text });
            },
        },
        {
            title: "Órdenes",
            key: "orders",
            width: 120,
            render: (_, record) => (_jsxs(Space, { direction: "vertical", size: 0, style: { textAlign: "center" }, children: [_jsx(Badge, { count: record.ordersCount, showZero: true, style: { backgroundColor: "#1890ff" } }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: "\u00F3rdenes" })] })),
        },
        {
            title: "Total Gastado",
            key: "totalSpent",
            width: 150,
            render: (_, record) => (_jsxs(Space, { size: 4, children: [_jsx(DollarOutlined, { style: { color: "#52c41a" } }), _jsxs(Text, { strong: true, children: [record.currency, " ", record.totalSpent] })] })),
        },
        {
            title: "Marketing",
            dataIndex: "acceptsMarketing",
            key: "acceptsMarketing",
            width: 100,
            align: "center",
            render: (value) => (_jsx(Tag, { color: value ? "green" : "default", children: value ? "Sí" : "No" })),
        },
        {
            title: "Última Orden",
            dataIndex: "lastOrderName",
            key: "lastOrderName",
            width: 120,
            render: (value) => value || "-",
        },
        {
            title: "Creado",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 150,
            render: (value) => _jsx(DateField, { value: value, format: "DD/MM/YYYY" }),
        },
        {
            title: "Acciones",
            key: "actions",
            width: 180,
            fixed: "right",
            render: (_, record) => (_jsxs(Space, { children: [_jsx(ShowButton, { hideText: true, size: "small", recordItemId: record.id }), _jsx(EditButton, { hideText: true, size: "small", recordItemId: record.id }), _jsx(Button, { size: "small", onClick: () => handleMergeWithLocal(record), children: "Fusionar" })] })),
        },
    ];
    return (_jsx(List, { title: "Clientes de Shopify", headerProps: {
            extra: (_jsx(Space, { children: _jsx(Button, { type: "primary", icon: _jsx(SyncOutlined, { spin: syncLoading }), onClick: handleSync, loading: syncLoading, children: "Sincronizar con Shopify" }) })),
        }, children: _jsx(Table, { ...tableProps, columns: columns, rowKey: "id", scroll: { x: 1400 }, expandable: {
                expandedRowRender: (record) => (_jsx("div", { style: { padding: 16 }, children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [record.note && (_jsxs("div", { children: [_jsx(Text, { strong: true, children: "Notas:" }), _jsxs(Text, { children: [" ", record.note] })] })), record.tags && record.tags.length > 0 && (_jsxs("div", { children: [_jsx(Text, { strong: true, children: "Etiquetas:" }), _jsx(Space, { wrap: true, style: { marginLeft: 8 }, children: record.tags.map((tag, index) => (_jsx(Tag, { children: tag }, index))) })] })), record.addresses && record.addresses.length > 0 && (_jsxs("div", { children: [_jsx(Text, { strong: true, children: "Direcciones:" }), record.addresses.map((addr, index) => (_jsxs("div", { style: { marginTop: 8, marginLeft: 16 }, children: [_jsx(Tag, { color: addr.default ? "green" : "default", children: addr.default ? "Principal" : `Dirección ${index + 1}` }), _jsx(Text, { children: addr.address1 }), addr.address2 && _jsxs(Text, { children: [", ", addr.address2] }), _jsx("br", {}), _jsxs(Text, { children: [addr.city, ", ", addr.province, " ", addr.zip, ", ", addr.country] }), addr.phone && (_jsxs(_Fragment, { children: [_jsx("br", {}), _jsx(PhoneOutlined, {}), " ", addr.phone] }))] }, addr.id)))] })), _jsx("div", { children: _jsxs(Space, { children: [_jsx(Text, { strong: true, children: "ID de Shopify:" }), _jsx(Text, { copyable: true, children: record.shopifyId })] }) })] }) })),
            } }) }));
};
