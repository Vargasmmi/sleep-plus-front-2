import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useList } from "@refinedev/core";
import { Row, Col, Card, Statistic, Progress, Space, Typography, Tag, Table, Button } from "antd";
import { DollarOutlined, UserOutlined, PhoneOutlined, TeamOutlined, ShopOutlined, GlobalOutlined, SettingOutlined, SafetyOutlined, RiseOutlined, } from "@ant-design/icons";
import { Pie, DualAxes } from "@ant-design/charts";
import dayjs from "dayjs";
const { Title, Text } = Typography;
export const AdminDashboard = ({ user }) => {
    // Fetch all stores
    const { data: storesData } = useList({
        resource: "stores",
    });
    // Fetch all employees
    const { data: employeesData } = useList({
        resource: "employees",
    });
    // Fetch system settings
    const { data: settingsData } = useList({
        resource: "systemSettings",
    });
    // Fetch recent sales
    const { data: salesData } = useList({
        resource: "sales",
        sorters: [{ field: "createdAt", order: "desc" }],
        pagination: { pageSize: 100 },
    });
    // Fetch customers
    const { data: customersData } = useList({
        resource: "customers",
    });
    const stores = storesData?.data || [];
    const employees = employeesData?.data || [];
    const sales = salesData?.data || [];
    const customers = customersData?.data || [];
    const settings = settingsData?.data?.[0];
    // Calculate system-wide statistics
    const systemStats = {
        totalRevenue: stores.reduce((sum, store) => sum + (store.performance?.currentSales || 0), 0),
        totalTarget: stores.reduce((sum, store) => sum + (store.performance?.monthlyTarget || 0), 0),
        activeEmployees: employees.filter(emp => emp.status === 'active' || emp.status === 'calling').length,
        totalCustomers: customers.length,
        eliteMembers: customers.filter(c => c.isEliteMember).length,
        totalCalls: employees.reduce((sum, emp) => sum + (emp.performance?.callsToday || 0), 0),
    };
    // Performance by store
    const storePerformanceData = stores.map(store => ({
        name: store.name,
        sales: store.performance?.currentSales || 0,
        target: store.performance?.monthlyTarget || 0,
        percentage: ((store.performance?.currentSales || 0) / (store.performance?.monthlyTarget || 1) * 100).toFixed(1),
    }));
    // Employee distribution by role
    const employeeDistribution = [
        { type: 'Administradores', value: employees.filter(e => e.role === 'admin').length },
        { type: 'Gerentes', value: employees.filter(e => e.role === 'manager').length },
        { type: 'Agentes', value: employees.filter(e => e.role === 'agent').length },
    ];
    // Customer tier distribution
    const customerTierData = [
        { type: 'Oro', value: customers.filter(c => c.tier === 'gold').length },
        { type: 'Plata', value: customers.filter(c => c.tier === 'silver').length },
        { type: 'Bronce', value: customers.filter(c => c.tier === 'bronze').length },
    ];
    // Sales trend (last 30 days)
    const last30Days = Array.from({ length: 30 }, (_, i) => {
        const date = dayjs().subtract(29 - i, 'days');
        const daySales = sales.filter(s => dayjs(s.createdAt).isSame(date, 'day'));
        return {
            date: date.format('MM/DD'),
            sales: daySales.reduce((sum, s) => sum + s.amount.total, 0),
            count: daySales.length,
        };
    });
    const salesTrendConfig = {
        data: last30Days,
        xField: 'date',
        yField: ['sales', 'count'],
        geometryOptions: [
            {
                geometry: 'column',
                color: '#5B8FF9',
            },
            {
                geometry: 'line',
                color: '#5AD8A6',
            },
        ],
    };
    const employeeDistributionConfig = {
        data: employeeDistribution,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
    };
    const storePerformanceConfig = {
        data: storePerformanceData,
        xField: 'name',
        yField: 'sales',
        seriesField: 'type',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
    };
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsxs(Row, { justify: "space-between", align: "middle", style: { marginBottom: 24 }, children: [_jsxs(Col, { children: [_jsx(Title, { level: 2, children: "Dashboard Administrativo" }), _jsx(Text, { type: "secondary", children: "Vista completa del sistema" })] }), _jsx(Col, { children: _jsxs(Space, { children: [_jsx(Button, { icon: _jsx(SettingOutlined, {}), onClick: () => window.location.href = '/admin/settings', children: "Configuraci\u00F3n del Sistema" }), _jsx(Button, { icon: _jsx(SafetyOutlined, {}), onClick: () => window.location.href = '/admin/permissions', children: "Gestionar Permisos" })] }) })] }), _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, sm: 12, lg: 4, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Ingresos Totales", value: systemStats.totalRevenue, prefix: _jsx(DollarOutlined, {}), suffix: "USD", valueStyle: { color: '#3f8600' } }), _jsx(Progress, { percent: (systemStats.totalRevenue / systemStats.totalTarget) * 100, showInfo: false, strokeColor: "#52c41a" }), _jsxs(Text, { type: "secondary", children: [((systemStats.totalRevenue / systemStats.totalTarget) * 100).toFixed(0), "% del objetivo"] })] }) }), _jsx(Col, { xs: 24, sm: 12, lg: 4, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Total Tiendas", value: stores.length, prefix: _jsx(ShopOutlined, {}), valueStyle: { color: '#1890ff' } }), _jsxs(Text, { type: "secondary", children: [stores.filter(s => s.status === 'active').length, " activas"] })] }) }), _jsx(Col, { xs: 24, sm: 12, lg: 4, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Total Empleados", value: employees.length, prefix: _jsx(TeamOutlined, {}) }), _jsxs(Text, { type: "secondary", children: [systemStats.activeEmployees, " en l\u00EDnea ahora"] })] }) }), _jsx(Col, { xs: 24, sm: 12, lg: 4, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Total Clientes", value: systemStats.totalCustomers, prefix: _jsx(UserOutlined, {}), valueStyle: { color: '#722ed1' } }), _jsxs(Text, { type: "secondary", children: [systemStats.eliteMembers, " Elite"] })] }) }), _jsx(Col, { xs: 24, sm: 12, lg: 4, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Llamadas Hoy", value: systemStats.totalCalls, prefix: _jsx(PhoneOutlined, {}) }), _jsxs(Text, { type: "secondary", children: ["Meta diaria: ", settings?.dailyCallGoal || 25, "/agente"] })] }) }), _jsx(Col, { xs: 24, sm: 12, lg: 4, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Tasa Conversi\u00F3n", value: 15.8, suffix: "%", prefix: _jsx(GlobalOutlined, {}), valueStyle: { color: '#faad14' } }), _jsxs(Space, { children: [_jsx(RiseOutlined, { style: { color: '#52c41a' } }), _jsx(Text, { type: "success", children: "+2.3%" })] })] }) })] }), _jsxs(Row, { gutter: [16, 16], style: { marginTop: 24 }, children: [_jsx(Col, { xs: 24, lg: 16, children: _jsx(Card, { title: "Rendimiento por Tienda", children: _jsx(Table, { dataSource: storePerformanceData, rowKey: "name", columns: [
                                    {
                                        title: 'Tienda',
                                        dataIndex: 'name',
                                        key: 'name',
                                    },
                                    {
                                        title: 'Ventas',
                                        dataIndex: 'sales',
                                        key: 'sales',
                                        render: (value) => `$${value.toLocaleString()}`,
                                    },
                                    {
                                        title: 'Objetivo',
                                        dataIndex: 'target',
                                        key: 'target',
                                        render: (value) => `$${value.toLocaleString()}`,
                                    },
                                    {
                                        title: 'Progreso',
                                        key: 'progress',
                                        render: (record) => (_jsx("div", { style: { width: 170 }, children: _jsx(Progress, { percent: parseFloat(record.percentage), size: "small", status: parseFloat(record.percentage) >= 100 ? 'success' : 'active' }) })),
                                    },
                                    {
                                        title: 'Estado',
                                        key: 'status',
                                        render: (record) => (_jsx(Tag, { color: parseFloat(record.percentage) >= 100 ? 'green' : parseFloat(record.percentage) >= 80 ? 'orange' : 'red', children: parseFloat(record.percentage) >= 100 ? 'Superado' : parseFloat(record.percentage) >= 80 ? 'En camino' : 'Bajo' })),
                                    },
                                ], pagination: false }) }) }), _jsx(Col, { xs: 24, lg: 8, children: _jsx(Card, { title: "Distribuci\u00F3n de Empleados", children: _jsx(Pie, { ...employeeDistributionConfig, height: 300 }) }) })] }), _jsxs(Row, { gutter: [16, 16], style: { marginTop: 24 }, children: [_jsx(Col, { xs: 24, lg: 16, children: _jsx(Card, { title: "Tendencia de Ventas (\u00DAltimos 30 d\u00EDas)", children: _jsx(DualAxes, { ...salesTrendConfig, height: 300 }) }) }), _jsx(Col, { xs: 24, lg: 8, children: _jsx(Card, { title: "Distribuci\u00F3n de Clientes por Nivel", children: _jsx(Pie, { data: customerTierData, angleField: "value", colorField: "type", radius: 0.8, label: {
                                    type: 'outer',
                                    content: '{name} {percentage}',
                                }, interactions: [
                                    {
                                        type: 'pie-legend-active',
                                    },
                                    {
                                        type: 'element-active',
                                    },
                                ], height: 300 }) }) })] }), _jsx(Row, { gutter: [16, 16], style: { marginTop: 24 }, children: _jsx(Col, { xs: 24, children: _jsx(Card, { title: "Configuraci\u00F3n del Sistema", extra: _jsx(Button, { type: "link", onClick: () => window.location.href = '/admin/settings', children: "Editar" }), children: _jsxs(Row, { gutter: [16, 16], children: [_jsxs(Col, { xs: 24, sm: 12, md: 6, children: [_jsx(Text, { type: "secondary", children: "Meta Diaria de Llamadas" }), _jsx("br", {}), _jsxs(Text, { strong: true, style: { fontSize: 18 }, children: [settings?.dailyCallGoal || 25, " llamadas/agente"] })] }), _jsxs(Col, { xs: 24, sm: 12, md: 6, children: [_jsx(Text, { type: "secondary", children: "Horario Laboral" }), _jsx("br", {}), _jsxs(Text, { strong: true, style: { fontSize: 18 }, children: [settings?.workingHours?.start || '09:00', " - ", settings?.workingHours?.end || '18:00'] })] }), _jsxs(Col, { xs: 24, sm: 12, md: 6, children: [_jsx(Text, { type: "secondary", children: "Modo Competencia" }), _jsx("br", {}), _jsx(Tag, { color: settings?.competitionMode ? 'green' : 'red', style: { fontSize: 16 }, children: settings?.competitionMode ? 'Activado' : 'Desactivado' })] }), _jsxs(Col, { xs: 24, sm: 12, md: 6, children: [_jsx(Text, { type: "secondary", children: "Asignaci\u00F3n Autom\u00E1tica" }), _jsx("br", {}), _jsx(Tag, { color: settings?.autoAssignCustomers ? 'green' : 'red', style: { fontSize: 16 }, children: settings?.autoAssignCustomers ? 'Activada' : 'Desactivada' })] })] }) }) }) })] }));
};
