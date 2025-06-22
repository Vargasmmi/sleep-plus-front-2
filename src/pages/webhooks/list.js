import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { List, useTable, DateField, ShowButton } from "@refinedev/antd";
import { Table, Tag, Space, Typography, Badge, Button, Card, Row, Col, Statistic, Progress, Tooltip } from "antd";
import { ApiOutlined, CheckCircleOutlined, CloseCircleOutlined, SyncOutlined, ClockCircleOutlined, ExclamationCircleOutlined, ReloadOutlined, SettingOutlined } from "@ant-design/icons";
import { webhookService } from "../../services/webhookService";
import { useNotification, useNavigation } from "@refinedev/core";
import dayjs from "dayjs";
const { Text } = Typography;
export const WebhookList = () => {
    const { tableProps, tableQueryResult } = useTable({
        resource: "webhooks",
        sorters: {
            initial: [{ field: "receivedAt", order: "desc" }],
        },
    });
    const { open } = useNotification();
    const { push } = useNavigation();
    const [retryingIds, setRetryingIds] = useState([]);
    const getStatusConfig = (status) => {
        const configs = {
            pending: {
                color: "processing",
                icon: _jsx(ClockCircleOutlined, {}),
                text: "Pending"
            },
            processed: {
                color: "success",
                icon: _jsx(CheckCircleOutlined, {}),
                text: "Processed"
            },
            failed: {
                color: "error",
                icon: _jsx(CloseCircleOutlined, {}),
                text: "Failed"
            },
            retrying: {
                color: "warning",
                icon: _jsx(SyncOutlined, { spin: true }),
                text: "Retrying"
            },
        };
        return configs[status] || { color: "default", icon: null, text: status };
    };
    const getEventColor = (event) => {
        if (event.includes("create"))
            return "green";
        if (event.includes("update"))
            return "blue";
        if (event.includes("delete"))
            return "red";
        return "default";
    };
    const handleRetry = async (webhookId) => {
        setRetryingIds([...retryingIds, webhookId]);
        try {
            await webhookService.retryWebhook(webhookId);
            open?.({
                type: "success",
                message: "Webhook resent",
                description: "The webhook is being processed again",
            });
            tableQueryResult.refetch();
        }
        catch (error) {
            open?.({
                type: "error",
                message: "Error resending",
                description: error.message || "Could not resend the webhook",
            });
        }
        finally {
            setRetryingIds(retryingIds.filter(id => id !== webhookId));
        }
    };
    // Calculate statistics
    const webhooks = tableProps.dataSource || [];
    const stats = {
        total: webhooks.length,
        processed: webhooks.filter(w => w.status === "processed").length,
        failed: webhooks.filter(w => w.status === "failed").length,
        pending: webhooks.filter(w => w.status === "pending").length,
    };
    const successRate = stats.total > 0 ? (stats.processed / stats.total) * 100 : 0;
    const columns = [
        {
            title: "Date",
            dataIndex: "receivedAt",
            key: "receivedAt",
            width: 180,
            render: (value) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(DateField, { value: value, format: "DD/MM/YYYY HH:mm:ss" }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: dayjs(value).fromNow() })] })),
        },
        {
            title: "Source",
            dataIndex: "source",
            key: "source",
            width: 100,
            render: (value) => (_jsx(Tag, { color: value === "shopify" ? "blue" : "default", children: value.toUpperCase() })),
        },
        {
            title: "Event",
            dataIndex: "event",
            key: "event",
            width: 200,
            render: (value) => (_jsx(Tag, { color: getEventColor(value), children: value })),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 150,
            render: (value) => {
                const config = getStatusConfig(value);
                return (_jsx(Badge, { status: config.color, text: _jsxs(Space, { children: [config.icon, config.text] }) }));
            },
        },
        {
            title: "Attempts",
            dataIndex: "attempts",
            key: "attempts",
            width: 100,
            render: (value, record) => (_jsxs(Space, { children: [_jsx(Text, { children: value }), record.status === "failed" && value >= 3 && (_jsx(Tooltip, { title: "Maximum attempts reached", children: _jsx(ExclamationCircleOutlined, { style: { color: "#ff4d4f" } }) }))] })),
        },
        {
            title: "Processed",
            dataIndex: "processedAt",
            key: "processedAt",
            width: 180,
            render: (value) => value ? _jsx(DateField, { value: value, format: "DD/MM/YYYY HH:mm:ss" }) : "-",
        },
        {
            title: "Response/Error",
            key: "response",
            render: (_, record) => {
                if (record.response) {
                    return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Tag, { color: "green", children: ["HTTP ", record.response.status] }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: record.response.message })] }));
                }
                if (record.error) {
                    return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Tag, { color: "red", children: record.error.code }), _jsx(Text, { type: "danger", style: { fontSize: 12 }, children: record.error.message })] }));
                }
                return "-";
            },
        },
        {
            title: "Actions",
            key: "actions",
            width: 150,
            fixed: "right",
            render: (_, record) => (_jsxs(Space, { children: [_jsx(ShowButton, { hideText: true, size: "small", recordItemId: record.id }), record.status === "failed" && record.attempts < 3 && (_jsx(Button, { size: "small", icon: _jsx(ReloadOutlined, { spin: retryingIds.includes(record.id) }), onClick: () => handleRetry(record.id), loading: retryingIds.includes(record.id), children: "Retry" }))] })),
        },
    ];
    return (_jsxs(_Fragment, { children: [_jsxs(Row, { gutter: [16, 16], style: { marginBottom: 16 }, children: [_jsx(Col, { xs: 24, sm: 12, md: 6, children: _jsx(Card, { children: _jsx(Statistic, { title: "Total Webhooks", value: stats.total, prefix: _jsx(ApiOutlined, {}) }) }) }), _jsx(Col, { xs: 24, sm: 12, md: 6, children: _jsx(Card, { children: _jsx(Statistic, { title: "Processed", value: stats.processed, prefix: _jsx(CheckCircleOutlined, {}), valueStyle: { color: "#3f8600" } }) }) }), _jsx(Col, { xs: 24, sm: 12, md: 6, children: _jsx(Card, { children: _jsx(Statistic, { title: "Failed", value: stats.failed, prefix: _jsx(CloseCircleOutlined, {}), valueStyle: { color: "#cf1322" } }) }) }), _jsx(Col, { xs: 24, sm: 12, md: 6, children: _jsx(Card, { children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Text, { children: "Success Rate" }), _jsx(Progress, { percent: Number(successRate.toFixed(1)), status: successRate >= 90 ? "success" : successRate >= 70 ? "normal" : "exception" })] }) }) })] }), _jsx(List, { title: "Webhook History", headerProps: {
                    extra: (_jsx(Button, { type: "primary", icon: _jsx(SettingOutlined, {}), onClick: () => push("/webhooks/settings"), children: "Configure Webhooks" })),
                }, children: _jsx(Table, { ...tableProps, columns: columns, rowKey: "id", scroll: { x: 1400 }, rowClassName: (record) => {
                        if (record.status === "failed")
                            return "webhook-failed-row";
                        if (record.status === "pending")
                            return "webhook-pending-row";
                        return "";
                    }, pagination: {
                        ...tableProps.pagination,
                        showSizeChanger: true,
                        showTotal: (total) => `Total: ${total} webhooks`,
                    } }) }), _jsx("style", { children: `
        .webhook-failed-row {
          background-color: #fff1f0;
        }
        .webhook-pending-row {
          background-color: #fff7e6;
        }
      ` })] }));
};
