import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Show } from "@refinedev/antd";
import { useShow, useMany } from "@refinedev/core";
import { Typography, Row, Col, Card, Tag, Space, Avatar, List, Statistic, Progress, Empty, Badge, } from "antd";
import { TrophyOutlined, StarOutlined, FireOutlined, CrownOutlined, TeamOutlined, PhoneOutlined, DollarOutlined, UserOutlined, CalendarOutlined, GiftOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const { Title, Text, Paragraph } = Typography;
export const AchievementShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const achievement = data?.data;
    const userIds = achievement?.unlockedBy.map((u) => u.userId) || [];
    const { data: employeesData } = useMany({
        resource: "employees",
        ids: userIds,
        queryOptions: {
            enabled: userIds.length > 0,
        },
    });
    const employees = employeesData?.data || [];
    if (isLoading || !achievement) {
        return _jsx("div", { children: "Cargando..." });
    }
    const getCategoryIcon = (category) => {
        switch (category) {
            case "sales":
                return _jsx(DollarOutlined, {});
            case "calls":
                return _jsx(PhoneOutlined, {});
            case "quality":
                return _jsx(StarOutlined, {});
            case "team":
                return _jsx(TeamOutlined, {});
            default:
                return _jsx(TrophyOutlined, {});
        }
    };
    const getCategoryColor = (category) => {
        switch (category) {
            case "sales":
                return "green";
            case "calls":
                return "blue";
            case "quality":
                return "gold";
            case "team":
                return "purple";
            default:
                return "default";
        }
    };
    const getTierIcon = (tier) => {
        switch (tier) {
            case "platinum":
                return _jsx(CrownOutlined, { style: { color: "#e5e4e2" } });
            case "gold":
                return _jsx(TrophyOutlined, { style: { color: "#ffd700" } });
            case "silver":
                return _jsx(StarOutlined, { style: { color: "#c0c0c0" } });
            case "bronze":
                return _jsx(FireOutlined, { style: { color: "#cd7f32" } });
            default:
                return _jsx(TrophyOutlined, {});
        }
    };
    const getTierColor = (tier) => {
        switch (tier) {
            case "platinum":
                return "#e5e4e2";
            case "gold":
                return "#ffd700";
            case "silver":
                return "#c0c0c0";
            case "bronze":
                return "#cd7f32";
            default:
                return "#d9d9d9";
        }
    };
    const formatCriteria = () => {
        const { criteria } = achievement;
        let text = "";
        switch (criteria.type) {
            case "count":
                text = `Alcanzar ${criteria.target} ${criteria.metric}`;
                break;
            case "percentage":
                text = `Lograr ${criteria.target}% en ${criteria.metric}`;
                break;
            case "streak":
                text = `Mantener ${criteria.target} días consecutivos de ${criteria.metric}`;
                break;
            case "total":
                text = `Acumular ${criteria.target} ${criteria.metric} en total`;
                break;
        }
        if (criteria.timeframe) {
            switch (criteria.timeframe) {
                case "day":
                    text += " en un solo día";
                    break;
                case "week":
                    text += " en una semana";
                    break;
                case "month":
                    text += " en un mes";
                    break;
                case "all_time":
                    text += " de todos los tiempos";
                    break;
            }
        }
        return text;
    };
    const completionRate = (achievement.unlockedBy.length / 10) * 100; // Asumiendo 10 empleados totales
    return (_jsx(Show, { children: _jsxs(Row, { gutter: [16, 16], children: [_jsxs(Col, { xs: 24, lg: 16, children: [_jsx(Card, { children: _jsxs(Space, { align: "start", size: "large", children: [_jsx(Avatar, { size: 80, style: {
                                            backgroundColor: getTierColor(achievement.tier),
                                            fontSize: 48,
                                        }, children: achievement.icon }), _jsxs("div", { style: { flex: 1 }, children: [_jsxs(Space, { children: [_jsx(Title, { level: 2, style: { margin: 0 }, children: achievement.name }), getTierIcon(achievement.tier)] }), _jsxs(Space, { style: { marginTop: 8 }, children: [_jsx(Tag, { icon: getCategoryIcon(achievement.category), color: getCategoryColor(achievement.category), children: achievement.category === "sales"
                                                            ? "Ventas"
                                                            : achievement.category === "calls"
                                                                ? "Llamadas"
                                                                : achievement.category === "quality"
                                                                    ? "Calidad"
                                                                    : "Equipo" }), _jsx(Tag, { color: achievement.tier === "platinum"
                                                            ? "default"
                                                            : achievement.tier === "gold"
                                                                ? "gold"
                                                                : achievement.tier === "silver"
                                                                    ? "default"
                                                                    : "orange", children: achievement.tier === "platinum"
                                                            ? "Platino"
                                                            : achievement.tier === "gold"
                                                                ? "Oro"
                                                                : achievement.tier === "silver"
                                                                    ? "Plata"
                                                                    : "Bronce" })] }), _jsx(Paragraph, { style: { marginTop: 16 }, children: achievement.description })] })] }) }), _jsx(Card, { title: "Criterio de Obtenci\u00F3n", style: { marginTop: 16 }, children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Text, { strong: true, style: { fontSize: 16 }, children: formatCriteria() }), _jsxs("div", { style: { marginTop: 16 }, children: [_jsx(Text, { children: "Tipo de criterio: " }), _jsx(Tag, { children: achievement.criteria.type === "count"
                                                    ? "Conteo"
                                                    : achievement.criteria.type === "percentage"
                                                        ? "Porcentaje"
                                                        : achievement.criteria.type === "streak"
                                                            ? "Racha"
                                                            : "Total acumulado" })] }), _jsxs("div", { children: [_jsx(Text, { children: "M\u00E9trica: " }), _jsx(Text, { strong: true, children: achievement.criteria.metric })] }), _jsxs("div", { children: [_jsx(Text, { children: "Objetivo: " }), _jsx(Text, { strong: true, children: achievement.criteria.target })] }), achievement.criteria.timeframe && (_jsxs("div", { children: [_jsx(Text, { children: "Per\u00EDodo: " }), _jsx(Tag, { children: achievement.criteria.timeframe === "day"
                                                    ? "Diario"
                                                    : achievement.criteria.timeframe === "week"
                                                        ? "Semanal"
                                                        : achievement.criteria.timeframe === "month"
                                                            ? "Mensual"
                                                            : "Todo el tiempo" })] }))] }) }), _jsx(Card, { title: "Empleados que lo han Desbloqueado", style: { marginTop: 16 }, children: achievement.unlockedBy.length > 0 ? (_jsx(List, { dataSource: achievement.unlockedBy.sort((a, b) => dayjs(b.unlockedAt).diff(dayjs(a.unlockedAt))), renderItem: (unlock) => {
                                    const employee = employees.find((e) => e.id === unlock.userId);
                                    return (_jsx(List.Item, { children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { icon: _jsx(UserOutlined, {}) }), title: employee ? (_jsxs("a", { href: `/employees/show/${employee.id}`, children: [employee.firstName, " ", employee.lastName] })) : (unlock.userId), description: _jsxs(Space, { children: [_jsx(CalendarOutlined, {}), _jsx(Text, { type: "secondary", children: dayjs(unlock.unlockedAt).format("DD/MM/YYYY HH:mm") }), _jsxs(Text, { type: "secondary", children: ["(", dayjs(unlock.unlockedAt).fromNow(), ")"] })] }) }) }));
                                } })) : (_jsx(Empty, { description: "Nadie ha desbloqueado este logro a\u00FAn" })) })] }), _jsxs(Col, { xs: 24, lg: 8, children: [_jsx(Card, { title: "Recompensas", children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, size: "large", children: [_jsxs("div", { children: [_jsxs(Space, { children: [_jsx(GiftOutlined, { style: { fontSize: 24, color: "#1890ff" } }), _jsx(Text, { strong: true, style: { fontSize: 16 }, children: "Puntos" })] }), _jsx(Statistic, { value: achievement.rewards.points, suffix: "puntos", style: { marginTop: 8 } })] }), achievement.rewards.bonus && (_jsxs("div", { children: [_jsxs(Space, { children: [_jsx(DollarOutlined, { style: { fontSize: 24, color: "#52c41a" } }), _jsx(Text, { strong: true, style: { fontSize: 16 }, children: "Bono en efectivo" })] }), _jsx(Statistic, { value: achievement.rewards.bonus, prefix: "$", precision: 2, valueStyle: { color: "#52c41a" }, style: { marginTop: 8 } })] })), achievement.rewards.badge && (_jsxs("div", { children: [_jsx(Space, { children: _jsx(Badge, { status: "success", text: _jsx(Text, { strong: true, style: { fontSize: 16 }, children: "Insignia especial" }) }) }), _jsx(Text, { type: "secondary", style: { display: "block", marginTop: 8 }, children: "Este logro otorga una insignia especial en el perfil" })] }))] }) }), _jsx(Card, { title: "Estad\u00EDsticas", style: { marginTop: 16 }, children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Statistic, { title: "Total de ganadores", value: achievement.unlockedBy.length, prefix: _jsx(UserOutlined, {}) }), _jsxs("div", { style: { marginTop: 16 }, children: [_jsx(Text, { children: "Tasa de obtenci\u00F3n" }), _jsx(Progress, { percent: completionRate, format: (percent) => `${percent?.toFixed(1)}%` })] }), achievement.unlockedBy.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Statistic, { title: "\u00DAltimo desbloqueado", value: dayjs(achievement.unlockedBy.sort((a, b) => dayjs(b.unlockedAt).diff(dayjs(a.unlockedAt)))[0].unlockedAt).fromNow(), valueStyle: { fontSize: 14 } }), _jsx(Statistic, { title: "Primer desbloqueado", value: dayjs(achievement.unlockedBy.sort((a, b) => dayjs(a.unlockedAt).diff(dayjs(b.unlockedAt)))[0].unlockedAt).format("DD/MM/YYYY"), valueStyle: { fontSize: 14 } })] }))] }) }), _jsx(Card, { title: "Informaci\u00F3n", style: { marginTop: 16 }, children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsxs("div", { children: [_jsx(Text, { type: "secondary", children: "C\u00F3digo:" }), _jsx("br", {}), _jsx(Text, { strong: true, children: achievement.code })] }), _jsxs("div", { children: [_jsx(Text, { type: "secondary", children: "ID:" }), _jsx("br", {}), _jsx(Text, { copyable: true, children: achievement.id })] }), _jsxs("div", { children: [_jsx(Text, { type: "secondary", children: "Creado:" }), _jsx("br", {}), _jsx(Text, { children: dayjs(achievement.createdAt).format("DD/MM/YYYY") })] })] }) })] })] }) }));
};
