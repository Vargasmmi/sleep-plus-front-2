import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, useTable, ShowButton, EditButton, CreateButton } from "@refinedev/antd";
import { Table, Tag, Space, Typography, Badge, Progress, Tooltip } from "antd";
import { FileTextOutlined, UserOutlined, PercentageOutlined, LineChartOutlined, CheckCircleOutlined, EditOutlined, FolderOpenOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// Configurar dayjs
dayjs.extend(relativeTime);
const { Text } = Typography;
export const ScriptList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
        sorters: {
            initial: [
                {
                    field: "updatedAt",
                    order: "desc",
                },
            ],
        },
    });
    const getTypeColor = (type) => {
        switch (type) {
            case "cold":
                return "blue";
            case "warm":
                return "orange";
            case "winback":
                return "purple";
            case "renewal":
                return "green";
            default:
                return "default";
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "success";
            case "draft":
                return "warning";
            case "archived":
                return "default";
            default:
                return "default";
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case "active":
                return _jsx(CheckCircleOutlined, {});
            case "draft":
                return _jsx(EditOutlined, {});
            case "archived":
                return _jsx(FolderOpenOutlined, {});
            default:
                return null;
        }
    };
    return (_jsx(List, { headerButtons: _jsx(CreateButton, { type: "primary", icon: _jsx(FileTextOutlined, {}), children: "Nuevo Script" }), children: _jsxs(Table, { ...tableProps, rowKey: "id", children: [_jsx(Table.Column, { title: "Script", dataIndex: "name", render: (value, record) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Space, { children: [_jsx(FileTextOutlined, {}), _jsx(Text, { strong: true, children: value })] }), _jsxs(Space, { children: [_jsx(Tag, { color: getTypeColor(record.type), children: record.type === "cold"
                                            ? "Llamada fría"
                                            : record.type === "warm"
                                                ? "Llamada cálida"
                                                : record.type === "winback"
                                                    ? "Recuperación"
                                                    : "Renovación" }), _jsxs(Text, { type: "secondary", children: ["v", record.version] })] })] })) }, "name"), _jsx(Table.Column, { title: "Estado", dataIndex: "status", render: (value) => (_jsx(Tag, { icon: getStatusIcon(value), color: getStatusColor(value), children: value === "active"
                            ? "Activo"
                            : value === "draft"
                                ? "Borrador"
                                : "Archivado" })) }, "status"), _jsx(Table.Column, { title: "Rendimiento", render: (_, record) => {
                        if (!record.successRate || record.usageCount === 0) {
                            return _jsx(Text, { type: "secondary", children: "Sin datos" });
                        }
                        return (_jsxs(Space, { direction: "vertical", size: 0, style: { width: 120 }, children: [_jsxs(Space, { children: [_jsx(PercentageOutlined, {}), _jsxs(Text, { children: [record.successRate, "% \u00E9xito"] })] }), _jsx(Progress, { percent: record.successRate, size: "small", showInfo: false, strokeColor: record.successRate >= 20
                                        ? "#52c41a"
                                        : record.successRate >= 15
                                            ? "#faad14"
                                            : "#f5222d" })] }));
                    } }, "performance"), _jsx(Table.Column, { title: "Uso", dataIndex: "usageCount", render: (value) => (_jsxs(Space, { children: [_jsx(LineChartOutlined, {}), _jsxs(Text, { children: [value.toLocaleString(), " veces"] })] })), sorter: true }, "usageCount"), _jsx(Table.Column, { title: "Segmentos", dataIndex: "segments", render: (segments) => (_jsx(Badge, { count: segments.length, style: { backgroundColor: "#1890ff" }, children: _jsxs(Text, { children: [segments.length, " segmentos"] }) })) }, "segments"), _jsx(Table.Column, { title: "Variables", dataIndex: "variables", render: (variables) => (_jsx(Tooltip, { title: _jsx(Space, { direction: "vertical", size: 0, children: variables.map((v) => (_jsxs(Text, { style: { color: "white" }, children: ["[", v, "]"] }, v))) }), children: _jsxs(Text, { style: { cursor: "pointer" }, children: [variables.length, " variable", variables.length !== 1 ? "s" : ""] }) })) }, "variables"), _jsx(Table.Column, { title: "Creado por", dataIndex: "createdBy", render: (value) => (_jsxs(Space, { children: [_jsx(UserOutlined, {}), _jsx(Text, { children: value })] })) }, "createdBy"), _jsx(Table.Column, { title: "\u00DAltima actualizaci\u00F3n", dataIndex: "updatedAt", render: (value) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { children: dayjs(value).format("DD/MM/YYYY") }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: dayjs(value).fromNow() })] })), sorter: true }, "updatedAt"), _jsx(Table.Column, { title: "Acciones", dataIndex: "actions", fixed: "right", render: (_, record) => (_jsxs(Space, { children: [_jsx(ShowButton, { hideText: true, size: "small", recordItemId: record.id }), record.status !== "archived" && (_jsx(EditButton, { hideText: true, size: "small", recordItemId: record.id }))] })) })] }) }));
};
