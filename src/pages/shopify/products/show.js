import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Show, DateField } from "@refinedev/antd";
import { Card, Descriptions, Space, Tag, Image, Table, Divider, Row, Col } from "antd";
import { useShow } from "@refinedev/core";
// Typography destructuring removed
export const ShopifyProductShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;
    return (_jsx(Show, { isLoading: isLoading, title: `Producto: ${record?.title || ""}`, children: record && (_jsxs(_Fragment, { children: [_jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, md: 8, children: record.images?.length > 0 && (_jsxs(Card, { children: [_jsx(Image.PreviewGroup, { children: record.images.map((img) => (_jsx(Image, { src: img.src, alt: img.alt, style: {
                                                marginBottom: 8,
                                                width: "100%",
                                                display: index === 0 ? "block" : "none"
                                            } }, img.id))) }), record.images.length > 1 && (_jsx(Space, { wrap: true, style: { marginTop: 8 }, children: record.images.map((img) => (_jsx(Image, { src: img.src, alt: img.alt, width: 60, height: 60, style: { objectFit: "cover", cursor: "pointer" }, preview: false }, img.id))) }))] })) }), _jsx(Col, { xs: 24, md: 16, children: _jsxs(Card, { children: [_jsxs(Descriptions, { column: 2, bordered: true, children: [_jsx(Descriptions.Item, { label: "ID de Shopify", children: record.shopifyId }), _jsx(Descriptions.Item, { label: "Handle", children: record.handle }), _jsx(Descriptions.Item, { label: "Vendedor", children: record.vendor }), _jsx(Descriptions.Item, { label: "Tipo de Producto", children: record.productType }), _jsx(Descriptions.Item, { label: "Estado", children: _jsx(Tag, { color: record.status === "active" ? "green" :
                                                        record.status === "draft" ? "orange" : "red", children: record.status === "active" ? "Activo" :
                                                        record.status === "draft" ? "Borrador" : "Archivado" }) }), _jsx(Descriptions.Item, { label: "Publicado", children: _jsx(DateField, { value: record.publishedAt, format: "DD/MM/YYYY HH:mm" }) }), _jsx(Descriptions.Item, { label: "Creado", children: _jsx(DateField, { value: record.createdAt, format: "DD/MM/YYYY HH:mm" }) }), _jsx(Descriptions.Item, { label: "Actualizado", children: _jsx(DateField, { value: record.updatedAt, format: "DD/MM/YYYY HH:mm" }) })] }), _jsx(Divider, { children: "Descripci\u00F3n" }), _jsx("div", { dangerouslySetInnerHTML: { __html: record.description || "Sin descripción" } }), record.tags?.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Divider, { children: "Etiquetas" }), _jsx(Space, { wrap: true, children: record.tags.map((tag, index) => (_jsx(Tag, { children: tag }, index))) })] }))] }) })] }), _jsx(Card, { style: { marginTop: 16 }, title: "Variantes", children: _jsx(Table, { dataSource: record.variants, rowKey: "id", pagination: false, columns: [
                            {
                                title: "Variante",
                                dataIndex: "title",
                                key: "title",
                            },
                            {
                                title: "SKU",
                                dataIndex: "sku",
                                key: "sku",
                            },
                            {
                                title: "Precio",
                                dataIndex: "price",
                                key: "price",
                                render: (value) => `$${value}`,
                            },
                            {
                                title: "Precio Comparación",
                                dataIndex: "compareAtPrice",
                                key: "compareAtPrice",
                                render: (value) => value ? `$${value}` : "-",
                            },
                            {
                                title: "Inventario",
                                dataIndex: "inventoryQuantity",
                                key: "inventoryQuantity",
                                render: (value) => (_jsx(Tag, { color: value > 10 ? "green" : value > 0 ? "orange" : "red", children: value })),
                            },
                            {
                                title: "ID de Variante",
                                dataIndex: "id",
                                key: "id",
                            },
                        ] }) })] })) }));
};
