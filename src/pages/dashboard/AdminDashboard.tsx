import React from "react";
import { useList } from "@refinedev/core";
import { Row, Col, Card, Statistic, Progress, Space, Typography, Tag, Table, Button } from "antd";
import {
  DollarOutlined,
  UserOutlined,
  PhoneOutlined,
  TeamOutlined,
  ShopOutlined,
  SettingOutlined,
  SafetyOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { Column, Pie } from "@ant-design/charts";
import dayjs from "dayjs";
import { Employee, Store, Sale, Customer } from "../../interfaces";

const { Title, Text } = Typography;

interface AdminDashboardProps {
  user: Employee;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  // Fetch all stores
  const { data: storesData } = useList<Store>({
    resource: "stores",
  });

  // Fetch all employees
  const { data: employeesData } = useList<Employee>({
    resource: "employees",
  });

  // Fetch recent sales
  const { data: salesData } = useList<Sale>({
    resource: "sales",
    sorters: [{ field: "createdAt", order: "desc" }],
    pagination: { pageSize: 100 },
  });

  // Fetch customers
  const { data: customersData } = useList<Customer>({
    resource: "customers",
  });

  const stores = storesData?.data || [];
  const employees = employeesData?.data || [];
  const sales = salesData?.data || [];
  const customers = customersData?.data || [];

  // Calculate system-wide statistics
  const systemStats = {
    totalRevenue: stores.reduce((sum, store) => sum + (store.performance?.currentSales || 0), 0),
    totalTarget: stores.reduce((sum, store) => sum + (store.performance?.monthlyTarget || 0), 0),
    activeEmployees: employees.filter(emp => emp.status === 'active').length,
    totalCustomers: customers.length,
    eliteMembers: customers.filter(c => c.isEliteMember).length,
    totalCalls: employees.reduce((sum, emp) => sum + (emp.performance?.callsToday || 0), 0),
  };

  // Performance by store
  const storePerformanceData = stores.map(store => ({
    name: store.name,
    sales: store.performance?.currentSales || 0,
    target: store.performance?.monthlyTarget || 0,
    percentage: ((store.performance?.currentSales || 0) / (store.performance?.monthlyTarget || 1) * 100).toFixed(1),
  }));

  // Employee distribution by role
  const employeeDistribution = [
    { type: 'Administradores', value: employees.filter(e => e.role === 'admin').length },
    { type: 'Gerentes', value: employees.filter(e => e.role === 'manager').length },
    { type: 'Agentes', value: employees.filter(e => e.role === 'agent').length },
  ];

  // Customer tier distribution
  const customerTierData = [
    { type: 'Oro', value: customers.filter(c => c.tier === 'gold').length },
    { type: 'Plata', value: customers.filter(c => c.tier === 'silver').length },
    { type: 'Bronce', value: customers.filter(c => c.tier === 'bronze').length },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Dashboard Administrativo</Title>
          <Text type="secondary">Vista completa del sistema</Text>
        </Col>
        <Col>
          <Space>
            <Button icon={<SettingOutlined />} onClick={() => window.location.href = '/admin/settings'}>
              Configuración del Sistema
            </Button>
            <Button icon={<SafetyOutlined />} onClick={() => window.location.href = '/admin/permissions'}>
              Gestionar Permisos
            </Button>
          </Space>
        </Col>
      </Row>

      {/* System-wide KPIs */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="Ingresos Totales"
              value={systemStats.totalRevenue}
              prefix={<DollarOutlined />}
              suffix="USD"
              valueStyle={{ color: '#3f8600' }}
            />
            <Progress 
              percent={(systemStats.totalRevenue / systemStats.totalTarget) * 100} 
              showInfo={false} 
              strokeColor="#52c41a" 
            />
            <Text type="secondary">
              {((systemStats.totalRevenue / systemStats.totalTarget) * 100).toFixed(0)}% del objetivo
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="Total Tiendas"
              value={stores.length}
              prefix={<ShopOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Text type="secondary">
              {stores.filter(s => s.status === 'active').length} activas
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="Total Empleados"
              value={employees.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
            <Text type="secondary">
              {systemStats.activeEmployees} activos
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="Total Clientes"
              value={customers.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
            <Text type="secondary">
              {systemStats.eliteMembers} miembros elite
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="Llamadas Hoy"
              value={systemStats.totalCalls}
              prefix={<PhoneOutlined />}
              valueStyle={{ color: '#eb2f96' }}
            />
            <Text type="secondary">
              Promedio por empleado
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={4}>
          <Card>
            <Statistic
              title="Crecimiento"
              value={15.3}
              precision={1}
              prefix={<RiseOutlined />}
              suffix="%"
              valueStyle={{ color: '#52c41a' }}
            />
            <Text type="secondary">
              vs mes anterior
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Rendimiento por Tienda">
            <Column
              data={storePerformanceData}
              xField="name"
              yField="sales"
              seriesField="type"
              isGroup={true}
              columnStyle={{
                radius: [20, 20, 0, 0],
              }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Distribución de Empleados">
            <Pie
              data={employeeDistribution}
              angleField="value"
              colorField="type"
              radius={0.8}
              label={{
                type: 'outer',
                content: '{name} {percentage}',
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Ventas Recientes">
            <Table
              dataSource={sales.slice(0, 5)}
              columns={[
                {
                  title: 'Cliente',
                  dataIndex: 'customerId',
                  key: 'customerId',
                  render: (customerId) => {
                    const customer = customers.find(c => c.id === customerId);
                    return customer ? `${customer.firstName} ${customer.lastName}` : customerId;
                  }
                },
                {
                  title: 'Monto',
                  dataIndex: 'amount',
                  key: 'amount',
                  render: (amount) => `$${amount.toFixed(2)}`
                },
                {
                  title: 'Estado',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status) => (
                    <Tag color={
                      status === 'completed' ? 'green' :
                      status === 'pending' ? 'orange' : 'red'
                    }>
                      {status}
                    </Tag>
                  )
                },
                {
                  title: 'Fecha',
                  dataIndex: 'createdAt',
                  key: 'createdAt',
                  render: (date) => dayjs(date).format('MM/DD/YYYY')
                }
              ]}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Distribución de Clientes por Tier">
            <Pie
              data={customerTierData}
              angleField="value"
              colorField="type"
              radius={0.8}
              label={{
                type: 'outer',
                content: '{name} {percentage}',
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}; 