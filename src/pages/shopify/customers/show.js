import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Show, DateField } from "@refinedev/antd";
import { Card, Descriptions, Space, Tag, Typography, Table, Divider, Avatar, Badge } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, DollarOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useShow } from "@refinedev/core";
const { Title, Text } = Typography;
export const ShopifyCustomerShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;
    return (_jsx(Show, { isLoading: isLoading, title: `Cliente: ${record?.firstName} ${record?.lastName}`, children: record && (_jsxs(_Fragment, { children: [_jsx(Card, { children: _jsxs(Space, { align: "start", size: 24, children: [_jsxs(Avatar, { size: 64, icon: _jsx(UserOutlined, {}), style: { backgroundColor: "#1890ff" }, children: [record.firstName?.[0], record.lastName?.[0]] }), _jsxs("div", { style: { flex: 1 }, children: [_jsxs(Title, { level: 4, style: { marginBottom: 8 }, children: [record.firstName, " ", record.lastName] }), _jsxs(Space, { direction: "vertical", size: 4, children: [_jsxs(Space, { children: [_jsx(MailOutlined, {}), _jsx(Text, { children: record.email }), record.verifiedEmail && _jsx(Tag, { color: "green", children: "Email Verificado" })] }), record.phone && (_jsxs(Space, { children: [_jsx(PhoneOutlined, {}), _jsx(Text, { children: record.phone })] }))] })] }), _jsxs(Space, { direction: "vertical", align: "center", children: [_jsx(Badge, { count: record.ordersCount, style: { backgroundColor: "#1890ff" }, children: _jsx(ShoppingOutlined, { style: { fontSize: 24 } }) }), _jsx(Text, { type: "secondary", children: "\u00D3rdenes" })] }), _jsxs(Space, { direction: "vertical", align: "center", children: [_jsx(DollarOutlined, { style: { fontSize: 24, color: "#52c41a" } }), _jsxs(Text, { strong: true, children: [record.currency, " ", record.totalSpent] }), _jsx(Text, { type: "secondary", children: "Total Gastado" })] })] }) }), _jsxs(Card, { style: { marginTop: 16 }, title: "Informaci\u00F3n del Cliente", children: [_jsxs(Descriptions, { column: 2, bordered: true, children: [_jsx(Descriptions.Item, { label: "ID de Shopify", children: record.shopifyId }), _jsx(Descriptions.Item, { label: "Estado", children: _jsx(Tag, { color: record.state === "enabled" ? "green" :
                                            record.state === "disabled" ? "red" :
                                                record.state === "invited" ? "blue" : "orange", children: record.state === "enabled" ? "Activo" :
                                            record.state === "disabled" ? "Desactivado" :
                                                record.state === "invited" ? "Invitado" : "Rechazado" }) }), _jsx(Descriptions.Item, { label: "Acepta Marketing", children: _jsx(Tag, { color: record.acceptsMarketing ? "green" : "default", children: record.acceptsMarketing ? "Sí" : "No" }) }), _jsx(Descriptions.Item, { label: "Exento de Impuestos", children: _jsx(Tag, { color: record.taxExempt ? "orange" : "default", children: record.taxExempt ? "Sí" : "No" }) }), _jsx(Descriptions.Item, { label: "\u00DAltima Orden", children: record.lastOrderName || "N/A" }), _jsx(Descriptions.Item, { label: "Moneda", children: record.currency }), _jsx(Descriptions.Item, { label: "Cliente Desde", children: _jsx(DateField, { value: record.createdAt, format: "DD/MM/YYYY HH:mm" }) }), _jsx(Descriptions.Item, { label: "\u00DAltima Actualizaci\u00F3n", children: _jsx(DateField, { value: record.updatedAt, format: "DD/MM/YYYY HH:mm" }) })] }), record.note && (_jsxs(_Fragment, { children: [_jsx(Divider, { children: "Notas" }), _jsx(Text, { children: record.note })] })), record.tags?.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Divider, { children: "Etiquetas" }), _jsx(Space, { wrap: true, children: record.tags.map((tag, index) => (_jsx(Tag, { children: tag }, index))) })] }))] }), record.addresses?.length > 0 && (_jsx(Card, { style: { marginTop: 16 }, title: "Direcciones", children: _jsx(Table, { dataSource: record.addresses, rowKey: "id", pagination: false, columns: [
                            {
                                title: "Tipo",
                                key: "type",
                                render: (_, record) => (_jsx(Tag, { color: record.default ? "green" : "default", children: record.default ? "Principal" : "Alternativa" })),
                            },
                            {
                                title: "Dirección",
                                key: "address",
                                render: (_, record) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { children: record.address1 }), record.address2 && _jsx(Text, { type: "secondary", children: record.address2 })] })),
                            },
                            {
                                title: "Ciudad",
                                dataIndex: "city",
                                key: "city",
                            },
                            {
                                title: "Provincia/Estado",
                                dataIndex: "province",
                                key: "province",
                            },
                            {
                                title: "Código Postal",
                                dataIndex: "zip",
                                key: "zip",
                            },
                            {
                                title: "País",
                                dataIndex: "country",
                                key: "country",
                            },
                            {
                                title: "Teléfono",
                                dataIndex: "phone",
                                key: "phone",
                                render: (value) => value || "-",
                            },
                        ] }) }))] })) }));
};
