import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Row, Col, Card, Space, Typography, Button, Tag, Alert, Switch, List, Statistic, Progress, Spin, } from "antd";
import { FileTextOutlined, PlusOutlined, DeleteOutlined, BranchesOutlined, TagOutlined, InfoCircleOutlined, LineChartOutlined, PercentageOutlined, } from "@ant-design/icons";
const { TextArea } = Input;
const { Text } = Typography;
export const ScriptEdit = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();
    const scriptData = queryResult?.data?.data;
    const [segments, setSegments] = useState([]);
    const [variables, setVariables] = useState([]);
    console.log("ScriptEdit - Estado actual:", {
        isLoading: queryResult?.isLoading,
        isError: queryResult?.isError,
        error: queryResult?.error,
        scriptData,
        segments,
        variables
    });
    useEffect(() => {
        if (scriptData) {
            console.log("ScriptEdit - Datos recibidos:", scriptData);
            setSegments(scriptData.segments || []);
            setVariables(scriptData.variables || []);
        }
    }, [scriptData]);
    const segmentTypes = [
        { value: "opening", label: "Apertura", color: "blue" },
        { value: "discovery", label: "Descubrimiento", color: "purple" },
        { value: "pitch", label: "Propuesta", color: "green" },
        { value: "close", label: "Cierre", color: "gold" },
        { value: "objection", label: "Manejo de objeción", color: "red" },
    ];
    const addSegment = () => {
        const newSegment = {
            id: `seg-${Date.now()}`,
            type: "discovery",
            content: "",
        };
        setSegments([...segments, newSegment]);
    };
    const removeSegment = (index) => {
        if (segments.length > 1) {
            setSegments(segments.filter((_, i) => i !== index));
        }
    };
    const updateSegment = (index, field, value) => {
        const updatedSegments = [...segments];
        updatedSegments[index] = { ...updatedSegments[index], [field]: value };
        setSegments(updatedSegments);
    };
    const extractVariables = (content) => {
        const regex = /\[([A-Z_]+)\]/g;
        const matches = content.match(regex);
        if (matches) {
            return matches.map((match) => match.slice(1, -1));
        }
        return [];
    };
    const updateVariables = () => {
        const allVariables = new Set();
        segments.forEach((segment) => {
            const vars = extractVariables(segment.content);
            vars.forEach((v) => allVariables.add(v));
        });
        setVariables(Array.from(allVariables));
    };
    // Mostrar loading mientras se cargan los datos
    if (queryResult?.isLoading) {
        return (_jsxs("div", { style: { textAlign: 'center', padding: '50px' }, children: [_jsx(Spin, { size: "large" }), _jsx("div", { style: { marginTop: 16 }, children: _jsx(Text, { children: "Cargando script..." }) })] }));
    }
    // Mostrar error si hay problemas
    if (queryResult?.isError) {
        return (_jsx(Alert, { message: "Error al cargar el script", description: _jsxs("div", { children: [_jsx("p", { children: "Ha ocurrido un error al cargar los datos del script." }), _jsxs("p", { children: [_jsx("strong", { children: "Error:" }), " ", queryResult.error?.message || "Error desconocido"] }), _jsxs("p", { children: [_jsx("strong", { children: "Detalles:" }), " ", JSON.stringify(queryResult.error, null, 2)] })] }), type: "error", showIcon: true, style: { margin: '20px' } }));
    }
    // Verificar que tengamos datos
    if (!scriptData) {
        return (_jsx(Alert, { message: "Script no encontrado", description: "No se pudieron cargar los datos del script. Por favor, verifica que el ID sea correcto.", type: "warning", showIcon: true, style: { margin: '20px' } }));
    }
    return (_jsx(Edit, { saveButtonProps: {
            ...saveButtonProps,
            onClick: (e) => {
                console.log("Guardando script con datos:", { segments, variables });
                // Añadir los segmentos y variables al formulario antes de enviar
                formProps.form?.setFieldsValue({
                    segments,
                    variables,
                });
                saveButtonProps.onClick?.(e);
            },
        }, children: _jsx(Form, { ...formProps, layout: "vertical", children: _jsxs(Row, { gutter: [16, 16], children: [scriptData.usageCount > 0 && (_jsx(Col, { span: 24, children: _jsx(Card, { title: "M\u00E9tricas de Rendimiento", bordered: false, children: _jsxs(Row, { gutter: 16, children: [_jsx(Col, { xs: 8, children: _jsx(Statistic, { title: "Uso total", value: scriptData.usageCount, prefix: _jsx(LineChartOutlined, {}), suffix: "veces" }) }), _jsx(Col, { xs: 8, children: _jsx(Statistic, { title: "Tasa de \u00E9xito", value: scriptData.successRate || 0, suffix: "%", prefix: _jsx(PercentageOutlined, {}), valueStyle: {
                                                color: (scriptData.successRate || 0) >= 15 ? "#3f8600" : "#cf1322",
                                            } }) }), _jsx(Col, { xs: 8, children: _jsx(Progress, { type: "dashboard", percent: scriptData.successRate || 0, format: (percent) => `${percent}%`, strokeColor: {
                                                "0%": "#ff4d4f",
                                                "50%": "#faad14",
                                                "100%": "#52c41a",
                                            } }) })] }) }) })), _jsx(Col, { span: 24, children: _jsxs(Card, { title: "Informaci\u00F3n B\u00E1sica", bordered: false, children: [_jsxs(Row, { gutter: 16, children: [_jsx(Col, { xs: 24, lg: 12, children: _jsx(Form.Item, { label: "Nombre del Script", name: "name", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { prefix: _jsx(FileTextOutlined, {}), placeholder: "Ej: Script de Renovaci\u00F3n Elite v2" }) }) }), _jsx(Col, { xs: 24, lg: 6, children: _jsx(Form.Item, { label: "Tipo", name: "type", rules: [{ required: true, message: "Selecciona un tipo" }], children: _jsxs(Select, { placeholder: "Seleccionar tipo", children: [_jsx(Select.Option, { value: "cold", children: _jsx(Tag, { color: "blue", children: "Llamada fr\u00EDa" }) }), _jsx(Select.Option, { value: "warm", children: _jsx(Tag, { color: "orange", children: "Llamada c\u00E1lida" }) }), _jsx(Select.Option, { value: "winback", children: _jsx(Tag, { color: "purple", children: "Recuperaci\u00F3n" }) }), _jsx(Select.Option, { value: "renewal", children: _jsx(Tag, { color: "green", children: "Renovaci\u00F3n" }) })] }) }) }), _jsx(Col, { xs: 24, lg: 6, children: _jsx(Form.Item, { label: "Versi\u00F3n", name: "version", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { placeholder: "1.0" }) }) })] }), _jsx(Form.Item, { label: "Estado", name: "status", children: _jsxs(Select, { children: [_jsx(Select.Option, { value: "draft", children: "Borrador" }), _jsx(Select.Option, { value: "active", children: "Activo" }), _jsx(Select.Option, { value: "archived", children: "Archivado" })] }) })] }) }), _jsx(Col, { span: 24, children: _jsxs(Card, { title: "Segmentos del Script", bordered: false, extra: _jsx(Button, { type: "primary", icon: _jsx(PlusOutlined, {}), onClick: addSegment, children: "A\u00F1adir segmento" }), children: [_jsx(Space, { direction: "vertical", style: { width: "100%" }, size: "large", children: segments.map((segment, index) => (_jsx(Card, { size: "small", title: _jsxs(Space, { children: [_jsx(Tag, { color: segmentTypes.find((t) => t.value === segment.type)?.color, children: segmentTypes.find((t) => t.value === segment.type)?.label }), _jsxs(Text, { children: ["Segmento ", index + 1] })] }), extra: segments.length > 1 && (_jsx(Button, { type: "text", danger: true, icon: _jsx(DeleteOutlined, {}), onClick: () => removeSegment(index) })), children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Form.Item, { label: "Tipo de segmento", children: _jsx(Select, { value: segment.type, onChange: (value) => updateSegment(index, "type", value), children: segmentTypes.map((type) => (_jsx(Select.Option, { value: type.value, children: _jsx(Tag, { color: type.color, children: type.label }) }, type.value))) }) }), _jsx(Form.Item, { label: "Contenido", children: _jsx(TextArea, { rows: 4, value: segment.content, onChange: (e) => updateSegment(index, "content", e.target.value), onBlur: updateVariables, placeholder: "Escribe el contenido del segmento. Usa [VARIABLE] para variables din\u00E1micas." }) }), _jsx(Form.Item, { label: "Condiciones (opcional)", children: _jsxs(Space, { children: [_jsxs(Select, { placeholder: "Nivel de cliente", style: { width: 150 }, value: segment.conditions?.customerTier, onChange: (value) => {
                                                                    const conditions = segment.conditions || {};
                                                                    updateSegment(index, "conditions", {
                                                                        ...conditions,
                                                                        customerTier: value,
                                                                    });
                                                                }, children: [_jsx(Select.Option, { value: ["gold"], children: "Solo Oro" }), _jsx(Select.Option, { value: ["silver"], children: "Solo Plata" }), _jsx(Select.Option, { value: ["bronze"], children: "Solo Bronce" }), _jsx(Select.Option, { value: ["gold", "silver"], children: "Oro y Plata" })] }), _jsx(Switch, { checked: segment.conditions?.hasSubscription, checkedChildren: "Con suscripci\u00F3n", unCheckedChildren: "Sin suscripci\u00F3n", onChange: (checked) => {
                                                                    const conditions = segment.conditions || {};
                                                                    updateSegment(index, "conditions", {
                                                                        ...conditions,
                                                                        hasSubscription: checked,
                                                                    });
                                                                } })] }) }), segment.branches && segment.branches.length > 0 && (_jsx(Form.Item, { label: "Ramificaciones", children: _jsx(List, { size: "small", dataSource: segment.branches, renderItem: (branch) => (_jsx(List.Item, { children: _jsxs(Space, { children: [_jsx(BranchesOutlined, {}), _jsxs(Text, { children: ["Si \"", branch.condition, "\" \u2192 Ir a ", branch.nextSegmentId] })] }) })) }) })), segment.type === "objection" && (_jsx(Alert, { message: "Consejo para objeciones", description: "Este segmento se activar\u00E1 cuando el agente marque una objeci\u00F3n espec\u00EDfica durante la llamada.", type: "info", showIcon: true }))] }) }, segment.id))) }), _jsx(Alert, { style: { marginTop: 16 }, message: "Variables detectadas", description: variables.length > 0 ? (_jsx(Space, { wrap: true, style: { marginTop: 8 }, children: variables.map((variable) => (_jsx(Tag, { icon: _jsx(TagOutlined, {}), children: variable }, variable))) })) : ("No se han detectado variables. Usa [NOMBRE_VARIABLE] en el contenido."), type: "info", showIcon: true, icon: _jsx(InfoCircleOutlined, {}) })] }) }), _jsx(Col, { span: 24, children: _jsx(Alert, { message: "Historial de cambios", description: _jsxs(Space, { direction: "vertical", children: [_jsxs(Text, { children: ["Creado por: ", scriptData.createdBy, " el", " ", scriptData.createdAt && new Date(scriptData.createdAt).toLocaleDateString()] }), _jsxs(Text, { children: ["\u00DAltima actualizaci\u00F3n:", " ", scriptData.updatedAt && new Date(scriptData.updatedAt).toLocaleDateString()] })] }), type: "info", showIcon: true }) }), _jsx(Form.Item, { name: "segments", hidden: true, children: _jsx(Input, {}) }), _jsx(Form.Item, { name: "variables", hidden: true, children: _jsx(Input, {}) })] }) }) }));
};
