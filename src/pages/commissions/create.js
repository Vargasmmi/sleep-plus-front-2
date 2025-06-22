import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, DatePicker, Row, Col, Card } from "antd";
import dayjs from "dayjs";
export const CommissionCreate = () => {
    const { formProps, saveButtonProps } = useForm();
    const { selectProps: employeeSelectProps } = useSelect({
        resource: "employees",
        optionLabel: (item) => `${item.firstName} ${item.lastName} (${item.employeeId})`,
        optionValue: "id",
    });
    const currentYear = dayjs().year();
    const currentMonth = dayjs().month() + 1;
    return (_jsx(Create, { saveButtonProps: saveButtonProps, children: _jsx(Form, { ...formProps, layout: "vertical", onFinish: (values) => {
                const processedValues = {
                    ...values,
                    period: {
                        ...values.period,
                        startDate: values.period.startDate?.format('YYYY-MM-DD'),
                        endDate: values.period.endDate?.format('YYYY-MM-DD'),
                    }
                };
                return formProps.onFinish?.(processedValues);
            }, children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, lg: 12, children: _jsxs(Card, { title: "Informaci\u00F3n General", bordered: false, children: [_jsx(Form.Item, { label: "Empleado", name: "userId", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Select, { ...employeeSelectProps, showSearch: true, placeholder: "Seleccionar empleado", filterOption: (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }) }), _jsxs(Card, { title: "Per\u00EDodo", bordered: false, type: "inner", children: [_jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Mes", name: ["period", "month"], rules: [{ required: true, message: "Este campo es requerido" }], initialValue: currentMonth, children: _jsx(Select, { options: [
                                                                { value: 1, label: "Enero" },
                                                                { value: 2, label: "Febrero" },
                                                                { value: 3, label: "Marzo" },
                                                                { value: 4, label: "Abril" },
                                                                { value: 5, label: "Mayo" },
                                                                { value: 6, label: "Junio" },
                                                                { value: 7, label: "Julio" },
                                                                { value: 8, label: "Agosto" },
                                                                { value: 9, label: "Septiembre" },
                                                                { value: 10, label: "Octubre" },
                                                                { value: 11, label: "Noviembre" },
                                                                { value: 12, label: "Diciembre" },
                                                            ] }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "A\u00F1o", name: ["period", "year"], rules: [{ required: true, message: "Este campo es requerido" }], initialValue: currentYear, children: _jsx(InputNumber, { min: 2020, max: 2030, style: { width: "100%" } }) }) })] }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Fecha de Inicio", name: ["period", "startDate"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(DatePicker, { format: "YYYY-MM-DD", style: { width: "100%" } }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Fecha de Fin", name: ["period", "endDate"], rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(DatePicker, { format: "YYYY-MM-DD", style: { width: "100%" } }) }) })] })] }), _jsx(Form.Item, { label: "Estado", name: "status", rules: [{ required: true, message: "Este campo es requerido" }], initialValue: "calculating", children: _jsx(Select, { options: [
                                            { value: "calculating", label: "Calculando" },
                                            { value: "pending_approval", label: "Pendiente de Aprobación" },
                                            { value: "approved", label: "Aprobado" },
                                            { value: "paid", label: "Pagado" },
                                        ] }) }), _jsx(Form.Item, { label: "Notas", name: "notes", children: _jsx(Input.TextArea, { rows: 3, placeholder: "Notas sobre esta comisi\u00F3n..." }) })] }) }), _jsxs(Col, { xs: 24, lg: 12, children: [_jsxs(Card, { title: "Ganancias", bordered: false, children: [_jsx(Form.Item, { label: "Ventas Base", name: ["earnings", "baseSales"], rules: [{ required: true, message: "Este campo es requerido" }], initialValue: 0, children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) }), _jsxs(Card, { title: "Bonos", bordered: false, type: "inner", children: [_jsx(Form.Item, { label: "Bono de Conversi\u00F3n", name: ["earnings", "bonuses", "conversion"], initialValue: 0, children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) }), _jsx(Form.Item, { label: "Bono de Volumen", name: ["earnings", "bonuses", "volume"], initialValue: 0, children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) }), _jsx(Form.Item, { label: "Bono de Retenci\u00F3n", name: ["earnings", "bonuses", "retention"], initialValue: 0, children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) }), _jsx(Form.Item, { label: "Otros Bonos", name: ["earnings", "bonuses", "other"], initialValue: 0, children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) })] }), _jsx(Form.Item, { label: "Deducciones", name: ["earnings", "deductions"], initialValue: 0, children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) }), _jsx(Form.Item, { label: "Total", name: ["earnings", "total"], rules: [{ required: true, message: "Este campo es requerido" }], initialValue: 0, children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2, disabled: true }) })] }), _jsxs(Card, { title: "Ventas", bordered: false, style: { marginTop: 16 }, children: [_jsx(Form.Item, { label: "Cantidad de Ventas", name: ["sales", "count"], rules: [{ required: true, message: "Este campo es requerido" }], initialValue: 0, children: _jsx(InputNumber, { min: 0, style: { width: "100%" }, placeholder: "0" }) }), _jsx(Form.Item, { label: "Ingresos Totales", name: ["sales", "revenue"], rules: [{ required: true, message: "Este campo es requerido" }], initialValue: 0, children: _jsx(InputNumber, { min: 0, prefix: "$", style: { width: "100%" }, placeholder: "0.00", precision: 2 }) })] })] })] }) }) }));
};
