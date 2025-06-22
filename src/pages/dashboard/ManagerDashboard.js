import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useList } from "@refinedev/core";
import { Row, Col, Card, Statistic, Progress, Space, Typography, Tag, Table, List, Badge, Avatar, Button } from "antd";
import { DollarOutlined, UserOutlined, PhoneOutlined, TeamOutlined, ShoppingCartOutlined, AlertOutlined, CheckCircleOutlined, RiseOutlined, } from "@ant-design/icons";
import { Area } from "@ant-design/charts";
import dayjs from "dayjs";
const { Title, Text } = Typography;
export const ManagerDashboard = ({ user }) => {
    // Fetch store data
    const { data: storeData } = useList({
        resource: "stores",
        filters: [{ field: "id", operator: "eq", value: user.storeId }],
    });
    // Fetch team members
    const { data: employeesData } = useList({
        resource: "employees",
        filters: [
            { field: "storeId", operator: "eq", value: user.storeId },
            { field: "role", operator: "eq", value: "agent" }
        ],
    });
    // Fetch today's goals for the team
    const { data: goalsData } = useList({
        resource: "dailyGoals",
        filters: [
            { field: "date", operator: "eq", value: dayjs().format("YYYY-MM-DD") }
        ],
    });
    // Fetch recent sales
    const { data: salesData } = useList({
        resource: "sales",
        filters: [
            { field: "storeId", operator: "eq", value: user.storeId }
        ],
        sorters: [{ field: "createdAt", order: "desc" }],
        pagination: { pageSize: 10 },
    });
    const store = storeData?.data?.[0];
    const teamMembers = employeesData?.data || [];
    const todayGoals = goalsData?.data || [];
    // Calculate team statistics
    const teamStats = {
        totalCalls: teamMembers.reduce((sum, emp) => sum + (emp.performance?.callsToday || 0), 0),
        totalConversions: teamMembers.reduce((sum, emp) => sum + (emp.performance?.conversionsToday || 0), 0),
        averageConversionRate: teamMembers.length > 0
            ? teamMembers.reduce((sum, emp) => sum + (emp.performance?.conversionRate || 0), 0) / teamMembers.length
            : 0,
        activeAgents: teamMembers.filter(emp => emp.status === 'active' || emp.status === 'calling').length,
    };
    // Mock data for charts
    const salesTrendData = [
        { date: '2024-06-01', sales: 45000 },
        { date: '2024-06-05', sales: 52000 },
        { date: '2024-06-10', sales: 48000 },
        { date: '2024-06-15', sales: 61000 },
        { date: '2024-06-20', sales: 58000 },
        { date: '2024-06-25', sales: 67000 },
        { date: '2024-06-30', sales: store?.performance.currentSales || 42350 },
    ];
    const teamPerformanceData = teamMembers.map(emp => ({
        name: `${emp.firstName} ${emp.lastName}`,
        calls: emp.performance?.callsToday || 0,
        conversions: emp.performance?.conversionsToday || 0,
        conversionRate: emp.performance?.conversionRate || 0,
    }));
    const salesTrendConfig = {
        data: salesTrendData,
        xField: 'date',
        yField: 'sales',
        smooth: true,
        area: {
            style: {
                fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
            },
        },
    };
    const teamPerformanceConfig = {
        data: teamPerformanceData,
        xField: 'name',
        yField: 'calls',
        seriesField: 'type',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
    };
    // Identify employees with overdue tasks
    const employeesWithOverdue = todayGoals.filter(goal => goal.status === 'overdue');
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsxs(Row, { justify: "space-between", align: "middle", style: { marginBottom: 24 }, children: [_jsxs(Col, { children: [_jsxs(Title, { level: 2, children: ["Dashboard de Gerente - ", store?.name] }), _jsx(Text, { type: "secondary", children: "Gesti\u00F3n y supervisi\u00F3n del equipo" })] }), _jsx(Col, { children: _jsx(Space, { children: _jsx(Badge, { status: "processing", text: `${teamStats.activeAgents} agentes activos` }) }) })] }), employeesWithOverdue.length > 0 && (_jsx(Card, { style: { marginBottom: 16, borderColor: '#ff4d4f' }, children: _jsxs(Space, { children: [_jsx(AlertOutlined, { style: { color: '#ff4d4f', fontSize: 20 } }), _jsxs(Text, { strong: true, children: [employeesWithOverdue.length, " empleados con tareas pendientes del d\u00EDa anterior"] })] }) })), _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, sm: 12, lg: 6, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Ventas del Mes", value: store?.performance.currentSales || 0, prefix: _jsx(DollarOutlined, {}), suffix: "USD", valueStyle: { color: '#3f8600' } }), _jsx(Progress, { percent: (store?.performance.currentSales || 0) / (store?.performance.monthlyTarget || 1) * 100, showInfo: false, strokeColor: "#52c41a" }), _jsxs(Text, { type: "secondary", children: [((store?.performance.currentSales || 0) / (store?.performance.monthlyTarget || 1) * 100).toFixed(0), "% de $", store?.performance.monthlyTarget || 0] })] }) }), _jsx(Col, { xs: 24, sm: 12, lg: 6, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Llamadas del Equipo Hoy", value: teamStats.totalCalls, prefix: _jsx(PhoneOutlined, {}) }), _jsxs(Space, { children: [_jsx(RiseOutlined, { style: { color: '#52c41a' } }), _jsxs(Text, { type: "success", children: ["Meta grupal: ", teamMembers.length * 25] })] })] }) }), _jsx(Col, { xs: 24, sm: 12, lg: 6, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Conversiones Hoy", value: teamStats.totalConversions, prefix: _jsx(CheckCircleOutlined, {}), valueStyle: { color: '#52c41a' } }), _jsxs(Text, { children: ["Tasa promedio: ", teamStats.averageConversionRate.toFixed(1), "%"] })] }) }), _jsx(Col, { xs: 24, sm: 12, lg: 6, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Agentes Activos", value: teamStats.activeAgents, suffix: `/ ${teamMembers.length}`, prefix: _jsx(TeamOutlined, {}), valueStyle: { color: '#1890ff' } }), _jsx(Text, { type: "secondary", children: "En l\u00EDnea ahora" })] }) })] }), _jsxs(Row, { gutter: [16, 16], style: { marginTop: 24 }, children: [_jsx(Col, { xs: 24, lg: 16, children: _jsx(Card, { title: "Rendimiento del Equipo", extra: _jsx(Space, { children: _jsx(Tag, { color: "green", children: "En tiempo real" }) }), children: _jsx(Table, { dataSource: teamMembers, columns: [
                                    {
                                        title: 'Agente',
                                        key: 'agent',
                                        render: (record) => (_jsxs(Space, { children: [_jsx(Avatar, { src: record.avatar, icon: _jsx(UserOutlined, {}) }), _jsxs("div", { children: [_jsxs(Text, { strong: true, children: [record.firstName, " ", record.lastName] }), _jsx("br", {}), _jsx(Badge, { status: record.status === 'active' ? 'success' : record.status === 'calling' ? 'processing' : 'default', text: record.status })] })] })),
                                    },
                                    {
                                        title: 'Llamadas',
                                        key: 'calls',
                                        render: (record) => {
                                            const goal = todayGoals.find(g => g.employeeId === record.id);
                                            const progress = goal ? (goal.completedCalls / goal.targetCalls) * 100 : 0;
                                            return (_jsxs("div", { children: [_jsxs(Text, { children: [goal?.completedCalls || 0, " / ", goal?.targetCalls || 25] }), _jsx(Progress, { percent: progress, size: "small", showInfo: false })] }));
                                        },
                                    },
                                    {
                                        title: 'Conversiones',
                                        dataIndex: ['performance', 'conversionsToday'],
                                        key: 'conversions',
                                        render: (value) => _jsx(Tag, { color: "green", children: value || 0 }),
                                    },
                                    {
                                        title: 'Tasa Conv.',
                                        dataIndex: ['performance', 'conversionRate'],
                                        key: 'conversionRate',
                                        render: (value) => (_jsxs(Text, { type: value > 15 ? 'success' : value > 10 ? 'warning' : 'danger', children: [value || 0, "%"] })),
                                    },
                                    {
                                        title: 'Estado',
                                        key: 'status',
                                        render: (record) => {
                                            const goal = todayGoals.find(g => g.employeeId === record.id);
                                            if (goal?.status === 'overdue') {
                                                return _jsx(Tag, { color: "red", children: "Tareas pendientes" });
                                            }
                                            else if (goal?.status === 'completed') {
                                                return _jsx(Tag, { color: "green", children: "Meta completada" });
                                            }
                                            else {
                                                return _jsx(Tag, { color: "blue", children: "En progreso" });
                                            }
                                        },
                                    },
                                ], pagination: false, size: "small" }) }) }), _jsx(Col, { xs: 24, lg: 8, children: _jsx(Card, { title: "Top Vendedores del Mes", children: _jsx(List, { dataSource: teamMembers.sort((a, b) => (b.commissions?.currentMonthCommission || 0) - (a.commissions?.currentMonthCommission || 0)).slice(0, 5), renderItem: (employee, index) => (_jsx(List.Item, { children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { style: {
                                                backgroundColor: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#f0f0f0'
                                            }, children: index + 1 }), title: `${employee.firstName} ${employee.lastName}`, description: _jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { children: ["$", employee.commissions?.currentMonthCommission || 0, " en comisiones"] }), _jsxs(Text, { type: "secondary", children: [employee.commissions?.currentMonthEvaluations || 0, " ventas"] })] }) }) })) }) }) })] }), _jsx(Row, { gutter: [16, 16], style: { marginTop: 24 }, children: _jsx(Col, { xs: 24, children: _jsx(Card, { title: "Tendencia de Ventas del Mes", children: _jsx(Area, { ...salesTrendConfig, height: 300 }) }) }) }), _jsx(Row, { gutter: [16, 16], style: { marginTop: 24 }, children: _jsx(Col, { xs: 24, children: _jsx(Card, { title: "Actividad Reciente", extra: _jsx(Button, { type: "link", children: "Ver todo" }), children: _jsx(List, { dataSource: salesData?.data?.slice(0, 5) || [], renderItem: (sale) => (_jsx(List.Item, { children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { icon: _jsx(ShoppingCartOutlined, {}), style: { backgroundColor: '#52c41a' } }), title: _jsxs(Space, { children: [_jsxs(Text, { children: ["Nueva venta: $", sale.amount.total] }), _jsx(Tag, { color: sale.type === 'new' ? 'green' : sale.type === 'renewal' ? 'blue' : 'orange', children: sale.type })] }), description: _jsxs(Space, { children: [_jsxs(Text, { type: "secondary", children: ["Por ", teamMembers.find(e => e.id === sale.userId)?.firstName || 'Agente'] }), _jsx(Text, { type: "secondary", children: "\u2022" }), _jsx(Text, { type: "secondary", children: dayjs(sale.createdAt).fromNow() })] }) }) })) }) }) }) })] }));
};
