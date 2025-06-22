import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Row, Col, Card, Switch } from "antd";
export const AchievementEdit = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();
    return (_jsx(Edit, { saveButtonProps: saveButtonProps, children: _jsx(Form, { ...formProps, layout: "vertical", children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, lg: 12, children: _jsxs(Card, { title: "Informaci\u00F3n B\u00E1sica", bordered: false, children: [_jsx(Form.Item, { label: "C\u00F3digo", name: "code", rules: [
                                        { required: true, message: "Este campo es requerido" },
                                        { max: 20, message: "Máximo 20 caracteres" },
                                    ], children: _jsx(Input, { placeholder: "FIRST_SALE", style: { textTransform: "uppercase" } }) }), _jsx(Form.Item, { label: "Nombre", name: "name", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { placeholder: "Primera Venta" }) }), _jsx(Form.Item, { label: "Descripci\u00F3n", name: "description", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input.TextArea, { rows: 3, placeholder: "Descripci\u00F3n del logro..." }) }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "\u00CDcono", name: "icon", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { placeholder: "\uD83C\uDFC6" }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Categor\u00EDa", name: "category", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { options: [
                                                        { value: "sales", label: "Ventas" },
                                                        { value: "calls", label: "Llamadas" },
                                                        { value: "quality", label: "Calidad" },
                                                        { value: "team", label: "Equipo" },
                                                    ] }) }) })] }), _jsx(Form.Item, { label: "Nivel", name: "tier", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { options: [
                                            { value: "bronze", label: "🥉 Bronce" },
                                            { value: "silver", label: "🥈 Plata" },
                                            { value: "gold", label: "🥇 Oro" },
                                            { value: "platinum", label: "💎 Platino" },
                                        ] }) })] }) }), _jsxs(Col, { xs: 24, lg: 12, children: [_jsxs(Card, { title: "Criterios", bordered: false, children: [_jsx(Form.Item, { label: "Tipo de Criterio", name: ["criteria", "type"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { options: [
                                                { value: "count", label: "Cantidad" },
                                                { value: "percentage", label: "Porcentaje" },
                                                { value: "streak", label: "Racha" },
                                                { value: "total", label: "Total" },
                                            ] }) }), _jsx(Form.Item, { label: "M\u00E9trica", name: ["criteria", "metric"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { placeholder: "ventas realizadas" }) }), _jsx(Form.Item, { label: "Objetivo", name: ["criteria", "target"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 1, style: { width: "100%" } }) }), _jsx(Form.Item, { label: "Per\u00EDodo de Tiempo", name: ["criteria", "timeframe"], children: _jsx(Select, { placeholder: "Seleccionar per\u00EDodo", allowClear: true, options: [
                                                { value: "day", label: "Día" },
                                                { value: "week", label: "Semana" },
                                                { value: "month", label: "Mes" },
                                                { value: "all_time", label: "Todo el tiempo" },
                                            ] }) })] }), _jsxs(Card, { title: "Recompensas", bordered: false, style: { marginTop: 16 }, children: [_jsx(Form.Item, { label: "Puntos", name: ["rewards", "points"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, style: { width: "100%" }, placeholder: "100" }) }), _jsx(Form.Item, { label: "Bono ($)", name: ["rewards", "bonus"], children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00" }) }), _jsx(Form.Item, { label: "Otorgar Insignia", name: ["rewards", "badge"], valuePropName: "checked", children: _jsx(Switch, {}) })] })] })] }) }) }));
};
