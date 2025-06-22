import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, InputNumber, Row, Col, Card, Space, Typography, Divider, Alert, Radio, Switch, } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
const { Text } = Typography;
const PLAN_PRICING = {
    basic: { monthly: 4.99, annual: 49.99 },
    premium: { monthly: 7.99, annual: 79.99 },
    elite: { monthly: 9.99, annual: 99.99 },
};
const PLAN_SERVICES = {
    basic: {
        cleaningsTotal: 4,
        inspectionsTotal: 1,
        protectionActive: false,
    },
    premium: {
        cleaningsTotal: 8,
        inspectionsTotal: 2,
        protectionActive: true,
    },
    elite: {
        cleaningsTotal: 12,
        inspectionsTotal: 4,
        protectionActive: true,
    },
};
export const SubscriptionEdit = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();
    const subscriptionData = queryResult?.data?.data;
    const [selectedPlan, setSelectedPlan] = useState(subscriptionData?.plan || "basic");
    const [billingFrequency, setBillingFrequency] = useState(subscriptionData?.billing?.frequency || "monthly");
    useEffect(() => {
        if (subscriptionData) {
            setSelectedPlan(subscriptionData.plan);
            setBillingFrequency(subscriptionData.billing.frequency);
        }
    }, [subscriptionData]);
    const { selectProps: customerSelectProps } = useSelect({
        resource: "customers",
        optionLabel: (customer) => `${customer.firstName} ${customer.lastName} - ${customer.phone}`,
        optionValue: "id",
        defaultValue: subscriptionData?.customerId,
    });
    const { selectProps: employeeSelectProps } = useSelect({
        resource: "employees",
        optionLabel: (employee) => `${employee.firstName} ${employee.lastName}`,
        optionValue: "id",
        filters: [
            {
                field: "role",
                operator: "in",
                value: ["agent", "manager"],
            },
        ],
    });
    return (_jsx(Edit, { saveButtonProps: saveButtonProps, children: _jsx(Form, { ...formProps, layout: "vertical", children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { span: 24, children: _jsx(Card, { title: "Informaci\u00F3n del Cliente", bordered: false, children: _jsx(Form.Item, { label: "Cliente", name: "customerId", rules: [{ required: true, message: "Selecciona un cliente" }], children: _jsx(Select, { ...customerSelectProps, placeholder: "Buscar cliente por nombre o tel\u00E9fono...", showSearch: true, filterOption: (input, option) => (option?.label ?? "")?.toString()?.toString().toLowerCase().includes(input?.toString()?.toString().toLowerCase()), disabled: true }) }) }) }), _jsx(Col, { span: 24, children: _jsxs(Card, { title: "Plan de Suscripci\u00F3n", bordered: false, children: [_jsx(Form.Item, { name: "plan", initialValue: selectedPlan, children: _jsx(Radio.Group, { value: selectedPlan, onChange: (e) => setSelectedPlan(e.target.value), style: { width: "100%" }, children: _jsxs(Row, { gutter: 16, children: [_jsx(Col, { xs: 24, md: 8, children: _jsx(Card, { hoverable: true, className: selectedPlan === "basic" ? "ant-card-active" : "", onClick: () => setSelectedPlan("basic"), children: _jsx(Radio, { value: "basic", children: _jsxs(Space, { direction: "vertical", size: "small", children: [_jsx(Text, { strong: true, style: { fontSize: 18 }, children: "BASIC" }), _jsx(Text, { type: "secondary", children: "Protecci\u00F3n esencial" }), _jsx(Divider, { style: { margin: "8px 0" } }), _jsx(Text, { children: "\u2713 4 limpiezas al a\u00F1o" }), _jsx(Text, { children: "\u2713 1 inspecci\u00F3n anual" }), _jsx(Text, { type: "secondary", children: "\u2717 Sin protecci\u00F3n contra da\u00F1os" }), _jsx(Divider, { style: { margin: "8px 0" } }), _jsxs(Space, { children: [_jsxs(Text, { strong: true, style: { fontSize: 20 }, children: ["$", PLAN_PRICING.basic.monthly] }), _jsx(Text, { type: "secondary", children: "/mes" })] })] }) }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Card, { hoverable: true, className: selectedPlan === "premium" ? "ant-card-active" : "", onClick: () => setSelectedPlan("premium"), children: _jsx(Radio, { value: "premium", children: _jsxs(Space, { direction: "vertical", size: "small", children: [_jsx(Text, { strong: true, style: { fontSize: 18 }, children: "PREMIUM" }), _jsx(Text, { type: "secondary", children: "M\u00E1s popular" }), _jsx(Divider, { style: { margin: "8px 0" } }), _jsx(Text, { children: "\u2713 8 limpiezas al a\u00F1o" }), _jsx(Text, { children: "\u2713 2 inspecciones anuales" }), _jsx(Text, { children: "\u2713 Protecci\u00F3n contra da\u00F1os" }), _jsx(Divider, { style: { margin: "8px 0" } }), _jsxs(Space, { children: [_jsxs(Text, { strong: true, style: { fontSize: 20 }, children: ["$", PLAN_PRICING.premium.monthly] }), _jsx(Text, { type: "secondary", children: "/mes" })] })] }) }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Card, { hoverable: true, style: {
                                                            borderColor: selectedPlan === "elite" ? "#722ed1" : undefined,
                                                        }, onClick: () => setSelectedPlan("elite"), children: _jsx(Radio, { value: "elite", children: _jsxs(Space, { direction: "vertical", size: "small", children: [_jsx(Text, { strong: true, style: { fontSize: 18, color: "#722ed1" }, children: "ELITE" }), _jsx(Text, { type: "secondary", children: "M\u00E1xima protecci\u00F3n" }), _jsx(Divider, { style: { margin: "8px 0" } }), _jsx(Text, { children: "\u2713 12 limpiezas al a\u00F1o" }), _jsx(Text, { children: "\u2713 4 inspecciones anuales" }), _jsx(Text, { children: "\u2713 Protecci\u00F3n total" }), _jsx(Text, { children: "\u2713 Trade & Sleep incluido" }), _jsx(Divider, { style: { margin: "8px 0" } }), _jsxs(Space, { children: [_jsxs(Text, { strong: true, style: { fontSize: 20 }, children: ["$", PLAN_PRICING.elite.monthly] }), _jsx(Text, { type: "secondary", children: "/mes" })] })] }) }) }) })] }) }) }), selectedPlan !== subscriptionData?.plan && (_jsx(Alert, { message: "Cambio de Plan Detectado", description: "Los servicios se ajustar\u00E1n autom\u00E1ticamente al nuevo plan seleccionado.", type: "info", showIcon: true, style: { marginTop: 16 } }))] }) }), _jsx(Col, { span: 24, children: _jsxs(Card, { title: "Estado de la Suscripci\u00F3n", bordered: false, children: [_jsx(Form.Item, { label: "Estado", name: "status", rules: [{ required: true, message: "Selecciona un estado" }], children: _jsxs(Select, { children: [_jsx(Select.Option, { value: "active", children: "Activa" }), _jsx(Select.Option, { value: "paused", children: "Pausada" }), _jsx(Select.Option, { value: "cancelled", children: "Cancelada" }), _jsx(Select.Option, { value: "pending", children: "Pendiente" })] }) }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Fecha de Pausa", name: "pausedAt", getValueProps: (value) => ({
                                                    value: value ? dayjs(value) : undefined,
                                                }), children: _jsx(DatePicker, { style: { width: "100%" }, format: "DD/MM/YYYY" }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Fecha de Cancelaci\u00F3n", name: "cancelledAt", getValueProps: (value) => ({
                                                    value: value ? dayjs(value) : undefined,
                                                }), children: _jsx(DatePicker, { style: { width: "100%" }, format: "DD/MM/YYYY" }) }) })] }), _jsx(Form.Item, { label: "Raz\u00F3n de Cancelaci\u00F3n", name: "cancelReason", children: _jsx(Input.TextArea, { rows: 2, placeholder: "Si aplica..." }) })] }) }), _jsx(Col, { span: 24, children: _jsxs(Card, { title: "Informaci\u00F3n de Facturaci\u00F3n", bordered: false, children: [_jsxs(Row, { gutter: 16, children: [_jsx(Col, { xs: 24, md: 12, children: _jsx(Form.Item, { label: "Frecuencia de Pago", name: ["billing", "frequency"], children: _jsxs(Radio.Group, { value: billingFrequency, onChange: (e) => setBillingFrequency(e.target.value), buttonStyle: "solid", style: { width: "100%" }, children: [_jsx(Radio.Button, { value: "monthly", style: { width: "50%" }, children: "Mensual" }), _jsx(Radio.Button, { value: "annual", style: { width: "50%" }, children: "Anual (Ahorra 20%)" })] }) }) }), _jsx(Col, { xs: 24, md: 12, children: _jsx(Form.Item, { label: "M\u00E9todo de Pago", name: ["billing", "paymentMethod"], rules: [{ required: true, message: "Selecciona un método de pago" }], children: _jsxs(Select, { children: [_jsx(Select.Option, { value: "card", children: _jsxs(Space, { children: [_jsx(CreditCardOutlined, {}), "Tarjeta de Cr\u00E9dito/D\u00E9bito"] }) }), _jsx(Select.Option, { value: "ach", children: _jsxs(Space, { children: [_jsx(CreditCardOutlined, {}), "Transferencia Bancaria (ACH)"] }) }), _jsx(Select.Option, { value: "cash", children: _jsxs(Space, { children: [_jsx(CreditCardOutlined, {}), "Efectivo en Tienda"] }) })] }) }) })] }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { xs: 24, md: 12, children: _jsx(Form.Item, { label: "\u00DAltimos 4 D\u00EDgitos", name: ["billing", "lastFour"], rules: [
                                                    { pattern: /^\d{4}$/, message: "Ingresa 4 dígitos" },
                                                ], children: _jsx(Input, { placeholder: "1234", maxLength: 4 }) }) }), _jsx(Col, { xs: 24, md: 12, children: _jsx(Form.Item, { label: "Pr\u00F3ximo Cobro", name: ["billing", "nextBillingDate"], getValueProps: (value) => ({
                                                    value: value ? dayjs(value) : undefined,
                                                }), children: _jsx(DatePicker, { style: { width: "100%" }, format: "DD/MM/YYYY", disabledDate: (current) => current && current < dayjs().startOf("day") }) }) })] })] }) }), _jsx(Col, { span: 24, children: _jsxs(Card, { title: "Servicios y Cr\u00E9ditos", bordered: false, children: [_jsxs(Row, { gutter: 16, children: [_jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { label: "Limpiezas Usadas", name: ["services", "cleaningsUsed"], children: _jsx(InputNumber, { min: 0, max: PLAN_SERVICES[selectedPlan].cleaningsTotal, style: { width: "100%" } }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { label: "Inspecciones Usadas", name: ["services", "inspectionsUsed"], children: _jsx(InputNumber, { min: 0, max: PLAN_SERVICES[selectedPlan].inspectionsTotal, style: { width: "100%" } }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { label: "Protecci\u00F3n Activa", name: ["services", "protectionActive"], valuePropName: "checked", children: _jsx(Switch, { disabled: !PLAN_SERVICES[selectedPlan].protectionActive }) }) })] }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { label: "Cr\u00E9ditos Acumulados", name: ["credits", "accumulated"], children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" } }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { label: "Cr\u00E9ditos Usados", name: ["credits", "used"], children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" } }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Form.Item, { label: "Expiraci\u00F3n de Cr\u00E9ditos", name: ["credits", "expiration"], getValueProps: (value) => ({
                                                    value: value ? dayjs(value) : undefined,
                                                }), children: _jsx(DatePicker, { style: { width: "100%" }, format: "DD/MM/YYYY" }) }) })] })] }) })] }) }) }));
};
