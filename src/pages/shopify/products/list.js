import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { List, useTable, EditButton, ShowButton, DateField } from "@refinedev/antd";
import { Table, Space, Tag, Button, Image, Typography, InputNumber, message } from "antd";
import { ShoppingOutlined, SyncOutlined } from "@ant-design/icons";
import { useNotification, useInvalidate } from "@refinedev/core";
import { shopifyService } from "../../../services/shopifyService";
const { Text } = Typography;
export const ShopifyProductList = () => {
    const { tableProps } = useTable({
        resource: "shopifyProducts",
        sorters: {
            initial: [{ field: "updatedAt", order: "desc" }],
        },
    });
    const { open } = useNotification();
    const invalidate = useInvalidate();
    const [syncLoading, setSyncLoading] = useState(false);
    const handleSync = async () => {
        setSyncLoading(true);
        try {
            await shopifyService.syncProducts();
            open?.({
                type: "success",
                message: "Sincronización completada",
                description: "Los productos se han sincronizado con Shopify",
            });
            // Refrescar la tabla
            invalidate({
                resource: "shopifyProducts",
                invalidates: ["list"],
            });
        }
        catch (error) {
            open?.({
                type: "error",
                message: "Error al sincronizar",
                description: error.message || "No se pudieron sincronizar los productos",
            });
        }
        finally {
            setSyncLoading(false);
        }
    };
    const handleQuickPriceUpdate = () => {
        message.success(`Precio actualizado a $${newPrice.toFixed(2)}`);
    };
    const columns = [
        {
            title: "Imagen",
            dataIndex: ["images"],
            key: "images",
            width: 80,
            render: (images) => (images && images.length > 0 ? (_jsx(Image, { src: images[0].src, alt: images[0].alt, width: 60, height: 60, style: { objectFit: "cover", borderRadius: 4 }, preview: false })) : (_jsx("div", { style: { width: 60, height: 60, backgroundColor: "#f0f0f0", borderRadius: 4 } }))),
        },
        {
            title: "Producto",
            dataIndex: "title",
            key: "title",
            render: (value, record) => (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { strong: true, children: value }), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["SKU: ", record.variants?.[0]?.sku || "N/A"] })] })),
        },
        {
            title: "Estado",
            dataIndex: "status",
            key: "status",
            width: 120,
            render: (value) => {
                const colors = {
                    active: "green",
                    draft: "orange",
                    archived: "red",
                };
                return (_jsx(Tag, { color: colors[value], children: value === "active" ? "Activo" : value === "draft" ? "Borrador" : "Archivado" }));
            },
        },
        {
            title: "Tipo",
            dataIndex: "productType",
            key: "productType",
            width: 150,
        },
        {
            title: "Precio",
            dataIndex: ["variants"],
            key: "price",
            width: 150,
            render: (variants) => {
                if (!variants || variants.length === 0)
                    return "N/A";
                const variant = variants[0];
                return (_jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Text, { strong: true, children: ["$", variant.price] }), variant.compareAtPrice && (_jsxs(Text, { delete: true, type: "secondary", style: { fontSize: 12 }, children: ["$", variant.compareAtPrice] }))] }));
            },
        },
        {
            title: "Inventario",
            dataIndex: ["variants"],
            key: "inventory",
            width: 100,
            render: (variants) => {
                if (!variants || variants.length === 0)
                    return "N/A";
                const totalInventory = variants.reduce((sum, v) => sum + (v.inventoryQuantity || 0), 0);
                return (_jsx(Tag, { color: totalInventory > 10 ? "green" : totalInventory > 0 ? "orange" : "red", children: totalInventory }));
            },
        },
        {
            title: "Variantes",
            dataIndex: ["variants"],
            key: "variantsCount",
            width: 100,
            align: "center",
            render: (variants) => variants?.length || 0,
        },
        {
            title: "Actualizado",
            dataIndex: "updatedAt",
            key: "updatedAt",
            width: 150,
            render: (value) => _jsx(DateField, { value: value, format: "DD/MM/YYYY HH:mm" }),
        },
        {
            title: "Acciones",
            key: "actions",
            width: 150,
            fixed: "right",
            render: (_, record) => (_jsxs(Space, { children: [_jsx(ShowButton, { hideText: true, size: "small", recordItemId: record.id }), _jsx(EditButton, { hideText: true, size: "small", recordItemId: record.id }), _jsx(Button, { size: "small", icon: _jsx(ShoppingOutlined, {}), onClick: () => window.open?.(`https://tu-tienda.myshopify.com/admin/products/${record.shopifyId}`, "_blank") })] })),
        },
    ];
    return (_jsx(List, { title: "Productos de Shopify", headerProps: {
            extra: (_jsx(Space, { children: _jsx(Button, { type: "primary", icon: _jsx(SyncOutlined, { spin: syncLoading }), onClick: handleSync, loading: syncLoading, children: "Sincronizar con Shopify" }) })),
        }, children: _jsx(Table, { ...tableProps, columns: columns, rowKey: "id", scroll: { x: 1200 }, expandable: {
                expandedRowRender: (record) => (_jsx("div", { style: { padding: 16 }, children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsxs("div", { children: [_jsx(Text, { strong: true, children: "Descripci\u00F3n:" }), _jsx("div", { dangerouslySetInnerHTML: { __html: record.description || "Sin descripción" } })] }), record.variants && record.variants.length > 1 && (_jsxs("div", { children: [_jsx(Text, { strong: true, children: "Variantes:" }), _jsx(Table, { size: "small", pagination: false, dataSource: record.variants, columns: [
                                            { title: "Variante", dataIndex: "title", key: "title" },
                                            { title: "SKU", dataIndex: "sku", key: "sku" },
                                            {
                                                title: "Precio",
                                                dataIndex: "price",
                                                key: "price",
                                                render: (price, variant) => (_jsx(InputNumber, { size: "small", prefix: "$", defaultValue: parseFloat(price), min: 0, precision: 2, onPressEnter: (e) => handleQuickPriceUpdate(record.id, variant.id, e.target.value) })),
                                            },
                                            {
                                                title: "Inventario",
                                                dataIndex: "inventoryQuantity",
                                                key: "inventoryQuantity",
                                                render: (value) => (_jsx(Tag, { color: value > 10 ? "green" : value > 0 ? "orange" : "red", children: value })),
                                            },
                                        ] })] })), record.tags && record.tags.length > 0 && (_jsxs("div", { children: [_jsx(Text, { strong: true, children: "Etiquetas:" }), _jsx(Space, { wrap: true, children: record.tags.map((tag, index) => (_jsx(Tag, { children: tag }, index))) })] }))] }) })),
            } }) }));
};
