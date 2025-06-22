import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Create } from "@refinedev/antd";
import { Alert, Button, Space } from "antd";
import { ShopOutlined } from "@ant-design/icons";
export const ShopifyProductCreate = () => {
    return (_jsx(Create, { title: "Crear Producto", children: _jsx(Alert, { message: "Crear productos en Shopify", description: "Los productos deben crearse directamente en el panel de administraci\u00F3n de Shopify para mantener la integridad de los datos.", type: "info", showIcon: true, action: _jsxs(Space, { direction: "vertical", children: [_jsx(Button, { type: "primary", icon: _jsx(ShopOutlined, {}), onClick: () => window.open("https://tu-tienda.myshopify.com/admin/products/new", "_blank"), children: "Ir a Shopify Admin" }), _jsx(Button, { type: "link", onClick: () => window.history.back(), children: "Volver" })] }) }) }));
};
