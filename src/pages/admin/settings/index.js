import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useOne, useUpdate, useGetIdentity } from "@refinedev/core";
import { Form, InputNumber, Switch, TimePicker, Button, Card, Row, Col, Space, Typography, Divider, notification, Spin } from "antd";
import { SaveOutlined, ClockCircleOutlined, TeamOutlined, TrophyOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
const { Title, Text } = Typography;
export const SystemSettingsPage = () => {
    const [form] = Form.useForm();
    const { data: user } = useGetIdentity();
    const { data: settingsData, isLoading } = useOne({
        resource: "systemSettings",
        id: "settings-001",
    });
    const { mutate: updateSettings, isLoading: isUpdating } = useUpdate();
    const settings = settingsData?.data;
    useEffect(() => {
        if (settings) {
            form.setFieldsValue({
                ...settings,
                workingHours: settings.workingHours ? {
                    start: dayjs(settings.workingHours.start, 'HH:mm'),
                    end: dayjs(settings.workingHours.end, 'HH:mm'),
                } : {
                    start: dayjs('09:00', 'HH:mm'),
                    end: dayjs('18:00', 'HH:mm'),
                },
                overdueNotificationTime: settings.overdueNotificationTime
                    ? dayjs(settings.overdueNotificationTime, 'HH:mm')
                    : dayjs('14:00', 'HH:mm'),
            });
        }
    }, [settings, form]);
    const handleSubmit = (values) => {
        const updatedSettings = {
            ...values,
            workingHours: values.workingHours ? {
                start: values.workingHours.start?.format('HH:mm') || '09:00',
                end: values.workingHours.end?.format('HH:mm') || '18:00',
            } : {
                start: '09:00',
                end: '18:00',
            },
            overdueNotificationTime: values.overdueNotificationTime?.format('HH:mm') || '14:00',
            updatedAt: new Date().toISOString(),
            updatedBy: user?.id,
        };
        updateSettings({
            resource: "systemSettings",
            id: "settings-001",
            values: updatedSettings,
        }, {
            onSuccess: () => {
                notification.success({
                    message: "Configuración Actualizada",
                    description: "Los cambios se han guardado exitosamente.",
                });
            },
            onError: () => {
                notification.error({
                    message: "Error",
                    description: "No se pudieron guardar los cambios.",
                });
            },
        });
    };
    if (isLoading) {
        return (_jsx("div", { style: { textAlign: 'center', padding: 50 }, children: _jsx(Spin, { size: "large" }) }));
    }
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsx(Title, { level: 2, children: "Configuraci\u00F3n del Sistema" }), _jsx(Text, { type: "secondary", children: "Administra la configuraci\u00F3n global del sistema de gesti\u00F3n" }), _jsxs(Form, { form: form, layout: "vertical", onFinish: handleSubmit, style: { marginTop: 24 }, children: [_jsxs(Row, { gutter: [24, 24], children: [_jsx(Col, { xs: 24, lg: 12, children: _jsxs(Card, { title: _jsxs(Space, { children: [_jsx(TeamOutlined, {}), " Configuraci\u00F3n de Metas"] }), children: [_jsx(Form.Item, { name: "dailyCallGoal", label: "Meta Diaria de Llamadas por Agente", rules: [
                                                { required: true, message: "Este campo es requerido" },
                                                { type: "number", min: 1, message: "Debe ser mayor a 0" },
                                            ], children: _jsx(InputNumber, { min: 1, max: 100, style: { width: '100%' }, placeholder: "25", addonAfter: "llamadas" }) }), _jsx(Form.Item, { name: "autoAssignCustomers", label: "Asignaci\u00F3n Autom\u00E1tica de Clientes", valuePropName: "checked", children: _jsx(Switch, { checkedChildren: "Activada", unCheckedChildren: "Desactivada" }) }), _jsx(Text, { type: "secondary", children: "Cuando est\u00E1 activada, el sistema asignar\u00E1 autom\u00E1ticamente nuevos clientes a los agentes cuando completen su meta diaria." })] }) }), _jsx(Col, { xs: 24, lg: 12, children: _jsxs(Card, { title: _jsxs(Space, { children: [_jsx(ClockCircleOutlined, {}), " Horarios y Notificaciones"] }), children: [_jsx(Form.Item, { label: "Horario Laboral", children: _jsxs(Space, { children: [_jsx(Form.Item, { name: ['workingHours', 'start'], noStyle: true, rules: [{ required: true, message: "Requerido" }], children: _jsx(TimePicker, { format: "HH:mm", placeholder: "Inicio", style: { width: 120 } }) }), _jsx(Text, { children: "a" }), _jsx(Form.Item, { name: ['workingHours', 'end'], noStyle: true, rules: [{ required: true, message: "Requerido" }], children: _jsx(TimePicker, { format: "HH:mm", placeholder: "Fin", style: { width: 120 } }) })] }) }), _jsx(Form.Item, { name: "overdueNotificationTime", label: "Hora de Notificaci\u00F3n de Tareas Vencidas", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(TimePicker, { format: "HH:mm", style: { width: '100%' }, placeholder: "14:00" }) }), _jsx(Text, { type: "secondary", children: "Los agentes recibir\u00E1n una notificaci\u00F3n a esta hora si no han completado su meta diaria." })] }) }), _jsx(Col, { xs: 24, children: _jsxs(Card, { title: _jsxs(Space, { children: [_jsx(TrophyOutlined, {}), " Gamificaci\u00F3n y Competencia"] }), children: [_jsx(Form.Item, { name: "competitionMode", label: "Modo de Competencia entre Agentes", valuePropName: "checked", children: _jsx(Switch, { checkedChildren: "Activado", unCheckedChildren: "Desactivado" }) }), _jsx(Text, { type: "secondary", children: "Cuando est\u00E1 activado, los agentes pueden ver el ranking y desempe\u00F1o de sus compa\u00F1eros para fomentar la competencia sana." }), _jsx(Divider, {}), _jsx(Title, { level: 5, children: "Pr\u00F3ximamente" }), _jsxs(Space, { direction: "vertical", style: { width: '100%' }, children: [_jsx(Text, { type: "secondary", children: "\u2022 Sistema de puntos y badges" }), _jsx(Text, { type: "secondary", children: "\u2022 Premios mensuales autom\u00E1ticos" }), _jsx(Text, { type: "secondary", children: "\u2022 Tabla de l\u00EDderes hist\u00F3rica" }), _jsx(Text, { type: "secondary", children: "\u2022 Metas personalizadas por agente" })] })] }) })] }), _jsx("div", { style: { marginTop: 24, textAlign: 'right' }, children: _jsxs(Space, { children: [_jsx(Button, { onClick: () => form.resetFields(), disabled: isUpdating, children: "Cancelar" }), _jsx(Button, { type: "primary", htmlType: "submit", loading: isUpdating, icon: _jsx(SaveOutlined, {}), children: "Guardar Cambios" })] }) })] })] }));
};
