import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Show, DateField } from "@refinedev/antd";
import { useShow, useList } from "@refinedev/core";
import { Typography, Row, Col, Card, Descriptions, Tag, Space, Timeline, Table, Avatar, Tabs, Statistic, } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, HomeOutlined, ShoppingCartOutlined, CreditCardOutlined, PhoneFilled, ScanOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
const { Title, Text } = Typography;
export const CustomerShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const customer = data?.data;
    // Fetch related data
    const { data: subscriptions } = useList({
        resource: "subscriptions",
        filters: [{ field: "customerId", operator: "eq", value: customer?.id }],
        queryOptions: { enabled: !!customer?.id },
    });
    const { data: evaluations } = useList({
        resource: "evaluations",
        filters: [{ field: "customerId", operator: "eq", value: customer?.id }],
        queryOptions: { enabled: !!customer?.id },
    });
    const { data: calls } = useList({
        resource: "calls",
        filters: [{ field: "customerId", operator: "eq", value: customer?.id }],
        sorters: [{ field: "startTime", order: "desc" }],
        pagination: { pageSize: 10 },
        queryOptions: { enabled: !!customer?.id },
    });
    const { data: sales } = useList({
        resource: "sales",
        filters: [{ field: "customerId", operator: "eq", value: customer?.id }],
        sorters: [{ field: "createdAt", order: "desc" }],
        queryOptions: { enabled: !!customer?.id },
    });
    const getTierColor = (tier) => {
        switch (tier) {
            case "gold":
                return "gold";
            case "silver":
                return "default";
            case "bronze":
                return "orange";
            default:
                return "default";
        }
    };
    const activeSubscription = subscriptions?.data?.find((sub) => sub.status === "active");
    return (_jsx(Show, { isLoading: isLoading, children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { span: 24, children: _jsx(Card, { children: _jsxs(Row, { gutter: 16, align: "middle", children: [_jsx(Col, { children: _jsxs(Avatar, { size: 64, icon: _jsx(UserOutlined, {}), style: { backgroundColor: "#1890ff" }, children: [customer?.firstName?.[0], customer?.lastName?.[0]] }) }), _jsx(Col, { flex: "auto", children: _jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Title, { level: 3, style: { margin: 0 }, children: [customer?.firstName, " ", customer?.lastName] }), _jsxs(Space, { children: [_jsxs(Tag, { color: getTierColor(customer?.tier), children: [customer?.tier?.toUpperCase(), " TIER"] }), customer?.isEliteMember && _jsx(Tag, { color: "purple", children: "ELITE MEMBER" }), _jsx(Tag, { color: customer?.membershipStatus === "active" ? "green" : "red", children: customer?.membershipStatus?.toUpperCase() })] })] }) }), _jsx(Col, { children: _jsx(Space, { direction: "vertical", align: "center", children: _jsx(Statistic, { title: "Cr\u00E9dito Disponible", value: customer?.currentCredit || 0, prefix: "$", valueStyle: { color: "#3f8600" } }) }) })] }) }) }), _jsxs(Col, { xs: 24, lg: 8, children: [_jsx(Card, { title: "Informaci\u00F3n de Contacto", size: "small", children: _jsxs(Descriptions, { column: 1, size: "small", children: [_jsx(Descriptions.Item, { label: _jsxs(_Fragment, { children: [_jsx(PhoneOutlined, {}), " Tel\u00E9fono"] }), children: _jsx(Text, { copyable: true, children: customer?.phone }) }), _jsx(Descriptions.Item, { label: _jsxs(_Fragment, { children: [_jsx(MailOutlined, {}), " Email"] }), children: _jsx(Text, { copyable: true, children: customer?.email }) }), _jsx(Descriptions.Item, { label: _jsxs(_Fragment, { children: [_jsx(HomeOutlined, {}), " Direcci\u00F3n"] }), children: customer?.address && (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { children: customer.address.street }), _jsxs(Text, { children: [customer.address.city, ", ", customer.address.state, " ", customer.address.zipCode] })] })) })] }) }), _jsx(Card, { title: "M\u00E9tricas del Cliente", size: "small", style: { marginTop: 16 }, children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Statistic, { title: "Valor de Vida", value: customer?.lifetimeValue || 0, prefix: "$", suffix: "USD" }), _jsx(Statistic, { title: "Total Trades", value: customer?.totalTrades || 0, suffix: "intercambios" }), _jsx(Statistic, { title: "Cr\u00E9dito Total Ganado", value: customer?.totalCreditEarned || 0, prefix: "$" })] }) })] }), _jsx(Col, { xs: 24, lg: 16, children: _jsx(Card, { children: _jsx(Tabs, { items: [
                                {
                                    key: "subscriptions",
                                    label: _jsxs(_Fragment, { children: [_jsx(CreditCardOutlined, {}), " Suscripciones"] }),
                                    children: (_jsx(Table, { dataSource: subscriptions?.data || [], pagination: false, columns: [
                                            {
                                                title: "Plan",
                                                dataIndex: "plan",
                                                render: (plan) => _jsx(Tag, { color: "blue", children: plan?.toUpperCase() }),
                                            },
                                            {
                                                title: "Estado",
                                                dataIndex: "status",
                                                render: (status) => (_jsx(Tag, { color: status === "active" ? "green" : "red", children: status?.toUpperCase() })),
                                            },
                                            {
                                                title: "Precio",
                                                render: (_, record) => (_jsxs(Text, { children: ["$", record.pricing.monthly, "/mes"] })),
                                            },
                                            {
                                                title: "Próximo Cobro",
                                                dataIndex: ["billing", "nextBillingDate"],
                                                render: (date) => _jsx(DateField, { value: date, format: "DD/MM/YYYY" }),
                                            },
                                            {
                                                title: "Servicios",
                                                render: (_, record) => (_jsxs(Space, { children: [_jsxs(Tag, { children: ["Limpiezas: ", record.services.cleaningsUsed, "/", record.services.cleaningsTotal] }), _jsxs(Tag, { children: ["Inspecciones: ", record.services.inspectionsUsed, "/", record.services.inspectionsTotal] })] })),
                                            },
                                        ] })),
                                },
                                {
                                    key: "evaluations",
                                    label: _jsxs(_Fragment, { children: [_jsx(ScanOutlined, {}), " Evaluaciones T&S"] }),
                                    children: (_jsx(Table, { dataSource: evaluations?.data || [], pagination: false, columns: [
                                            {
                                                title: "ID",
                                                dataIndex: "id",
                                                render: (id) => _jsx(Text, { code: true, children: id }),
                                            },
                                            {
                                                title: "Colchón",
                                                dataIndex: "mattress",
                                                render: (mattress) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { children: [mattress.brand, " - ", mattress.size] }), _jsxs(Text, { type: "secondary", children: [mattress.age, " a\u00F1os - ", mattress.condition] })] })),
                                            },
                                            {
                                                title: "Crédito",
                                                dataIndex: "creditApproved",
                                                render: (credit) => _jsxs(Tag, { color: "green", children: ["$", credit] }),
                                            },
                                            {
                                                title: "Estado",
                                                dataIndex: "status",
                                                render: (status) => (_jsx(Tag, { color: status === "approved" ? "blue" :
                                                        status === "redeemed" ? "green" :
                                                            status === "expired" ? "red" : "default", children: status?.toUpperCase() })),
                                            },
                                            {
                                                title: "Fecha",
                                                dataIndex: "createdAt",
                                                render: (date) => _jsx(DateField, { value: date, format: "DD/MM/YYYY HH:mm" }),
                                            },
                                        ] })),
                                },
                                {
                                    key: "calls",
                                    label: _jsxs(_Fragment, { children: [_jsx(PhoneFilled, {}), " Historial de Llamadas"] }),
                                    children: (_jsx(Timeline, { items: calls?.data?.map((call) => ({
                                            color: call.disposition === "sale" ? "green" : "blue",
                                            children: (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Space, { children: [_jsx(Text, { strong: true, children: call.type === "outbound" ? "Saliente" : "Entrante" }), _jsx(Tag, { children: call.disposition }), _jsxs(Text, { type: "secondary", children: [call.duration, "s"] })] }), call.notes && _jsx(Text, { type: "secondary", children: call.notes }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: dayjs(call.startTime).format("DD/MM/YYYY HH:mm") })] })),
                                        })) || [] })),
                                },
                                {
                                    key: "purchases",
                                    label: _jsxs(_Fragment, { children: [_jsx(ShoppingCartOutlined, {}), " Historial de Compras"] }),
                                    children: (_jsx(Table, { dataSource: sales?.data || [], pagination: { pageSize: 5 }, columns: [
                                            {
                                                title: "Fecha",
                                                dataIndex: "createdAt",
                                                render: (date) => _jsx(DateField, { value: date, format: "DD/MM/YYYY" }),
                                            },
                                            {
                                                title: "Tipo",
                                                dataIndex: "type",
                                                render: (type) => _jsx(Tag, { children: type }),
                                            },
                                            {
                                                title: "Canal",
                                                dataIndex: "channel",
                                                render: (channel) => _jsx(Tag, { children: channel }),
                                            },
                                            {
                                                title: "Total",
                                                dataIndex: ["amount", "total"],
                                                render: (total) => _jsxs(Text, { strong: true, children: ["$", total] }),
                                            },
                                            {
                                                title: "Estado",
                                                dataIndex: "paymentStatus",
                                                render: (status) => (_jsx(Tag, { color: status === "completed" ? "green" : "orange", children: status })),
                                            },
                                        ] })),
                                },
                            ] }) }) })] }) }));
};
