import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, DatePicker, Row, Col, Card, Switch } from "antd";
import dayjs from "dayjs";
export const SaleEdit = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();
    const { selectProps: customerSelectProps } = useSelect({
        resource: "customers",
        optionLabel: (item) => `${item.firstName} ${item.lastName} - ${item.phone}`,
        optionValue: "id",
    });
    const { selectProps: employeeSelectProps } = useSelect({
        resource: "employees",
        optionLabel: (item) => `${item.firstName} ${item.lastName}`,
        optionValue: "id",
    });
    const { selectProps: storeSelectProps } = useSelect({
        resource: "stores",
        optionLabel: "name",
        optionValue: "id",
    });
    const { selectProps: subscriptionSelectProps } = useSelect({
        resource: "subscriptions",
        optionLabel: (item) => `Plan ${item.plan} - ${item.status}`,
        optionValue: "id",
    });
    const { selectProps: callSelectProps } = useSelect({
        resource: "calls",
        optionLabel: (item) => `Llamada ${item.type} - ${item.disposition}`,
        optionValue: "id",
    });
    return (_jsx(Edit, { saveButtonProps: saveButtonProps, children: _jsx(Form, { ...formProps, layout: "vertical", onFinish: (values) => {
                const processedValues = {
                    ...values,
                    contract: {
                        ...values.contract,
                        signedAt: values.contract?.signedAt?.format('YYYY-MM-DD HH:mm:ss')
                    }
                };
                return formProps.onFinish?.(processedValues);
            }, children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, lg: 12, children: _jsxs(Card, { title: "Informaci\u00F3n de la Venta", bordered: false, children: [_jsx(Form.Item, { label: "Cliente", name: "customerId", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { ...customerSelectProps, showSearch: true, placeholder: "Buscar cliente...", filterOption: (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }) }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Empleado", name: "userId", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { ...employeeSelectProps, placeholder: "Seleccionar empleado" }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Tienda", name: "storeId", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { ...storeSelectProps, placeholder: "Seleccionar tienda" }) }) })] }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Tipo de Venta", name: "type", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { options: [
                                                        { value: "new", label: "Nueva" },
                                                        { value: "renewal", label: "Renovación" },
                                                        { value: "upgrade", label: "Actualización" },
                                                        { value: "winback", label: "Recuperación" },
                                                    ] }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Canal", name: "channel", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { options: [
                                                        { value: "phone", label: "Teléfono" },
                                                        { value: "store", label: "Tienda" },
                                                        { value: "online", label: "En línea" },
                                                    ] }) }) })] }), _jsx(Form.Item, { label: "Suscripci\u00F3n", name: "subscriptionId", children: _jsx(Select, { ...subscriptionSelectProps, placeholder: "Seleccionar suscripci\u00F3n (opcional)", allowClear: true }) }), _jsx(Form.Item, { label: "Llamada Relacionada", name: "callId", children: _jsx(Select, { ...callSelectProps, placeholder: "Seleccionar llamada (opcional)", allowClear: true }) }), _jsx(Form.Item, { label: "Estado de Pago", name: "paymentStatus", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { options: [
                                            { value: "pending", label: "Pendiente" },
                                            { value: "completed", label: "Completado" },
                                            { value: "failed", label: "Fallido" },
                                            { value: "refunded", label: "Reembolsado" },
                                        ] }) })] }) }), _jsxs(Col, { xs: 24, lg: 12, children: [_jsxs(Card, { title: "Montos", bordered: false, children: [_jsx(Form.Item, { label: "Monto Bruto", name: ["amount", "gross"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) }), _jsx(Form.Item, { label: "Descuento", name: ["amount", "discount"], children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) }), _jsx(Form.Item, { label: "Monto Neto", name: ["amount", "net"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) }), _jsx(Form.Item, { label: "Impuesto", name: ["amount", "tax"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) }), _jsx(Form.Item, { label: "Total", name: ["amount", "total"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) })] }), _jsxs(Card, { title: "Comisi\u00F3n", bordered: false, style: { marginTop: 16 }, children: [_jsx(Form.Item, { label: "Comisi\u00F3n Base", name: ["commission", "base"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) }), _jsx(Form.Item, { label: "Bono", name: ["commission", "bonus"], children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) }), _jsx(Form.Item, { label: "Total de Comisi\u00F3n", name: ["commission", "total"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) }), _jsx(Form.Item, { label: "Estado de Comisi\u00F3n", name: ["commission", "status"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { options: [
                                                { value: "pending", label: "Pendiente" },
                                                { value: "approved", label: "Aprobado" },
                                                { value: "paid", label: "Pagado" },
                                            ] }) })] }), _jsxs(Card, { title: "Contrato", bordered: false, style: { marginTop: 16 }, children: [_jsx(Form.Item, { label: "Contrato Firmado", name: ["contract", "signed"], valuePropName: "checked", children: _jsx(Switch, {}) }), _jsx(Form.Item, { label: "Fecha de Firma", name: ["contract", "signedAt"], getValueProps: (value) => ({
                                            value: value ? dayjs(value) : undefined,
                                        }), children: _jsx(DatePicker, { showTime: true, format: "YYYY-MM-DD HH:mm:ss", style: { width: "100%" } }) }), _jsx(Form.Item, { label: "URL del Documento", name: ["contract", "documentUrl"], children: _jsx(Input, { placeholder: "https://..." }) })] })] })] }) }) }));
};
