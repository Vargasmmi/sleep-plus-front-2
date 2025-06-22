import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, Typography, Space, Button, message, Alert, Table, Badge, Tooltip, Row, Col, Divider } from "antd";
import { CopyOutlined, ApiOutlined, CheckCircleOutlined, LinkOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useList } from "@refinedev/core";
const { Title, Text } = Typography;
export const WebhookSettings = () => {
    const [copiedId, setCopiedId] = useState(null);
    // Get the current domain
    const baseUrl = window.location.origin;
    const serverUrl = baseUrl.replace('5173', '3001'); // Assuming server runs on 3001
    const { data: webhookEventsData, isLoading } = useList({
        resource: "webhookEvents",
    });
    const webhookEvents = webhookEventsData?.data || [];
    const handleCopy = (url, eventId) => {
        navigator.clipboard.writeText(url);
        setCopiedId(eventId);
        message.success('URL copiada al portapapeles');
        // Reset copied state after 2 seconds
        setTimeout(() => {
            setCopiedId(null);
        }, 2000);
    };
    const getFullUrl = (endpoint) => {
        return `${serverUrl}${endpoint}`;
    };
    const columns = [
        {
            title: "Evento",
            dataIndex: "event",
            key: "event",
            render: (value) => (_jsxs(Space, { children: [_jsx(ApiOutlined, {}), _jsx(Text, { strong: true, children: value })] })),
        },
        {
            title: "Descripción",
            dataIndex: "description",
            key: "description",
            width: 300,
        },
        {
            title: "Estado",
            dataIndex: "enabled",
            key: "enabled",
            width: 100,
            render: (value) => (_jsx(Badge, { status: value ? "success" : "default", text: value ? "Activo" : "Inactivo" })),
        },
        {
            title: "URL del Webhook",
            key: "url",
            render: (_, record) => {
                const url = getFullUrl(record.endpoint);
                const isCopied = copiedId === record.id;
                return (_jsx(Space, { direction: "vertical", style: { width: '100%' }, children: _jsxs(Space, { children: [_jsx(Text, { code: true, style: { fontSize: 12 }, children: url }), _jsx(Tooltip, { title: isCopied ? "¡Copiado!" : "Copiar URL", children: _jsx(Button, { size: "small", icon: isCopied ? _jsx(CheckCircleOutlined, {}) : _jsx(CopyOutlined, {}), onClick: () => handleCopy(url, record.id), type: isCopied ? "primary" : "default" }) })] }) }));
            },
        },
    ];
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsx(Title, { level: 2, children: "Configuraci\u00F3n de Webhooks" }), _jsx(Alert, { message: "Informaci\u00F3n Importante", description: _jsxs(Space, { direction: "vertical", children: [_jsx(Text, { children: "Los webhooks permiten que Shopify notifique a tu aplicaci\u00F3n cuando ocurren eventos importantes. Copia las URLs a continuaci\u00F3n y config\u00FAralas en tu panel de administraci\u00F3n de Shopify." }), _jsx(Text, { type: "secondary", children: "Nota: Aseg\u00FArate de que tu servidor est\u00E9 accesible desde Internet para recibir webhooks de Shopify." })] }), type: "info", showIcon: true, icon: _jsx(InfoCircleOutlined, {}), style: { marginBottom: 24 } }), _jsx(Row, { gutter: [16, 16], children: _jsx(Col, { span: 24, children: _jsx(Card, { children: _jsxs(Space, { direction: "vertical", style: { width: '100%' }, size: "large", children: [_jsxs("div", { children: [_jsx(Title, { level: 4, children: "URL Base del Servidor" }), _jsxs(Space, { children: [_jsx(Text, { code: true, style: { fontSize: 16 }, children: serverUrl }), _jsx(Button, { icon: _jsx(CopyOutlined, {}), onClick: () => {
                                                        navigator.clipboard.writeText(serverUrl);
                                                        message.success('URL base copiada');
                                                    }, children: "Copiar" })] })] }), _jsx(Divider, {}), _jsxs("div", { children: [_jsx(Title, { level: 4, children: "Endpoints de Webhook Disponibles" }), _jsx(Table, { dataSource: webhookEvents, columns: columns, loading: isLoading, rowKey: "id", pagination: false })] })] }) }) }) }), _jsxs(Row, { gutter: [16, 16], style: { marginTop: 24 }, children: [_jsx(Col, { xs: 24, lg: 12, children: _jsx(Card, { title: "C\u00F3mo configurar en Shopify", children: _jsxs("ol", { children: [_jsx("li", { children: _jsx(Text, { children: "Ve a tu Admin de Shopify" }) }), _jsx("li", { children: _jsx(Text, { children: "Navega a Settings \u2192 Notifications" }) }), _jsx("li", { children: _jsx(Text, { children: "Despl\u00E1zate hasta \"Webhooks\"" }) }), _jsx("li", { children: _jsx(Text, { children: "Haz clic en \"Create webhook\"" }) }), _jsx("li", { children: _jsx(Text, { children: "Selecciona el evento que deseas monitorear" }) }), _jsx("li", { children: _jsx(Text, { children: "Pega la URL correspondiente de arriba" }) }), _jsx("li", { children: _jsx(Text, { children: "Selecciona formato JSON" }) }), _jsx("li", { children: _jsx(Text, { children: "Guarda el webhook" }) })] }) }) }), _jsx(Col, { xs: 24, lg: 12, children: _jsx(Card, { title: "Verificaci\u00F3n de Webhooks", children: _jsxs(Space, { direction: "vertical", style: { width: '100%' }, children: [_jsx(Alert, { message: "Seguridad", description: "En producci\u00F3n, siempre verifica la firma HMAC de los webhooks para asegurar que provienen de Shopify.", type: "warning", showIcon: true }), _jsxs("div", { children: [_jsx(Title, { level: 5, children: "Headers importantes:" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx(Text, { code: true, children: "X-Shopify-Topic" }), " - El tipo de evento"] }), _jsxs("li", { children: [_jsx(Text, { code: true, children: "X-Shopify-Shop-Domain" }), " - Tu dominio de Shopify"] }), _jsxs("li", { children: [_jsx(Text, { code: true, children: "X-Shopify-Webhook-Id" }), " - ID \u00FAnico del webhook"] }), _jsxs("li", { children: [_jsx(Text, { code: true, children: "X-Shopify-Hmac-Sha256" }), " - Firma para verificaci\u00F3n"] })] })] })] }) }) })] }), _jsx(Row, { gutter: [16, 16], style: { marginTop: 24 }, children: _jsx(Col, { span: 24, children: _jsx(Card, { title: "Endpoint Gen\u00E9rico", children: _jsxs(Space, { direction: "vertical", style: { width: '100%' }, children: [_jsx(Text, { children: "Tambi\u00E9n puedes usar el endpoint gen\u00E9rico para cualquier evento de Shopify:" }), _jsxs(Space, { children: [_jsxs(Text, { code: true, style: { fontSize: 14 }, children: [serverUrl, "/api/webhooks/shopify/[NOMBRE_DEL_EVENTO]"] }), _jsx(Button, { size: "small", icon: _jsx(CopyOutlined, {}), onClick: () => {
                                                const genericUrl = `${serverUrl}/api/webhooks/shopify/[NOMBRE_DEL_EVENTO]`;
                                                navigator.clipboard.writeText(genericUrl);
                                                message.success('URL genérica copiada');
                                            } })] }), _jsx(Text, { type: "secondary", children: "Reemplaza [NOMBRE_DEL_EVENTO] con el evento que deseas capturar, por ejemplo: orders/create" })] }) }) }) }), _jsx(Row, { gutter: [16, 16], style: { marginTop: 24 }, children: _jsx(Col, { span: 24, children: _jsx(Card, { title: "Prueba de Webhooks", children: _jsxs(Space, { direction: "vertical", style: { width: '100%' }, children: [_jsx(Text, { children: "Puedes probar los webhooks usando herramientas como:" }), _jsxs("ul", { children: [_jsx("li", { children: _jsxs(Space, { children: [_jsx(LinkOutlined, {}), _jsx(Text, { children: "Postman - Para enviar requests HTTP" })] }) }), _jsx("li", { children: _jsxs(Space, { children: [_jsx(LinkOutlined, {}), _jsx(Text, { children: "ngrok - Para exponer tu servidor local a Internet" })] }) }), _jsx("li", { children: _jsxs(Space, { children: [_jsx(LinkOutlined, {}), _jsx(Text, { children: "Webhook.site - Para debugging de webhooks" })] }) })] }), _jsx(Alert, { message: "Tip para desarrollo", description: "Usa ngrok para exponer tu servidor local: ngrok http 3001", type: "info" })] }) }) }) })] }));
};
