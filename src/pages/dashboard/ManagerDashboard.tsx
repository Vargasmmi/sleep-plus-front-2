import React from "react";
import { useList } from "@refinedev/core";
import { Row, Col, Card, Statistic, Progress, Space, Typography, Table, Button } from "antd";
import {
  DollarOutlined,
  PhoneOutlined,
  TeamOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Column } from "@ant-design/charts";
import { Employee, Store, Sale } from "../../interfaces";

const { Title, Text } = Typography;

interface ManagerDashboardProps {
  user: Employee;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ user }) => {
  // Fetch store data
  const { data: storesData } = useList<Store>({
    resource: "stores",
    filters: [{ field: "managerId", operator: "eq", value: user.id }],
  });

  // Fetch employees in the store
  const { data: employeesData } = useList<Employee>({
    resource: "employees",
    filters: [{ field: "storeId", operator: "eq", value: user.storeId }],
  });

  // Fetch sales for the store
  const { data: salesData } = useList<Sale>({
    resource: "sales",
    filters: [{ field: "storeId", operator: "eq", value: user.storeId }],
    sorters: [{ field: "createdAt", order: "desc" }],
    pagination: { pageSize: 100 },
  });

  const stores = storesData?.data || [];
  const employees = employeesData?.data || [];
  const sales = salesData?.data || [];

  // Calculate store statistics
  const storeStats = {
    totalRevenue: stores.reduce((sum, store) => sum + (store.performance?.currentSales || 0), 0),
    totalTarget: stores.reduce((sum, store) => sum + (store.performance?.monthlyTarget || 0), 0),
    activeEmployees: employees.filter(emp => emp.status === 'active').length,
    totalCalls: employees.reduce((sum, emp) => sum + (emp.performance?.callsToday || 0), 0),
    totalSales: sales.length,
    averageSale: sales.length > 0 ? sales.reduce((sum, s) => sum + s.amount, 0) / sales.length : 0,
  };

  // Employee performance data
  const employeePerformance = employees.map(emp => ({
    name: `${emp.firstName} ${emp.lastName}`,
    calls: emp.performance?.callsToday || 0,
    conversions: emp.performance?.conversionsToday || 0,
    rate: emp.performance?.conversionRate || 0,
  }));

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Dashboard de Gerente</Title>
          <Text type="secondary">Vista de tienda: {stores[0]?.name || 'N/A'}</Text>
        </Col>
        <Col>
          <Space>
            <Button icon={<TrophyOutlined />} onClick={() => window.location.href = '/leaderboard'}>
              Tabla de Posiciones
            </Button>
            <Button icon={<TeamOutlined />} onClick={() => window.location.href = '/employees'}>
              Gestionar Equipo
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Store KPIs */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Ingresos de Tienda"
              value={storeStats.totalRevenue}
              prefix={<DollarOutlined />}
              suffix="USD"
              valueStyle={{ color: '#3f8600' }}
            />
            <Progress 
              percent={(storeStats.totalRevenue / storeStats.totalTarget) * 100} 
              showInfo={false} 
              strokeColor="#52c41a" 
            />
            <Text type="secondary">
              {((storeStats.totalRevenue / storeStats.totalTarget) * 100).toFixed(0)}% del objetivo
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Empleados Activos"
              value={storeStats.activeEmployees}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Text type="secondary">
              de {employees.length} total
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Llamadas Hoy"
              value={storeStats.totalCalls}
              prefix={<PhoneOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
            <Text type="secondary">
              Promedio: {(storeStats.totalCalls / storeStats.activeEmployees).toFixed(1)}
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Ventas Hoy"
              value={storeStats.totalSales}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
            <Text type="secondary">
              Promedio: ${storeStats.averageSale.toFixed(2)}
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Employee Performance */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Rendimiento del Equipo">
            <Column
              data={employeePerformance}
              xField="name"
              yField="calls"
              seriesField="type"
              isGroup={true}
              columnStyle={{
                radius: [20, 20, 0, 0],
              }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Conversiones por Empleado">
            <Table
              dataSource={employeePerformance}
              columns={[
                {
                  title: 'Empleado',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: 'Llamadas',
                  dataIndex: 'calls',
                  key: 'calls',
                },
                {
                  title: 'Conversiones',
                  dataIndex: 'conversions',
                  key: 'conversions',
                },
                {
                  title: 'Tasa',
                  dataIndex: 'rate',
                  key: 'rate',
                  render: (rate) => `${(rate * 100).toFixed(1)}%`
                }
              ]}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}; 