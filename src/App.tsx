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
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
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
                  name: "patients",
                  list: "/patients",
                  create: "/patients/create",
                  edit: "/patients/edit/:id",
                  show: "/patients/show/:id",
                  meta: {
                    icon: <UserOutlined />,
                    canDelete: true,
                  },
                },
                {
                  name: "doctors",
                  list: "/doctors",
                  create: "/doctors/create",
                  edit: "/doctors/edit/:id",
                  show: "/doctors/show/:id",
                  meta: {
                    icon: <TeamOutlined />,
                    canDelete: true,
                  },
                },
                {
                  name: "appointments",
                  list: "/appointments",
                  create: "/appointments/create",
                  edit: "/appointments/edit/:id",
                  show: "/appointments/show/:id",
                  meta: {
                    icon: <ScheduleOutlined />,
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
