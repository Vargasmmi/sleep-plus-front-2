import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useList, useUpdate, useGetIdentity } from "@refinedev/core";
import { Card, Table, Button, Space, Typography, Tag, Modal, Form, Input, notification, Progress, Row, Col, Avatar, List, Badge, Empty, Alert, Statistic, } from "antd";
import { PhoneOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, UserOutlined, CalendarOutlined, FireOutlined, } from "@ant-design/icons";
import dayjs from "dayjs";
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
export const TasksPage = () => {
    const { data: identity } = useGetIdentity();
    const [selectedTask, setSelectedTask] = useState(null);
    const [notesModal, setNotesModal] = useState(false);
    const [form] = Form.useForm();
    const isManager = identity?.role === 'manager' || identity?.role === 'admin';
    // Fetch today's goal
    const { data: goalsData, refetch: refetchGoals } = useList({
        resource: "dailyGoals",
        filters: isManager
            ? [{ field: "date", operator: "eq", value: dayjs().format("YYYY-MM-DD") }]
            : [
                { field: "employeeId", operator: "eq", value: identity?.id },
                { field: "date", operator: "eq", value: dayjs().format("YYYY-MM-DD") }
            ],
    });
    // Fetch tasks
    const { data: tasksData, refetch: refetchTasks } = useList({
        resource: "callTasks",
        filters: isManager
            ? []
            : [{ field: "employeeId", operator: "eq", value: identity?.id }],
        sorters: [{ field: "assignedAt", order: "asc" }],
    });
    // Fetch customers
    const { data: customersData } = useList({
        resource: "customers",
    });
    // Fetch employees (for managers)
    const { data: employeesData } = useList({
        resource: "employees",
        filters: [{ field: "role", operator: "eq", value: "agent" }],
    });
    const { mutate: updateTask } = useUpdate();
    const { mutate: updateGoal } = useUpdate();
    const goals = goalsData?.data || [];
    const tasks = tasksData?.data || [];
    const customers = customersData?.data || [];
    const employees = employeesData?.data || [];
    const myGoal = goals.find(g => g.employeeId === identity?.id);
    const pendingTasks = tasks.filter(t => t.status === 'pending');
    const completedTasks = tasks.filter(t => t.status === 'completed');
    // Handle task completion
    const handleCompleteTask = (task) => {
        setSelectedTask(task);
        setNotesModal(true);
    };
    const handleSubmitNotes = (values) => {
        if (!selectedTask || !myGoal)
            return;
        updateTask({
            resource: "callTasks",
            id: selectedTask.id,
            values: {
                ...selectedTask,
                status: 'completed',
                completedAt: new Date().toISOString(),
                notes: values.notes,
            },
        }, {
            onSuccess: () => {
                // Update goal
                updateGoal({
                    resource: "dailyGoals",
                    id: myGoal.id,
                    values: {
                        ...myGoal,
                        completedCalls: myGoal.completedCalls + 1,
                        completedCustomers: [...myGoal.completedCustomers, selectedTask.customerId],
                        status: myGoal.completedCalls + 1 >= myGoal.targetCalls ? 'completed' : myGoal.status,
                        updatedAt: new Date().toISOString(),
                    },
                }, {
                    onSuccess: () => {
                        notification.success({
                            message: "Tarea completada",
                            description: "La llamada ha sido registrada exitosamente.",
                        });
                        setNotesModal(false);
                        form.resetFields();
                        refetchTasks();
                        refetchGoals();
                    },
                });
            },
        });
    };
    // Calculate progress
    const progress = myGoal ? (myGoal.completedCalls / myGoal.targetCalls) * 100 : 0;
    if (!isManager && myGoal?.status === 'overdue') {
        return (_jsxs("div", { style: { padding: 24 }, children: [_jsx(Alert, { message: "\u00A1Tienes tareas pendientes!", description: "Debes completar las llamadas pendientes de d\u00EDas anteriores antes de recibir nuevas tareas.", type: "warning", showIcon: true, icon: _jsx(ExclamationCircleOutlined, {}), action: _jsxs(Button, { type: "primary", danger: true, children: ["Ver tareas pendientes (", pendingTasks.length, ")"] }) }), _jsxs(Card, { style: { marginTop: 24 }, children: [_jsx(Title, { level: 4, children: "Tareas Pendientes" }), _jsx(List, { dataSource: pendingTasks, renderItem: (task) => {
                                const customer = customers.find(c => c.id === task.customerId);
                                return (_jsx(List.Item, { actions: [
                                        _jsx(Button, { type: "primary", onClick: () => handleCompleteTask(task), children: "Marcar como completada" })
                                    ], children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { icon: _jsx(UserOutlined, {}) }), title: customer ? `${customer.firstName} ${customer.lastName}` : `Cliente #${task.customerId}`, description: _jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { type: "secondary", children: customer?.phone }), _jsxs(Text, { type: "warning", children: ["Asignada ", dayjs(task.assignedAt).fromNow()] })] }) }) }));
                            } })] })] }));
    }
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsxs(Row, { justify: "space-between", align: "middle", style: { marginBottom: 24 }, children: [_jsxs(Col, { children: [_jsxs(Title, { level: 2, children: [_jsx(CalendarOutlined, {}), " Tareas Diarias"] }), _jsx(Text, { type: "secondary", children: isManager ? 'Gestión de tareas del equipo' : 'Mis tareas pendientes y completadas' })] }), !isManager && myGoal && (_jsx(Col, { children: _jsx(Card, { size: "small", children: _jsx(Statistic, { title: "Progreso del d\u00EDa", value: myGoal.completedCalls, suffix: `/ ${myGoal.targetCalls}`, prefix: _jsx(FireOutlined, {}), valueStyle: { color: progress >= 100 ? '#52c41a' : '#000' } }) }) }))] }), !isManager && (_jsxs(_Fragment, { children: [_jsx(Card, { style: { marginBottom: 24 }, children: _jsxs(Row, { gutter: [24, 24], align: "middle", children: [_jsx(Col, { xs: 24, md: 8, children: _jsx(Progress, { type: "circle", percent: progress, status: progress >= 100 ? 'success' : 'active', format: () => (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: 24, fontWeight: 'bold' }, children: myGoal?.completedCalls || 0 }), _jsxs("div", { style: { fontSize: 12, color: '#999' }, children: ["de ", myGoal?.targetCalls || 25] })] })) }) }), _jsx(Col, { xs: 24, md: 16, children: _jsxs(Space, { direction: "vertical", style: { width: '100%' }, children: [_jsx(Title, { level: 4, children: progress >= 100
                                                    ? '¡Felicidades! Has completado tu meta diaria 🎉'
                                                    : `Te faltan ${(myGoal?.targetCalls || 25) - (myGoal?.completedCalls || 0)} llamadas` }), _jsx(Progress, { percent: progress, strokeColor: {
                                                    '0%': '#108ee9',
                                                    '100%': '#87d068',
                                                } }), _jsxs(Row, { children: [_jsx(Col, { span: 8, children: _jsx(Statistic, { title: "Pendientes", value: pendingTasks.length, valueStyle: { color: '#faad14' } }) }), _jsx(Col, { span: 8, children: _jsx(Statistic, { title: "Completadas", value: completedTasks.length, valueStyle: { color: '#52c41a' } }) }), _jsx(Col, { span: 8, children: _jsx(Statistic, { title: "Tasa de avance", value: progress, suffix: "%", precision: 1 }) })] })] }) })] }) }), _jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { xs: 24, lg: 12, children: _jsx(Card, { title: _jsxs(Space, { children: [_jsx(ClockCircleOutlined, {}), _jsx(Text, { children: "Tareas Pendientes" }), _jsx(Badge, { count: pendingTasks.length })] }), children: pendingTasks.length === 0 ? (_jsx(Empty, { description: "No tienes tareas pendientes" })) : (_jsx(List, { dataSource: pendingTasks, renderItem: (task) => {
                                            const customer = customers.find(c => c.id === task.customerId);
                                            return (_jsx(List.Item, { actions: [
                                                    _jsx(Button, { type: "primary", icon: _jsx(PhoneOutlined, {}), onClick: () => handleCompleteTask(task), children: "Completar" })
                                                ], children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { icon: _jsx(UserOutlined, {}) }), title: customer ? `${customer.firstName} ${customer.lastName}` : `Cliente #${task.customerId}`, description: _jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { type: "secondary", children: customer?.phone }), _jsxs(Text, { type: "secondary", style: { fontSize: 12 }, children: [customer?.tier && _jsx(Tag, { color: customer.tier === 'gold' ? 'gold' : customer.tier === 'silver' ? 'default' : 'blue', children: customer.tier }), "Asignada ", dayjs(task.assignedAt).fromNow()] })] }) }) }));
                                        } })) }) }), _jsx(Col, { xs: 24, lg: 12, children: _jsx(Card, { title: _jsxs(Space, { children: [_jsx(CheckCircleOutlined, {}), _jsx(Text, { children: "Tareas Completadas Hoy" }), _jsx(Badge, { count: completedTasks.length, style: { backgroundColor: '#52c41a' } })] }), children: completedTasks.length === 0 ? (_jsx(Empty, { description: "A\u00FAn no has completado tareas hoy" })) : (_jsx(List, { dataSource: completedTasks, renderItem: (task) => {
                                            const customer = customers.find(c => c.id === task.customerId);
                                            return (_jsx(List.Item, { children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { icon: _jsx(CheckCircleOutlined, {}), style: { backgroundColor: '#52c41a' } }), title: customer ? `${customer.firstName} ${customer.lastName}` : `Cliente #${task.customerId}`, description: _jsxs(Space, { direction: "vertical", size: 0, children: [_jsx(Text, { type: "secondary", children: customer?.phone }), _jsxs(Text, { type: "success", style: { fontSize: 12 }, children: ["Completada ", dayjs(task.completedAt).fromNow()] }), task.notes && (_jsx(Paragraph, { ellipsis: { rows: 2, expandable: true }, style: { marginBottom: 0, fontSize: 12 }, children: task.notes }))] }) }) }));
                                        } })) }) })] })] })), isManager && (_jsx(Card, { title: "Resumen del Equipo", children: _jsx(Table, { dataSource: employees, columns: [
                        {
                            title: 'Agente',
                            key: 'agent',
                            render: (record) => (_jsxs(Space, { children: [_jsx(Avatar, { src: record.avatar, icon: _jsx(UserOutlined, {}) }), _jsxs(Text, { children: [record.firstName, " ", record.lastName] })] })),
                        },
                        {
                            title: 'Meta del día',
                            key: 'goal',
                            render: (record) => {
                                const goal = goals.find(g => g.employeeId === record.id);
                                if (!goal)
                                    return '-';
                                const progress = (goal.completedCalls / goal.targetCalls) * 100;
                                return (_jsxs("div", { style: { width: 200 }, children: [_jsxs(Text, { children: [goal.completedCalls, " / ", goal.targetCalls] }), _jsx(Progress, { percent: progress, size: "small" })] }));
                            },
                        },
                        {
                            title: 'Estado',
                            key: 'status',
                            render: (record) => {
                                const goal = goals.find(g => g.employeeId === record.id);
                                if (!goal)
                                    return '-';
                                if (goal.status === 'completed') {
                                    return _jsx(Tag, { color: "green", children: "Completado" });
                                }
                                else if (goal.status === 'overdue') {
                                    return _jsx(Tag, { color: "red", children: "Tareas pendientes" });
                                }
                                else {
                                    return _jsx(Tag, { color: "blue", children: "En progreso" });
                                }
                            },
                        },
                        {
                            title: 'Tareas pendientes',
                            key: 'pending',
                            render: (record) => {
                                const employeeTasks = tasks.filter(t => t.employeeId === record.id && t.status === 'pending');
                                return _jsx(Badge, { count: employeeTasks.length });
                            },
                        },
                    ] }) })), _jsx(Modal, { title: "Completar Tarea", visible: notesModal, onCancel: () => {
                    setNotesModal(false);
                    form.resetFields();
                }, footer: null, children: _jsxs(Form, { form: form, layout: "vertical", onFinish: handleSubmitNotes, children: [_jsx(Alert, { message: "Registra los detalles de la llamada", description: "Agrega notas sobre la conversaci\u00F3n, resultado y pr\u00F3ximos pasos.", type: "info", style: { marginBottom: 16 } }), _jsx(Form.Item, { name: "notes", label: "Notas de la llamada", rules: [{ required: true, message: 'Las notas son requeridas' }], children: _jsx(TextArea, { rows: 4, placeholder: "Ej: Cliente interesado en renovaci\u00F3n, llamar la pr\u00F3xima semana..." }) }), _jsx("div", { style: { textAlign: 'right' }, children: _jsxs(Space, { children: [_jsx(Button, { onClick: () => setNotesModal(false), children: "Cancelar" }), _jsx(Button, { type: "primary", htmlType: "submit", children: "Completar Tarea" })] }) })] }) })] }));
};
