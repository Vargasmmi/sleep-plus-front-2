import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, useTable } from "@refinedev/antd";
import { useMany } from "@refinedev/core";
import { Table, Tag, Space, Typography, Tooltip } from "antd";
import { PhoneOutlined, UserOutlined, ClockCircleOutlined, AudioOutlined, PhoneFilled, CloseCircleOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
const { Text } = Typography;
export const CallList = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
        sorters: {
            initial: [
                {
                    field: "startTime",
                    order: "desc",
                },
            ],
        },
    });
    const callIds = tableProps?.dataSource?.map((item) => item.customerId) ?? [];
    const { data: customersData } = useMany({
        resource: "customers",
        ids: callIds,
        queryOptions: {
            enabled: callIds.length > 0,
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
    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return _jsx(PhoneFilled, { style: { color: "#52c41a" } });
            case "no_answer":
                return _jsx(CloseCircleOutlined, { style: { color: "#faad14" } });
            case "busy":
            case "failed":
                return _jsx(CloseCircleOutlined, { style: { color: "#f5222d" } });
            case "voicemail":
                return _jsx(AudioOutlined, { style: { color: "#1890ff" } });
            default:
                return _jsx(PhoneOutlined, {});
        }
    };
    const getDispositionColor = (disposition) => {
        switch (disposition) {
            case "sale":
                return "success";
            case "interested":
                return "processing";
            case "callback":
                return "warning";
            case "not_interested":
                return "error";
            case "wrong_number":
                return "default";
            default:
                return "default";
        }
    };
    const formatDuration = (seconds) => {
        const duration = dayjs.duration(seconds, "seconds");
        if (seconds < 60) {
            return `${seconds}s`;
        }
        else if (seconds < 3600) {
            return `${duration.minutes()}m ${duration.seconds()}s`;
        }
        else {
            return `${duration.hours()}h ${duration.minutes()}m`;
        }
    };
    return (_jsx(List, { children: _jsxs(Table, { ...tableProps, rowKey: "id", children: [_jsx(Table.Column, { title: "Fecha/Hora", dataIndex: "startTime", render: (value) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { children: dayjs(value).format("DD/MM/YYYY") }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: dayjs(value).format("HH:mm:ss") })] })), sorter: true }, "startTime"), _jsx(Table.Column, { title: "Cliente", dataIndex: "customerId", render: (value) => {
                        const customer = customersData?.data?.find((c) => c.id === value);
                        return (_jsxs(Space, { children: [_jsx(UserOutlined, {}), _jsx("a", { href: `/customers/show/${value}`, children: customer
                                        ? `${customer.firstName} ${customer.lastName}`
                                        : value })] }));
                    } }, "customerId"), _jsx(Table.Column, { title: "Agente", dataIndex: "userId", render: (value) => {
                        const employee = employeesData?.data?.find((e) => e.id === value);
                        return (_jsxs(Space, { children: [_jsx(UserOutlined, {}), employee
                                    ? `${employee.firstName} ${employee.lastName}`
                                    : value] }));
                    } }, "userId"), _jsx(Table.Column, { title: "Tipo", dataIndex: "type", render: (value) => (_jsx(Tag, { color: value === "outbound" ? "blue" : "green", children: value === "outbound" ? "Saliente" : "Entrante" })) }, "type"), _jsx(Table.Column, { title: "Estado", dataIndex: "status", render: (value, record) => (_jsxs(Space, { children: [getStatusIcon(value), _jsx(Text, { children: value === "completed"
                                    ? "Completada"
                                    : value === "no_answer"
                                        ? "Sin respuesta"
                                        : value === "busy"
                                            ? "Ocupado"
                                            : value === "failed"
                                                ? "Fallida"
                                                : value === "voicemail"
                                                    ? "Buzón de voz"
                                                    : value })] })) }, "status"), _jsx(Table.Column, { title: "Disposici\u00F3n", dataIndex: "disposition", render: (value) => (_jsx(Tag, { color: getDispositionColor(value), children: value === "sale"
                            ? "Venta"
                            : value === "interested"
                                ? "Interesado"
                                : value === "callback"
                                    ? "Llamar después"
                                    : value === "not_interested"
                                        ? "No interesado"
                                        : value === "wrong_number"
                                            ? "Número equivocado"
                                            : value })) }, "disposition"), _jsx(Table.Column, { title: "Duraci\u00F3n", dataIndex: "duration", render: (value) => (_jsxs(Space, { children: [_jsx(ClockCircleOutlined, {}), _jsx(Text, { children: formatDuration(value) })] })), sorter: true }, "duration"), _jsx(Table.Column, { title: "Script", dataIndex: "script", render: (script) => (_jsx(Tooltip, { title: `Versión ${script.version}`, children: _jsx(Text, { ellipsis: true, style: { maxWidth: 150 }, children: script.name }) })) }, "script"), _jsx(Table.Column, { title: "Acciones", dataIndex: "actions", render: (_, record) => (_jsxs(Space, { children: [_jsx("a", { href: `/calls/show/${record.id}`, children: "Ver detalles" }), record.recordingUrl && (_jsxs("a", { href: record.recordingUrl, target: "_blank", rel: "noreferrer", children: [_jsx(AudioOutlined, {}), " Escuchar"] }))] })) })] }) }));
};
