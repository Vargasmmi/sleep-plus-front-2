import React from "react";
import { useGetIdentity } from "@refinedev/core";
import { AdminDashboard } from "./AdminDashboard";
import { ManagerDashboard } from "./ManagerDashboard";
import { AgentDashboard } from "./AgentDashboard";
import { Employee } from "../../interfaces";

export const DashboardPage: React.FC = () => {
  const { data: identity } = useGetIdentity<Employee>();

  if (!identity) {
    return <div>Cargando...</div>;
  }

  // Render appropriate dashboard based on user role
  switch (identity.role) {
    case "admin":
      return <AdminDashboard />;
    case "manager":
      return <ManagerDashboard user={identity} />;
    case "agent":
      return <AgentDashboard user={identity} />;
    default:
      return <AdminDashboard />;
  }
};
