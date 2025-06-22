import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Create } from "@refinedev/antd";
import { Alert, Button, Space } from "antd";
import { ShopOutlined } from "@ant-design/icons";
export const ShopifyCustomerCreate = () => {
    return (_jsx(Create, { title: "Crear Cliente", children: _jsx(Alert, { message: "Crear clientes en Shopify", description: "Los clientes deben crearse directamente en el panel de administraci\u00F3n de Shopify para mantener la integridad de los datos.", type: "info", showIcon: true, action: _jsxs(Space, { direction: "vertical", children: [_jsx(Button, { type: "primary", icon: _jsx(ShopOutlined, {}), onClick: () => window.open("https://tu-tienda.myshopify.com/admin/customers/new", "_blank"), children: "Ir a Shopify Admin" }), _jsx(Button, { type: "link", onClick: () => window.history.back(), children: "Volver" })] }) }) }));
};
