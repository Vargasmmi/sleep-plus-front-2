import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, DatePicker, Row, Col, Card, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
export const EvaluationEdit = () => {
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
    return (_jsx(Edit, { saveButtonProps: saveButtonProps, children: _jsx(Form, { ...formProps, layout: "vertical", onFinish: (values) => {
                const processedValues = {
                    ...values,
                    expiresAt: values.expiresAt ? dayjs(values.expiresAt).format('YYYY-MM-DD HH:mm:ss') : null,
                    redeemedAt: values.redeemedAt ? dayjs(values.redeemedAt).format('YYYY-MM-DD HH:mm:ss') : null,
                };
                return formProps.onFinish?.(processedValues);
            }, children: _jsxs(Row, { gutter: [16, 16], children: [_jsxs(Col, { xs: 24, lg: 12, children: [_jsxs(Card, { title: "Informaci\u00F3n General", bordered: false, children: [_jsx(Form.Item, { label: "Cliente", name: "customerId", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { ...customerSelectProps, showSearch: true, placeholder: "Buscar cliente...", filterOption: (input, option) => String(option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }) }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Empleado", name: "employeeId", children: _jsx(Select, { ...employeeSelectProps, placeholder: "Seleccionar empleado", allowClear: true }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Tienda", name: "storeId", children: _jsx(Select, { ...storeSelectProps, placeholder: "Seleccionar tienda", allowClear: true }) }) })] }), _jsx(Form.Item, { label: "Estado", name: "status", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { options: [
                                                { value: "pending", label: "Pendiente" },
                                                { value: "approved", label: "Aprobado" },
                                                { value: "redeemed", label: "Canjeado" },
                                                { value: "expired", label: "Expirado" },
                                            ] }) }), _jsx(Form.Item, { label: "Cr\u00E9dito Aprobado", name: "creditApproved", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Fecha de Expiraci\u00F3n", name: "expiresAt", rules: [{ required: true, message: "Este campo es requerido" }], getValueProps: (value) => ({
                                                        value: value ? dayjs(value) : undefined,
                                                    }), children: _jsx(DatePicker, { showTime: true, format: "YYYY-MM-DD HH:mm:ss", style: { width: "100%" } }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Fecha de Canje", name: "redeemedAt", getValueProps: (value) => ({
                                                        value: value ? dayjs(value) : undefined,
                                                    }), children: _jsx(DatePicker, { showTime: true, format: "YYYY-MM-DD HH:mm:ss", style: { width: "100%" } }) }) })] })] }), _jsxs(Card, { title: "Informaci\u00F3n del Colch\u00F3n", bordered: false, style: { marginTop: 16 }, children: [_jsx(Form.Item, { label: "Marca", name: ["mattress", "brand"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { placeholder: "Sealy, Tempur-Pedic, etc." }) }), _jsx(Form.Item, { label: "Modelo", name: ["mattress", "model"], children: _jsx(Input, { placeholder: "Modelo del colch\u00F3n" }) }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Tama\u00F1o", name: ["mattress", "size"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { options: [
                                                            { value: "twin", label: "Twin" },
                                                            { value: "twin_xl", label: "Twin XL" },
                                                            { value: "full", label: "Full" },
                                                            { value: "queen", label: "Queen" },
                                                            { value: "king", label: "King" },
                                                            { value: "california_king", label: "California King" },
                                                        ] }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Edad (a\u00F1os)", name: ["mattress", "age"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, max: 50, style: { width: "100%" }, placeholder: "5" }) }) })] }), _jsx(Form.Item, { label: "Condici\u00F3n", name: ["mattress", "condition"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { options: [
                                                { value: "excellent", label: "Excelente" },
                                                { value: "good", label: "Buena" },
                                                { value: "fair", label: "Regular" },
                                                { value: "poor", label: "Mala" },
                                            ] }) })] })] }), _jsxs(Col, { xs: 24, lg: 12, children: [_jsxs(Card, { title: "Evaluaci\u00F3n de IA", bordered: false, children: [_jsx(Form.Item, { label: "Puntuaci\u00F3n de Condici\u00F3n", name: ["aiEvaluation", "conditionScore"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, max: 100, style: { width: "100%" }, placeholder: "85" }) }), _jsx(Form.Item, { label: "Puntuaci\u00F3n de Marca", name: ["aiEvaluation", "brandScore"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, max: 100, style: { width: "100%" }, placeholder: "90" }) }), _jsx(Form.Item, { label: "Puntuaci\u00F3n de Edad", name: ["aiEvaluation", "ageScore"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, max: 100, style: { width: "100%" }, placeholder: "75" }) }), _jsx(Form.Item, { label: "Puntuaci\u00F3n de Tama\u00F1o", name: ["aiEvaluation", "sizeScore"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, max: 100, style: { width: "100%" }, placeholder: "100" }) }), _jsx(Form.Item, { label: "Puntuaci\u00F3n Final", name: ["aiEvaluation", "finalScore"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, max: 100, style: { width: "100%" }, placeholder: "88" }) }), _jsx(Form.Item, { label: "Confianza (%)", name: ["aiEvaluation", "confidence"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, max: 100, style: { width: "100%" }, placeholder: "95", formatter: (value) => `${value}%` }) }), _jsx(Form.Item, { label: "Puntuaci\u00F3n de Valor de Recompra", name: ["aiEvaluation", "buybackValueScore"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, max: 100, formatter: (value) => `${value}%`, style: { width: "100%" }, placeholder: "75" }) })] }), _jsx(Card, { title: "Fotos", bordered: false, style: { marginTop: 16 }, children: _jsx(Form.Item, { label: "Fotos del Colch\u00F3n", name: "photos", valuePropName: "fileList", getValueFromEvent: (e) => {
                                        if (Array.isArray(e)) {
                                            return e;
                                        }
                                        return e?.fileList;
                                    }, children: _jsx(Upload, { listType: "picture-card", multiple: true, beforeUpload: () => false, children: _jsx(Button, { icon: _jsx(UploadOutlined, {}), children: "Subir Foto" }) }) }) })] })] }) }) }));
};
