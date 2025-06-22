import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useList, useUpdate, useCreate, useDelete } from "@refinedev/core";
import { Card, Table, Switch, Button, Space, Typography, Tag, Modal, Form, Input, Select, Tabs, Alert, Popconfirm, Row, Col, Divider, App } from "antd";
import { SafetyOutlined, UserOutlined, TeamOutlined, PlusOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined, } from "@ant-design/icons";
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
// Define all resources and their actions
const RESOURCES = [
    { key: 'dashboard', name: 'Dashboard', actions: ['view'] },
    { key: 'call-center', name: 'Call Center', actions: ['view'] },
    { key: 'customers', name: 'Customers', actions: ['list', 'create', 'edit', 'delete', 'show'] },
    { key: 'subscriptions', name: 'Subscriptions', actions: ['list', 'create', 'edit', 'delete', 'show'] },
    { key: 'evaluations', name: 'T&S Evaluations', actions: ['list', 'create', 'edit', 'delete', 'show'] },
    { key: 'employees', name: 'Employees', actions: ['list', 'create', 'edit', 'delete', 'show'] },
    { key: 'stores', name: 'Stores', actions: ['list', 'create', 'edit', 'delete', 'show'] },
    { key: 'calls', name: 'Calls', actions: ['list', 'create', 'edit', 'delete', 'show'] },
    { key: 'sales', name: 'Sales', actions: ['list', 'create', 'edit', 'delete', 'show'] },
    { key: 'campaigns', name: 'Campaigns', actions: ['list', 'create', 'edit', 'delete', 'show'] },
    { key: 'commissions', name: 'Commissions', actions: ['list', 'create', 'edit', 'delete', 'show'] },
    { key: 'achievements', name: 'Achievements', actions: ['list', 'create', 'edit', 'delete', 'show'] },
    { key: 'scripts', name: 'Scripts', actions: ['list', 'create', 'edit', 'delete', 'show'] },
    { key: 'systemSettings', name: 'System Settings', actions: ['view', 'edit'] },
    { key: 'permissions', name: 'Permissions', actions: ['view', 'edit'] },
    { key: 'dailyTasks', name: 'Daily Tasks', actions: ['list', 'view'] },
    { key: 'leaderboard', name: 'Leaderboard', actions: ['view'] },
    { key: 'activityLogs', name: 'Activity Logs', actions: ['list', 'show'] },
    { key: 'webhooks', name: 'Webhooks', actions: ['list', 'show'] },
    { key: 'webhookSettings', name: 'Webhook Settings', actions: ['view', 'edit'] },
    { key: 'shopifySettings', name: 'Shopify Settings', actions: ['view', 'edit'] },
    { key: 'shopifyProducts', name: 'Shopify Products', actions: ['list', 'create', 'edit', 'delete', 'show'] },
    { key: 'shopifyCustomers', name: 'Shopify Customers', actions: ['list', 'create', 'edit', 'delete', 'show'] },
    { key: 'shopifyCoupons', name: 'Shopify Coupons', actions: ['list', 'create', 'edit', 'delete', 'show'] },
];
export const PermissionsPage = () => {
    const { notification } = App.useApp();
    const [activeTab, setActiveTab] = useState("roles");
    const [editingRole, setEditingRole] = useState(null);
    const [createRoleModal, setCreateRoleModal] = useState(false);
    const [overrideModal, setOverrideModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [roleForm] = Form.useForm();
    const [overrideForm] = Form.useForm();
    // Fetch data
    const { data: rolesData, refetch: refetchRoles } = useList({
        resource: "roles",
    });
    const { data: permissionsData, refetch: refetchPermissions } = useList({
        resource: "permissions",
    });
    const { data: overridesData, refetch: refetchOverrides } = useList({
        resource: "userPermissionOverrides",
    });
    const { data: employeesData } = useList({
        resource: "employees",
    });
    const { mutate: updatePermission } = useUpdate();
    const { mutate: createRole } = useCreate();
    const { mutate: updateRole } = useUpdate();
    const { mutate: deleteRole } = useDelete();
    const { mutate: createOverride } = useCreate();
    const { mutate: deleteOverride } = useDelete();
    const roles = rolesData?.data || [];
    const permissions = permissionsData?.data || [];
    const overrides = overridesData?.data || [];
    const employees = employeesData?.data || [];
    // Handle permission toggle
    const handlePermissionToggle = (roleId, resource, action, checked) => {
        const permission = permissions.find(p => p.roleId === roleId && p.resource === resource && p.action === action);
        if (permission) {
            updatePermission({
                resource: "permissions",
                id: permission.id,
                values: { allowed: checked },
                mutationMode: "optimistic",
            }, {
                onSuccess: () => {
                    notification.success({
                        message: "Permission Updated",
                        description: `Permission has been ${checked ? 'granted' : 'revoked'}.`,
                    });
                    // Force immediate update of permissions
                    refetchPermissions();
                    // Reload the page after a short delay to ensure menu updates
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                },
                onError: (error) => {
                    notification.error({
                        message: "Error Updating Permission",
                        description: error?.message || "Could not update permission",
                    });
                    refetchPermissions();
                },
            });
        }
        else {
            notification.warning({
                message: "Permission Not Found",
                description: "Permission not found in database. Run fix-permissions.js script",
            });
        }
    };
    // Create new role
    const handleCreateRole = (values) => {
        createRole({
            resource: "roles",
            values: {
                ...values,
                isSystem: false,
                permissions: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        }, {
            onSuccess: () => {
                notification.success({
                    message: "Role Created",
                    description: "New role has been created successfully.",
                });
                setCreateRoleModal(false);
                roleForm.resetFields();
                refetchRoles();
            },
        });
    };
    // Delete role
    const handleDeleteRole = (roleId) => {
        deleteRole({
            resource: "roles",
            id: roleId,
        }, {
            onSuccess: () => {
                notification.success({
                    message: "Role Deleted",
                    description: "Role has been deleted successfully.",
                });
                refetchRoles();
            },
        });
    };
    // Create permission override
    const handleCreateOverride = (values) => {
        createOverride({
            resource: "userPermissionOverrides",
            values: {
                ...values,
                createdAt: new Date().toISOString(),
                createdBy: "admin-001", // Should be current user
            },
        }, {
            onSuccess: () => {
                notification.success({
                    message: "Override Created",
                    description: "Custom permissions have been applied.",
                });
                setOverrideModal(false);
                overrideForm.resetFields();
                refetchOverrides();
            },
        });
    };
    // Role permissions table columns
    const getPermissionColumns = (roleId) => {
        const actionColumns = ['list', 'create', 'edit', 'delete', 'show', 'view'].map(action => ({
            title: action.charAt(0).toUpperCase() + action.slice(1),
            dataIndex: action,
            key: action,
            width: 100,
            align: 'center',
            render: (_, record) => {
                if (!record.actions.includes(action))
                    return '-';
                const permission = permissions.find(p => p.roleId === roleId && p.resource === record.key && p.action === action);
                return (_jsx(Switch, { checked: permission?.allowed || false, onChange: (checked) => handlePermissionToggle(roleId, record.key, action, checked), size: "small" }));
            },
        }));
        return [
            {
                title: 'Resource',
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                width: 200,
            },
            ...actionColumns,
        ];
    };
    const resourcesData = RESOURCES.map(r => ({
        key: r.key,
        name: r.name,
        actions: r.actions,
    }));
    return (_jsxs("div", { style: { padding: 24 }, children: [_jsx(Row, { justify: "space-between", align: "middle", style: { marginBottom: 24 }, children: _jsxs(Col, { children: [_jsxs(Title, { level: 2, children: [_jsx(SafetyOutlined, {}), " Permission Management"] }), _jsx(Text, { type: "secondary", children: "Manage system roles and permissions" })] }) }), _jsxs(Tabs, { activeKey: activeTab, onChange: setActiveTab, children: [_jsx(TabPane, { tab: _jsxs("span", { children: [_jsx(TeamOutlined, {}), " Roles"] }), children: _jsxs(Space, { direction: "vertical", style: { width: '100%' }, size: "large", children: [_jsx("div", { style: { textAlign: 'right' }, children: _jsx(Button, { type: "primary", icon: _jsx(PlusOutlined, {}), onClick: () => setCreateRoleModal(true), children: "Create New Role" }) }), roles.map(role => (_jsxs(Card, { title: _jsxs(Space, { children: [_jsx(Text, { strong: true, children: role.displayName }), _jsx(Tag, { color: role.isSystem ? 'blue' : 'green', children: role.isSystem ? 'System' : 'Custom' })] }), extra: !role.isSystem && (_jsxs(Space, { children: [_jsx(Button, { icon: _jsx(EditOutlined, {}), size: "small", onClick: () => setEditingRole(role), children: "Edit" }), _jsx(Popconfirm, { title: "Are you sure you want to delete this role?", onConfirm: () => handleDeleteRole(role.id), okText: "Yes", cancelText: "No", children: _jsx(Button, { danger: true, icon: _jsx(DeleteOutlined, {}), size: "small", children: "Delete" }) })] })), children: [_jsx(Text, { type: "secondary", children: role.description }), _jsx(Divider, {}), _jsx(Table, { dataSource: resourcesData, columns: getPermissionColumns(role.id), pagination: false, scroll: { x: 1000 }, size: "small" })] }, role.id)))] }) }, "roles"), _jsx(TabPane, { tab: _jsxs("span", { children: [_jsx(UserOutlined, {}), " User Permissions"] }), children: _jsxs(Space, { direction: "vertical", style: { width: '100%' }, size: "large", children: [_jsx(Alert, { message: "Custom Permissions", description: "Here you can grant or revoke specific permissions to individual users, regardless of their role.", type: "info", showIcon: true }), _jsx("div", { style: { textAlign: 'right' }, children: _jsx(Button, { type: "primary", icon: _jsx(PlusOutlined, {}), onClick: () => setOverrideModal(true), children: "Add Override" }) }), _jsx(Table, { dataSource: overrides, columns: [
                                        {
                                            title: 'User',
                                            key: 'user',
                                            render: (record) => {
                                                const employee = employees.find(e => e.id === record.userId);
                                                return (_jsxs(Space, { children: [_jsx(UserOutlined, {}), _jsx(Text, { children: employee ? `${employee.firstName} ${employee.lastName}` : record.userId })] }));
                                            },
                                        },
                                        {
                                            title: 'Permissions',
                                            key: 'permissions',
                                            render: (record) => (_jsx(Space, { wrap: true, children: record.permissions.map((perm, index) => (_jsxs(Tag, { color: perm.allowed ? 'green' : 'red', icon: perm.allowed ? _jsx(CheckCircleOutlined, {}) : _jsx(CloseCircleOutlined, {}), children: [perm.resource, ".", perm.action] }, index))) })),
                                        },
                                        {
                                            title: 'Reason',
                                            dataIndex: 'reason',
                                            key: 'reason',
                                        },
                                        {
                                            title: 'Created',
                                            dataIndex: 'createdAt',
                                            key: 'createdAt',
                                            render: (date) => new Date(date).toLocaleDateString(),
                                        },
                                        {
                                            title: 'Actions',
                                            key: 'actions',
                                            render: (record) => (_jsx(Popconfirm, { title: "Delete this override?", onConfirm: () => {
                                                    deleteOverride({
                                                        resource: "userPermissionOverrides",
                                                        id: record.id,
                                                    }, {
                                                        onSuccess: () => {
                                                            notification.success({
                                                                message: "Override deleted",
                                                            });
                                                            refetchOverrides();
                                                        },
                                                    });
                                                }, children: _jsx(Button, { danger: true, size: "small", icon: _jsx(DeleteOutlined, {}), children: "Delete" }) })),
                                        },
                                    ] })] }) }, "overrides")] }), _jsx(Modal, { title: "Create New Role", visible: createRoleModal, onCancel: () => {
                    setCreateRoleModal(false);
                    roleForm.resetFields();
                }, footer: null, children: _jsxs(Form, { form: roleForm, layout: "vertical", onFinish: handleCreateRole, children: [_jsx(Form.Item, { name: "name", label: "Role Name (internal)", rules: [{ required: true, message: 'Required' }], children: _jsx(Input, { placeholder: "example: supervisor" }) }), _jsx(Form.Item, { name: "displayName", label: "Display Name", rules: [{ required: true, message: 'Required' }], children: _jsx(Input, { placeholder: "Sales Supervisor" }) }), _jsx(Form.Item, { name: "description", label: "Description", rules: [{ required: true, message: 'Required' }], children: _jsx(Input.TextArea, { rows: 3, placeholder: "Role description and responsibilities" }) }), _jsx("div", { style: { textAlign: 'right' }, children: _jsxs(Space, { children: [_jsx(Button, { onClick: () => setCreateRoleModal(false), children: "Cancel" }), _jsx(Button, { type: "primary", htmlType: "submit", children: "Create Role" })] }) })] }) }), _jsx(Modal, { title: "Add Custom Permissions", visible: overrideModal, onCancel: () => {
                    setOverrideModal(false);
                    overrideForm.resetFields();
                }, footer: null, width: 600, children: _jsxs(Form, { form: overrideForm, layout: "vertical", onFinish: handleCreateOverride, children: [_jsx(Form.Item, { name: "userId", label: "User", rules: [{ required: true, message: 'Select a user' }], children: _jsx(Select, { placeholder: "Select a user", children: employees.map(emp => (_jsxs(Option, { value: emp.id, children: [emp.firstName, " ", emp.lastName, " - ", emp.role] }, emp.id))) }) }), _jsx(Form.Item, { name: "reason", label: "Reason", rules: [{ required: true, message: 'Provide a reason' }], children: _jsx(Input.TextArea, { rows: 2, placeholder: "Reason for these special permissions" }) }), _jsx(Form.Item, { name: "permissions", label: "Permissions", rules: [{ required: true, message: 'Add at least one permission' }], children: _jsx(Alert, { message: "Coming Soon", description: "The interface for adding specific permissions will be available soon.", type: "info" }) }), _jsx("div", { style: { textAlign: 'right' }, children: _jsxs(Space, { children: [_jsx(Button, { onClick: () => setOverrideModal(false), children: "Cancel" }), _jsx(Button, { type: "primary", htmlType: "submit", children: "Create Override" })] }) })] }) })] }));
};
