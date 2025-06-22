import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Show } from "@refinedev/antd";
import { useShow, useOne } from "@refinedev/core";
import { Typography, Row, Col, Card, Tag, Space, Timeline, Alert, Descriptions, List, } from "antd";
import { PhoneOutlined, UserOutlined, ClockCircleOutlined, AudioOutlined, CalendarOutlined, FileTextOutlined, ExclamationCircleOutlined, CheckCircleOutlined, InfoCircleOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
const { Title, Text, Paragraph } = Typography;
export const CallShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading, error } = queryResult;
    const call = data?.data;
    // Debug logging
    console.log('CallShow Debug:', {
        isLoading,
        error,
        data,
        call,
        queryResult
    });
    const { data: customerData } = useOne({
        resource: "customers",
        id: call?.customerId || "",
        queryOptions: {
            enabled: !!call?.customerId,
        },
    });
    const { data: employeeData } = useOne({
        resource: "employees",
        id: call?.userId || "",
        queryOptions: {
            enabled: !!call?.userId,
        },
    });
    const customer = customerData?.data;
    const employee = employeeData?.data;
    if (isLoading) {
        return _jsx("div", { children: "Cargando..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error al cargar la llamada: ", error.message] });
    }
    if (!call) {
        return _jsxs("div", { children: ["No se encontraron datos de la llamada. Data recibida: ", JSON.stringify(data)] });
    }
    const formatDuration = (seconds) => {
        const dur = dayjs.duration(seconds, "seconds");
        if (seconds < 60) {
            return `${seconds} segundos`;
        }
        else if (seconds < 3600) {
            return `${dur.minutes()} minutos ${dur.seconds()} segundos`;
        }
        else {
            return `${dur.hours()} horas ${dur.minutes()} minutos`;
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "success";
            case "no_answer":
                return "warning";
            case "busy":
            case "failed":
                return "error";
            case "voicemail":
                return "processing";
            default:
                return "default";
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
    return (_jsx(Show, { children: _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, lg: 16, children: _jsx(Card, { children: _jsxs(Space, { direction: "vertical", size: "large", style: { width: "100%" }, children: [_jsx("div", { children: _jsxs(Space, { align: "start", children: [_jsx(PhoneOutlined, { style: { fontSize: 24 } }), _jsxs("div", { children: [_jsxs(Title, { level: 3, style: { margin: 0 }, children: ["Llamada ", call.type === "outbound" ? "Saliente" : call.type === "inbound" ? "Entrante" : "Desconocida"] }), _jsxs(Space, { children: [_jsx(Tag, { color: getStatusColor(call.status || ''), children: call.status === "completed"
                                                                    ? "Completada"
                                                                    : call.status === "no_answer"
                                                                        ? "Sin respuesta"
                                                                        : call.status === "busy"
                                                                            ? "Ocupado"
                                                                            : call.status === "failed"
                                                                                ? "Fallida"
                                                                                : call.status === "voicemail"
                                                                                    ? "Buzón de voz"
                                                                                    : call.status || 'Desconocido' }), _jsx(Tag, { color: getDispositionColor(call.disposition || ''), children: call.disposition === "sale"
                                                                    ? "Venta"
                                                                    : call.disposition === "interested"
                                                                        ? "Interesado"
                                                                        : call.disposition === "callback"
                                                                            ? "Llamar después"
                                                                            : call.disposition === "not_interested"
                                                                                ? "No interesado"
                                                                                : call.disposition === "wrong_number"
                                                                                    ? "Número equivocado"
                                                                                    : call.disposition || 'Desconocido' })] })] })] }) }), _jsxs(Descriptions, { bordered: true, column: 2, children: [_jsx(Descriptions.Item, { label: "Cliente", span: 1, children: _jsxs(Space, { children: [_jsx(UserOutlined, {}), customer ? (_jsxs("a", { href: `/customers/show/${customer.id}`, children: [customer.firstName, " ", customer.lastName] })) : (call.customerId)] }) }), _jsx(Descriptions.Item, { label: "Agente", span: 1, children: _jsxs(Space, { children: [_jsx(UserOutlined, {}), employee ? (_jsxs("a", { href: `/employees/show/${employee.id}`, children: [employee.firstName, " ", employee.lastName] })) : (call.userId)] }) }), _jsx(Descriptions.Item, { label: "Inicio", span: 1, children: _jsxs(Space, { children: [_jsx(CalendarOutlined, {}), call.startTime ? dayjs(call.startTime).format("DD/MM/YYYY HH:mm:ss") : 'N/A'] }) }), _jsx(Descriptions.Item, { label: "Fin", span: 1, children: _jsxs(Space, { children: [_jsx(CalendarOutlined, {}), call.endTime ? dayjs(call.endTime).format("DD/MM/YYYY HH:mm:ss") : 'N/A'] }) }), _jsx(Descriptions.Item, { label: "Duraci\u00F3n", span: 2, children: _jsxs(Space, { children: [_jsx(ClockCircleOutlined, {}), formatDuration(call.duration || 0)] }) }), _jsx(Descriptions.Item, { label: "Script Utilizado", span: 2, children: _jsxs(Space, { children: [_jsx(FileTextOutlined, {}), call.script?.name || 'N/A', " ", call.script?.version ? `(v${call.script.version})` : ''] }) })] }), call.notes && (_jsx(Card, { title: "Notas de la Llamada", size: "small", children: _jsx(Paragraph, { children: call.notes }) })), call.objections && call.objections.length > 0 && (_jsx(Card, { title: "Objeciones Encontradas", size: "small", children: _jsx(List, { dataSource: call.objections, renderItem: (objection) => (_jsx(List.Item, { children: _jsxs(Space, { children: [_jsx(ExclamationCircleOutlined, {}), objection] }) })) }) })), call.recordingUrl && (_jsx(Alert, { message: "Grabaci\u00F3n Disponible", description: _jsxs(Space, { children: [_jsx(AudioOutlined, {}), _jsx("a", { href: call.recordingUrl, target: "_blank", rel: "noreferrer", children: "Escuchar grabaci\u00F3n de la llamada" })] }), type: "info", showIcon: true }))] }) }) }), _jsxs(Col, { xs: 24, lg: 8, children: [_jsx(Card, { title: "Pr\u00F3xima Acci\u00F3n", children: call.nextAction ? (_jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Alert, { message: call.nextAction.type === "callback"
                                            ? "Llamada de Seguimiento"
                                            : call.nextAction.type === "email"
                                                ? "Enviar Email"
                                                : "Sin acción requerida", type: call.nextAction.type === "none" ? "success" : "warning", showIcon: true, icon: call.nextAction.type === "none" ? (_jsx(CheckCircleOutlined, {})) : (_jsx(InfoCircleOutlined, {})) }), call.nextAction.scheduledFor && (_jsxs("div", { children: [_jsx(Text, { strong: true, children: "Programada para:" }), _jsx("br", {}), _jsx(Text, { children: dayjs(call.nextAction.scheduledFor).format("DD/MM/YYYY HH:mm") })] })), call.nextAction.notes && (_jsxs("div", { children: [_jsx(Text, { strong: true, children: "Notas:" }), _jsx("br", {}), _jsx(Text, { children: call.nextAction.notes })] }))] })) : (_jsx(Alert, { message: "Sin acci\u00F3n de seguimiento", type: "success", showIcon: true, icon: _jsx(CheckCircleOutlined, {}) })) }), _jsxs(Card, { title: "Informaci\u00F3n de Campa\u00F1a", style: { marginTop: 16 }, children: [call.metadata?.campaignId ? (_jsxs(Space, { direction: "vertical", children: [_jsx(Text, { strong: true, children: "ID de Campa\u00F1a:" }), _jsx("a", { href: `/campaigns/show/${call.metadata.campaignId}`, children: call.metadata.campaignId })] })) : (_jsx(Text, { type: "secondary", children: "No asociada a campa\u00F1a" })), call.metadata?.waitTime && (_jsxs("div", { style: { marginTop: 16 }, children: [_jsx(Text, { strong: true, children: "Tiempo de Espera:" }), _jsx("br", {}), _jsxs(Text, { children: [call.metadata.waitTime, " segundos"] })] })), call.metadata?.transferredTo && (_jsxs("div", { style: { marginTop: 16 }, children: [_jsx(Text, { strong: true, children: "Transferida a:" }), _jsx("br", {}), _jsx(Text, { children: call.metadata.transferredTo })] }))] }), _jsx(Card, { title: "L\u00EDnea de Tiempo", style: { marginTop: 16 }, children: _jsxs(Timeline, { children: [_jsxs(Timeline.Item, { dot: _jsx(PhoneOutlined, { style: { fontSize: "16px" } }), color: "blue", children: [_jsx(Text, { type: "secondary", children: dayjs(call.startTime).format("HH:mm:ss") }), _jsx("br", {}), "Llamada iniciada"] }), call.metadata?.waitTime && (_jsxs(Timeline.Item, { children: [_jsx(Text, { type: "secondary", children: "Tiempo de espera" }), _jsx("br", {}), call.metadata.waitTime, " segundos"] })), _jsxs(Timeline.Item, { dot: call.status === "completed" ? (_jsx(CheckCircleOutlined, { style: { fontSize: "16px" } })) : (_jsx(ExclamationCircleOutlined, { style: { fontSize: "16px" } })), color: call.status === "completed" ? "green" : "red", children: [_jsx(Text, { type: "secondary", children: dayjs(call.endTime).format("HH:mm:ss") }), _jsx("br", {}), "Llamada finalizada"] }), call.disposition === "sale" && (_jsx(Timeline.Item, { dot: _jsx(CheckCircleOutlined, { style: { fontSize: "16px" } }), color: "green", children: "Venta realizada" }))] }) })] })] }) }));
};
