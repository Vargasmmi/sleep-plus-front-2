import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Descriptions } from "antd";
const { Text } = Typography;
export const AppointmentShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;
    const statusColors = {
        scheduled: "blue",
        completed: "green",
        cancelled: "red",
        pending: "orange"
    };
    return (_jsx(Show, { isLoading: isLoading, children: _jsxs(Descriptions, { bordered: true, column: 1, children: [_jsx(Descriptions.Item, { label: "ID", children: record?.id }), _jsx(Descriptions.Item, { label: "Patient", children: _jsx(Text, { strong: true, children: record?.patientName || "John Doe" }) }), _jsx(Descriptions.Item, { label: "Doctor", children: record?.doctorName || "Dr. Smith" }), _jsx(Descriptions.Item, { label: "Date", children: record?.date || new Date().toLocaleDateString() }), _jsx(Descriptions.Item, { label: "Time", children: record?.time || "10:00 AM" }), _jsx(Descriptions.Item, { label: "Type", children: record?.type || "Consultation" }), _jsx(Descriptions.Item, { label: "Status", children: _jsx(Tag, { color: statusColors[record?.status] || "blue", children: record?.status || "scheduled" }) }), _jsx(Descriptions.Item, { label: "Notes", children: record?.notes || "No additional notes" })] }) }));
};
