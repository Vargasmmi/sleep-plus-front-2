import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Descriptions } from "antd";
const { Text } = Typography;
export const DoctorShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;
    return (_jsx(Show, { isLoading: isLoading, children: _jsxs(Descriptions, { bordered: true, column: 1, children: [_jsx(Descriptions.Item, { label: "ID", children: record?.id }), _jsx(Descriptions.Item, { label: "Name", children: _jsx(Text, { strong: true, children: record?.name || "Dr. Smith" }) }), _jsx(Descriptions.Item, { label: "Specialty", children: record?.specialty || "Sleep Medicine" }), _jsx(Descriptions.Item, { label: "Email", children: record?.email || "doctor@sleepplus.com" }), _jsx(Descriptions.Item, { label: "Phone", children: record?.phone || "+1 234 567 8900" }), _jsx(Descriptions.Item, { label: "Status", children: _jsx(Tag, { color: record?.status === "available" ? "green" : "orange", children: record?.status || "available" }) })] }) }));
};
