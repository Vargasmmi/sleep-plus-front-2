import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useList } from "@refinedev/core";
import { Row, Col, Card, Statistic, Progress, Space, Typography, Tag, Alert, Button, List, Avatar, Badge } from "antd";
import { PhoneOutlined, CheckCircleOutlined, ExclamationCircleOutlined, TrophyOutlined, FireOutlined, RiseOutlined, UserOutlined, DollarOutlined, } from "@ant-design/icons";
import { Line, Gauge } from "@ant-design/charts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const { Title, Text, Paragraph } = Typography;
export const AgentDashboard = ({ user }) => {
    const [currentTime, setCurrentTime] = useState(dayjs());
    // Fetch today's goal
    const { data: goalsData, isLoading: goalsLoading } = useList({
        resource: "dailyGoals",
        filters: [
            { field: "employeeId", operator: "eq", value: user.id },
            { field: "date", operator: "eq", value: dayjs().format("YYYY-MM-DD") }
        ],
    });
    // Fetch pending tasks
    const { data: tasksData, isLoading: tasksLoading } = useList({
        resource: "callTasks",
        filters: [
            { field: "employeeId", operator: "eq", value: user.id },
            { field: "status", operator: "eq", value: "pending" }
        ],
    });
    // Fetch other employees' performance for competition
    const { data: employeesData } = useList({
        resource: "employees",
        filters: [
            { field: "role", operator: "eq", value: "agent" },
            { field: "storeId", operator: "eq", value: user.storeId }
        ],
    });
    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(dayjs());
        }, 60000);
        return () => clearInterval(timer);
    }, []);
    const todayGoal = goalsData?.data?.[0];
    const pendingTasks = tasksData?.data || [];
    // Calculate progress
    const progress = todayGoal ? (todayGoal.completedCalls / todayGoal.targetCalls) * 100 : 0;
    const isOverdue = todayGoal?.status === 'overdue';
    // Mock data for call performance chart
    const callPerformanceData = [
        { hour: '9:00', calls: 3 },
        { hour: '10:00', calls: 5 },
        { hour: '11:00', calls: 4 },
        { hour: '12:00', calls: 2 },
        { hour: '13:00', calls: 0 },
        { hour: '14:00', calls: 4 },
        { hour: '15:00', calls: 3 },
        { hour: '16:00', calls: 2 },
    ];
    const callPerformanceConfig = {
        data: callPerformanceData,
        xField: 'hour',
        yField: 'calls',
        smooth: true,
        point: {
            size: 5,
            shape: 'circle',
        },
        label: {
            style: {
                fill: '#aaa',
            },
        },
    };
    const gaugeConfig = {
        percent: progress / 100,
        range: {
            color: progress >= 100 ? '#52c41a' : progress >= 80 ? '#faad14' : '#ff4d4f',
        },
        indicator: {
            pointer: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
            pin: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
        },
        statistic: {
            content: {
                style: {
                    fontSize: '36px',
                    lineHeight: '36px',
                },
                formatter: () => `${todayGoal?.completedCalls || 0}/${todayGoal?.targetCalls || 25}`,
            },
        },
    };
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsxs(Row, { justify: "space-between", align: "middle", style: { marginBottom: 24 }, children: [_jsxs(Col, { children: [_jsxs(Title, { level: 2, children: ["\u00A1Hola, ", user.firstName, "! \uD83D\uDC4B"] }), _jsx(Text, { type: "secondary", children: currentTime.format('dddd, D [de] MMMM [de] YYYY') })] }), _jsx(Col, { children: _jsxs(Space, { children: [_jsx(Badge, { status: user.status === 'active' ? 'success' : 'default' }), _jsx(Text, { children: user.status === 'active' ? 'En línea' : 'Desconectado' })] }) })] }), isOverdue && (_jsx(Alert, { message: "\u00A1Meta diaria pendiente!", description: "No completaste tu meta de ayer. Completa las llamadas pendientes para recibir nuevos clientes.", type: "warning", showIcon: true, icon: _jsx(ExclamationCircleOutlined, {}), style: { marginBottom: 16 }, action: _jsx(Button, { size: "small", type: "primary", children: "Ver tareas pendientes" }) })), _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, sm: 12, lg: 6, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Llamadas Hoy", value: todayGoal?.completedCalls || 0, suffix: `/ ${todayGoal?.targetCalls || 25}`, prefix: _jsx(PhoneOutlined, {}), valueStyle: { color: progress >= 100 ? '#3f8600' : '#000' } }), _jsx(Progress, { percent: progress, status: progress >= 100 ? 'success' : 'active', strokeColor: isOverdue ? '#ff4d4f' : undefined }), progress >= 100 ? (_jsx(Text, { type: "success", children: "\u00A1Meta completada! \uD83C\uDF89" })) : (_jsxs(Text, { type: "secondary", children: ["Faltan ", (todayGoal?.targetCalls || 25) - (todayGoal?.completedCalls || 0), " llamadas"] }))] }) }), _jsx(Col, { xs: 24, sm: 12, lg: 6, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Conversiones Hoy", value: user.performance?.conversionsToday || 0, prefix: _jsx(CheckCircleOutlined, {}), valueStyle: { color: '#52c41a' } }), _jsxs(Text, { type: "secondary", children: ["Tasa: ", user.performance?.conversionRate || 0, "%"] })] }) }), _jsx(Col, { xs: 24, sm: 12, lg: 6, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Comisi\u00F3n del Mes", value: user.commissions?.currentMonthCommission || 0, prefix: _jsx(DollarOutlined, {}), precision: 2, valueStyle: { color: '#1890ff' } }), _jsxs(Space, { children: [_jsx(RiseOutlined, { style: { color: '#52c41a' } }), _jsx(Text, { type: "success", children: "+15% vs mes anterior" })] })] }) }), _jsx(Col, { xs: 24, sm: 12, lg: 6, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Mi Ranking", value: 3, suffix: "/ 10", prefix: _jsx(TrophyOutlined, {}), valueStyle: { color: '#faad14' } }), _jsx(Text, { type: "secondary", children: "Top 30% del equipo" })] }) })] }), _jsxs(Row, { gutter: [16, 16], style: { marginTop: 24 }, children: [_jsx(Col, { xs: 24, lg: 8, children: _jsxs(Card, { title: "Mi Progreso Diario", extra: _jsx(Tag, { color: progress >= 100 ? 'success' : 'processing', children: "En progreso" }), children: [_jsx(Gauge, { ...gaugeConfig, height: 200 }), _jsx(Paragraph, { style: { textAlign: 'center', marginTop: 16 }, children: progress >= 100
                                        ? "¡Excelente trabajo! Has completado tu meta diaria 🎯"
                                        : `Mantén el ritmo, vas muy bien. ¡Tú puedes! 💪` })] }) }), _jsx(Col, { xs: 24, lg: 8, children: _jsxs(Card, { title: "Clientes Pendientes", extra: _jsx(Badge, { count: pendingTasks.length }), bodyStyle: { height: 300, overflow: 'auto' }, children: [_jsx(List, { dataSource: pendingTasks.slice(0, 5), renderItem: (task) => (_jsx(List.Item, { actions: [
                                            _jsx(Button, { type: "link", size: "small", children: "Llamar" })
                                        ], children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { icon: _jsx(UserOutlined, {}) }), title: `Cliente #${task.customerId}`, description: _jsx(Space, { direction: "vertical", size: 0, children: _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["Asignado ", dayjs(task.assignedAt).fromNow()] }) }) }) })) }), pendingTasks.length > 5 && (_jsx("div", { style: { textAlign: 'center', marginTop: 8 }, children: _jsxs(Button, { type: "link", children: ["Ver todos (", pendingTasks.length, ")"] }) }))] }) }), _jsx(Col, { xs: 24, lg: 8, children: _jsx(Card, { title: "Ranking del Equipo Hoy", extra: _jsx(FireOutlined, { style: { color: '#ff4d4f' } }), children: _jsx(List, { dataSource: employeesData?.data?.slice(0, 5) || [], renderItem: (employee, index) => (_jsx(List.Item, { children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { style: {
                                                backgroundColor: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#f0f0f0'
                                            }, children: index + 1 }), title: _jsxs(Space, { children: [_jsxs(Text, { strong: employee.id === user.id, children: [employee.firstName, " ", employee.lastName] }), employee.id === user.id && _jsx(Tag, { color: "blue", children: "T\u00FA" })] }), description: _jsxs(Space, { children: [_jsxs(Text, { children: [employee.performance?.callsToday || 0, " llamadas"] }), _jsx(Text, { type: "secondary", children: "\u2022" }), _jsxs(Text, { type: "success", children: [employee.performance?.conversionsToday || 0, " ventas"] })] }) }) })) }) }) })] }), _jsx(Row, { gutter: [16, 16], style: { marginTop: 24 }, children: _jsx(Col, { xs: 24, children: _jsx(Card, { title: "Mi Rendimiento por Hora", children: _jsx(Line, { ...callPerformanceConfig, height: 300 }) }) }) }), _jsx(Row, { gutter: [16, 16], style: { marginTop: 24 }, children: _jsx(Col, { xs: 24, children: _jsx(Card, { title: "Acciones R\u00E1pidas", children: _jsxs(Space, { wrap: true, children: [_jsx(Button, { type: "primary", icon: _jsx(PhoneOutlined, {}), size: "large", children: "Registrar Llamada" }), _jsx(Button, { icon: _jsx(CheckCircleOutlined, {}), size: "large", children: "Marcar Tarea Completada" }), _jsx(Button, { icon: _jsx(UserOutlined, {}), size: "large", children: "Ver Mis Clientes" }), _jsx(Button, { icon: _jsx(TrophyOutlined, {}), size: "large", children: "Ver Mis Logros" })] }) }) }) })] }));
};
