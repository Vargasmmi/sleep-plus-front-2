import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, useTable } from "@refinedev/antd";
import { Table, Tag, Space, Typography } from "antd";
import { ShopOutlined, EnvironmentOutlined, PhoneOutlined, UserOutlined, } from "@ant-design/icons";
const { Text } = Typography;
export const StoreList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });
    return (_jsx(List, { children: _jsxs(Table, { ...tableProps, rowKey: "id", children: [_jsx(Table.Column, { title: "Tienda", dataIndex: "name", render: (value, record) => (_jsxs(Space, { children: [_jsx(ShopOutlined, {}), _jsxs("div", { children: [_jsx(Text, { strong: true, children: value }), _jsx("br", {}), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["C\u00F3digo: ", record.code] })] })] })) }, "name"), _jsx(Table.Column, { title: "Ubicaci\u00F3n", dataIndex: "address", render: (address) => (_jsxs(Space, { children: [_jsx(EnvironmentOutlined, {}), _jsxs(Text, { children: [address.city, ", ", address.state] })] })) }, "address"), _jsx(Table.Column, { title: "Tel\u00E9fono", dataIndex: "phone", render: (value) => (_jsxs(Space, { children: [_jsx(PhoneOutlined, {}), _jsx(Text, { children: value })] })) }, "phone"), _jsx(Table.Column, { title: "Manager", dataIndex: "managerId", render: (value) => (_jsxs(Space, { children: [_jsx(UserOutlined, {}), _jsx(Text, { children: value })] })) }, "managerId"), _jsx(Table.Column, { title: "Rendimiento", render: (_, record) => {
                        const percentage = ((record.performance.currentSales / record.performance.monthlyTarget) *
                            100).toFixed(1);
                        const color = Number(percentage) >= 100 ? "success" : Number(percentage) >= 80 ? "warning" : "error";
                        return (_jsxs("div", { children: [_jsxs(Tag, { color: color, children: [percentage, "% de meta"] }), _jsx("br", {}), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["$", record.performance.currentSales.toLocaleString(), " / $", record.performance.monthlyTarget.toLocaleString()] })] }));
                    } }, "performance"), _jsx(Table.Column, { title: "Estado", dataIndex: "status", render: (value) => (_jsx(Tag, { color: value === "active" ? "green" : "red", children: value === "active" ? "Activa" : "Inactiva" })) }, "status"), _jsx(Table.Column, { title: "Acciones", dataIndex: "actions", render: (_, record) => (_jsxs(Space, { children: [_jsx("a", { href: `/stores/show/${record.id}`, children: "Ver" }), _jsx("a", { href: `/stores/edit/${record.id}`, children: "Editar" })] })) })] }) }));
};
