import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, DatePicker, Row, Col, Card } from "antd";
import dayjs from "dayjs";
export const CallEdit = () => {
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
    const { selectProps: scriptSelectProps } = useSelect({
        resource: "scripts",
        optionLabel: "name",
        optionValue: "id",
    });
    return (_jsx(Edit, { saveButtonProps: saveButtonProps, children: _jsx(Form, { ...formProps, layout: "vertical", onFinish: (values) => {
                // Convertir las fechas a string si es necesario
                const processedValues = {
                    ...values,
                    startTime: values.startTime?.format('YYYY-MM-DD HH:mm:ss'),
                    endTime: values.endTime?.format('YYYY-MM-DD HH:mm:ss'),
                    nextAction: values.nextAction ? {
                        ...values.nextAction,
                        scheduledFor: values.nextAction.scheduledFor?.format('YYYY-MM-DD HH:mm:ss')
                    } : undefined
                };
                return formProps.onFinish?.(processedValues);
            }, children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, lg: 12, children: _jsxs(Card, { title: "Informaci\u00F3n de la Llamada", bordered: false, children: [_jsx(Form.Item, { label: "Cliente", name: "customerId", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { ...customerSelectProps, showSearch: true, placeholder: "Buscar cliente...", filterOption: (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }) }), _jsx(Form.Item, { label: "Empleado", name: "userId", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { ...employeeSelectProps, placeholder: "Seleccionar empleado" }) }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Tipo", name: "type", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { options: [
                                                        { value: "outbound", label: "Saliente" },
                                                        { value: "inbound", label: "Entrante" },
                                                    ] }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Estado", name: "status", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { options: [
                                                        { value: "completed", label: "Completada" },
                                                        { value: "no_answer", label: "Sin respuesta" },
                                                        { value: "busy", label: "Ocupado" },
                                                        { value: "failed", label: "Fallida" },
                                                        { value: "voicemail", label: "Buzón de voz" },
                                                    ] }) }) })] }), _jsx(Form.Item, { label: "Disposici\u00F3n", name: "disposition", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { options: [
                                            { value: "interested", label: "Interesado" },
                                            { value: "not_interested", label: "No interesado" },
                                            { value: "callback", label: "Volver a llamar" },
                                            { value: "wrong_number", label: "Número equivocado" },
                                            { value: "sale", label: "Venta" },
                                            { value: "other", label: "Otro" },
                                        ] }) }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Hora de Inicio", name: "startTime", rules: [{ required: true, message: "Este campo es requerido" }], getValueProps: (value) => ({
                                                    value: value ? dayjs(value) : undefined,
                                                }), children: _jsx(DatePicker, { showTime: true, format: "YYYY-MM-DD HH:mm:ss", style: { width: "100%" } }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Hora de Fin", name: "endTime", rules: [{ required: true, message: "Este campo es requerido" }], getValueProps: (value) => ({
                                                    value: value ? dayjs(value) : undefined,
                                                }), children: _jsx(DatePicker, { showTime: true, format: "YYYY-MM-DD HH:mm:ss", style: { width: "100%" } }) }) })] }), _jsx(Form.Item, { label: "Duraci\u00F3n (segundos)", name: "duration", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(InputNumber, { min: 0, style: { width: "100%" }, placeholder: "120" }) }), _jsx(Form.Item, { label: "URL de Grabaci\u00F3n", name: "recordingUrl", children: _jsx(Input, { placeholder: "https://..." }) })] }) }), _jsxs(Col, { xs: 24, lg: 12, children: [_jsxs(Card, { title: "Detalles del Script", bordered: false, children: [_jsx(Form.Item, { label: "Script Utilizado", name: ["script", "id"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { ...scriptSelectProps, placeholder: "Seleccionar script" }) }), _jsx(Form.Item, { label: "Nombre del Script", name: ["script", "name"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { placeholder: "Script de ventas v2" }) }), _jsx(Form.Item, { label: "Versi\u00F3n del Script", name: ["script", "version"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { placeholder: "1.0" }) }), _jsx(Form.Item, { label: "Objeciones", name: "objections", children: _jsx(Select, { mode: "tags", placeholder: "Agregar objeciones encontradas", options: [
                                                { value: "precio", label: "Precio muy alto" },
                                                { value: "tiempo", label: "No tiene tiempo" },
                                                { value: "interes", label: "No le interesa" },
                                                { value: "competencia", label: "Ya tiene otro servicio" },
                                            ] }) }), _jsx(Form.Item, { label: "Notas", name: "notes", children: _jsx(Input.TextArea, { rows: 4, placeholder: "Notas adicionales sobre la llamada..." }) })] }), _jsxs(Card, { title: "Siguiente Acci\u00F3n", bordered: false, style: { marginTop: 16 }, children: [_jsx(Form.Item, { label: "Tipo de Acci\u00F3n", name: ["nextAction", "type"], children: _jsx(Select, { options: [
                                                { value: "callback", label: "Volver a llamar" },
                                                { value: "email", label: "Enviar email" },
                                                { value: "none", label: "Ninguna" },
                                            ] }) }), _jsx(Form.Item, { label: "Programado para", name: ["nextAction", "scheduledFor"], dependencies: [["nextAction", "type"]], getValueProps: (value) => ({
                                            value: value ? dayjs(value) : undefined,
                                        }), children: _jsx(DatePicker, { showTime: true, format: "YYYY-MM-DD HH:mm:ss", style: { width: "100%" } }) }), _jsx(Form.Item, { label: "Notas de Seguimiento", name: ["nextAction", "notes"], children: _jsx(Input.TextArea, { rows: 2, placeholder: "Notas para el seguimiento..." }) })] }), _jsxs(Card, { title: "Metadata", bordered: false, style: { marginTop: 16 }, children: [_jsx(Form.Item, { label: "Tiempo de Espera (segundos)", name: ["metadata", "waitTime"], children: _jsx(InputNumber, { min: 0, style: { width: "100%" }, placeholder: "0" }) }), _jsx(Form.Item, { label: "Transferido a", name: ["metadata", "transferredTo"], children: _jsx(Input, { placeholder: "ID del empleado" }) }), _jsx(Form.Item, { label: "ID de Campa\u00F1a", name: ["metadata", "campaignId"], children: _jsx(Input, { placeholder: "ID de la campa\u00F1a" }) })] })] })] }) }) }));
};
