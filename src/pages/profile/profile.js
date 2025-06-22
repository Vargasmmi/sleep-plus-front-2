import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useGetIdentity, useUpdate, useOne } from "@refinedev/core";
import { Row, Col, Card, Form, Input, Button, Avatar, Upload, Typography, Tabs, Space, Divider, Switch, Select, notification, Statistic, Progress, Tag, Alert, } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, CameraOutlined, SaveOutlined, TrophyOutlined, PhoneFilled, ClockCircleOutlined, BellOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
const { Title, Text } = Typography;
export const ProfilePage = () => {
    const { data: identity } = useGetIdentity();
    const [passwordForm] = Form.useForm();
    const [profileForm] = Form.useForm();
    const [notificationForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    // Get employee data
    const { data: employeeData, isLoading } = useOne({
        resource: "employees",
        id: identity?.id || "",
        queryOptions: {
            enabled: !!identity?.id,
        },
    });
    const employee = employeeData?.data;
    const { mutate: updateEmployee } = useUpdate();
    const handleProfileUpdate = (values) => {
        setLoading(true);
        updateEmployee({
            resource: "employees",
            id: employee?.id || "",
            values: {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phoneExtension: values.phoneExtension,
            },
        }, {
            onSuccess: () => {
                notification.success({
                    message: "Perfil Actualizado",
                    description: "Tu información ha sido actualizada correctamente.",
                });
                setLoading(false);
            },
            onError: () => {
                notification.error({
                    message: "Error",
                    description: "No se pudo actualizar tu perfil.",
                });
                setLoading(false);
            },
        });
    };
    const handlePasswordChange = (values) => {
        if (values.newPassword !== values.confirmPassword) {
            notification.error({
                message: "Error",
                description: "Las contraseñas no coinciden.",
            });
            return;
        }
        // Aquí normalmente harías una llamada API para cambiar la contraseña
        notification.success({
            message: "Contraseña Actualizada",
            description: "Tu contraseña ha sido cambiada exitosamente.",
        });
        passwordForm.resetFields();
    };
    const handleAvatarChange = (info) => {
        if (info.file.status === "done") {
            notification.success({
                message: "Avatar Actualizado",
                description: "Tu foto de perfil ha sido actualizada.",
            });
        }
    };
    if (isLoading || !employee) {
        return _jsx(Card, { loading: true });
    }
    const tabItems = [
        {
            key: "1",
            label: (_jsxs("span", { children: [_jsx(UserOutlined, {}), "Informaci\u00F3n Personal"] })),
            children: (_jsxs(Form, { form: profileForm, layout: "vertical", onFinish: handleProfileUpdate, initialValues: {
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    email: employee.email,
                    phoneExtension: employee.phoneExtension,
                    storeId: employee.storeId,
                    shift: employee.shift,
                }, children: [_jsxs(Row, { gutter: 24, children: [_jsx(Col, { xs: 24, md: 12, children: _jsx(Form.Item, { label: "Nombre", name: "firstName", rules: [{ required: true, message: "Ingresa tu nombre" }], children: _jsx(Input, { prefix: _jsx(UserOutlined, {}) }) }) }), _jsx(Col, { xs: 24, md: 12, children: _jsx(Form.Item, { label: "Apellido", name: "lastName", rules: [{ required: true, message: "Ingresa tu apellido" }], children: _jsx(Input, { prefix: _jsx(UserOutlined, {}) }) }) }), _jsx(Col, { xs: 24, md: 12, children: _jsx(Form.Item, { label: "Email", name: "email", rules: [
                                        { required: true, message: "Ingresa tu email" },
                                        { type: "email", message: "Email inválido" },
                                    ], children: _jsx(Input, { prefix: _jsx(MailOutlined, {}) }) }) }), _jsx(Col, { xs: 24, md: 12, children: _jsx(Form.Item, { label: "Extensi\u00F3n Telef\u00F3nica", name: "phoneExtension", children: _jsx(Input, { prefix: _jsx(PhoneOutlined, {}), placeholder: "101" }) }) }), _jsx(Col, { xs: 24, md: 12, children: _jsx(Form.Item, { label: "Tienda", name: "storeId", children: _jsx(Input, { disabled: true }) }) }), _jsx(Col, { xs: 24, md: 12, children: _jsx(Form.Item, { label: "Turno", name: "shift", children: _jsxs(Select, { disabled: true, children: [_jsx(Select.Option, { value: "morning", children: "Ma\u00F1ana" }), _jsx(Select.Option, { value: "afternoon", children: "Tarde" }), _jsx(Select.Option, { value: "full", children: "Completo" })] }) }) })] }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", icon: _jsx(SaveOutlined, {}), loading: loading, children: "Guardar Cambios" }) })] })),
        },
        {
            key: "2",
            label: (_jsxs("span", { children: [_jsx(LockOutlined, {}), "Seguridad"] })),
            children: (_jsxs(Row, { gutter: 24, children: [_jsx(Col, { xs: 24, lg: 12, children: _jsx(Card, { title: "Cambiar Contrase\u00F1a", type: "inner", children: _jsxs(Form, { form: passwordForm, layout: "vertical", onFinish: handlePasswordChange, children: [_jsx(Form.Item, { label: "Contrase\u00F1a Actual", name: "currentPassword", rules: [{ required: true, message: "Ingresa tu contraseña actual" }], children: _jsx(Input.Password, { prefix: _jsx(LockOutlined, {}) }) }), _jsx(Form.Item, { label: "Nueva Contrase\u00F1a", name: "newPassword", rules: [
                                            { required: true, message: "Ingresa la nueva contraseña" },
                                            { min: 6, message: "Mínimo 6 caracteres" },
                                        ], children: _jsx(Input.Password, { prefix: _jsx(LockOutlined, {}) }) }), _jsx(Form.Item, { label: "Confirmar Contrase\u00F1a", name: "confirmPassword", rules: [
                                            { required: true, message: "Confirma tu contraseña" },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue("newPassword") === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error("Las contraseñas no coinciden"));
                                                },
                                            }),
                                        ], children: _jsx(Input.Password, { prefix: _jsx(LockOutlined, {}) }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", icon: _jsx(SaveOutlined, {}), children: "Cambiar Contrase\u00F1a" }) })] }) }) }), _jsx(Col, { xs: 24, lg: 12, children: _jsx(Card, { title: "Configuraci\u00F3n de Seguridad", type: "inner", children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Alert, { message: "Autenticaci\u00F3n de Dos Factores", description: "A\u00F1ade una capa extra de seguridad a tu cuenta", type: "info", showIcon: true }), _jsxs(Space, { children: [_jsx(Switch, {}), _jsx(Text, { children: "Habilitar 2FA" })] }), _jsx(Divider, {}), _jsx(Title, { level: 5, children: "Sesiones Activas" }), _jsxs(Text, { type: "secondary", children: ["\u00DAltima actividad: ", dayjs().format("DD/MM/YYYY HH:mm")] }), _jsx(Button, { danger: true, children: "Cerrar Todas las Sesiones" })] }) }) })] })),
        },
        ...(employee.role === "agent" ? [{
                key: "3",
                label: (_jsxs("span", { children: [_jsx(TrophyOutlined, {}), "Mi Rendimiento"] })),
                children: (_jsxs(_Fragment, { children: [_jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, sm: 12, lg: 6, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Llamadas Hoy", value: employee.performance?.callsToday || 0, suffix: `/ ${employee.performance?.callsTarget || 0}`, prefix: _jsx(PhoneFilled, {}) }), _jsx(Progress, { percent: ((employee.performance?.callsToday || 0) /
                                                    (employee.performance?.callsTarget || 1)) *
                                                    100, showInfo: false })] }) }), _jsx(Col, { xs: 24, sm: 12, lg: 6, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Conversiones Hoy", value: employee.performance?.conversionsToday || 0, valueStyle: { color: "#3f8600" } }), _jsxs(Text, { type: "secondary", children: ["Tasa: ", employee.performance?.conversionRate || 0, "%"] })] }) }), _jsx(Col, { xs: 24, sm: 12, lg: 6, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Comisi\u00F3n del Mes", value: employee.commissions?.currentMonthCommission || 0, prefix: "$", valueStyle: { color: "#cf1322" } }), _jsxs(Text, { type: "secondary", children: [employee.commissions?.currentMonthEvaluations || 0, " evaluaciones"] })] }) }), _jsx(Col, { xs: 24, sm: 12, lg: 6, children: _jsxs(Card, { children: [_jsx(Statistic, { title: "Tiempo Promedio", value: employee.performance?.averageCallDuration || 0, suffix: "seg", prefix: _jsx(ClockCircleOutlined, {}) }), _jsx(Text, { type: "secondary", children: "por llamada" })] }) })] }), _jsx(Card, { title: "Estad\u00EDsticas Totales", style: { marginTop: 16 }, children: _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 12, children: _jsx(Statistic, { title: "Total de Evaluaciones", value: employee.commissions?.totalEvaluations || 0 }) }), _jsx(Col, { span: 12, children: _jsx(Statistic, { title: "Comisi\u00F3n Total Ganada", value: employee.commissions?.totalCommissionEarned || 0, prefix: "$" }) })] }) })] })),
            }] : []),
        {
            key: "4",
            label: (_jsxs("span", { children: [_jsx(BellOutlined, {}), "Notificaciones"] })),
            children: (_jsxs(Form, { form: notificationForm, layout: "vertical", initialValues: {
                    emailNotifications: true,
                    smsNotifications: false,
                    pushNotifications: true,
                }, children: [_jsx(Card, { title: "Preferencias de Notificaci\u00F3n", type: "inner", children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Form.Item, { name: "emailNotifications", valuePropName: "checked", children: _jsxs(Space, { children: [_jsx(Switch, {}), _jsx(Text, { children: "Notificaciones por Email" })] }) }), _jsx(Form.Item, { name: "smsNotifications", valuePropName: "checked", children: _jsxs(Space, { children: [_jsx(Switch, {}), _jsx(Text, { children: "Notificaciones por SMS" })] }) }), _jsx(Form.Item, { name: "pushNotifications", valuePropName: "checked", children: _jsxs(Space, { children: [_jsx(Switch, {}), _jsx(Text, { children: "Notificaciones Push" })] }) })] }) }), _jsx(Card, { title: "Tipos de Notificaciones", type: "inner", style: { marginTop: 16 }, children: _jsxs(Space, { direction: "vertical", style: { width: "100%" }, children: [_jsx(Form.Item, { name: "newSaleNotification", valuePropName: "checked", initialValue: true, children: _jsxs(Space, { children: [_jsx(Switch, {}), _jsx(Text, { children: "Nueva Venta Realizada" })] }) }), _jsx(Form.Item, { name: "commissionNotification", valuePropName: "checked", initialValue: true, children: _jsxs(Space, { children: [_jsx(Switch, {}), _jsx(Text, { children: "Actualizaci\u00F3n de Comisiones" })] }) }), _jsx(Form.Item, { name: "achievementNotification", valuePropName: "checked", initialValue: true, children: _jsxs(Space, { children: [_jsx(Switch, {}), _jsx(Text, { children: "Logros Desbloqueados" })] }) }), _jsx(Form.Item, { name: "campaignNotification", valuePropName: "checked", initialValue: false, children: _jsxs(Space, { children: [_jsx(Switch, {}), _jsx(Text, { children: "Nuevas Campa\u00F1as" })] }) })] }) }), _jsx(Form.Item, { style: { marginTop: 16 }, children: _jsx(Button, { type: "primary", htmlType: "submit", icon: _jsx(SaveOutlined, {}), children: "Guardar Preferencias" }) })] })),
        },
    ];
    return (_jsx("div", { style: { padding: 24 }, children: _jsxs(Row, { gutter: [24, 24], children: [_jsx(Col, { span: 24, children: _jsx(Card, { children: _jsxs(Row, { gutter: 24, align: "middle", children: [_jsx(Col, { children: _jsxs(Upload, { name: "avatar", showUploadList: false, action: "/api/upload", onChange: handleAvatarChange, children: [_jsx(Avatar, { size: 100, src: employee.avatar, icon: _jsx(UserOutlined, {}), style: { cursor: "pointer" } }), _jsx(Button, { icon: _jsx(CameraOutlined, {}), shape: "circle", size: "small", style: {
                                                    position: "absolute",
                                                    bottom: 0,
                                                    right: 0,
                                                } })] }) }), _jsx(Col, { flex: "auto", children: _jsxs(Space, { direction: "vertical", size: 0, children: [_jsxs(Title, { level: 2, style: { margin: 0 }, children: [employee.firstName, " ", employee.lastName] }), _jsx(Text, { type: "secondary", children: employee.email }), _jsxs(Space, { style: { marginTop: 8 }, children: [_jsx(Tag, { color: employee.role === "admin" ? "red" : employee.role === "manager" ? "blue" : "green", children: employee.role === "admin" ? "Administrador" : employee.role === "manager" ? "Gerente" : "Agente" }), _jsx(Tag, { color: employee.status === "active" ? "green" : "default", children: employee.status === "active" ? "Activo" : "Inactivo" }), _jsxs(Tag, { children: ["ID: ", employee.employeeId] })] })] }) }), _jsx(Col, { children: _jsxs(Space, { direction: "vertical", align: "center", children: [_jsx(Text, { type: "secondary", children: "Miembro desde" }), _jsx(Text, { strong: true, children: dayjs(employee.hiredAt).format("DD/MM/YYYY") })] }) })] }) }) }), _jsx(Col, { span: 24, children: _jsx(Card, { children: _jsx(Tabs, { items: tabItems }) }) })] }) }));
};
