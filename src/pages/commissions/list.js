import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, useTable } from "@refinedev/antd";
import { useMany } from "@refinedev/core";
import { Table, Tag, Space, Typography, Statistic, Progress } from "antd";
import { UserOutlined, CheckCircleOutlined, ClockCircleOutlined, SyncOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
const { Text } = Typography;
export const CommissionList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
        sorters: {
            initial: [
                {
                    field: "period.year",
                    order: "desc",
                },
                {
                    field: "period.month",
                    order: "desc",
                },
            ],
        },
    });
    const userIds = tableProps?.dataSource?.map((item) => item.userId) ?? [];
    const { data: employeesData } = useMany({
        resource: "employees",
        ids: userIds,
        queryOptions: {
            enabled: userIds.length > 0,
        },
    });
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
    const getStatusIcon = (status) => {
        switch (status) {
            case "paid":
                return _jsx(CheckCircleOutlined, {});
            case "approved":
                return _jsx(CheckCircleOutlined, {});
            case "pending_approval":
                return _jsx(ClockCircleOutlined, {});
            case "calculating":
                return _jsx(SyncOutlined, { spin: true });
            default:
                return null;
        }
    };
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return (_jsx(List, { children: _jsxs(Table, { ...tableProps, rowKey: "id", children: [_jsx(Table.Column, { title: "Per\u00EDodo", render: (_, record) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { strong: true, children: [monthNames[record.period.month - 1], " ", record.period.year] }), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: [dayjs(record.period.startDate).format("DD/MM"), " - ", dayjs(record.period.endDate).format("DD/MM")] })] })), sorter: true }, "period"), _jsx(Table.Column, { title: "Empleado", dataIndex: "userId", render: (value) => {
                        const employee = employeesData?.data?.find((e) => e.id === value);
                        return (_jsxs(Space, { children: [_jsx(UserOutlined, {}), employee ? (_jsxs("a", { href: `/employees/show/${value}`, children: [employee.firstName, " ", employee.lastName] })) : (value)] }));
                    } }, "userId"), _jsx(Table.Column, { title: "Ventas", render: (_, record) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { strong: true, children: [record.sales.count, " ventas"] }), _jsxs(Text, { type: "secondary", children: ["$", record.sales.revenue.toLocaleString()] })] })) }, "sales"), _jsx(Table.Column, { title: "Ganancias Base", dataIndex: ["earnings", "baseSales"], render: (value) => (_jsx(Statistic, { value: value, prefix: "$", precision: 2, valueStyle: { fontSize: 14 } })) }, "baseSales"), _jsx(Table.Column, { title: "Bonos", render: (_, record) => {
                        const totalBonuses = record.earnings.bonuses.conversion +
                            record.earnings.bonuses.volume +
                            record.earnings.bonuses.retention +
                            record.earnings.bonuses.other;
                        return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Statistic, { value: totalBonuses, prefix: "$", precision: 2, valueStyle: { fontSize: 14, color: "#3f8600" } }), _jsx(Progress, { percent: (totalBonuses / record.earnings.total) * 100, size: "small", showInfo: false })] }));
                    } }, "bonuses"), _jsx(Table.Column, { title: "Deducciones", dataIndex: ["earnings", "deductions"], render: (value) => (_jsx(Statistic, { value: value, prefix: "-$", precision: 2, valueStyle: { fontSize: 14, color: value > 0 ? "#cf1322" : undefined } })) }, "deductions"), _jsx(Table.Column, { title: "Total", dataIndex: ["earnings", "total"], render: (value) => (_jsx(Statistic, { value: value, prefix: "$", precision: 2, valueStyle: { fontSize: 16, fontWeight: "bold", color: "#3f8600" } })), sorter: true }, "total"), _jsx(Table.Column, { title: "Estado", dataIndex: "status", render: (value) => (_jsx(Tag, { icon: getStatusIcon(value), color: getStatusColor(value), children: value === "paid"
                            ? "Pagada"
                            : value === "approved"
                                ? "Aprobada"
                                : value === "pending_approval"
                                    ? "Pendiente de aprobación"
                                    : "Calculando" })) }, "status"), _jsx(Table.Column, { title: "M\u00E9todo de Pago", dataIndex: "paymentMethod", render: (value, record) => {
                        if (record.status !== "paid")
                            return "-";
                        return (_jsx(Text, { children: value === "payroll"
                                ? "Nómina"
                                : value === "direct_deposit"
                                    ? "Depósito directo"
                                    : value === "check"
                                        ? "Cheque"
                                        : value }));
                    } }, "paymentMethod"), _jsx(Table.Column, { title: "Acciones", dataIndex: "actions", render: (_, record) => (_jsx(Space, { children: _jsx("a", { href: `/commissions/show/${record.id}`, children: "Ver detalles" }) })) })] }) }));
};
