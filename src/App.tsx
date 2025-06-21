import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { UserOutlined, TeamOutlined, ScheduleOutlined, DashboardOutlined } from "@ant-design/icons";
import { authProvider } from "./authProvider";
import { Login } from "./pages/login";
import { PatientList, PatientCreate, PatientEdit, PatientShow } from "./pages/patients";
import { DoctorList, DoctorCreate, DoctorEdit, DoctorShow } from "./pages/doctors";
import { AppointmentList, AppointmentCreate, AppointmentEdit, AppointmentShow } from "./pages/appointments";
import { Dashboard } from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#1890ff",
            },
          }}
        >
          <AntdApp>
            <Refine
              dataProvider={dataProvider(import.meta.env.VITE_API_URL || "http://localhost:3001/api")}
              notificationProvider={useNotificationProvider}
              authProvider={authProvider}
              routerProvider={routerBindings}
              resources={[
                {
                  name: "dashboard",
                  list: "/",
                  meta: {
                    label: "Dashboard",
                    icon: <DashboardOutlined />,
                  },
                },
                {
                  name: "users",
                  list: "/users",
                  create: "/users/create",
                  edit: "/users/edit/:id",
                  show: "/users/show/:id",
                  meta: {
                    label: "Usuarios",
                    icon: <UserOutlined />,
                    canDelete: true,
                  },
                },
                {
                  name: "sleep-records",
                  list: "/sleep-records",
                  create: "/sleep-records/create",
                  edit: "/sleep-records/edit/:id",
                  show: "/sleep-records/show/:id",
                  meta: {
                    label: "Registros de Sueño",
                    icon: <ScheduleOutlined />,
                    canDelete: true,
                  },
                },
                {
                  name: "sleep-goals",
                  list: "/sleep-goals",
                  create: "/sleep-goals/create",
                  edit: "/sleep-goals/edit/:id",
                  show: "/sleep-goals/show/:id",
                  meta: {
                    label: "Metas de Sueño",
                    icon: <TeamOutlined />,
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "sleep-plus-admin",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated key="authenticated-routes" fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2
                        Sider={ThemedSiderV2}
                        Title={({ collapsed }) => (
                          <div style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            gap: "8px",
                            fontSize: collapsed ? "16px" : "20px",
                            fontWeight: "bold",
                            color: "#1890ff"
                          }}>
                            {!collapsed && "Sleep Plus Admin"}
                          </div>
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="/patients">
                    <Route index element={<PatientList />} />
                    <Route path="create" element={<PatientCreate />} />
                    <Route path="edit/:id" element={<PatientEdit />} />
                    <Route path="show/:id" element={<PatientShow />} />
                  </Route>
                  <Route path="/doctors">
                    <Route index element={<DoctorList />} />
                    <Route path="create" element={<DoctorCreate />} />
                    <Route path="edit/:id" element={<DoctorEdit />} />
                    <Route path="show/:id" element={<DoctorShow />} />
                  </Route>
                  <Route path="/appointments">
                    <Route index element={<AppointmentList />} />
                    <Route path="create" element={<AppointmentCreate />} />
                    <Route path="edit/:id" element={<AppointmentEdit />} />
                    <Route path="show/:id" element={<AppointmentShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </ConfigProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
