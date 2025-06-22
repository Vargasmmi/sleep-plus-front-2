import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch, Card, Button, Space, Divider, InputNumber, Typography, Alert } from "antd";
import { ShopOutlined, ApiOutlined, SyncOutlined, CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, TagOutlined } from "@ant-design/icons";
import { useOne, useUpdate, useNotification } from "@refinedev/core";
import { shopifyService } from "../../../services/shopifyService";
import { addShopifyExampleData } from "../../../services/shopifyExampleData";
import { addShopifyExampleCoupons } from "../../../services/shopifyExampleCoupons";
const { Text } = Typography;
export const ShopifySettingsPage = () => {
    const { mutate: update } = useUpdate();
    const { open } = useNotification();
    const [isTesting, setIsTesting] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [testResult, setTestResult] = useState(null);
    const { data, isLoading } = useOne({
        resource: "shopifySettings",
        id: "shop-001",
    });
    const { formProps, saveButtonProps, form } = useForm({
        resource: "shopifySettings",
        id: "shop-001",
        action: "edit",
        redirect: false,
        onMutationSuccess: () => {
            open?.({
                type: "success",
                message: "Configuración guardada",
                description: "La configuración de Shopify se ha actualizado correctamente",
            });
        },
    });
    const handleTestConnection = async () => {
        const values = form.getFieldsValue();
        if (!values.shopifyDomain || !values.accessToken) {
            open?.({
                type: "error",
                message: "Campos requeridos",
                description: "Por favor, complete el dominio de Shopify y el Access Token antes de probar la conexión",
            });
            return;
        }
        setIsTesting(true);
        setTestResult(null);
        try {
            // Primero guardar la configuración actual
            await form.validateFields();
            await update({
                resource: "shopifySettings",
                id: "shop-001",
                values: form.getFieldsValue(),
            });
            // Luego probar la conexión
            const result = await shopifyService.testConnection();
            setTestResult(result);
        }
        catch (error) {
            setTestResult({
                success: false,
                message: error.message || "Error al probar la conexión",
            });
        }
        finally {
            setIsTesting(false);
        }
    };
    const handleSyncAll = async () => {
        setIsSyncing(true);
        try {
            // Sincronizar todo
            open?.({
                type: "success",
                message: "Sincronización iniciada",
                description: "Sincronizando productos...",
            });
            await shopifyService.syncProducts();
            open?.({
                type: "success",
                message: "Progreso de sincronización",
                description: "Sincronizando clientes...",
            });
            await shopifyService.syncCustomers();
            open?.({
                type: "success",
                message: "Progreso de sincronización",
                description: "Sincronizando cupones...",
            });
            await shopifyService.syncCoupons();
            // Actualizar fecha de última sincronización
            await update({
                resource: "shopifySettings",
                id: "shop-001",
                values: {
                    ...form.getFieldsValue(),
                    lastSync: new Date().toISOString(),
                },
            });
            open?.({
                type: "success",
                message: "Sincronización completada",
                description: "Todos los datos se han sincronizado con Shopify",
            });
        }
        catch (error) {
            open?.({
                type: "error",
                message: "Error al sincronizar",
                description: error.message || "No se pudieron sincronizar todos los datos",
            });
        }
        finally {
            setIsSyncing(false);
        }
    };
    const handleAddExampleData = async () => {
        try {
            await addShopifyExampleData();
            open?.({
                type: "success",
                message: "Datos de ejemplo agregados",
                description: "Se han agregado datos de ejemplo para probar la integración",
            });
        }
        catch (error) {
            open?.({
                type: "error",
                message: "Error al agregar datos",
                description: error.message || "No se pudieron agregar los datos de ejemplo",
            });
        }
    };
    const handleAddExampleCoupons = async () => {
        try {
            await addShopifyExampleCoupons();
            open?.({
                type: "success",
                message: "Cupones de ejemplo agregados",
                description: "Se han agregado 5 cupones de ejemplo para probar la funcionalidad",
            });
        }
        catch (error) {
            open?.({
                type: "error",
                message: "Error al agregar cupones",
                description: error.message || "No se pudieron agregar los cupones de ejemplo",
            });
        }
    };
    return (_jsx(Edit, { isLoading: isLoading, saveButtonProps: saveButtonProps, title: "Configuraci\u00F3n de Shopify", headerProps: {
            extra: (_jsx(Space, { children: _jsx(Button, { type: "primary", icon: _jsx(ApiOutlined, {}), onClick: handleTestConnection, loading: isTesting, children: "Probar Conexi\u00F3n" }) })),
        }, children: _jsxs(Form, { ...formProps, layout: "vertical", children: [_jsxs(Card, { title: _jsxs(Space, { children: [_jsx(ShopOutlined, {}), _jsx("span", { children: "Informaci\u00F3n de la Tienda" })] }), style: { marginBottom: 24 }, children: [_jsx(Form.Item, { label: "Nombre de la Tienda", name: "storeName", rules: [{ required: true, message: "El nombre de la tienda es requerido" }], children: _jsx(Input, { placeholder: "Ej: LA Mattress Store" }) }), _jsx(Form.Item, { label: "Dominio de Shopify", name: "shopifyDomain", rules: [
                                { required: true, message: "El dominio de Shopify es requerido" },
                                {
                                    pattern: /^[a-zA-Z0-9-]+\.myshopify\.com$/,
                                    message: "El dominio debe tener el formato: tu-tienda.myshopify.com"
                                }
                            ], extra: "Formato: tu-tienda.myshopify.com", children: _jsx(Input, { placeholder: "tu-tienda.myshopify.com" }) })] }), _jsxs(Card, { title: _jsxs(Space, { children: [_jsx(ApiOutlined, {}), _jsx("span", { children: "Credenciales de API" })] }), style: { marginBottom: 24 }, children: [_jsx(Alert, { message: "Informaci\u00F3n importante", description: "Para obtener estas credenciales, debe crear una App Privada en su panel de administraci\u00F3n de Shopify.", type: "info", showIcon: true, style: { marginBottom: 16 } }), _jsx(Form.Item, { label: "API Key", name: "apiKey", rules: [{ required: true, message: "La API Key es requerida" }], children: _jsx(Input.Password, { placeholder: "Ingrese su API Key" }) }), _jsx(Form.Item, { label: "API Secret Key", name: "apiSecretKey", rules: [{ required: true, message: "La API Secret Key es requerida" }], children: _jsx(Input.Password, { placeholder: "Ingrese su API Secret Key" }) }), _jsx(Form.Item, { label: "Access Token", name: "accessToken", rules: [{ required: true, message: "El Access Token es requerido" }], extra: "Token de acceso para la API Admin de Shopify", children: _jsx(Input.Password, { placeholder: "Ingrese su Access Token" }) }), _jsx(Form.Item, { label: "Versi\u00F3n de API", name: "webhookApiVersion", initialValue: "2024-01", children: _jsx(Input, { disabled: true }) })] }), _jsxs(Card, { title: _jsxs(Space, { children: [_jsx(SyncOutlined, {}), _jsx("span", { children: "Configuraci\u00F3n de Sincronizaci\u00F3n" })] }), style: { marginBottom: 24 }, children: [_jsx(Form.Item, { label: "Estado de la Integraci\u00F3n", name: "isActive", valuePropName: "checked", children: _jsx(Switch, { checkedChildren: _jsx(CheckCircleOutlined, {}), unCheckedChildren: _jsx(CloseCircleOutlined, {}) }) }), _jsx(Divider, { children: "Sincronizaci\u00F3n Autom\u00E1tica" }), _jsx(Form.Item, { label: "Sincronizar Productos", name: ["syncSettings", "autoSyncProducts"], valuePropName: "checked", children: _jsx(Switch, {}) }), _jsx(Form.Item, { label: "Sincronizar Clientes", name: ["syncSettings", "autoSyncCustomers"], valuePropName: "checked", children: _jsx(Switch, {}) }), _jsx(Form.Item, { label: "Sincronizar \u00D3rdenes", name: ["syncSettings", "autoSyncOrders"], valuePropName: "checked", children: _jsx(Switch, {}) }), _jsx(Form.Item, { label: "Intervalo de Sincronizaci\u00F3n (minutos)", name: ["syncSettings", "syncInterval"], rules: [
                                { required: true, message: "El intervalo es requerido" },
                                { type: "number", min: 5, message: "El intervalo mínimo es 5 minutos" }
                            ], children: _jsx(InputNumber, { min: 5, max: 1440, style: { width: "100%" } }) })] }), testResult && (_jsx(Alert, { message: testResult.success ? "Conexión Exitosa" : "Error de Conexión", description: testResult.message, type: testResult.success ? "success" : "error", showIcon: true, closable: true, onClose: () => setTestResult(null), style: { marginBottom: 24 } })), data?.data?.lastSync && (_jsx(Card, { children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsxs(Text, { type: "secondary", children: ["\u00DAltima sincronizaci\u00F3n: ", new Date(data.data.lastSync).toLocaleString()] }), _jsx(Button, { icon: _jsx(SyncOutlined, { spin: isSyncing }), onClick: handleSyncAll, loading: isSyncing, children: "Sincronizar Todo Ahora" })] }) })), _jsxs(Card, { style: { marginTop: 16 }, title: "Herramientas de Desarrollo", children: [_jsx(Alert, { message: "Datos de Ejemplo", description: "Puedes agregar datos de ejemplo para probar la integraci\u00F3n sin necesidad de conectar con Shopify.", type: "info", showIcon: true, style: { marginBottom: 16 } }), _jsxs(Space, { children: [_jsx(Button, { icon: _jsx(PlusOutlined, {}), onClick: handleAddExampleData, children: "Agregar Datos de Ejemplo" }), _jsx(Button, { icon: _jsx(TagOutlined, {}), onClick: handleAddExampleCoupons, children: "Agregar Cupones de Ejemplo" })] })] })] }) }));
};
