import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Show, DateField } from "@refinedev/antd";
import { Card, Descriptions, Space, Tag, Typography, Timeline, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useShow } from "@refinedev/core";
const { Title, Text, Paragraph } = Typography;
export const ActivityLogShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;
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
        };
        return colors[action] || "default";
    };
    const renderDetails = () => {
        if (!record?.details)
            return null;
        return (_jsxs(Card, { title: "Detalles de la Actividad", style: { marginTop: 16 }, children: [record.action === "login" && (_jsxs(Descriptions, { column: 1, children: [record.details.userAgent && (_jsx(Descriptions.Item, { label: "Navegador", children: _jsx(Text, { children: record.details.userAgent }) })), record.details.ip && (_jsx(Descriptions.Item, { label: "Direcci\u00F3n IP", children: _jsx(Text, { code: true, children: record.details.ip }) })), record.details.location && (_jsx(Descriptions.Item, { label: "Ubicaci\u00F3n", children: _jsx(Text, { children: record.details.location }) }))] })), record.action === "update" && record.details.changes && (_jsxs(_Fragment, { children: [_jsx(Title, { level: 5, children: "Cambios Realizados" }), _jsx(Timeline, { children: Object.entries(record.details.changes).map(([field, change]) => (_jsx(Timeline.Item, { children: _jsxs(Space, { direction: "vertical", children: [_jsx(Text, { strong: true, children: field }), _jsxs(Space, { children: [_jsx(Tag, { color: "red", children: change.from || "vacío" }), _jsx(Text, { children: "\u2192" }), _jsx(Tag, { color: "green", children: change.to || "vacío" })] })] }) }, field))) })] })), record.action === "create" && record.details.data && (_jsxs(_Fragment, { children: [_jsx(Title, { level: 5, children: "Datos Creados" }), _jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4 }, children: JSON.stringify(record.details.data, null, 2) })] })), record.action === "delete" && record.details.deletedData && (_jsxs(_Fragment, { children: [_jsx(Title, { level: 5, children: "Datos Eliminados" }), _jsx("pre", { style: { background: "#fff1f0", padding: 16, borderRadius: 4 }, children: JSON.stringify(record.details.deletedData, null, 2) })] }))] }));
    };
    const renderMetadata = () => {
        if (!record?.metadata || Object.keys(record.metadata).length === 0)
            return null;
        return (_jsx(Card, { title: "Metadata Adicional", style: { marginTop: 16 }, children: _jsx("pre", { style: { background: "#f5f5f5", padding: 16, borderRadius: 4 }, children: JSON.stringify(record.metadata, null, 2) }) }));
    };
    return (_jsx(Show, { isLoading: isLoading, title: "Detalle de Actividad", children: record && (_jsxs(_Fragment, { children: [_jsx(Card, { children: _jsxs(Descriptions, { column: 2, bordered: true, children: [_jsx(Descriptions.Item, { label: "ID", children: _jsx(Text, { code: true, children: record.id }) }), _jsx(Descriptions.Item, { label: "Fecha y Hora", children: _jsx(DateField, { value: record.timestamp, format: "DD/MM/YYYY HH:mm:ss" }) }), _jsx(Descriptions.Item, { label: "Usuario", children: _jsxs(Space, { children: [_jsx(UserOutlined, {}), _jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { strong: true, children: record.userName }), _jsx(Text, { type: "secondary", children: record.userEmail })] })] }) }), _jsx(Descriptions.Item, { label: "ID de Usuario", children: _jsx(Text, { code: true, children: record.userId }) }), _jsx(Descriptions.Item, { label: "Acci\u00F3n", children: _jsx(Tag, { color: getActionColor(record.action), style: { fontSize: 14 }, children: record.action.toUpperCase() }) }), _jsx(Descriptions.Item, { label: "Recurso", children: _jsx(Badge, { status: "processing", text: record.resource }) }), record.resourceId && (_jsx(Descriptions.Item, { label: "ID del Recurso", span: 2, children: _jsx(Text, { code: true, children: record.resourceId }) }))] }) }), renderDetails(), renderMetadata()] })) }));
};
