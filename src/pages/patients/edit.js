import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";
export const PatientEdit = () => {
    const { formProps, saveButtonProps } = useForm();
    return (_jsx(Edit, { saveButtonProps: saveButtonProps, children: _jsxs(Form, { ...formProps, layout: "vertical", children: [_jsx(Form.Item, { label: "Name", name: "name", rules: [{ required: true, message: "Please input patient name!" }], children: _jsx(Input, { placeholder: "Enter patient name" }) }), _jsx(Form.Item, { label: "Email", name: "email", rules: [
                        { required: true, message: "Please input email!" },
                        { type: "email", message: "Please enter a valid email!" },
                    ], children: _jsx(Input, { placeholder: "patient@example.com" }) }), _jsx(Form.Item, { label: "Phone", name: "phone", rules: [{ required: true, message: "Please input phone number!" }], children: _jsx(Input, { placeholder: "+1 234 567 8900" }) }), _jsx(Form.Item, { label: "Age", name: "age", rules: [{ required: true, message: "Please input age!" }], children: _jsx(InputNumber, { min: 0, max: 150, placeholder: "25", style: { width: "100%" } }) }), _jsx(Form.Item, { label: "Status", name: "status", rules: [{ required: true, message: "Please select status!" }], children: _jsxs(Select, { placeholder: "Select status", children: [_jsx(Select.Option, { value: "active", children: "Active" }), _jsx(Select.Option, { value: "inactive", children: "Inactive" })] }) }), _jsx(Form.Item, { label: "Address", name: "address", children: _jsx(Input.TextArea, { rows: 3, placeholder: "Enter patient address" }) }), _jsx(Form.Item, { label: "Medical History", name: "medicalHistory", children: _jsx(Input.TextArea, { rows: 4, placeholder: "Enter medical history notes" }) })] }) }));
};
