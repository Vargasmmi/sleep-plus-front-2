import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, DatePicker, Switch, Button, message, Row, Col, Card, Spin, Alert, Tag, Space, Typography } from "antd";
import { TagOutlined, GiftOutlined, PercentageOutlined, DollarOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { shopifyService } from "../../../services/shopifyService";
import { useList } from "@refinedev/core";
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text } = Typography;
export const ShopifyCouponCreate = () => {
    const navigate = useNavigate();
    const { formProps, form } = useForm();
    const [loading, setLoading] = useState(false);
    const [minimumType, setMinimumType] = useState('none');
    const [customerEligibility, setCustomerEligibility] = useState('all');
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [appliesTo, setAppliesTo] = useState('all');
    // Cargar clientes locales
    const { data: localCustomers } = useList({
        resource: "customers",
        pagination: { pageSize: 1000 },
    });
    // Cargar clientes de Shopify
    const { data: shopifyCustomers } = useList({
        resource: "shopifyCustomers",
        pagination: { pageSize: 1000 },
    });
    // Cargar productos de Shopify
    const { data: shopifyProducts } = useList({
        resource: "shopifyProducts",
        pagination: { pageSize: 1000 },
    });
    // Combinar clientes locales y de Shopify
    const allCustomers = React.useMemo(() => {
        const customers = [];
        // Agregar clientes locales
        if (localCustomers?.data) {
            localCustomers.data.forEach((customer) => {
                customers.push({
                    id: customer.id,
                    shopifyId: null,
                    name: `${customer.firstName} ${customer.lastName}`,
                    email: customer.email || 'Sin email',
                    phone: customer.phone,
                    source: 'local',
                });
            });
        }
        // Agregar clientes de Shopify
        if (shopifyCustomers?.data) {
            shopifyCustomers.data.forEach((customer) => {
                customers.push({
                    id: customer.id,
                    shopifyId: customer.shopifyId,
                    name: `${customer.firstName} ${customer.lastName}`,
                    email: customer.email || 'Sin email',
                    phone: customer.phone || 'Sin teléfono',
                    source: 'shopify',
                });
            });
        }
        return customers;
    }, [localCustomers?.data, shopifyCustomers?.data]);
    const handleFinish = async (values) => {
        try {
            setLoading(true);
            // Obtener solo los IDs de Shopify de los clientes seleccionados
            const shopifyCustomerIds = values.customerIds?.map(customerId => {
                const customer = allCustomers.find(c => c.id === customerId);
                return customer?.shopifyId;
            }).filter(id => id); // Filtrar nulls
            // Validar que hay clientes con ID de Shopify si se seleccionó "specific_customers"
            if (values.customerEligibility === 'specific_customers' && (!shopifyCustomerIds || shopifyCustomerIds.length === 0)) {
                message.error("Debe seleccionar al menos un cliente que tenga ID de Shopify");
                setLoading(false);
                return;
            }
            // Preparar datos para la API
            const couponData = {
                title: values.title,
                code: values.code,
                discountType: values.discountType,
                value: values.value,
                appliesTo: values.appliesTo,
                productIds: values.productIds,
                collectionIds: values.collectionIds,
                minimumAmount: minimumType === 'minimum_amount' ? values.minimumAmount : undefined,
                minimumQuantity: minimumType === 'minimum_quantity' ? values.minimumQuantity : undefined,
                customerEligibility: values.customerEligibility,
                customerIds: shopifyCustomerIds, // Usar solo IDs de Shopify
                usageLimit: values.usageLimit,
                oncePerCustomer: values.oncePerCustomer,
                startsAt: values.dateRange ? values.dateRange[0].toISOString() : undefined,
                endsAt: values.dateRange ? values.dateRange[1].toISOString() : undefined,
            };
            // Crear cupón en Shopify
            const result = await shopifyService.createCoupon(couponData);
            if (result.success) {
                message.success("¡Cupón creado exitosamente!");
                navigate("/shopify/coupons");
            }
        }
        catch (error) {
            console.error("Error al crear cupón:", error);
            message.error(error.message || "Error al crear el cupón");
        }
        finally {
            setLoading(false);
        }
    };
    const generateRandomCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        form.setFieldsValue({ code });
    };
    return (_jsx(Create, { title: "Crear Cup\u00F3n de Shopify", saveButtonProps: { style: { display: 'none' } }, children: _jsx(Spin, { spinning: loading, children: _jsxs(Form, { ...formProps, layout: "vertical", onFinish: handleFinish, children: [_jsx(Card, { title: "Informaci\u00F3n B\u00E1sica", style: { marginBottom: 16 }, children: _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "T\u00EDtulo del Cup\u00F3n", name: "title", rules: [{ required: true, message: "Por favor ingrese el título" }], children: _jsx(Input, { prefix: _jsx(TagOutlined, {}), placeholder: "Ej: Descuento de Verano 2024" }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "C\u00F3digo del Cup\u00F3n", name: "code", rules: [
                                            { required: true, message: "Por favor ingrese el código" },
                                            { pattern: /^[A-Z0-9]+$/, message: "Solo letras mayúsculas y números" }
                                        ], children: _jsx(Input, { prefix: _jsx(GiftOutlined, {}), placeholder: "Ej: VERANO2024", addonAfter: _jsx(Button, { size: "small", onClick: generateRandomCode, children: "Generar" }) }) }) })] }) }), _jsxs(Card, { title: "Configuraci\u00F3n del Descuento", style: { marginBottom: 16 }, children: [_jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Tipo de Descuento", name: "discountType", rules: [{ required: true, message: "Por favor seleccione el tipo" }], initialValue: "percentage", children: _jsxs(Select, { children: [_jsxs(Option, { value: "percentage", children: [_jsx(PercentageOutlined, {}), " Porcentaje"] }), _jsxs(Option, { value: "fixed_amount", children: [_jsx(DollarOutlined, {}), " Monto Fijo"] })] }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Valor del Descuento", name: "value", rules: [
                                                { required: true, message: "Por favor ingrese el valor" },
                                                { type: 'number', min: 0, message: "Debe ser mayor a 0" }
                                            ], children: _jsx(InputNumber, { style: { width: '100%' }, min: 0, step: 0.01, formatter: (value) => {
                                                    const type = form.getFieldValue('discountType');
                                                    return type === 'percentage'
                                                        ? `${value}%`
                                                        : `$${value}`;
                                                }, parser: (value) => parseFloat(value?.replace(/[%$,]/g, "") || "0") }) }) })] }), _jsx(Form.Item, { label: "Aplica a", name: "appliesTo", rules: [{ required: true, message: "Por favor seleccione una opción" }], initialValue: "all", children: _jsxs(Select, { onChange: (value) => setAppliesTo(value), children: [_jsx(Option, { value: "all", children: "Todos los productos" }), _jsx(Option, { value: "specific_products", children: "Productos espec\u00EDficos" }), _jsx(Option, { value: "specific_collections", children: "Colecciones espec\u00EDficas" })] }) }), appliesTo === 'specific_products' && (_jsxs(_Fragment, { children: [_jsx(Form.Item, { label: "Seleccionar Productos", name: "productIds", rules: [{ required: true, message: "Por favor seleccione al menos un producto" }], children: _jsx(Select, { mode: "multiple", placeholder: "Buscar y seleccionar productos", showSearch: true, filterOption: (input, option) => {
                                                const product = shopifyProducts?.data?.find((p) => p.shopifyId === option.value);
                                                if (!product)
                                                    return false;
                                                const searchText = `${product.title} ${product.vendor || ''} ${product.productType || ''}`.toLowerCase();
                                                return searchText.includes(input.toLowerCase());
                                            }, style: { width: '100%' }, notFoundContent: !shopifyProducts?.data ? "Cargando productos..." : "No se encontraron productos", children: shopifyProducts?.data?.map((product) => (_jsx(Option, { value: product.shopifyId, children: _jsxs(Space, { children: [product.images && product.images[0] && (_jsx("img", { src: product.images[0].src, alt: product.title, style: { width: 30, height: 30, objectFit: 'cover', borderRadius: 4 } })), _jsxs("div", { children: [_jsx("div", { children: product.title }), product.variants && product.variants[0] && (_jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: ["$", product.variants[0].price] }))] })] }) }, product.shopifyId))) }) }), (!shopifyProducts?.data || shopifyProducts.data.length === 0) && (_jsx(Alert, { message: "No hay productos disponibles", description: "Sincroniza los productos desde Shopify para poder seleccionarlos.", type: "info", showIcon: true, action: _jsx(Button, { size: "small", onClick: () => window.open('/shopify/products', '_blank'), children: "Ir a Productos" }) }))] })), appliesTo === 'specific_collections' && (_jsx(Alert, { message: "Colecci\u00F3n no disponible", description: "La selecci\u00F3n de colecciones espec\u00EDficas a\u00FAn no est\u00E1 implementada. Por favor, selecciona productos espec\u00EDficos o aplica a todos los productos.", type: "warning", showIcon: true }))] }), _jsxs(Card, { title: "Requisitos M\u00EDnimos", style: { marginBottom: 16 }, children: [_jsx(Form.Item, { label: "Tipo de Requisito", name: "minimumRequirementType", initialValue: "none", children: _jsxs(Select, { onChange: (value) => setMinimumType(value), children: [_jsx(Option, { value: "none", children: "Sin requisitos m\u00EDnimos" }), _jsx(Option, { value: "minimum_amount", children: "Monto m\u00EDnimo de compra" }), _jsx(Option, { value: "minimum_quantity", children: "Cantidad m\u00EDnima de productos" })] }) }), minimumType === 'minimum_amount' && (_jsx(Form.Item, { label: "Monto M\u00EDnimo ($)", name: "minimumAmount", rules: [{ required: true, message: "Por favor ingrese el monto mínimo" }], children: _jsx(InputNumber, { style: { width: '100%' }, min: 0, step: 0.01, formatter: (value) => `$${value}`, parser: (value) => parseFloat(value?.replace(/[%$,]/g, "") || "0") }) })), minimumType === 'minimum_quantity' && (_jsx(Form.Item, { label: "Cantidad M\u00EDnima", name: "minimumQuantity", rules: [{ required: true, message: "Por favor ingrese la cantidad mínima" }], children: _jsx(InputNumber, { style: { width: '100%' }, min: 1, step: 1 }) }))] }), _jsxs(Card, { title: "Elegibilidad de Clientes", style: { marginBottom: 16 }, children: [_jsx(Form.Item, { label: "Aplicable a", name: "customerEligibility", rules: [{ required: true, message: "Por favor seleccione una opción" }], initialValue: "all", children: _jsxs(Select, { onChange: (value) => setCustomerEligibility(value), children: [_jsx(Option, { value: "all", children: "Todos los clientes" }), _jsx(Option, { value: "specific_customers", children: "Clientes espec\u00EDficos" }), _jsx(Option, { value: "customer_groups", children: "Grupos de clientes" })] }) }), customerEligibility === 'specific_customers' && (_jsx(Form.Item, { label: "Seleccionar Clientes", name: "customerIds", rules: [{ required: true, message: "Por favor seleccione al menos un cliente" }], children: _jsx(Select, { mode: "multiple", placeholder: "Buscar y seleccionar clientes", showSearch: true, filterOption: (input, option) => {
                                        const customer = allCustomers.find(c => c.id === option.value);
                                        if (!customer)
                                            return false;
                                        const searchText = `${customer.name} ${customer.email} ${customer.phone}`.toLowerCase();
                                        return searchText.includes(input.toLowerCase());
                                    }, style: { width: '100%' }, notFoundContent: allCustomers.length === 0 ? "Cargando clientes..." : "No se encontraron clientes", children: allCustomers.map((customer) => (_jsx(Option, { value: customer.id, disabled: customer.source === 'local' && !customer.shopifyId, children: _jsxs(Space, { children: [_jsx(UserOutlined, {}), customer.name, _jsx(Tag, { color: customer.source === 'shopify' ? 'blue' : 'green', children: customer.source === 'shopify' ? 'Shopify' : 'Local' }), _jsxs(Text, { type: "secondary", children: ["(", customer.email, ")"] }), customer.source === 'local' && !customer.shopifyId && (_jsx(Text, { type: "danger", style: { fontSize: 12 }, children: "(Sin ID de Shopify)" }))] }) }, customer.id))) }) })), customerEligibility === 'specific_customers' && (_jsxs(_Fragment, { children: [_jsx(Alert, { message: "Nota importante", description: "Solo los clientes que tienen un ID de Shopify pueden ser asignados al cup\u00F3n. Los clientes locales sin sincronizar aparecen deshabilitados.", type: "info", showIcon: true, style: { marginTop: 16 } }), allCustomers.filter(c => c.source === 'shopify' || c.shopifyId).length === 0 && (_jsx(Alert, { message: "No hay clientes de Shopify disponibles", description: _jsxs(Space, { direction: "vertical", children: [_jsx(Text, { children: "No se encontraron clientes con ID de Shopify. Puedes:" }), _jsxs("ul", { style: { marginBottom: 8 }, children: [_jsx("li", { children: "Sincronizar clientes desde Shopify" }), _jsx("li", { children: "Crear el cup\u00F3n para todos los clientes" })] }), _jsx(Button, { size: "small", onClick: () => {
                                                        window.open('/shopify/customers', '_blank');
                                                    }, children: "Ir a Clientes de Shopify" })] }), type: "warning", showIcon: true, style: { marginTop: 8 } }))] }))] }), _jsx(Card, { title: "L\u00EDmites de Uso", style: { marginBottom: 16 }, children: _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "L\u00EDmite total de usos", name: "usageLimit", tooltip: "Dejar vac\u00EDo para uso ilimitado", children: _jsx(InputNumber, { style: { width: '100%' }, min: 1, placeholder: "Sin l\u00EDmite" }) }) }), _jsx(Col, { span: 12, children: _jsx(Form.Item, { label: "Una vez por cliente", name: "oncePerCustomer", valuePropName: "checked", initialValue: false, children: _jsx(Switch, { checkedChildren: "S\u00ED", unCheckedChildren: "No" }) }) })] }) }), _jsx(Card, { title: "Periodo de Validez", style: { marginBottom: 16 }, children: _jsx(Form.Item, { label: "Fecha de inicio y fin", name: "dateRange", rules: [{ required: true, message: "Por favor seleccione las fechas" }], children: _jsx(RangePicker, { style: { width: '100%' }, showTime: true, format: "DD/MM/YYYY HH:mm", placeholder: ['Fecha de inicio', 'Fecha de fin'], suffixIcon: _jsx(CalendarOutlined, {}) }) }) }), _jsx(Card, { title: "Resumen del Cup\u00F3n", style: { marginBottom: 16, backgroundColor: '#f5f5f5' }, children: _jsxs(Space, { direction: "vertical", style: { width: '100%' }, children: [_jsx(Text, { strong: true, children: "C\u00F3digo: " }), _jsx(Text, { code: true, children: form.getFieldValue('code') || 'SIN CÓDIGO' }), _jsx(Text, { strong: true, children: "Descuento: " }), _jsx(Text, { children: form.getFieldValue('discountType') === 'percentage'
                                        ? `${form.getFieldValue('value') || 0}%`
                                        : `${form.getFieldValue('value') || 0}` }), customerEligibility === 'specific_customers' && (_jsxs(_Fragment, { children: [_jsx(Text, { strong: true, children: "Clientes seleccionados: " }), _jsxs(Text, { children: [form.getFieldValue('customerIds')?.length || 0, " cliente(s)"] })] })), appliesTo === 'specific_products' && (_jsxs(_Fragment, { children: [_jsx(Text, { strong: true, children: "Productos seleccionados: " }), _jsxs(Text, { children: [form.getFieldValue('productIds')?.length || 0, " producto(s)"] })] }))] }) }), _jsx(Form.Item, { children: _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Button, { type: "primary", htmlType: "submit", loading: loading, block: true, size: "large", children: "Crear Cup\u00F3n" }) }), _jsx(Col, { span: 12, children: _jsx(Button, { block: true, size: "large", onClick: () => navigate("/shopify/coupons"), children: "Cancelar" }) })] }) })] }) }) }));
};
