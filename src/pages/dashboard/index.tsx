import React, { useEffect, useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { Alert, Typography } from "antd";
import { Employee } from "../../interfaces";

const { Text } = Typography;

// Import role-specific dashboards
import { AdminDashboard } from "./AdminDashboard";
import { ManagerDashboard } from "./ManagerDashboard";
import { AgentDashboard } from "./AgentDashboard";

export const Dashboard: React.FC = () => {
  const { data: identity } = useGetIdentity<Employee>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (identity) {
      setLoading(false);
    }
  }, [identity]);

  if (loading) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Text>Loading dashboard...</Text>
      </div>
    );
  }

  if (!identity) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="Error"
          description="Could not load user information"
          type="error"
        />
      </div>
    );
  }

  // Render role-specific dashboard
  switch (identity.role) {
    case 'admin':
      return <AdminDashboard user={identity} />;
    case 'manager':
      return <ManagerDashboard user={identity} />;
    case 'agent':
      return <AgentDashboard user={identity} />;
    default:
      return (
        <div style={{ padding: 24 }}>
          <Alert
            message="Unrecognized Role"
            description={`The role "${identity.role}" does not have a configured dashboard`}
            type="warning"
          />
        </div>
      );
  }
};
