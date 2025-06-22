import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, useTable } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { useNavigation } from "@refinedev/core";
export const PatientList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
        meta: {
            fields: ["id", "name", "email", "phone", "age", "status", "lastVisit"],
        },
    });
    const { show, edit } = useNavigation();
    return (_jsx(List, { children: _jsxs(Table, { ...tableProps, rowKey: "id", children: [_jsx(Table.Column, { dataIndex: "id", title: "ID", width: 80 }), _jsx(Table.Column, { dataIndex: "name", title: "Name", render: (value) => value || "John Doe" }), _jsx(Table.Column, { dataIndex: "email", title: "Email", render: (value) => value || "patient@example.com" }), _jsx(Table.Column, { dataIndex: "phone", title: "Phone", render: (value) => value || "+1 234 567 8900" }), _jsx(Table.Column, { dataIndex: "age", title: "Age", render: (value) => value || Math.floor(Math.random() * 50 + 20) }), _jsx(Table.Column, { dataIndex: "status", title: "Status", render: (value) => {
                        const status = value || (Math.random() > 0.5 ? "active" : "inactive");
                        return (_jsx(Tag, { color: status === "active" ? "green" : "red", children: status }));
                    } }), _jsx(Table.Column, { dataIndex: "lastVisit", title: "Last Visit", render: (value) => value || new Date().toLocaleDateString() }), _jsx(Table.Column, { title: "Actions", dataIndex: "actions", render: (_, record) => (_jsxs(Space, { children: [_jsx("a", { onClick: () => show("patients", record.id), children: "View" }), _jsx("a", { onClick: () => edit("patients", record.id), children: "Edit" })] })) })] }) }));
};
