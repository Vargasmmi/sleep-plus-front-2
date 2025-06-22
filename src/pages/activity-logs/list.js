import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { List, useTable, DateField, ShowButton } from "@refinedev/antd";
import { Table, Tag, Space, Typography, Badge, Tooltip, Card, Row, Col, Statistic } from "antd";
import { UserOutlined, ClockCircleOutlined, DesktopOutlined, EnvironmentOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const { Text } = Typography;
export const ActivityLogList = () => {
    const { tableProps } = useTable({
        resource: "activityLogs",
        sorters: {
            initial: [{ field: "timestamp", order: "desc" }],
        },
    });
    const getActionColor = (action) => {
        const colors = {
            create: "green",
            update: "blue",
            delete: "red",
            view: "default",
            login: "cyan",
            logout: "orange",
            export: "purple",
            import: "purple",
            sync: "geekblue",
            approve: "green",
            reject: "red",
            change_status: "gold",
        };
        return colors[action] || "default";
    };
    const getActionLabel = (action) => {
        const labels = {
            create: "Creó",
            update: "Actualizó",
            delete: "Eliminó",
            view: "Vió",
            login: "Inició sesión",
            logout: "Cerró sesión",
            export: "Exportó",
            import: "Importó",
            sync: "Sincronizó",
            approve: "Aprobó",
            reject: "Rechazó",
            change_status: "Cambió estado",
            make_call: "Realizó llamada",
            send_email: "Envió email",
        };
        return labels[action] || action;
    };
    const getResourceLabel = (resource) => {
        const labels = {
            auth: "Autenticación",
            customers: "Clientes",
            subscriptions: "Suscripciones",
            evaluations: "Evaluaciones",
            employees: "Empleados",
            stores: "Tiendas",
            calls: "Llamadas",
            sales: "Ventas",
            campaigns: "Campañas",
            commissions: "Comisiones",
            achievements: "Logros",
            scripts: "Scripts",
            shopifySettings: "Configuración Shopify",
            shopifyProducts: "Productos Shopify",
            shopifyCustomers: "Clientes Shopify",
            shopifyCoupons: "Cupones Shopify",
        };
        return labels[resource] || resource;
    };
    const columns = [
        {
            title: "Fecha y Hora",
            dataIndex: "timestamp",
            key: "timestamp",
            width: 180,
            render: (value) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(DateField, { value: value, format: "DD/MM/YYYY HH:mm:ss" }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: dayjs(value).fromNow() })] })),
        },
        {
            title: "Usuario",
            key: "user",
            width: 200,
            render: (_, record) => (_jsxs(Space, { children: [_jsx(UserOutlined, {}), _jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { children: record.userName }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: record.userEmail })] })] })),
        },
        {
            title: "Acción",
            dataIndex: "action",
            key: "action",
            width: 120,
            render: (value) => (_jsx(Tag, { color: getActionColor(value), children: getActionLabel(value) })),
        },
        {
            title: "Recurso",
            dataIndex: "resource",
            key: "resource",
            width: 150,
            render: (value) => (_jsx(Badge, { status: "processing", text: getResourceLabel(value) })),
        },
        {
            title: "Detalles",
            key: "details",
            render: (_, record) => {
                if (record.action === "login" && record.details.userAgent) {
                    return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Space, { children: [_jsx(DesktopOutlined, {}), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: record.details.userAgent.split(" ").slice(-3).join(" ") })] }), record.details.location && (_jsxs(Space, { children: [_jsx(EnvironmentOutlined, {}), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: record.details.location })] }))] }));
                }
                if (record.action === "update" && record.details.fields) {
                    return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { children: "Campos modificados:" }), _jsx(Space, { wrap: true, children: record.details.fields.map((field) => (_jsx(Tag, { color: "blue", children: field }, field))) })] }));
                }
                if (record.action === "create" && record.details.customerName) {
                    return (_jsxs(Text, { children: ["Cliente: ", _jsx("strong", { children: record.details.customerName })] }));
                }
                if (record.action === "change_status") {
                    return (_jsxs(Space, { children: [_jsx(Tag, { children: record.details.fromStatus }), _jsx(Text, { children: "\u2192" }), _jsx(Tag, { color: "green", children: record.details.toStatus })] }));
                }
                if (record.resourceId) {
                    return (_jsxs(Text, { type: "secondary", children: ["ID: ", record.resourceId] }));
                }
                return "-";
            },
        },
        {
            title: "Acciones",
            key: "actions",
            width: 100,
            fixed: "right",
            render: (_, record) => (_jsx(Space, { children: _jsx(Tooltip, { title: "Ver detalles completos", children: _jsx(ShowButton, { hideText: true, size: "small", recordItemId: record.id }) }) })),
        },
    ];
    return (_jsxs(_Fragment, { children: [_jsxs(Row, { gutter: [16, 16], style: { marginBottom: 16 }, children: [_jsx(Col, { xs: 24, sm: 12, md: 6, children: _jsx(Card, { children: _jsx(Statistic, { title: "Actividades Hoy", value: tableProps.dataSource?.filter((log) => dayjs(log.timestamp).isSame(dayjs(), "day")).length || 0, prefix: _jsx(ClockCircleOutlined, {}) }) }) }), _jsx(Col, { xs: 24, sm: 12, md: 6, children: _jsx(Card, { children: _jsx(Statistic, { title: "Usuarios Activos", value: new Set(tableProps.dataSource?.map((log) => log.userId)).size || 0, prefix: _jsx(UserOutlined, {}), valueStyle: { color: "#3f8600" } }) }) }), _jsx(Col, { xs: 24, sm: 12, md: 6, children: _jsx(Card, { children: _jsx(Statistic, { title: "Acciones de Modificaci\u00F3n", value: tableProps.dataSource?.filter((log) => ["create", "update", "delete"].includes(log.action)).length || 0, valueStyle: { color: "#cf1322" } }) }) }), _jsx(Col, { xs: 24, sm: 12, md: 6, children: _jsx(Card, { children: _jsx(Statistic, { title: "Inicios de Sesi\u00F3n Hoy", value: tableProps.dataSource?.filter((log) => log.action === "login" && dayjs(log.timestamp).isSame(dayjs(), "day")).length || 0, prefix: _jsx(UserOutlined, {}), valueStyle: { color: "#1890ff" } }) }) })] }), _jsx(List, { title: "Registro de Actividades", children: _jsx(Table, { ...tableProps, columns: columns, rowKey: "id", scroll: { x: 1200 }, pagination: {
                        ...tableProps.pagination,
                        showSizeChanger: true,
                        showTotal: (total) => `Total: ${total} actividades`,
                    } }) })] }));
};
