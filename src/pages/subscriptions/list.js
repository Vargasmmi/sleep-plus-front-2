import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { List, useTable, DateField, ShowButton, EditButton, FilterDropdown, getDefaultSortOrder, } from "@refinedev/antd";
import { Table, Space, Tag, Input, Select, Button, Progress, Tooltip, Typography } from "antd";
import { CreditCardOutlined, UserOutlined, CalendarOutlined, DollarOutlined, CheckCircleOutlined, CloseCircleOutlined, PauseCircleOutlined, BankOutlined, LinkOutlined, SyncOutlined } from "@ant-design/icons";
import { useMany, useNotification } from "@refinedev/core";
import dayjs from "dayjs";
// TODO: Uncomment when services are migrated
// import subscriptionService from "../../services/subscriptionService";
// import SubscriptionStripeDashboard from '../../components/SubscriptionStripeDashboard';
const { Text } = Typography;
export const SubscriptionList = () => {
    const { open } = useNotification();
    const { tableProps, filters, sorters } = useTable({
        syncWithLocation: true,
        sorters: {
            initial: [
                {
                    field: "createdAt",
                    order: "desc",
                },
            ],
        },
    });
    // Fetch customers for subscriptions
    const customerIds = tableProps?.dataSource?.map((item) => item.customerId) ?? [];
    const { data: customersData } = useMany({
        resource: "customers",
        ids: customerIds,
        queryOptions: {
            enabled: customerIds.length > 0,
        },
    });
    const customersMap = React.useMemo(() => {
        const map = {};
        customersData?.data?.forEach((customer) => {
            map[customer.id] = customer;
        });
        return map;
    }, [customersData]);
    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "green";
            case "paused":
                return "orange";
            case "cancelled":
                return "red";
            case "pending":
                return "blue";
            default:
                return "default";
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case "active":
                return _jsx(CheckCircleOutlined, {});
            case "paused":
                return _jsx(PauseCircleOutlined, {});
            case "cancelled":
                return _jsx(CloseCircleOutlined, {});
            default:
                return _jsx(CalendarOutlined, {});
        }
    };
    const getPlanColor = (plan) => {
        switch (plan) {
            case "elite":
                return "purple";
            case "premium":
                return "blue";
            case "basic":
                return "default";
            default:
                return "default";
        }
    };
    const getPaymentMethodIcon = (paymentMethod) => {
        switch (paymentMethod) {
            case "stripe":
                return _jsx(CreditCardOutlined, { style: { color: "#635bff" } });
            case "card":
                return _jsx(CreditCardOutlined, {});
            case "ach":
                return _jsx(BankOutlined, {});
            case "cash":
                return _jsx(DollarOutlined, {});
            default:
                return _jsx(CreditCardOutlined, {});
        }
    };
    const getPaymentMethodLabel = (paymentMethod) => {
        // TODO: Use subscriptionService when migrated
        // return subscriptionService.getPaymentMethodLabel(paymentMethod);
        switch (paymentMethod) {
            case "stripe":
                return "Stripe";
            case "card":
                return "Tarjeta";
            case "ach":
                return "ACH";
            case "cash":
                return "Efectivo";
            default:
                return paymentMethod;
        }
    };
    const isStripeSubscription = (subscription) => {
        // TODO: Use subscriptionService when migrated
        // return subscriptionService.isStripeSubscription(subscription);
        return subscription.billing?.paymentMethod === "stripe" ||
            !!subscription.billing?.stripeSubscriptionId;
    };
    const handleSyncWithStripe = async () => {
        const hide = open?.({
            type: 'progress',
            message: 'Sincronizando con Stripe...',
            undoableTimeout: 0,
        });
        try {
            // TODO: Implement when subscriptionService is migrated
            // const result = await subscriptionService.syncWithStripe();
            hide?.();
            open?.({
                type: "success",
                message: 'Función no implementada',
                description: 'El servicio de sincronización con Stripe aún no está disponible',
            });
        }
        catch (error) {
            hide?.();
            open?.({
                type: 'error',
                message: 'Error sincronizando',
                description: error.message,
            });
        }
    };
    const handlePauseSubscription = async (subscriptionId) => {
        try {
            // TODO: Implement when subscriptionService is migrated
            // await subscriptionService.pauseSubscription(subscriptionId, 'Pausado por usuario');
            open?.({
                type: "success",
                message: 'Función no implementada',
                description: 'El servicio de pausa de suscripción aún no está disponible',
            });
        }
        catch (error) {
            open?.({
                type: 'error',
                message: 'Error pausando suscripción',
                description: error.message,
            });
        }
    };
    const handleResumeSubscription = async (subscriptionId) => {
        try {
            // TODO: Implement when subscriptionService is migrated
            // await subscriptionService.resumeSubscription(subscriptionId);
            open?.({
                type: "success",
                message: 'Función no implementada',
                description: 'El servicio de reactivación de suscripción aún no está disponible',
            });
        }
        catch (error) {
            open?.({
                type: 'error',
                message: 'Error reactivando suscripción',
                description: error.message,
            });
        }
    };
    return (_jsx("div", { children: _jsx(List, { headerButtons: [
                _jsx(Button, { type: "primary", icon: _jsx(SyncOutlined, {}), onClick: handleSyncWithStripe, children: "Sincronizar con Stripe" }, "sync-stripe")
            ], children: _jsxs(Table, { ...tableProps, rowKey: "id", children: [_jsx(Table.Column, { title: "Cliente", dataIndex: "customerId", render: (customerId) => {
                            const customer = customersMap[customerId];
                            if (!customer)
                                return _jsx(Text, { children: "-" });
                            return (_jsxs(Space, { children: [_jsx(UserOutlined, {}), _jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { strong: true, children: [customer.firstName, " ", customer.lastName] }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: customer.phone })] })] }));
                        }, filterDropdown: (props) => (_jsx(FilterDropdown, { ...props, children: _jsx(Input, { placeholder: "Buscar cliente..." }) })) }, "customer"), _jsx(Table.Column, { title: "Plan", dataIndex: "plan", render: (plan) => (_jsx(Tag, { color: getPlanColor(plan), icon: _jsx(CreditCardOutlined, {}), children: plan?.toUpperCase() })), filterDropdown: (props) => (_jsx(FilterDropdown, { ...props, children: _jsx(Select, { placeholder: "Seleccionar plan", style: { width: 150 }, options: [
                                    { value: "basic", label: "Basic" },
                                    { value: "premium", label: "Premium" },
                                    { value: "elite", label: "Elite" },
                                ] }) })) }, "plan"), _jsx(Table.Column, { title: "Estado", dataIndex: "status", render: (status) => (_jsx(Tag, { color: getStatusColor(status), icon: getStatusIcon(status), children: status?.toUpperCase() })), filterDropdown: (props) => (_jsx(FilterDropdown, { ...props, children: _jsx(Select, { placeholder: "Seleccionar estado", style: { width: 150 }, options: [
                                    { value: "active", label: "Activo" },
                                    { value: "paused", label: "Pausado" },
                                    { value: "cancelled", label: "Cancelado" },
                                    { value: "pending", label: "Pendiente" },
                                ] }) })) }, "status"), _jsx(Table.Column, { title: "Precio", render: (_, record) => {
                            if (!record.pricing) {
                                return _jsx(Text, { children: "-" });
                            }
                            return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { strong: true, children: ["$", record.pricing.monthly || 0, "/mes"] }), record.billing?.frequency === "annual" && record.pricing.annual && (_jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["$", record.pricing.annual, "/a\u00F1o"] }))] }));
                        }, sorter: true }, "pricing"), _jsx(Table.Column, { title: "M\u00E9todo de Pago", render: (_, record) => {
                            if (!record.billing?.paymentMethod) {
                                return _jsx(Text, { children: "-" });
                            }
                            const isStripe = isStripeSubscription(record);
                            return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Space, { children: [getPaymentMethodIcon(record.billing.paymentMethod), _jsx(Text, { children: getPaymentMethodLabel(record.billing.paymentMethod) }), isStripe && (_jsxs(Tag, { color: "purple", style: { fontSize: '11px' }, children: [_jsx(LinkOutlined, {}), " Stripe"] }))] }), record.billing.lastFour && (_jsxs(Text, { type: "secondary", style: { fontSize: 11 }, children: ["****", record.billing.lastFour] })), isStripe && record.billing.stripeSubscriptionId && (_jsx(Tooltip, { title: `ID Stripe: ${record.billing.stripeSubscriptionId}`, children: _jsxs(Text, { type: "secondary", style: { fontSize: 10, fontFamily: 'monospace' }, children: [record.billing.stripeSubscriptionId.substring(0, 12), "..."] }) }))] }));
                        }, filterDropdown: (props) => (_jsx(FilterDropdown, { ...props, children: _jsx(Select, { placeholder: "M\u00E9todo de pago", style: { width: 150 }, options: [
                                    { value: "stripe", label: "Stripe" },
                                    { value: "card", label: "Tarjeta" },
                                    { value: "ach", label: "ACH" },
                                    { value: "cash", label: "Efectivo" },
                                ] }) })) }, "paymentMethod"), _jsx(Table.Column, { title: "Pr\u00F3ximo Cobro", dataIndex: ["billing", "nextBillingDate"], render: (date) => {
                            const daysUntil = dayjs(date).diff(dayjs(), "days");
                            return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(DateField, { value: date, format: "DD/MM/YYYY" }), daysUntil >= 0 && daysUntil <= 7 && (_jsxs(Tag, { color: "warning", style: { fontSize: 11 }, children: ["En ", daysUntil, " d\u00EDas"] }))] }));
                        }, sorter: true, defaultSortOrder: getDefaultSortOrder("billing.nextBillingDate", sorters) }, "nextBilling"), _jsx(Table.Column, { title: "Servicios", render: (_, record) => {
                            if (!record.services) {
                                return _jsx(Text, { children: "-" });
                            }
                            return (_jsxs(Space, { direction: "vertical", size: "small", children: [_jsx(Tooltip, { title: "Limpiezas utilizadas", children: _jsxs(Space, { children: [_jsx(Text, { children: "Limpiezas:" }), _jsx(Progress, { percent: (record.services.cleaningsUsed / record.services.cleaningsTotal) * 100, steps: record.services.cleaningsTotal, size: "small", showInfo: false }), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: [record.services.cleaningsUsed, "/", record.services.cleaningsTotal] })] }) }), record.services.inspectionsTotal > 0 && (_jsx(Tooltip, { title: "Inspecciones utilizadas", children: _jsxs(Space, { children: [_jsx(Text, { children: "Inspecciones:" }), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: [record.services.inspectionsUsed, "/", record.services.inspectionsTotal] })] }) }))] }));
                        } }, "services"), _jsx(Table.Column, { title: "Cr\u00E9ditos", render: (_, record) => {
                            if (!record.credits) {
                                return _jsx(Text, { children: "-" });
                            }
                            return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Tooltip, { title: "Cr\u00E9ditos acumulados", children: _jsxs(Tag, { color: "green", children: [_jsx(DollarOutlined, {}), " ", record.credits.accumulated || 0] }) }), record.credits.expiration && (_jsxs(Text, { type: "secondary", style: { fontSize: 11 }, children: ["Exp: ", dayjs(record.credits.expiration).format("DD/MM/YY")] }))] }));
                        } }, "credits"), _jsx(Table.Column, { title: "Inicio", dataIndex: "startDate", render: (date) => _jsx(DateField, { value: date, format: "DD/MM/YYYY" }), sorter: true }, "startDate"), _jsx(Table.Column, { title: "Acciones", dataIndex: "actions", fixed: "right", render: (_, record) => (_jsxs(Space, { children: [_jsx(ShowButton, { hideText: true, size: "small", recordItemId: record.id }), _jsx(EditButton, { hideText: true, size: "small", recordItemId: record.id }), record.status === "active" && (_jsx(Tooltip, { title: "Pausar suscripci\u00F3n", children: _jsx(Button, { size: "small", icon: _jsx(PauseCircleOutlined, {}), onClick: () => handlePauseSubscription(record.id) }) })), record.status === "paused" && (_jsx(Tooltip, { title: "Reanudar suscripci\u00F3n", children: _jsx(Button, { size: "small", type: "primary", icon: _jsx(CheckCircleOutlined, {}), onClick: () => handleResumeSubscription(record.id) }) })), isStripeSubscription(record) && (_jsx(Tooltip, { title: "Sincronizar con Stripe", children: _jsx(Button, { size: "small", icon: _jsx(SyncOutlined, {}), onClick: handleSyncWithStripe }) }))] })) }, "actions")] }) }) }));
};
