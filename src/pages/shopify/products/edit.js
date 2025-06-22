import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Switch, Card, Button, Alert } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import { useShow } from "@refinedev/core";
export const ShopifyProductEdit = () => {
    const { formProps, saveButtonProps } = useForm();
    const { queryResult } = useShow();
    const record = queryResult?.data?.data;
    return (_jsxs(Edit, { saveButtonProps: saveButtonProps, title: `Editar: ${record?.title || ""}`, headerProps: {
            extra: (_jsx(Button, { icon: _jsx(ShopOutlined, {}), onClick: () => window.open(`https://tu-tienda.myshopify.com/admin/products/${record?.shopifyId}`, "_blank"), children: "Editar en Shopify" })),
        }, children: [_jsx(Alert, { message: "Edici\u00F3n limitada", description: "Solo se pueden editar algunos campos locales. Para una edici\u00F3n completa, use el panel de administraci\u00F3n de Shopify.", type: "warning", showIcon: true, style: { marginBottom: 24 } }), _jsxs(Form, { ...formProps, layout: "vertical", children: [_jsxs(Card, { title: "Informaci\u00F3n B\u00E1sica", style: { marginBottom: 24 }, children: [_jsx(Form.Item, { label: "T\u00EDtulo", name: "title", rules: [{ required: true }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Estado Local", name: "status", rules: [{ required: true }], children: _jsxs(Select, { children: [_jsx(Select.Option, { value: "active", children: "Activo" }), _jsx(Select.Option, { value: "draft", children: "Borrador" }), _jsx(Select.Option, { value: "archived", children: "Archivado" })] }) }), _jsx(Form.Item, { label: "Notas Internas", name: "internalNotes", children: _jsx(Input.TextArea, { rows: 4, placeholder: "Notas para uso interno del equipo" }) })] }), _jsxs(Card, { title: "Configuraci\u00F3n de Sincronizaci\u00F3n", children: [_jsx(Form.Item, { label: "Sincronizar Autom\u00E1ticamente", name: "autoSync", valuePropName: "checked", children: _jsx(Switch, {}) }), _jsx(Form.Item, { label: "Prioridad de Sincronizaci\u00F3n", name: "syncPriority", children: _jsx(InputNumber, { min: 1, max: 10 }) })] })] })] }));
};
