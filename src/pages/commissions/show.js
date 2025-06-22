import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Show } from "@refinedev/antd";
import { useShow, useOne, useMany } from "@refinedev/core";
import { Typography, Row, Col, Card, Tag, Space, Statistic, Descriptions, Table, Timeline, Alert, Progress, Divider, } from "antd";
import { WalletOutlined, UserOutlined, DollarOutlined, CheckCircleOutlined, TrophyOutlined, ShoppingOutlined, PercentageOutlined, CalendarOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
const { Title, Text } = Typography;
export const CommissionShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const commission = data?.data;
    const { data: employeeData } = useOne({
        resource: "employees",
        id: commission?.userId || "",
        queryOptions: {
            enabled: !!commission?.userId,
        },
    });
    const { data: salesData } = useMany({
        resource: "sales",
        ids: commission?.sales.saleIds || [],
        queryOptions: {
            enabled: !!commission?.sales.saleIds?.length,
        },
    });
    const { data: approverData } = useOne({
        resource: "employees",
        id: commission?.approvedBy || "",
        queryOptions: {
            enabled: !!commission?.approvedBy,
        },
    });
    const employee = employeeData?.data;
    const sales = salesData?.data || [];
    const approver = approverData?.data;
    if (isLoading || !commission) {
        return _jsx("div", { children: "Cargando..." });
    }
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const getStatusColor = (status) => {
        switch (status) {
            case "paid":
                return "success";
            case "approved":
                return "processing";
            case "pending_approval":
                return "warning";
            case "calculating":
                return "default";
            default:
                return "default";
        }
    };
    const totalBonuses = commission.earnings.bonuses.conversion +
        commission.earnings.bonuses.volume +
        commission.earnings.bonuses.retention +
        commission.earnings.bonuses.other;
    const bonusPercentage = (totalBonuses / commission.earnings.total) * 100;
    return (_jsx(Show, { children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { span: 24, children: _jsx(Card, { children: _jsxs(Space, { align: "start", style: { width: "100%", justifyContent: "space-between" }, children: [_jsxs(Space, { align: "start", children: [_jsx(WalletOutlined, { style: { fontSize: 24 } }), _jsxs("div", { children: [_jsxs(Title, { level: 3, style: { margin: 0 }, children: ["Comisi\u00F3n - ", monthNames[commission.period.month - 1], " ", commission.period.year] }), _jsxs(Space, { style: { marginTop: 8 }, children: [_jsx(Tag, { color: getStatusColor(commission.status), children: commission.status === "paid"
                                                                ? "Pagada"
                                                                : commission.status === "approved"
                                                                    ? "Aprobada"
                                                                    : commission.status === "pending_approval"
                                                                        ? "Pendiente de aprobación"
                                                                        : "Calculando" }), employee && (_jsxs(Space, { children: [_jsx(UserOutlined, {}), _jsxs("a", { href: `/employees/show/${employee.id}`, children: [employee.firstName, " ", employee.lastName] })] }))] })] })] }), _jsx(Statistic, { title: "Total a Pagar", value: commission.earnings.total, prefix: "$", precision: 2, valueStyle: { color: "#3f8600", fontSize: 24 } })] }) }) }), _jsxs(Col, { xs: 24, lg: 16, children: [_jsxs(Card, { title: "Desglose de Ganancias", children: [_jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 12, md: 6, children: _jsx(Statistic, { title: "Ventas Base", value: commission.earnings.baseSales, prefix: "$", precision: 2 }) }), _jsx(Col, { xs: 12, md: 6, children: _jsx(Statistic, { title: "Bono por Conversi\u00F3n", value: commission.earnings.bonuses.conversion, prefix: "$", precision: 2, valueStyle: { color: "#1890ff" } }) }), _jsx(Col, { xs: 12, md: 6, children: _jsx(Statistic, { title: "Bono por Volumen", value: commission.earnings.bonuses.volume, prefix: "$", precision: 2, valueStyle: { color: "#1890ff" } }) }), _jsx(Col, { xs: 12, md: 6, children: _jsx(Statistic, { title: "Bono por Retenci\u00F3n", value: commission.earnings.bonuses.retention, prefix: "$", precision: 2, valueStyle: { color: "#1890ff" } }) })] }), _jsx(Divider, {}), _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { span: 8, children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Text, { children: "Total de Bonos" }), _jsx(Statistic, { value: totalBonuses, prefix: "$", precision: 2, valueStyle: { color: "#3f8600" } }), _jsx(Progress, { percent: bonusPercentage, format: (percent) => `${percent?.toFixed(1)}% del total` })] }) }), _jsx(Col, { span: 8, children: _jsx(Statistic, { title: "Deducciones", value: commission.earnings.deductions, prefix: "-$", precision: 2, valueStyle: { color: commission.earnings.deductions > 0 ? "#cf1322" : undefined } }) }), _jsx(Col, { span: 8, children: _jsx(Statistic, { title: "Total Final", value: commission.earnings.total, prefix: "$", precision: 2, valueStyle: { color: "#3f8600", fontWeight: "bold" } }) })] })] }), _jsxs(Card, { title: "Ventas del Per\u00EDodo", style: { marginTop: 16 }, children: [_jsx(Space, { direction: "vertical", style: { width: "100%", marginBottom: 16 }, children: _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 8, children: _jsx(Statistic, { title: "Total de Ventas", value: commission.sales.count, prefix: _jsx(ShoppingOutlined, {}) }) }), _jsx(Col, { span: 8, children: _jsx(Statistic, { title: "Ingresos Generados", value: commission.sales.revenue, prefix: "$", precision: 2 }) }), _jsx(Col, { span: 8, children: _jsx(Statistic, { title: "Ticket Promedio", value: commission.sales.count > 0 ? commission.sales.revenue / commission.sales.count : 0, prefix: "$", precision: 2 }) })] }) }), _jsx(Table, { dataSource: sales, rowKey: "id", pagination: { pageSize: 5 }, columns: [
                                        {
                                            title: "Fecha",
                                            dataIndex: "createdAt",
                                            render: (value) => dayjs(value).format("DD/MM/YYYY"),
                                        },
                                        {
                                            title: "Tipo",
                                            dataIndex: "type",
                                            render: (value) => (_jsx(Tag, { color: value === "new" ? "success" :
                                                    value === "renewal" ? "processing" :
                                                        value === "upgrade" ? "gold" : "purple", children: value === "new" ? "Nueva" :
                                                    value === "renewal" ? "Renovación" :
                                                        value === "upgrade" ? "Mejora" : "Recuperación" })),
                                        },
                                        {
                                            title: "Total",
                                            dataIndex: ["amount", "total"],
                                            render: (value) => `$${value.toFixed(2)}`,
                                        },
                                        {
                                            title: "Comisión",
                                            dataIndex: ["commission", "total"],
                                            render: (value) => `$${value.toFixed(2)}`,
                                        },
                                        {
                                            title: "Acciones",
                                            render: (_, record) => (_jsx("a", { href: `/sales/show/${record.id}`, children: "Ver venta" })),
                                        },
                                    ] })] })] }), _jsxs(Col, { xs: 24, lg: 8, children: [_jsx(Card, { title: "Informaci\u00F3n del Per\u00EDodo", children: _jsxs(Descriptions, { column: 1, children: [_jsxs(Descriptions.Item, { label: "Per\u00EDodo", children: [monthNames[commission.period.month - 1], " ", commission.period.year] }), _jsx(Descriptions.Item, { label: "Fecha de inicio", children: dayjs(commission.period.startDate).format("DD/MM/YYYY") }), _jsx(Descriptions.Item, { label: "Fecha de fin", children: dayjs(commission.period.endDate).format("DD/MM/YYYY") }), _jsx(Descriptions.Item, { label: "Estado", children: _jsx(Tag, { color: getStatusColor(commission.status), children: commission.status === "paid"
                                                ? "Pagada"
                                                : commission.status === "approved"
                                                    ? "Aprobada"
                                                    : commission.status === "pending_approval"
                                                        ? "Pendiente de aprobación"
                                                        : "Calculando" }) }), commission.paymentMethod && (_jsx(Descriptions.Item, { label: "M\u00E9todo de pago", children: commission.paymentMethod === "payroll"
                                            ? "Nómina"
                                            : commission.paymentMethod === "direct_deposit"
                                                ? "Depósito directo"
                                                : "Cheque" })), commission.paidAt && (_jsx(Descriptions.Item, { label: "Fecha de pago", children: dayjs(commission.paidAt).format("DD/MM/YYYY") })), approver && (_jsx(Descriptions.Item, { label: "Aprobado por", children: _jsxs("a", { href: `/employees/show/${approver.id}`, children: [approver.firstName, " ", approver.lastName] }) }))] }) }), commission.notes && (_jsx(Card, { title: "Notas", style: { marginTop: 16 }, children: _jsx(Text, { children: commission.notes }) })), _jsx(Card, { title: "L\u00EDnea de Tiempo", style: { marginTop: 16 }, children: _jsxs(Timeline, { children: [_jsxs(Timeline.Item, { dot: _jsx(CalendarOutlined, { style: { fontSize: "16px" } }), color: "blue", children: [_jsx(Text, { type: "secondary", children: dayjs(commission.createdAt).format("DD/MM/YYYY") }), _jsx("br", {}), "Per\u00EDodo iniciado"] }), _jsxs(Timeline.Item, { children: [_jsx(Text, { type: "secondary", children: dayjs(commission.period.endDate).format("DD/MM/YYYY") }), _jsx("br", {}), "Per\u00EDodo finalizado"] }), commission.status !== "calculating" && (_jsxs(Timeline.Item, { dot: _jsx(PercentageOutlined, { style: { fontSize: "16px" } }), children: [_jsx(Text, { type: "secondary", children: dayjs(commission.updatedAt).format("DD/MM/YYYY") }), _jsx("br", {}), "Comisi\u00F3n calculada"] })), commission.status === "approved" && (_jsxs(Timeline.Item, { dot: _jsx(CheckCircleOutlined, { style: { fontSize: "16px" } }), color: "green", children: ["Comisi\u00F3n aprobada", approver && (_jsxs(_Fragment, { children: [_jsx("br", {}), _jsxs(Text, { type: "secondary", children: ["Por ", approver.firstName, " ", approver.lastName] })] }))] })), commission.status === "paid" && commission.paidAt && (_jsxs(Timeline.Item, { dot: _jsx(DollarOutlined, { style: { fontSize: "16px" } }), color: "green", children: [_jsx(Text, { type: "secondary", children: dayjs(commission.paidAt).format("DD/MM/YYYY") }), _jsx("br", {}), "Pago realizado"] }))] }) }), _jsx(Card, { title: "M\u00E9tricas de Rendimiento", style: { marginTop: 16 }, children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Statistic, { title: "Comisi\u00F3n promedio por venta", value: commission.sales.count > 0 ? commission.earnings.total / commission.sales.count : 0, prefix: "$", precision: 2 }), _jsx(Statistic, { title: "Tasa de comisi\u00F3n", value: commission.sales.revenue > 0 ? (commission.earnings.total / commission.sales.revenue) * 100 : 0, suffix: "%", precision: 2 }), bonusPercentage > 0 && (_jsx(Alert, { message: `Los bonos representan el ${bonusPercentage.toFixed(1)}% de tus ganancias totales`, type: "success", icon: _jsx(TrophyOutlined, {}) }))] }) })] })] }) }));
};
