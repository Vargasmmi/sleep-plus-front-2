import React from "react";
import { useList } from "@refinedev/core";
import { Row, Col, Card, Statistic, Progress, Space, Typography, Tag, Table, Button } from "antd";
import {
  DollarOutlined,
  PhoneOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FireOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Line, Column, Gauge } from "@ant-design/charts";
import dayjs from "dayjs";
import { Employee, Sale, Customer } from "../../interfaces";

const { Title, Text } = Typography;

interface AgentDashboardProps {
  user: Employee;
}

export const AgentDashboard: React.FC<AgentDashboardProps> = ({ user }) => {
  // Fetch agent's sales
  const { data: salesData } = useList<Sale>({
    resource: "sales",
    filters: [{ field: "employeeId", operator: "eq", value: user.id }],
    sorters: [{ field: "createdAt", order: "desc" }],
    pagination: { pageSize: 100 },
  });

  // Fetch agent's customers
  const { data: customersData } = useList<Customer>({
    resource: "customers",
    filters: [{ field: "assignedAgentId", operator: "eq", value: user.id }],
  });

  const sales = salesData?.data || [];
  const customers = customersData?.data || [];

  // Calculate agent statistics
  const agentStats = {
    totalSales: sales.length,
    totalRevenue: sales.reduce((sum, sale) => sum + sale.amount, 0),
    callsToday: user.performance?.callsToday || 0,
    conversionsToday: user.performance?.conversionsToday || 0,
    conversionRate: user.performance?.conversionRate || 0,
    averageSale: sales.length > 0 ? sales.reduce((sum, s) => sum + s.amount, 0) / sales.length : 0,
    customersAssigned: customers.length,
  };

  // Today's performance
  const todaySales = sales.filter(sale => 
    dayjs(sale.createdAt).isSame(dayjs(), 'day')
  );

  // Weekly performance
  const weeklySales = Array.from({ length: 7 }, (_, i) => {
    const date = dayjs().subtract(6 - i, 'days');
    const daySales = sales.filter(s => dayjs(s.createdAt).isSame(date, 'day'));
    return {
      date: date.format('ddd'),
      sales: daySales.length,
      revenue: daySales.reduce((sum, s) => sum + s.amount, 0),
    };
  });

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Dashboard de Agente</Title>
          <Text type="secondary">Bienvenido, {user.firstName} {user.lastName}</Text>
        </Col>
        <Col>
          <Space>
            <Button icon={<TrophyOutlined />} onClick={() => window.location.href = '/leaderboard'}>
              Ver Posición
            </Button>
            <Button icon={<UserOutlined />} onClick={() => window.location.href = '/customers'}>
              Mis Clientes
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Agent KPIs */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Ventas Hoy"
              value={todaySales.length}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
            <Text type="secondary">
              ${todaySales.reduce((sum, s) => sum + s.amount, 0).toFixed(2)} en ingresos
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Llamadas Hoy"
              value={agentStats.callsToday}
              prefix={<PhoneOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Text type="secondary">
              {agentStats.conversionsToday} conversiones
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tasa de Conversión"
              value={agentStats.conversionRate * 100}
              precision={1}
              prefix={<FireOutlined />}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
            />
            <Progress 
              percent={agentStats.conversionRate * 100} 
              showInfo={false} 
              strokeColor="#722ed1" 
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Clientes Asignados"
              value={agentStats.customersAssigned}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
            <Text type="secondary">
              Promedio venta: ${agentStats.averageSale.toFixed(2)}
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Performance Charts */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Rendimiento Semanal">
            <Column
              data={weeklySales}
              xField="date"
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
          <Card title="Objetivo de Conversión">
            <Gauge
              percent={agentStats.conversionRate}
              range={{
                color: ['l(0) 0:#B8E1FF 1:#3D76DD'],
              }}
              startAngle={Math.PI}
              endAngle={2 * Math.PI}
              indicator={{
                pointer: {
                  style: {
                    stroke: '#D0D0D0',
                  },
                },
                pin: {
                  style: {
                    stroke: '#D0D0D0',
                  },
                },
              }}
              statistic={{
                title: {
                  offsetY: -36,
                  style: {
                    fontSize: '36px',
                    color: '#4B535E',
                },
                formatter: () => '70%',
              },
              content: {
                style: {
                  fontSize: '24px',
                  lineHeight: '44px',
                  color: '#4B535E',
                },
                formatter: () => `${(agentStats.conversionRate * 100).toFixed(1)}%`,
              },
            }}
          />
        </Card>
        </Col>
      </Row>

      {/* Recent Sales */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24}>
          <Card title="Ventas Recientes">
            <Table
              dataSource={sales.slice(0, 10)}
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
                  render: (date) => dayjs(date).format('MM/DD/YYYY HH:mm')
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