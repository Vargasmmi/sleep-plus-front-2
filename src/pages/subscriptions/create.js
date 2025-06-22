import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, Row, Col, Card, Space, Typography, Divider, Alert, Radio, } from "antd";
import { CreditCardOutlined, UserOutlined } from "@ant-design/icons";
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
export const SubscriptionCreate = () => {
    const { formProps, saveButtonProps, onFinish } = useForm();
    const [selectedPlan, setSelectedPlan] = useState("basic");
    const [billingFrequency, setBillingFrequency] = useState("monthly");
    const { selectProps: customerSelectProps } = useSelect({
        resource: "customers",
        optionLabel: (customer) => `${customer.firstName} ${customer.lastName} - ${customer.phone}`,
        optionValue: "id",
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
    const handleSubmit = (values) => {
        const pricing = PLAN_PRICING[selectedPlan];
        const services = PLAN_SERVICES[selectedPlan];
        const subscriptionData = {
            ...values,
            plan: selectedPlan,
            status: "active",
            pricing: {
                monthly: pricing.monthly,
                annual: pricing.annual,
                currency: "USD",
            },
            billing: {
                ...values.billing,
                frequency: billingFrequency,
                nextBillingDate: values.billing.nextBillingDate || dayjs().add(1, "month").toISOString(),
            },
            services,
            credits: {
                accumulated: 0,
                used: 0,
            },
            startDate: dayjs().toISOString(),
        };
        onFinish(subscriptionData);
    };
    return (_jsx(Create, { saveButtonProps: saveButtonProps, children: _jsx(Form, { ...formProps, layout: "vertical", onFinish: handleSubmit, children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { span: 24, children: _jsx(Card, { title: "Informaci\u00F3n del Cliente", bordered: false, children: _jsx(Form.Item, { label: "Cliente", name: "customerId", rules: [{ required: true, message: "Selecciona un cliente" }], children: _jsx(Select, { ...customerSelectProps, placeholder: "Buscar cliente por nombre o tel\u00E9fono...", showSearch: true, filterOption: (input, option) => (option?.label ?? "")?.toString()?.toString().toLowerCase().includes(input?.toString()?.toString().toLowerCase()), prefix: _jsx(UserOutlined, {}) }) }) }) }), _jsx(Col, { span: 24, children: _jsx(Card, { title: "Plan de Suscripci\u00F3n", bordered: false, children: _jsx(Radio.Group, { value: selectedPlan, onChange: (e) => setSelectedPlan(e.target.value), style: { width: "100%" }, children: _jsxs(Row, { gutter: 16, children: [_jsx(Col, { xs: 24, md: 8, children: _jsx(Card, { hoverable: true, className: selectedPlan === "basic" ? "ant-card-active" : "", onClick: () => setSelectedPlan("basic"), children: _jsx(Radio, { value: "basic", children: _jsxs(Space, { direction: "vertical", size: "small", children: [_jsx(Text, { strong: true, style: { fontSize: 18 }, children: "BASIC" }), _jsx(Text, { type: "secondary", children: "Protecci\u00F3n esencial" }), _jsx(Divider, { style: { margin: "8px 0" } }), _jsx(Text, { children: "\u2713 4 limpiezas al a\u00F1o" }), _jsx(Text, { children: "\u2713 1 inspecci\u00F3n anual" }), _jsx(Text, { type: "secondary", children: "\u2717 Sin protecci\u00F3n contra da\u00F1os" }), _jsx(Divider, { style: { margin: "8px 0" } }), _jsxs(Space, { children: [_jsxs(Text, { strong: true, style: { fontSize: 20 }, children: ["$", PLAN_PRICING.basic.monthly] }), _jsx(Text, { type: "secondary", children: "/mes" })] })] }) }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Card, { hoverable: true, className: selectedPlan === "premium" ? "ant-card-active" : "", onClick: () => setSelectedPlan("premium"), children: _jsx(Radio, { value: "premium", children: _jsxs(Space, { direction: "vertical", size: "small", children: [_jsx(Text, { strong: true, style: { fontSize: 18 }, children: "PREMIUM" }), _jsx(Text, { type: "secondary", children: "M\u00E1s popular" }), _jsx(Divider, { style: { margin: "8px 0" } }), _jsx(Text, { children: "\u2713 8 limpiezas al a\u00F1o" }), _jsx(Text, { children: "\u2713 2 inspecciones anuales" }), _jsx(Text, { children: "\u2713 Protecci\u00F3n contra da\u00F1os" }), _jsx(Divider, { style: { margin: "8px 0" } }), _jsxs(Space, { children: [_jsxs(Text, { strong: true, style: { fontSize: 20 }, children: ["$", PLAN_PRICING.premium.monthly] }), _jsx(Text, { type: "secondary", children: "/mes" })] })] }) }) }) }), _jsx(Col, { xs: 24, md: 8, children: _jsx(Card, { hoverable: true, style: {
                                                    borderColor: selectedPlan === "elite" ? "#722ed1" : undefined,
                                                }, onClick: () => setSelectedPlan("elite"), children: _jsx(Radio, { value: "elite", children: _jsxs(Space, { direction: "vertical", size: "small", children: [_jsx(Text, { strong: true, style: { fontSize: 18, color: "#722ed1" }, children: "ELITE" }), _jsx(Text, { type: "secondary", children: "M\u00E1xima protecci\u00F3n" }), _jsx(Divider, { style: { margin: "8px 0" } }), _jsx(Text, { children: "\u2713 12 limpiezas al a\u00F1o" }), _jsx(Text, { children: "\u2713 4 inspecciones anuales" }), _jsx(Text, { children: "\u2713 Protecci\u00F3n total" }), _jsx(Text, { children: "\u2713 Trade & Sleep incluido" }), _jsx(Divider, { style: { margin: "8px 0" } }), _jsxs(Space, { children: [_jsxs(Text, { strong: true, style: { fontSize: 20 }, children: ["$", PLAN_PRICING.elite.monthly] }), _jsx(Text, { type: "secondary", children: "/mes" })] })] }) }) }) })] }) }) }) }), _jsx(Col, { span: 24, children: _jsxs(Card, { title: "Informaci\u00F3n de Facturaci\u00F3n", bordered: false, children: [_jsxs(Row, { gutter: 16, children: [_jsxs(Col, { xs: 24, md: 12, children: [_jsx(Form.Item, { label: "Frecuencia de Pago", children: _jsxs(Radio.Group, { value: billingFrequency, onChange: (e) => setBillingFrequency(e.target.value), buttonStyle: "solid", style: { width: "100%" }, children: [_jsx(Radio.Button, { value: "monthly", style: { width: "50%" }, children: "Mensual" }), _jsx(Radio.Button, { value: "annual", style: { width: "50%" }, children: "Anual (Ahorra 20%)" })] }) }), billingFrequency === "annual" && (_jsx(Alert, { message: `Precio anual: $${PLAN_PRICING[selectedPlan].annual}`, description: "Ahorra 2 meses con el pago anual", type: "success", showIcon: true, style: { marginBottom: 16 } }))] }), _jsx(Col, { xs: 24, md: 12, children: _jsx(Form.Item, { label: "M\u00E9todo de Pago", name: ["billing", "paymentMethod"], rules: [{ required: true, message: "Selecciona un método de pago" }], initialValue: "card", children: _jsxs(Select, { children: [_jsx(Select.Option, { value: "card", children: _jsxs(Space, { children: [_jsx(CreditCardOutlined, {}), "Tarjeta de Cr\u00E9dito/D\u00E9bito"] }) }), _jsx(Select.Option, { value: "ach", children: _jsxs(Space, { children: [_jsx(CreditCardOutlined, {}), "Transferencia Bancaria (ACH)"] }) }), _jsx(Select.Option, { value: "cash", children: _jsxs(Space, { children: [_jsx(CreditCardOutlined, {}), "Efectivo en Tienda"] }) })] }) }) })] }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { xs: 24, md: 12, children: _jsx(Form.Item, { label: "\u00DAltimos 4 D\u00EDgitos", name: ["billing", "lastFour"], rules: [
                                                    { pattern: /^\d{4}$/, message: "Ingresa 4 dígitos" },
                                                ], children: _jsx(Input, { placeholder: "1234", maxLength: 4 }) }) }), _jsx(Col, { xs: 24, md: 12, children: _jsx(Form.Item, { label: "Fecha del Primer Cobro", name: ["billing", "nextBillingDate"], initialValue: dayjs().add(1, "month"), children: _jsx(DatePicker, { style: { width: "100%" }, format: "DD/MM/YYYY", disabledDate: (current) => current && current < dayjs().startOf("day") }) }) })] })] }) }), _jsx(Col, { span: 24, children: _jsx(Card, { title: "Informaci\u00F3n Adicional", bordered: false, children: _jsx(Form.Item, { label: "Vendido Por", name: "soldBy", rules: [{ required: true, message: "Selecciona el vendedor" }], children: _jsx(Select, { ...employeeSelectProps, placeholder: "Seleccionar empleado...", showSearch: true }) }) }) })] }) }) }));
};
