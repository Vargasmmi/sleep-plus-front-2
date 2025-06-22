import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, useTable } from "@refinedev/antd";
import { Table, Tag, Space, Typography, Badge, Avatar, Tooltip } from "antd";
import { TrophyOutlined, StarOutlined, FireOutlined, CrownOutlined, TeamOutlined, PhoneOutlined, DollarOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
const { Text } = Typography;
export const AchievementList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });
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
    const formatCriteria = (achievement) => {
        const { criteria } = achievement;
        let text = "";
        switch (criteria.type) {
            case "count":
                text = `${criteria.target} ${criteria.metric}`;
                break;
            case "percentage":
                text = `${criteria.target}% ${criteria.metric}`;
                break;
            case "streak":
                text = `${criteria.target} días consecutivos`;
                break;
            case "total":
                text = `${criteria.target} total`;
                break;
        }
        if (criteria.timeframe) {
            switch (criteria.timeframe) {
                case "day":
                    text += " en un día";
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
    return (_jsx(List, { children: _jsxs(Table, { ...tableProps, rowKey: "id", children: [_jsx(Table.Column, { title: "Logro", dataIndex: "name", render: (value, record) => (_jsxs(Space, { children: [_jsx(Avatar, { size: 40, style: {
                                    backgroundColor: getTierColor(record.tier),
                                    fontSize: 24,
                                }, children: record.icon }), _jsxs("div", { children: [_jsx(Text, { strong: true, children: value }), _jsx("br", {}), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: record.code })] })] })) }, "name"), _jsx(Table.Column, { title: "Descripci\u00F3n", dataIndex: "description", render: (value) => (_jsx(Text, { ellipsis: true, style: { maxWidth: 300 }, children: value })) }, "description"), _jsx(Table.Column, { title: "Categor\u00EDa", dataIndex: "category", render: (value) => (_jsx(Tag, { icon: getCategoryIcon(value), color: getCategoryColor(value), children: value === "sales"
                            ? "Ventas"
                            : value === "calls"
                                ? "Llamadas"
                                : value === "quality"
                                    ? "Calidad"
                                    : "Equipo" })) }, "category"), _jsx(Table.Column, { title: "Nivel", dataIndex: "tier", render: (value) => (_jsxs(Space, { children: [getTierIcon(value), _jsx(Tag, { color: value === "platinum"
                                    ? "default"
                                    : value === "gold"
                                        ? "gold"
                                        : value === "silver"
                                            ? "default"
                                            : "orange", children: value === "platinum"
                                    ? "Platino"
                                    : value === "gold"
                                        ? "Oro"
                                        : value === "silver"
                                            ? "Plata"
                                            : "Bronce" })] })) }, "tier"), _jsx(Table.Column, { title: "Criterio", render: (_, record) => (_jsx(Text, { children: formatCriteria(record) })) }, "criteria"), _jsx(Table.Column, { title: "Recompensas", dataIndex: "rewards", render: (rewards) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { children: [rewards.points, " puntos"] }), rewards.bonus && (_jsxs(Text, { type: "success", children: ["$", rewards.bonus, " bono"] })), rewards.badge && (_jsx(Badge, { status: "success", text: "Insignia" }))] })) }, "rewards"), _jsx(Table.Column, { title: "Desbloqueado por", dataIndex: "unlockedBy", render: (unlockedBy) => {
                        const count = unlockedBy.length;
                        if (count === 0) {
                            return _jsx(Text, { type: "secondary", children: "Nadie a\u00FAn" });
                        }
                        const recentUnlocks = unlockedBy
                            .sort((a, b) => dayjs(b.unlockedAt).diff(dayjs(a.unlockedAt)))
                            .slice(0, 3);
                        return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { children: [count, " empleado", count !== 1 ? "s" : ""] }), _jsx(Tooltip, { title: _jsx(Space, { direction: "vertical", size: 0, children: recentUnlocks.map((unlock) => (_jsx(Text, { style: { color: "white" }, children: dayjs(unlock.unlockedAt).format("DD/MM/YYYY") }, unlock.userId))) }), children: _jsx(Text, { type: "secondary", style: { fontSize: 12, cursor: "pointer" }, children: "Ver \u00FAltimos" }) })] }));
                    } }, "unlockedBy"), _jsx(Table.Column, { title: "Acciones", dataIndex: "actions", render: (_, record) => (_jsx("a", { href: `/achievements/show/${record.id}`, children: "Ver detalles" })) })] }) }));
};
