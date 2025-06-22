import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, Row, Col, Card, Space, Typography, Button, Tag, Alert, Switch, List, } from "antd";
import { FileTextOutlined, PlusOutlined, DeleteOutlined, TagOutlined, InfoCircleOutlined, } from "@ant-design/icons";
const { TextArea } = Input;
const { Text } = Typography;
export const ScriptCreate = () => {
    const { formProps, saveButtonProps } = useForm();
    const [segments, setSegments] = useState([
        {
            id: "seg-1",
            type: "opening",
            content: "",
        },
    ]);
    const [variables, setVariables] = useState([]);
    const segmentTypes = [
        { value: "opening", label: "Apertura", color: "blue" },
        { value: "discovery", label: "Descubrimiento", color: "purple" },
        { value: "pitch", label: "Propuesta", color: "green" },
        { value: "close", label: "Cierre", color: "gold" },
        { value: "objection", label: "Manejo de objeción", color: "red" },
    ];
    const addSegment = () => {
        const newSegment = {
            id: `seg-${segments.length + 1}`,
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
    return (_jsx(Create, { saveButtonProps: {
            ...saveButtonProps,
            onClick: (e) => {
                // Añadir los segmentos y variables al formulario antes de enviar
                formProps.form?.setFieldsValue({
                    segments,
                    variables,
                });
                saveButtonProps.onClick?.(e);
            },
        }, children: _jsx(Form, { ...formProps, layout: "vertical", children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { span: 24, children: _jsxs(Card, { title: "Informaci\u00F3n B\u00E1sica", bordered: false, children: [_jsxs(Row, { gutter: 16, children: [_jsx(Col, { xs: 24, lg: 12, children: _jsx(Form.Item, { label: "Nombre del Script", name: "name", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { prefix: _jsx(FileTextOutlined, {}), placeholder: "Ej: Script de Renovaci\u00F3n Elite v2" }) }) }), _jsx(Col, { xs: 24, lg: 6, children: _jsx(Form.Item, { label: "Tipo", name: "type", rules: [{ required: true, message: "Selecciona un tipo" }], children: _jsxs(Select, { placeholder: "Seleccionar tipo", children: [_jsx(Select.Option, { value: "cold", children: _jsx(Tag, { color: "blue", children: "Llamada fr\u00EDa" }) }), _jsx(Select.Option, { value: "warm", children: _jsx(Tag, { color: "orange", children: "Llamada c\u00E1lida" }) }), _jsx(Select.Option, { value: "winback", children: _jsx(Tag, { color: "purple", children: "Recuperaci\u00F3n" }) }), _jsx(Select.Option, { value: "renewal", children: _jsx(Tag, { color: "green", children: "Renovaci\u00F3n" }) })] }) }) }), _jsx(Col, { xs: 24, lg: 6, children: _jsx(Form.Item, { label: "Versi\u00F3n", name: "version", rules: [{ required: true, message: "Este campo es requerido" }], initialValue: "1.0", children: _jsx(Input, { placeholder: "1.0" }) }) })] }), _jsx(Form.Item, { label: "Estado inicial", name: "status", initialValue: "draft", children: _jsxs(Select, { children: [_jsx(Select.Option, { value: "draft", children: "Borrador" }), _jsx(Select.Option, { value: "active", children: "Activo" })] }) })] }) }), _jsx(Col, { span: 24, children: _jsxs(Card, { title: "Segmentos del Script", bordered: false, extra: _jsx(Button, { type: "primary", icon: _jsx(PlusOutlined, {}), onClick: addSegment, children: "A\u00F1adir segmento" }), children: [_jsx(Space, { direction: "vertical", style: { width: "100%" }, size: "large", children: segments.map((segment, index) => (_jsx(Card, { size: "small", title: _jsxs(Space, { children: [_jsx(Tag, { color: segmentTypes.find((t) => t.value === segment.type)?.color, children: segmentTypes.find((t) => t.value === segment.type)?.label }), _jsxs(Text, { children: ["Segmento ", index + 1] })] }), extra: segments.length > 1 && (_jsx(Button, { type: "text", danger: true, icon: _jsx(DeleteOutlined, {}), onClick: () => removeSegment(index) })), children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Form.Item, { label: "Tipo de segmento", children: _jsx(Select, { value: segment.type, onChange: (value) => updateSegment(index, "type", value), children: segmentTypes.map((type) => (_jsx(Select.Option, { value: type.value, children: _jsx(Tag, { color: type.color, children: type.label }) }, type.value))) }) }), _jsx(Form.Item, { label: "Contenido", children: _jsx(TextArea, { rows: 4, value: segment.content, onChange: (e) => updateSegment(index, "content", e.target.value), onBlur: updateVariables, placeholder: "Escribe el contenido del segmento. Usa [VARIABLE] para variables din\u00E1micas." }) }), _jsx(Form.Item, { label: "Condiciones (opcional)", children: _jsxs(Space, { children: [_jsxs(Select, { placeholder: "Nivel de cliente", style: { width: 150 }, onChange: (value) => {
                                                                    const conditions = segment.conditions || {};
                                                                    updateSegment(index, "conditions", {
                                                                        ...conditions,
                                                                        customerTier: value,
                                                                    });
                                                                }, children: [_jsx(Select.Option, { value: ["gold"], children: "Solo Oro" }), _jsx(Select.Option, { value: ["silver"], children: "Solo Plata" }), _jsx(Select.Option, { value: ["bronze"], children: "Solo Bronce" }), _jsx(Select.Option, { value: ["gold", "silver"], children: "Oro y Plata" })] }), _jsx(Switch, { checkedChildren: "Con suscripci\u00F3n", unCheckedChildren: "Sin suscripci\u00F3n", onChange: (checked) => {
                                                                    const conditions = segment.conditions || {};
                                                                    updateSegment(index, "conditions", {
                                                                        ...conditions,
                                                                        hasSubscription: checked,
                                                                    });
                                                                } })] }) }), segment.type === "objection" && (_jsx(Alert, { message: "Consejo para objeciones", description: "Este segmento se activar\u00E1 cuando el agente marque una objeci\u00F3n espec\u00EDfica durante la llamada.", type: "info", showIcon: true }))] }) }, segment.id))) }), _jsx(Alert, { style: { marginTop: 16 }, message: "Variables detectadas", description: variables.length > 0 ? (_jsx(Space, { wrap: true, style: { marginTop: 8 }, children: variables.map((variable) => (_jsx(Tag, { icon: _jsx(TagOutlined, {}), children: variable }, variable))) })) : ("No se han detectado variables. Usa [NOMBRE_VARIABLE] en el contenido."), type: "info", showIcon: true, icon: _jsx(InfoCircleOutlined, {}) })] }) }), _jsx(Col, { span: 24, children: _jsx(Alert, { message: "Mejores pr\u00E1cticas para scripts", description: _jsx(List, { size: "small", dataSource: [
                                    "Mantén los segmentos cortos y claros (máximo 3-4 oraciones)",
                                    "Usa variables para personalizar el script: [CUSTOMER_NAME], [LAST_PRODUCT], etc.",
                                    "Incluye pausas naturales para que el cliente pueda responder",
                                    "Prepara respuestas para las objeciones más comunes",
                                    "Termina siempre con una pregunta clara o llamada a la acción",
                                ], renderItem: (item) => (_jsx(List.Item, { children: _jsx(Text, { children: item }) })) }), type: "info", showIcon: true }) }), _jsx(Form.Item, { name: "segments", hidden: true, children: _jsx(Input, {}) }), _jsx(Form.Item, { name: "variables", hidden: true, children: _jsx(Input, {}) })] }) }) }));
};
