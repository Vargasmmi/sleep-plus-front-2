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
import { UserOutlined, TeamOutlined, ShopOutlined, DashboardOutlined } from "@ant-design/icons";
import { authProvider } from "./authProvider";
import { Login } from "./pages/login";
import { DashboardPage } from "./pages/dashboard";
import { CustomerList } from "./pages/customers";
import { EmployeeList } from "./pages/employees";
import { StoreList } from "./pages/stores";

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
                  name: "customers",
                  list: "/customers",
                  meta: {
                    label: "Clientes",
                    icon: <UserOutlined />,
                  },
                },
                {
                  name: "employees",
                  list: "/employees",
                  meta: {
                    label: "Empleados",
                    icon: <TeamOutlined />,
                  },
                },
                {
                  name: "stores",
                  list: "/stores",
                  meta: {
                    label: "Tiendas",
                    icon: <ShopOutlined />,
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
                        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route index element={<DashboardPage />} />
                  <Route path="/customers" element={<CustomerList />} />
                  <Route path="/employees" element={<EmployeeList />} />
                  <Route path="/stores" element={<StoreList />} />
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
