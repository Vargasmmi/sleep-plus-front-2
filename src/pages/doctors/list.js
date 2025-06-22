import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, useTable } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { useNavigation } from "@refinedev/core";
export const DoctorList = () => {
    const { tableProps } = useTable({ syncWithLocation: true });
    const { show, edit } = useNavigation();
    return (_jsx(List, { children: _jsxs(Table, { ...tableProps, rowKey: "id", children: [_jsx(Table.Column, { dataIndex: "id", title: "ID", width: 80 }), _jsx(Table.Column, { dataIndex: "name", title: "Name", render: (value) => value || "Dr. Smith" }), _jsx(Table.Column, { dataIndex: "specialty", title: "Specialty", render: (value) => value || "Sleep Medicine" }), _jsx(Table.Column, { dataIndex: "email", title: "Email", render: (value) => value || "doctor@sleepplus.com" }), _jsx(Table.Column, { dataIndex: "phone", title: "Phone", render: (value) => value || "+1 234 567 8900" }), _jsx(Table.Column, { dataIndex: "status", title: "Status", render: (value) => {
                        const status = value || "available";
                        return _jsx(Tag, { color: status === "available" ? "green" : "orange", children: status });
                    } }), _jsx(Table.Column, { title: "Actions", render: (_, record) => (_jsxs(Space, { children: [_jsx("a", { onClick: () => show("doctors", record.id), children: "View" }), _jsx("a", { onClick: () => edit("doctors", record.id), children: "Edit" })] })) })] }) }));
};
