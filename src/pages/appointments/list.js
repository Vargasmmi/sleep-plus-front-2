import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, useTable } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { useNavigation } from "@refinedev/core";
export const AppointmentList = () => {
    const { tableProps } = useTable({ syncWithLocation: true });
    const { show, edit } = useNavigation();
    return (_jsx(List, { children: _jsxs(Table, { ...tableProps, rowKey: "id", children: [_jsx(Table.Column, { dataIndex: "id", title: "ID", width: 80 }), _jsx(Table.Column, { dataIndex: "patientName", title: "Patient", render: (value) => value || "John Doe" }), _jsx(Table.Column, { dataIndex: "doctorName", title: "Doctor", render: (value) => value || "Dr. Smith" }), _jsx(Table.Column, { dataIndex: "date", title: "Date", render: (value) => value || new Date().toLocaleDateString() }), _jsx(Table.Column, { dataIndex: "time", title: "Time", render: (value) => value || "10:00 AM" }), _jsx(Table.Column, { dataIndex: "type", title: "Type", render: (value) => value || "Consultation" }), _jsx(Table.Column, { dataIndex: "status", title: "Status", render: (value) => {
                        const status = value || "scheduled";
                        const colors = {
                            scheduled: "blue",
                            completed: "green",
                            cancelled: "red",
                            pending: "orange"
                        };
                        return _jsx(Tag, { color: colors[status] || "blue", children: status });
                    } }), _jsx(Table.Column, { title: "Actions", render: (_, record) => (_jsxs(Space, { children: [_jsx("a", { onClick: () => show("appointments", record.id), children: "View" }), _jsx("a", { onClick: () => edit("appointments", record.id), children: "Edit" })] })) })] }) }));
};
