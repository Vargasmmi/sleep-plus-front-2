import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, Switch, InputNumber, Row, Col, Card } from "antd";
export const CustomerCreate = () => {
    const { formProps, saveButtonProps } = useForm();
    return (_jsx(Create, { saveButtonProps: saveButtonProps, children: _jsx(Form, { ...formProps, layout: "vertical", children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, lg: 12, children: _jsxs(Card, { title: "Informaci\u00F3n Personal", bordered: false, children: [_jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Nombre", name: "firstName", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { placeholder: "Juan" }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Apellido", name: "lastName", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { placeholder: "P\u00E9rez" }) }) })] }), _jsx(Form.Item, { label: "Tel\u00E9fono", name: "phone", rules: [
                                        { required: true, message: "Este campo es requerido" },
                                        { pattern: /^\(\d{3}\) \d{3}-\d{4}$/, message: "Formato: (555) 123-4567" },
                                    ], children: _jsx(Input, { placeholder: "(555) 123-4567" }) }), _jsx(Form.Item, { label: "Email", name: "email", rules: [
                                        { type: "email", message: "Email inválido" },
                                        { required: true, message: "Este campo es requerido" },
                                    ], children: _jsx(Input, { placeholder: "cliente@email.com" }) })] }) }), _jsx(Col, { xs: 24, lg: 12, children: _jsxs(Card, { title: "Direcci\u00F3n", bordered: false, children: [_jsx(Form.Item, { label: "Calle", name: ["address", "street"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { placeholder: "123 Main St" }) }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Ciudad", name: ["address", "city"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { placeholder: "Los Angeles" }) }) }), _jsx(Col, { span: 6, children: _jsx(Form.Item, { label: "Estado", name: ["address", "state"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { placeholder: "CA", options: [
                                                        { value: "CA", label: "CA" },
                                                        { value: "NY", label: "NY" },
                                                        { value: "TX", label: "TX" },
                                                        { value: "FL", label: "FL" },
                                                    ] }) }) }), _jsx(Col, { span: 6, children: _jsx(Form.Item, { label: "ZIP", name: ["address", "zipCode"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { placeholder: "90001" }) }) })] })] }) }), _jsx(Col, { span: 24, children: _jsxs(Card, { title: "Informaci\u00F3n de Membres\u00EDa", bordered: false, children: [_jsxs(Row, { gutter: 16, children: [_jsx(Col, { xs: 24, sm: 8, children: _jsx(Form.Item, { label: "Tier del Cliente", name: "tier", rules: [{ required: true, message: "Este campo es requerido" }], initialValue: "bronze", children: _jsx(Select, { options: [
                                                        { value: "gold", label: "🥇 Oro" },
                                                        { value: "silver", label: "🥈 Plata" },
                                                        { value: "bronze", label: "🥉 Bronce" },
                                                    ] }) }) }), _jsx(Col, { xs: 24, sm: 8, children: _jsx(Form.Item, { label: "Fuente", name: "source", rules: [{ required: true, message: "Este campo es requerido" }], initialValue: "store", children: _jsx(Select, { options: [
                                                        { value: "store", label: "Tienda" },
                                                        { value: "online", label: "En línea" },
                                                        { value: "phone", label: "Teléfono" },
                                                        { value: "referral", label: "Referido" },
                                                    ] }) }) }), _jsx(Col, { xs: 24, sm: 8, children: _jsx(Form.Item, { label: "Estado de Membres\u00EDa", name: "membershipStatus", initialValue: "active", children: _jsx(Select, { options: [
                                                        { value: "active", label: "Activo" },
                                                        { value: "inactive", label: "Inactivo" },
                                                    ] }) }) })] }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { xs: 24, sm: 8, children: _jsx(Form.Item, { label: "Miembro Elite", name: "isEliteMember", valuePropName: "checked", initialValue: false, children: _jsx(Switch, {}) }) }), _jsx(Col, { xs: 24, sm: 8, children: _jsx(Form.Item, { label: "No Llamar", name: "doNotCall", valuePropName: "checked", initialValue: false, children: _jsx(Switch, {}) }) }), _jsx(Col, { xs: 24, sm: 8, children: _jsx(Form.Item, { label: "Cr\u00E9dito Inicial", name: "currentCredit", initialValue: 0, children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00" }) }) })] }), _jsx(Form.Item, { label: "Notas", name: "notes", children: _jsx(Input.TextArea, { rows: 3, placeholder: "Notas adicionales sobre el cliente..." }) })] }) })] }) }) }));
};
