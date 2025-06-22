import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useList, useGetIdentity } from "@refinedev/core";
import { Card, Table, Space, Typography, Tag, Avatar, Row, Col, Statistic, Progress, Tabs, Select, } from "antd";
import { TrophyOutlined, CrownOutlined, FireOutlined, TeamOutlined, DollarOutlined, PhoneOutlined, PercentageOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
export const LeaderboardPage = () => {
    const { data: identity } = useGetIdentity();
    const [selectedPeriod, setSelectedPeriod] = useState('daily');
    const [selectedStore, setSelectedStore] = useState('all');
    // Fetch employees
    const { data: employeesData } = useList({
        resource: "employees",
        filters: [{ field: "role", operator: "eq", value: "agent" }],
    });
    // Fetch sales
    const { data: salesData } = useList({
        resource: "sales",
        pagination: { pageSize: 1000 },
    });
    // Fetch calls
    const { data: callsData } = useList({
        resource: "calls",
        pagination: { pageSize: 1000 },
    });
    // Fetch daily goals
    const { data: goalsData } = useList({
        resource: "dailyGoals",
        filters: [
            { field: "date", operator: "eq", value: dayjs().format("YYYY-MM-DD") }
        ],
    });
    const employees = employeesData?.data || [];
    const sales = salesData?.data || [];
    const calls = callsData?.data || [];
    const goals = goalsData?.data || [];
    // Calculate rankings based on period
    const calculateRankings = () => {
        const now = dayjs();
        let startDate;
        switch (selectedPeriod) {
            case 'daily':
                startDate = now.startOf('day');
                break;
            case 'weekly':
                startDate = now.startOf('week');
                break;
            case 'monthly':
                startDate = now.startOf('month');
                break;
        }
        return employees.map(employee => {
            // Filter data by period
            const periodSales = sales.filter(s => s.userId === employee.id &&
                dayjs(s.createdAt).isAfter(startDate));
            const periodCalls = calls.filter(c => c.userId === employee.id &&
                dayjs(c.createdAt).isAfter(startDate));
            const completedCalls = periodCalls.filter(c => c.status === 'completed').length;
            const conversions = periodSales.length;
            const conversionRate = completedCalls > 0 ? (conversions / completedCalls) * 100 : 0;
            const totalRevenue = periodSales.reduce((sum, sale) => sum + sale.amount.total, 0);
            const totalCommission = periodSales.reduce((sum, sale) => sum + sale.commission.total, 0);
            // Get today's goal progress
            const todayGoal = goals.find(g => g.employeeId === employee.id);
            const goalProgress = todayGoal ? (todayGoal.completedCalls / todayGoal.targetCalls) * 100 : 0;
            return {
                ...employee,
                completedCalls,
                conversions,
                conversionRate,
                totalRevenue,
                totalCommission,
                goalProgress,
                score: conversions * 100 + completedCalls * 10 + conversionRate * 5, // Scoring algorithm
            };
        }).sort((a, b) => b.score - a.score);
    };
    const rankings = calculateRankings();
    // Get podium (top 3)
    const podium = rankings.slice(0, 3);
    // Get my rank
    const myRank = rankings.findIndex(r => r.id === identity?.id) + 1;
    const myStats = rankings.find(r => r.id === identity?.id);
    const columns = [
        {
            title: 'Rank',
            key: 'rank',
            width: 80,
            render: (_, __, index) => {
                const rank = index + 1;
                if (rank === 1)
                    return _jsx(Text, { style: { fontSize: 24 }, children: "\uD83E\uDD47" });
                if (rank === 2)
                    return _jsx(Text, { style: { fontSize: 24 }, children: "\uD83E\uDD48" });
                if (rank === 3)
                    return _jsx(Text, { style: { fontSize: 24 }, children: "\uD83E\uDD49" });
                return _jsx(Text, { strong: true, style: { fontSize: 18 }, children: rank });
            },
        },
        {
            title: 'Agente',
            key: 'agent',
            render: (record) => (_jsxs(Space, { children: [_jsx(Avatar, { src: record.avatar, icon: _jsx(TeamOutlined, {}) }), _jsxs("div", { children: [_jsxs(Text, { strong: record.id === identity?.id, children: [record.firstName, " ", record.lastName] }), record.id === identity?.id && _jsx(Tag, { color: "blue", style: { marginLeft: 8 }, children: "T\u00FA" })] })] })),
        },
        {
            title: 'Llamadas',
            dataIndex: 'completedCalls',
            key: 'calls',
            sorter: (a, b) => a.completedCalls - b.completedCalls,
            render: (value) => (_jsxs(Space, { children: [_jsx(PhoneOutlined, {}), _jsx(Text, { children: value })] })),
        },
        {
            title: 'Ventas',
            dataIndex: 'conversions',
            key: 'conversions',
            sorter: (a, b) => a.conversions - b.conversions,
            render: (value) => (_jsxs(Tag, { color: "green", children: [_jsx(TrophyOutlined, {}), " ", value] })),
        },
        {
            title: 'Tasa Conv.',
            dataIndex: 'conversionRate',
            key: 'conversionRate',
            sorter: (a, b) => a.conversionRate - b.conversionRate,
            render: (value) => (_jsxs(Space, { children: [_jsx(PercentageOutlined, {}), _jsxs(Text, { type: value > 20 ? 'success' : value > 15 ? 'warning' : 'danger', children: [value.toFixed(1), "%"] })] })),
        },
        {
            title: 'Ingresos',
            dataIndex: 'totalRevenue',
            key: 'revenue',
            sorter: (a, b) => a.totalRevenue - b.totalRevenue,
            render: (value) => (_jsxs(Space, { children: [_jsx(DollarOutlined, {}), _jsxs(Text, { children: ["$", value.toFixed(2)] })] })),
        },
        {
            title: 'Meta Diaria',
            key: 'dailyGoal',
            render: (record) => {
                if (selectedPeriod !== 'daily')
                    return '-';
                return (_jsx(Progress, { percent: record.goalProgress, size: "small", status: record.goalProgress >= 100 ? 'success' : 'active', format: (percent) => `${percent?.toFixed(0)}%` }));
            },
        },
        {
            title: 'Puntos',
            dataIndex: 'score',
            key: 'score',
            sorter: (a, b) => a.score - b.score,
            render: (value) => (_jsx(Text, { strong: true, style: { fontSize: 16, color: '#1890ff' }, children: value.toFixed(0) })),
        },
    ];
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsxs(Row, { justify: "space-between", align: "middle", style: { marginBottom: 24 }, children: [_jsxs(Col, { children: [_jsxs(Title, { level: 2, children: [_jsx(TrophyOutlined, {}), " Tabla de L\u00EDderes"] }), _jsx(Text, { type: "secondary", children: "Competencia y rankings del equipo" })] }), _jsx(Col, { children: _jsx(Space, { children: _jsxs(Select, { value: selectedPeriod, onChange: setSelectedPeriod, style: { width: 120 }, children: [_jsx(Option, { value: "daily", children: "Hoy" }), _jsx(Option, { value: "weekly", children: "Esta Semana" }), _jsx(Option, { value: "monthly", children: "Este Mes" })] }) }) })] }), myStats && (_jsx(Card, { style: { marginBottom: 24, borderColor: '#1890ff', borderWidth: 2 }, children: _jsxs(Row, { gutter: [24, 0], align: "middle", children: [_jsx(Col, { xs: 24, sm: 6, children: _jsxs("div", { style: { textAlign: 'center' }, children: [_jsxs(Title, { level: 1, style: { marginBottom: 0 }, children: ["#", myRank] }), _jsx(Text, { type: "secondary", children: "Tu posici\u00F3n" })] }) }), _jsx(Col, { xs: 24, sm: 18, children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 12, sm: 6, children: _jsx(Statistic, { title: "Llamadas", value: myStats.completedCalls, prefix: _jsx(PhoneOutlined, {}) }) }), _jsx(Col, { xs: 12, sm: 6, children: _jsx(Statistic, { title: "Ventas", value: myStats.conversions, prefix: _jsx(TrophyOutlined, {}), valueStyle: { color: '#52c41a' } }) }), _jsx(Col, { xs: 12, sm: 6, children: _jsx(Statistic, { title: "Conversi\u00F3n", value: myStats.conversionRate, suffix: "%", precision: 1, prefix: _jsx(PercentageOutlined, {}) }) }), _jsx(Col, { xs: 12, sm: 6, children: _jsx(Statistic, { title: "Puntos", value: myStats.score, prefix: _jsx(FireOutlined, {}), valueStyle: { color: '#fa8c16' } }) })] }) })] }) })), _jsxs(Row, { gutter: [16, 16], style: { marginBottom: 24 }, children: [_jsx(Col, { xs: 24, sm: 8, children: podium[1] && (_jsxs(Card, { style: {
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                                marginTop: 40,
                            }, children: [_jsx(Avatar, { size: 80, src: podium[1].avatar, icon: _jsx(TeamOutlined, {}) }), _jsx(Title, { level: 3, style: { marginTop: 16 }, children: "\uD83E\uDD48 2\u00B0 Lugar" }), _jsxs(Text, { strong: true, children: [podium[1].firstName, " ", podium[1].lastName] }), _jsx("br", {}), _jsxs(Text, { type: "secondary", children: [podium[1].conversions, " ventas"] }), _jsx("br", {}), _jsxs(Text, { style: { fontSize: 20, color: '#595959', fontWeight: 'bold' }, children: [podium[1].score.toFixed(0), " pts"] })] })) }), _jsx(Col, { xs: 24, sm: 8, children: podium[0] && (_jsxs(Card, { style: {
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, #fff3b8 0%, #ffd700 100%)',
                                border: '2px solid #ffd700',
                            }, children: [_jsx(CrownOutlined, { style: { fontSize: 48, color: '#faad14' } }), _jsx("br", {}), _jsx(Avatar, { size: 100, src: podium[0].avatar, icon: _jsx(TeamOutlined, {}) }), _jsx(Title, { level: 2, style: { marginTop: 16 }, children: "\uD83E\uDD47 1\u00B0 Lugar" }), _jsxs(Text, { strong: true, style: { fontSize: 18 }, children: [podium[0].firstName, " ", podium[0].lastName] }), _jsx("br", {}), _jsxs(Text, { type: "secondary", children: [podium[0].conversions, " ventas"] }), _jsx("br", {}), _jsxs(Text, { style: { fontSize: 24, color: '#faad14', fontWeight: 'bold' }, children: [podium[0].score.toFixed(0), " pts"] })] })) }), _jsx(Col, { xs: 24, sm: 8, children: podium[2] && (_jsxs(Card, { style: {
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, #ffebe0 0%, #cd7f32 100%)',
                                marginTop: 60,
                            }, children: [_jsx(Avatar, { size: 80, src: podium[2].avatar, icon: _jsx(TeamOutlined, {}) }), _jsx(Title, { level: 3, style: { marginTop: 16 }, children: "\uD83E\uDD49 3\u00B0 Lugar" }), _jsxs(Text, { strong: true, children: [podium[2].firstName, " ", podium[2].lastName] }), _jsx("br", {}), _jsxs(Text, { type: "secondary", children: [podium[2].conversions, " ventas"] }), _jsx("br", {}), _jsxs(Text, { style: { fontSize: 20, color: '#8b4513', fontWeight: 'bold' }, children: [podium[2].score.toFixed(0), " pts"] })] })) })] }), _jsx(Card, { title: "Ranking Completo", children: _jsx(Table, { dataSource: rankings, columns: columns, rowKey: "id", pagination: { pageSize: 10 }, rowClassName: (record) => record.id === identity?.id ? 'highlight-row' : '' }) }), _jsx("style", { children: `
        .highlight-row {
          background-color: #e6f7ff;
          font-weight: bold;
        }
      ` })] }));
};
