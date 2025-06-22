import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { Typography, Alert } from "antd";
const { Title, Text } = Typography;
// Import role-specific dashboards
import { AdminDashboard } from "./AdminDashboard";
import { ManagerDashboard } from "./ManagerDashboard";
import { AgentDashboard } from "./AgentDashboard";
export const DashboardPage = () => {
    const { data: identity } = useGetIdentity();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (identity) {
            setLoading(false);
        }
    }, [identity]);
    if (loading) {
        return (_jsx("div", { style: { padding: 24, textAlign: 'center' }, children: _jsx(Text, { children: "Loading dashboard..." }) }));
    }
    if (!identity) {
        return (_jsx("div", { style: { padding: 24 }, children: _jsx(Alert, { message: "Error", description: "Could not load user information", type: "error" }) }));
    }
    // Render role-specific dashboard
    switch (identity.role) {
        case 'admin':
            return _jsx(AdminDashboard, { user: identity });
        case 'manager':
            return _jsx(ManagerDashboard, { user: identity });
        case 'agent':
            return _jsx(AgentDashboard, { user: identity });
        default:
            return (_jsx("div", { style: { padding: 24 }, children: _jsx(Alert, { message: "Unrecognized Role", description: `The role "${identity.role}" does not have a configured dashboard`, type: "warning" }) }));
    }
};
