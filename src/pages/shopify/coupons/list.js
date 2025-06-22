import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { List, useTable, ShowButton, EditButton, DateField, CreateButton } from "@refinedev/antd";
import { Table, Space, Tag, Button, Typography, Progress, Tooltip, Badge } from "antd";
import { TagOutlined, SyncOutlined, CopyOutlined, PercentageOutlined, DollarOutlined, GiftOutlined } from "@ant-design/icons";
import { useNotification, useInvalidate } from "@refinedev/core";
import { shopifyService } from "../../../services/shopifyService";
const { Text } = Typography;
export const ShopifyCouponList = () => {
    const { tableProps } = useTable({
        resource: "shopifyCoupons",
        sorters: {
            initial: [{ field: "createdAt", order: "desc" }],
        },
    });
    const { open } = useNotification();
    const invalidate = useInvalidate();
    const [syncLoading, setSyncLoading] = useState(false);
    const handleSync = async () => {
        setSyncLoading(true);
        try {
            await shopifyService.syncCoupons();
            open?.({
                type: "success",
                message: "Sincronización completada",
                description: "Los cupones se han sincronizado con Shopify",
            });
            // Refrescar la tabla
            invalidate({
                resource: "shopifyCoupons",
                invalidates: ["list"],
            });
        }
        catch (error) {
            open?.({
                type: "error",
                message: "Error al sincronizar",
                description: error.message || "No se pudieron sincronizar los cupones",
            });
        }
        finally {
            setSyncLoading(false);
        }
    };
    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        open?.({
            type: "success",
            message: "Código copiado",
            description: `El código ${code} se ha copiado al portapapeles`,
        });
    };
    const getDiscountIcon = (type) => {
        switch (type) {
            case "percentage":
                return _jsx(PercentageOutlined, {});
            case "fixed_amount":
                return _jsx(DollarOutlined, {});
            case "free_shipping":
                return _jsx(GiftOutlined, {});
            default:
                return _jsx(TagOutlined, {});
        }
    };
    const columns = [
        {
            title: "Cupón",
            key: "coupon",
            render: (_, record) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { strong: true, children: record.title }), _jsx(Space, { size: 4, children: _jsxs(Tag, { color: "blue", style: { cursor: "pointer" }, onClick: () => handleCopyCode(record.code), children: [_jsx(CopyOutlined, {}), " ", record.code] }) })] })),
        },
        {
            title: "Tipo",
            key: "type",
            width: 150,
            render: (_, record) => (_jsxs(Space, { children: [getDiscountIcon(record.discountType), _jsx(Text, { children: record.discountType === "percentage"
                            ? `${record.value}%`
                            : record.discountType === "fixed_amount"
                                ? `$${record.value}`
                                : "Envío Gratis" })] })),
        },
        {
            title: "Estado",
            dataIndex: "status",
            key: "status",
            width: 120,
            render: (value) => {
                const config = {
                    active: { color: "green", text: "Activo" },
                    expired: { color: "red", text: "Expirado" },
                    disabled: { color: "default", text: "Desactivado" },
                };
                return _jsx(Tag, { color: config[value]?.color, children: config[value]?.text });
            },
        },
        {
            title: "Uso",
            key: "usage",
            width: 150,
            render: (_, record) => {
                if (!record.usageLimit) {
                    return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { children: [record.usageCount, " usos"] }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: "Sin l\u00EDmite" })] }));
                }
                const percentage = (record.usageCount / record.usageLimit) * 100;
                return (_jsx(Tooltip, { title: `${record.usageCount} de ${record.usageLimit} usos`, children: _jsxs("div", { style: { width: 100 }, children: [_jsx(Progress, { percent: percentage, size: "small", status: percentage >= 90 ? "exception" : "active" }), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: [record.usageCount, "/", record.usageLimit] })] }) }));
            },
        },
        {
            title: "Aplica a",
            dataIndex: "appliesTo",
            key: "appliesTo",
            width: 150,
            render: (value) => {
                const labels = {
                    all_products: "Todos los productos",
                    specific_products: "Productos específicos",
                    specific_collections: "Colecciones específicas",
                };
                return _jsx(Text, { children: labels[value] });
            },
        },
        {
            title: "Requisito",
            key: "requirement",
            width: 150,
            render: (_, record) => {
                if (record.minimumRequirement.type === "none")
                    return "-";
                if (record.minimumRequirement.type === "minimum_amount") {
                    return _jsxs(Text, { children: ["M\u00EDnimo $", record.minimumRequirement.value] });
                }
                return _jsxs(Text, { children: ["M\u00EDnimo ", record.minimumRequirement.value, " items"] });
            },
        },
        {
            title: "Vigencia",
            key: "validity",
            width: 200,
            render: (_, record) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["Desde: ", _jsx(DateField, { value: record.startsAt, format: "DD/MM/YYYY" })] }), record.endsAt && (_jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["Hasta: ", _jsx(DateField, { value: record.endsAt, format: "DD/MM/YYYY" })] }))] })),
        },
        {
            title: "Acciones",
            key: "actions",
            width: 150,
            fixed: "right",
            render: (_, record) => (_jsxs(Space, { children: [_jsx(ShowButton, { hideText: true, size: "small", recordItemId: record.id }), _jsx(EditButton, { hideText: true, size: "small", recordItemId: record.id }), _jsx(Button, { size: "small", icon: _jsx(TagOutlined, {}), onClick: () => window.open?.(`https://tu-tienda.myshopify.com/admin/discounts/${record.shopifyId}`, "_blank") })] })),
        },
    ];
    return (_jsx(List, { title: "Cupones de Shopify", headerProps: {
            extra: (_jsxs(Space, { children: [_jsx(CreateButton, {}), _jsx(Button, { type: "primary", icon: _jsx(SyncOutlined, { spin: syncLoading }), onClick: handleSync, loading: syncLoading, children: "Sincronizar con Shopify" })] })),
        }, children: _jsx(Table, { ...tableProps, columns: columns, rowKey: "id", scroll: { x: 1400 }, expandable: {
                expandedRowRender: (record) => (_jsx("div", { style: { padding: 16 }, children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsxs("div", { children: [_jsx(Text, { strong: true, children: "Elegibilidad de Cliente:" }), _jsxs(Text, { children: [" ", record.customerEligibility === "all" ? "Todos los clientes" :
                                                record.customerEligibility === "specific_customers" ? "Clientes específicos" :
                                                    "Grupos de clientes"] })] }), record.oncePerCustomer && (_jsx("div", { children: _jsx(Badge, { status: "warning", text: "Una vez por cliente" }) })), record.targetSelection && record.targetSelection.length > 0 && (_jsxs("div", { children: [_jsx(Text, { strong: true, children: "Productos/Colecciones objetivo:" }), _jsx("div", { style: { marginTop: 8 }, children: record.targetSelection.map((target, index) => (_jsx(Tag, { style: { marginBottom: 4 }, children: target }, index))) })] })), _jsx("div", { children: _jsxs(Space, { children: [_jsx(Text, { strong: true, children: "ID de Shopify:" }), _jsx(Text, { copyable: true, children: record.shopifyId })] }) }), _jsx("div", { children: _jsxs(Space, { children: [_jsx(Text, { strong: true, children: "Creado:" }), _jsx(DateField, { value: record.createdAt, format: "DD/MM/YYYY HH:mm" })] }) })] }) })),
            } }) }));
};
