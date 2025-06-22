import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Row, Col, Card, Button, Space, Typography, Tag, List, Avatar, Badge, Progress, Statistic, Table, Input, Tabs, Timeline, Modal, Form, Radio, Descriptions, } from "antd";
import { PhoneOutlined, UserOutlined, ClockCircleOutlined, PauseCircleOutlined, PlayCircleOutlined, TeamOutlined, FireOutlined, CheckCircleOutlined, CloseCircleOutlined, } from "@ant-design/icons";
const { Title, Text } = Typography;
export const CallCenterPage = () => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [callModalVisible, setCallModalVisible] = useState(false);
    const [dispositionModalVisible, setDispositionModalVisible] = useState(false);
    // Datos de ejemplo
    const agents = [
        {
            id: "1",
            name: "María García",
            status: "calling",
            callsToday: 45,
            conversionsToday: 8,
            avgCallTime: "4:23",
        },
        {
            id: "2",
            name: "Carlos López",
            status: "available",
            callsToday: 38,
            conversionsToday: 6,
            avgCallTime: "5:12",
        },
        {
            id: "3",
            name: "Ana Martínez",
            status: "break",
            callsToday: 42,
            conversionsToday: 7,
            avgCallTime: "4:45",
        },
        {
            id: "4",
            name: "Juan Pérez",
            status: "available",
            callsToday: 36,
            conversionsToday: 5,
            avgCallTime: "4:58",
        },
    ];
    const callQueue = [
        {
            id: "1",
            customerName: "Roberto Sánchez",
            phone: "(555) 123-4567",
            status: "waiting",
            duration: "0:00",
        },
        {
            id: "2",
            customerName: "Laura Jiménez",
            phone: "(555) 987-6543",
            status: "waiting",
            duration: "0:00",
        },
        {
            id: "3",
            customerName: "Pedro Ramírez",
            phone: "(555) 456-7890",
            status: "active",
            duration: "3:45",
            agent: "María García",
            startTime: "14:23",
        },
    ];
    const getStatusColor = (status) => {
        switch (status) {
            case "available":
                return "success";
            case "calling":
                return "processing";
            case "break":
                return "warning";
            case "offline":
                return "default";
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case "available":
                return _jsx(CheckCircleOutlined, {});
            case "calling":
                return _jsx(PhoneOutlined, {});
            case "break":
                return _jsx(PauseCircleOutlined, {});
            case "offline":
                return _jsx(CloseCircleOutlined, {});
        }
    };
    const handleStartCall = (customer) => {
        setSelectedCustomer(customer);
        setCallModalVisible(true);
    };
    const handleEndCall = () => {
        setCallModalVisible(false);
        setDispositionModalVisible(true);
    };
    const handleDisposition = (values) => {
        console.log("Disposition:", values);
        setDispositionModalVisible(false);
        setSelectedCustomer(null);
    };
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsx(Title, { level: 2, children: "Centro de Llamadas" }), _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, sm: 6, children: _jsx(Card, { children: _jsx(Statistic, { title: "Agentes Activos", value: 2, suffix: `/ ${agents.length}`, prefix: _jsx(TeamOutlined, {}) }) }) }), _jsx(Col, { xs: 24, sm: 6, children: _jsx(Card, { children: _jsx(Statistic, { title: "En Cola", value: callQueue.filter((c) => c.status === "waiting").length, prefix: _jsx(ClockCircleOutlined, {}) }) }) }), _jsx(Col, { xs: 24, sm: 6, children: _jsx(Card, { children: _jsx(Statistic, { title: "Llamadas Hoy", value: 161, prefix: _jsx(PhoneOutlined, {}) }) }) }), _jsx(Col, { xs: 24, sm: 6, children: _jsx(Card, { children: _jsx(Statistic, { title: "Tasa de Conversi\u00F3n", value: 16.4, suffix: "%", prefix: _jsx(FireOutlined, {}), valueStyle: { color: "#3f8600" } }) }) })] }), _jsxs(Row, { gutter: [16, 16], style: { marginTop: 24 }, children: [_jsx(Col, { xs: 24, lg: 8, children: _jsx(Card, { title: "Agentes", children: _jsx(List, { dataSource: agents, renderItem: (agent) => (_jsxs(List.Item, { children: [_jsx(List.Item.Meta, { avatar: _jsx(Badge, { status: agent.status === "available"
                                                    ? "success"
                                                    : agent.status === "calling"
                                                        ? "processing"
                                                        : agent.status === "break"
                                                            ? "warning"
                                                            : "default", dot: true, children: _jsx(Avatar, { icon: _jsx(UserOutlined, {}) }) }), title: agent.name, description: _jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Tag, { icon: getStatusIcon(agent.status), color: getStatusColor(agent.status), children: agent.status === "available"
                                                            ? "Disponible"
                                                            : agent.status === "calling"
                                                                ? "En llamada"
                                                                : agent.status === "break"
                                                                    ? "En descanso"
                                                                    : "Offline" }), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: [agent.callsToday, " llamadas \u2022 ", agent.conversionsToday, " ventas"] })] }) }), _jsxs("div", { style: { textAlign: "right" }, children: [_jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: "Promedio" }), _jsx("br", {}), _jsx(Text, { strong: true, children: agent.avgCallTime })] })] })) }) }) }), _jsxs(Col, { xs: 24, lg: 16, children: [_jsx(Card, { title: "Cola de Llamadas", extra: _jsx(Space, { children: _jsx(Button, { icon: _jsx(PlayCircleOutlined, {}), type: "primary", children: "Auto-asignar" }) }), children: _jsx(Table, { dataSource: callQueue, rowKey: "id", pagination: false, columns: [
                                        {
                                            title: "Cliente",
                                            dataIndex: "customerName",
                                            key: "customerName",
                                            render: (text, record) => (_jsxs(Space, { children: [_jsx(UserOutlined, {}), _jsxs("div", { children: [_jsx(Text, { strong: true, children: text }), _jsx("br", {}), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: record.phone })] })] })),
                                        },
                                        {
                                            title: "Estado",
                                            dataIndex: "status",
                                            key: "status",
                                            render: (status, record) => {
                                                if (status === "active") {
                                                    return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Tag, { color: "processing", icon: _jsx(PhoneOutlined, {}), children: "En llamada" }), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["con ", record.agent] })] }));
                                                }
                                                return (_jsx(Tag, { color: "warning", icon: _jsx(ClockCircleOutlined, {}), children: "En espera" }));
                                            },
                                        },
                                        {
                                            title: "Duración",
                                            dataIndex: "duration",
                                            key: "duration",
                                            render: (duration, record) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { children: duration }), record.startTime && (_jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["Inicio: ", record.startTime] }))] })),
                                        },
                                        {
                                            title: "Acciones",
                                            key: "actions",
                                            render: (_, record) => {
                                                if (record.status === "waiting") {
                                                    return (_jsx(Button, { type: "primary", icon: _jsx(PhoneOutlined, {}), onClick: () => handleStartCall(record), children: "Tomar llamada" }));
                                                }
                                                if (record.status === "active") {
                                                    return (_jsx(Button, { danger: true, onClick: handleEndCall, children: "Finalizar" }));
                                                }
                                                return null;
                                            },
                                        },
                                    ] }) }), _jsx(Card, { title: "Campa\u00F1as Activas", style: { marginTop: 16 }, children: _jsx(List, { dataSource: [
                                        {
                                            name: "Renovación Elite Q2",
                                            progress: 65,
                                            calls: 450,
                                            conversions: 72,
                                        },
                                        {
                                            name: "Recuperación 90 días",
                                            progress: 40,
                                            calls: 280,
                                            conversions: 35,
                                        },
                                    ], renderItem: (campaign) => (_jsx(List.Item, { children: _jsxs("div", { style: { width: "100%" }, children: [_jsxs(Space, { style: {
                                                        width: "100%",
                                                        justifyContent: "space-between",
                                                    }, children: [_jsx(Text, { strong: true, children: campaign.name }), _jsxs(Text, { type: "secondary", children: [campaign.calls, " llamadas \u2022 ", campaign.conversions, " conversiones"] })] }), _jsx(Progress, { percent: campaign.progress, size: "small" })] }) })) }) })] })] }), _jsx(Modal, { title: `Llamada con ${selectedCustomer?.customerName}`, visible: callModalVisible, onCancel: () => setCallModalVisible(false), footer: [
                    _jsx(Button, { danger: true, onClick: handleEndCall, children: "Finalizar Llamada" }, "end"),
                ], width: 800, children: _jsx(Tabs, { defaultActiveKey: "1", items: [
                        {
                            key: "1",
                            label: "Script",
                            children: (_jsxs(Timeline, { children: [_jsxs(Timeline.Item, { color: "green", children: [_jsx(Text, { strong: true, children: "Apertura" }), _jsx("br", {}), _jsx(Text, { children: "\"Hola [NOMBRE], soy [TU_NOMBRE] de LA Mattress Store. Le llamo porque veo que su suscripci\u00F3n Elite est\u00E1 por renovarse y tenemos una oferta especial para usted...\"" })] }), _jsxs(Timeline.Item, { children: [_jsx(Text, { strong: true, children: "Beneficios" }), _jsx("br", {}), _jsx(Text, { children: "\"Con la renovaci\u00F3n anticipada, puede ahorrar $400 este a\u00F1o y mantener todos sus beneficios...\"" })] }), _jsxs(Timeline.Item, { children: [_jsx(Text, { strong: true, children: "Cierre" }), _jsx("br", {}), _jsx(Text, { children: "\"\u00BFLe gustar\u00EDa aprovechar esta oferta exclusiva hoy?\"" })] })] })),
                        },
                        {
                            key: "2",
                            label: "Información del Cliente",
                            children: (_jsxs(Descriptions, { bordered: true, column: 2, children: [_jsx(Descriptions.Item, { label: "Nombre", children: selectedCustomer?.customerName }), _jsx(Descriptions.Item, { label: "Tel\u00E9fono", children: selectedCustomer?.phone }), _jsx(Descriptions.Item, { label: "Nivel", children: _jsx(Tag, { color: "gold", children: "Oro" }) }), _jsx(Descriptions.Item, { label: "\u00DAltima compra", children: "Hace 8 meses" }), _jsx(Descriptions.Item, { label: "Productos", span: 2, children: "Tempur-Pedic ProAdapt Queen" })] })),
                        },
                        {
                            key: "3",
                            label: "Notas",
                            children: (_jsx(Form.Item, { label: "Notas de la llamada", children: _jsx(Input.TextArea, { rows: 6, placeholder: "Escribe las notas aqu\u00ED..." }) })),
                        },
                    ] }) }), _jsx(Modal, { title: "Disposici\u00F3n de Llamada", visible: dispositionModalVisible, onCancel: () => setDispositionModalVisible(false), footer: null, children: _jsxs(Form, { onFinish: handleDisposition, layout: "vertical", children: [_jsx(Form.Item, { name: "disposition", label: "Resultado de la llamada", rules: [{ required: true, message: "Selecciona un resultado" }], children: _jsx(Radio.Group, { children: _jsxs(Space, { direction: "vertical", children: [_jsx(Radio, { value: "sale", children: "Venta realizada" }), _jsx(Radio, { value: "interested", children: "Interesado - Llamar despu\u00E9s" }), _jsx(Radio, { value: "not_interested", children: "No interesado" }), _jsx(Radio, { value: "no_answer", children: "No contest\u00F3" }), _jsx(Radio, { value: "wrong_number", children: "N\u00FAmero equivocado" })] }) }) }), _jsx(Form.Item, { name: "notes", label: "Notas adicionales", children: _jsx(Input.TextArea, { rows: 3 }) }), _jsx(Form.Item, { children: _jsxs(Space, { children: [_jsx(Button, { type: "primary", htmlType: "submit", children: "Guardar" }), _jsx(Button, { onClick: () => setDispositionModalVisible(false), children: "Cancelar" })] }) })] }) })] }));
};
