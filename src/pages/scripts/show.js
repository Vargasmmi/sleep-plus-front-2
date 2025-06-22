import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Show } from "@refinedev/antd";
import { useShow, useOne } from "@refinedev/core";
import { Typography, Row, Col, Card, Tag, Space, Statistic, Progress, Alert, List, Collapse, Descriptions, Button, } from "antd";
import { FileTextOutlined, LineChartOutlined, PercentageOutlined, TagOutlined, BranchesOutlined, CheckCircleOutlined, EditOutlined, FolderOpenOutlined, CopyOutlined, PlayCircleOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;
export const ScriptShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const script = data?.data;
    const { data: creatorData } = useOne({
        resource: "employees",
        id: script?.createdBy || "",
        queryOptions: {
            enabled: !!script?.createdBy,
        },
    });
    const creator = creatorData?.data;
    if (isLoading || !script) {
        return _jsx("div", { children: "Cargando..." });
    }
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
    const segmentTypes = [
        { value: "opening", label: "Apertura", color: "blue" },
        { value: "discovery", label: "Descubrimiento", color: "purple" },
        { value: "pitch", label: "Propuesta", color: "green" },
        { value: "close", label: "Cierre", color: "gold" },
        { value: "objection", label: "Manejo de objeción", color: "red" },
    ];
    const getSegmentTypeInfo = (type) => {
        return segmentTypes.find((t) => t.value === type) || { label: type, color: "default" };
    };
    return (_jsx(Show, { children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { span: 24, children: _jsx(Card, { children: _jsxs(Space, { align: "start", style: { width: "100%", justifyContent: "space-between" }, children: [_jsxs(Space, { align: "start", children: [_jsx(FileTextOutlined, { style: { fontSize: 24 } }), _jsxs("div", { children: [_jsx(Title, { level: 3, style: { margin: 0 }, children: script.name }), _jsxs(Space, { style: { marginTop: 8 }, children: [_jsx(Tag, { color: getTypeColor(script.type), children: script.type === "cold"
                                                                ? "Llamada fría"
                                                                : script.type === "warm"
                                                                    ? "Llamada cálida"
                                                                    : script.type === "winback"
                                                                        ? "Recuperación"
                                                                        : "Renovación" }), _jsx(Tag, { icon: getStatusIcon(script.status), color: getStatusColor(script.status), children: script.status === "active"
                                                                ? "Activo"
                                                                : script.status === "draft"
                                                                    ? "Borrador"
                                                                    : "Archivado" }), _jsxs(Text, { children: ["Versi\u00F3n ", script.version] })] })] })] }), script.status !== "archived" && (_jsx(Button, { type: "primary", href: `/scripts/edit/${script.id}`, children: "Editar Script" }))] }) }) }), _jsxs(Col, { xs: 24, lg: 16, children: [script.usageCount > 0 && (_jsxs(Card, { title: "M\u00E9tricas de Rendimiento", children: [_jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 8, children: _jsx(Statistic, { title: "Uso total", value: script.usageCount, prefix: _jsx(LineChartOutlined, {}), suffix: "veces" }) }), _jsx(Col, { xs: 8, children: _jsx(Statistic, { title: "Tasa de \u00E9xito", value: script.successRate || 0, suffix: "%", prefix: _jsx(PercentageOutlined, {}), valueStyle: {
                                                    color: (script.successRate || 0) >= 15 ? "#3f8600" : "#cf1322",
                                                } }) }), _jsx(Col, { xs: 8, children: _jsx(Progress, { type: "dashboard", percent: script.successRate || 0, format: (percent) => `${percent}%`, strokeColor: {
                                                    "0%": "#ff4d4f",
                                                    "50%": "#faad14",
                                                    "100%": "#52c41a",
                                                } }) })] }), script.successRate && script.successRate < 15 && (_jsx(Alert, { style: { marginTop: 16 }, message: "Rendimiento bajo", description: "Este script tiene una tasa de \u00E9xito menor al 15%. Considera revisar el contenido o las condiciones de uso.", type: "warning", showIcon: true }))] })), _jsx(Card, { title: "Contenido del Script", style: { marginTop: 16 }, children: _jsx(Collapse, { defaultActiveKey: ["0"], children: (script.segments || []).map((segment, index) => {
                                    const segmentInfo = getSegmentTypeInfo(segment.type);
                                    return (_jsx(Panel, { header: _jsxs(Space, { children: [_jsx(Tag, { color: segmentInfo.color, children: segmentInfo.label }), _jsxs(Text, { children: ["Segmento ", index + 1] }), segment.conditions && (_jsx(Tag, { icon: _jsx(BranchesOutlined, {}), children: "Con condiciones" }))] }), children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Paragraph, { copyable: {
                                                        icon: [_jsx(CopyOutlined, {}), _jsx(CheckCircleOutlined, {})],
                                                        tooltips: ["Copiar texto", "¡Copiado!"],
                                                    }, children: segment.content }), segment.conditions && (_jsx(Alert, { message: "Condiciones de activaci\u00F3n", description: _jsxs(Space, { direction: "vertical", children: [segment.conditions?.customerTier && (_jsxs("div", { children: [_jsx(Text, { strong: true, children: "Niveles de cliente: " }), (segment.conditions.customerTier || []).map((tier) => (_jsx(Tag, { color: tier === "gold" ? "gold" : tier === "silver" ? "silver" : "bronze", children: tier === "gold" ? "Oro" : tier === "silver" ? "Plata" : "Bronce" }, tier)))] })), segment.conditions.hasSubscription !== undefined && (_jsxs("div", { children: [_jsx(Text, { strong: true, children: "Suscripci\u00F3n: " }), _jsx(Tag, { color: segment.conditions.hasSubscription ? "green" : "red", children: segment.conditions.hasSubscription ? "Requerida" : "No requerida" })] })), segment.conditions.productAge && (_jsxs("div", { children: [_jsx(Text, { strong: true, children: "Edad del producto: " }), segment.conditions.productAge.min, " - ", segment.conditions.productAge.max, " meses"] }))] }), type: "info", showIcon: true })), segment.branches && segment.branches.length > 0 && (_jsx(Alert, { message: "Ramificaciones", description: _jsx(List, { size: "small", dataSource: segment.branches, renderItem: (branch) => (_jsx(List.Item, { children: _jsxs(Space, { children: [_jsx(BranchesOutlined, {}), _jsxs(Text, { children: ["Si la respuesta es ", _jsx(Tag, { children: branch.condition }), " \u2192 Ir al segmento ", _jsx(Tag, { children: branch.nextSegmentId })] })] }) })) }), type: "warning", showIcon: true }))] }) }, segment.id));
                                }) }) })] }), _jsxs(Col, { xs: 24, lg: 8, children: [_jsxs(Card, { title: "Variables Din\u00E1micas", children: [(script.variables || []).length > 0 ? (_jsx(Space, { wrap: true, children: (script.variables || []).map((variable) => (_jsx(Tag, { icon: _jsx(TagOutlined, {}), color: "blue", children: variable }, variable))) })) : (_jsx(Text, { type: "secondary", children: "Este script no usa variables din\u00E1micas" })), _jsx(Alert, { style: { marginTop: 16 }, message: "Uso de variables", description: "Las variables se reemplazan autom\u00E1ticamente con la informaci\u00F3n del cliente durante la llamada.", type: "info", showIcon: true })] }), _jsx(Card, { title: "Informaci\u00F3n", style: { marginTop: 16 }, children: _jsxs(Descriptions, { column: 1, children: [_jsx(Descriptions.Item, { label: "ID", children: _jsx(Text, { copyable: true, children: script.id }) }), _jsx(Descriptions.Item, { label: "Creado por", children: creator ? (_jsxs("a", { href: `/employees/show/${creator.id}`, children: [creator.firstName, " ", creator.lastName] })) : (script.createdBy) }), _jsx(Descriptions.Item, { label: "Fecha de creaci\u00F3n", children: dayjs(script.createdAt).format("DD/MM/YYYY HH:mm") }), _jsx(Descriptions.Item, { label: "\u00DAltima actualizaci\u00F3n", children: dayjs(script.updatedAt).format("DD/MM/YYYY HH:mm") })] }) }), _jsx(Card, { title: "Acciones", style: { marginTop: 16 }, children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Button, { block: true, icon: _jsx(PlayCircleOutlined, {}), onClick: () => alert("Función de prueba no implementada"), children: "Probar script" }), _jsx(Button, { block: true, icon: _jsx(CopyOutlined, {}), onClick: () => alert("Script copiado al portapapeles"), children: "Copiar script completo" }), script.status === "active" && (_jsx(Button, { block: true, danger: true, onClick: () => alert("Función de archivado no implementada"), children: "Archivar script" }))] }) }), _jsx(Alert, { style: { marginTop: 16 }, message: "Consejos de uso", description: _jsx(List, { size: "small", dataSource: [
                                    "Lee el script de forma natural, no robotizada",
                                    "Personaliza las variables con la información del cliente",
                                    "Escucha activamente y adapta el flujo según las respuestas",
                                    "Toma notas de las objeciones para mejorar el script",
                                ], renderItem: (item) => (_jsx(List.Item, { children: _jsx(Text, { children: item }) })) }), type: "success", showIcon: true })] })] }) }));
};
