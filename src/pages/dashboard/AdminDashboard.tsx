import React from "react";
import { Row, Col, Card, Statistic, Table, Space, Tag, Progress, Typography, Avatar } from "antd";
import { 
  UserOutlined, 
  TeamOutlined, 
  ShopOutlined, 
  DollarOutlined,
  TrophyOutlined,
  PhoneOutlined,
  RiseOutlined,
  CrownOutlined
} from "@ant-design/icons";
import { Column } from "@ant-design/charts";

const { Title, Text } = Typography;

export const AdminDashboard: React.FC = () => {
  // Mock data - replace with real API calls
  const totalCustomers = 1247;
  const totalEmployees = 45;
  const totalStores = 8;
  const totalRevenue = 125430;
  const monthlyGrowth = 12.5;

  // Recent activity data
  const recentActivity = [
    { id: 1, type: "sale", description: "Nueva venta - Cliente Premium", amount: 2500, time: "Hace 5 min" },
    { id: 2, type: "employee", description: "Nuevo empleado registrado", time: "Hace 15 min" },
    { id: 3, type: "customer", description: "Cliente actualizado a Elite", time: "Hace 30 min" },
    { id: 4, type: "store", description: "Nueva tienda en Miami", time: "Hace 1 hora" },
  ];

  // Top performers data
  const topPerformers = [
    { id: 1, name: "María González", role: "Agente Senior", sales: 85, conversions: 68 },
    { id: 2, name: "Carlos Rodríguez", role: "Agente", sales: 72, conversions: 54 },
    { id: 3, name: "Ana López", role: "Agente Senior", sales: 69, conversions: 52 },
    { id: 4, name: "Luis Martínez", role: "Agente", sales: 61, conversions: 45 },
  ];

  // Sales chart data
  const salesData = [
    { month: 'Ene', sales: 45000 },
    { month: 'Feb', sales: 52000 },
    { month: 'Mar', sales: 48000 },
    { month: 'Abr', sales: 61000 },
    { month: 'May', sales: 55000 },
    { month: 'Jun', sales: 67000 },
  ];

  const salesConfig = {
    data: salesData,
    xField: 'month',
    yField: 'sales',
    color: '#1890ff',
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
  };

  const activityColumns = [
    {
      title: 'Actividad',
      dataIndex: 'description',
      key: 'description',
      render: (text: string, record: any) => (
        <div>
          <Text strong>{text}</Text>
          {record.amount && (
            <div>
              <Text type="success">${record.amount.toLocaleString()}</Text>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Tiempo',
      dataIndex: 'time',
      key: 'time',
      width: 120,
    },
  ];

  const performersColumns = [
    {
      title: 'Empleado',
      key: 'employee',
      render: (record: any) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>{record.role}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Ventas',
      dataIndex: 'sales',
      key: 'sales',
      render: (sales: number) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{sales}</div>
          <Progress percent={sales} size="small" showInfo={false} />
        </div>
      ),
    },
    {
      title: 'Conversiones',
      dataIndex: 'conversions',
      key: 'conversions',
      render: (conversions: number) => (
        <Tag color="green">{conversions}%</Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Dashboard Administrativo</Title>
          <Text type="secondary">Resumen general del sistema</Text>
        </Col>
      </Row>

      {/* Main Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Clientes"
              value={totalCustomers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
              suffix={
                <div style={{ fontSize: '12px', marginTop: '4px' }}>
                  <RiseOutlined style={{ color: '#52c41a' }} /> +{monthlyGrowth}%
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Empleados Activos"
              value={totalEmployees}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tiendas"
              value={totalStores}
              prefix={<ShopOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Ingresos del Mes"
              value={totalRevenue}
              prefix={<DollarOutlined />}
              suffix="USD"
              valueStyle={{ color: '#3f8600' }}
              precision={0}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts and Tables Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Ventas por Mes" extra={<TrophyOutlined />}>
            <Column {...salesConfig} height={300} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Top Performers" extra={<CrownOutlined />}>
            <Table
              dataSource={topPerformers}
              columns={performersColumns}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Actividad Reciente" extra={<PhoneOutlined />}>
            <Table
              dataSource={recentActivity}
              columns={activityColumns}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Métricas de Rendimiento">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="Llamadas Hoy"
                  value={342}
                  prefix={<PhoneOutlined />}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Tasa de Conversión"
                  value={68.5}
                  suffix="%"
                  prefix={<RiseOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Clientes Elite"
                  value={89}
                  prefix={<CrownOutlined />}
                  valueStyle={{ color: '#faad14' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Satisfacción"
                  value={4.7}
                  suffix="/ 5.0"
                  prefix={<TrophyOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}; 