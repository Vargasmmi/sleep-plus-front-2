import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Descriptions } from "antd";
const { Text } = Typography;
export const PatientShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;
    return (_jsx(Show, { isLoading: isLoading, children: _jsxs(Descriptions, { bordered: true, column: 1, children: [_jsx(Descriptions.Item, { label: "ID", children: record?.id }), _jsx(Descriptions.Item, { label: "Name", children: _jsx(Text, { strong: true, children: record?.name || "John Doe" }) }), _jsx(Descriptions.Item, { label: "Email", children: record?.email || "patient@example.com" }), _jsx(Descriptions.Item, { label: "Phone", children: record?.phone || "+1 234 567 8900" }), _jsxs(Descriptions.Item, { label: "Age", children: [record?.age || Math.floor(Math.random() * 50 + 20), " years"] }), _jsx(Descriptions.Item, { label: "Status", children: _jsx(Tag, { color: record?.status === "active" ? "green" : "red", children: record?.status || "active" }) }), _jsx(Descriptions.Item, { label: "Last Visit", children: record?.lastVisit || new Date().toLocaleDateString() }), _jsx(Descriptions.Item, { label: "Address", children: record?.address || "123 Main St, City, State 12345" }), _jsx(Descriptions.Item, { label: "Medical History", children: _jsx(Text, { children: record?.medicalHistory || "No significant medical history recorded." }) })] }) }));
};
