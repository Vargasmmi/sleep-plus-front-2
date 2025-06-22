import React from "react";
import { Table, Space, Tag, Card, Typography, Avatar, Row, Col, Statistic, Progress } from "antd";
import { ShopOutlined, DollarOutlined, TeamOutlined, TrophyOutlined, RiseOutlined } from "@ant-design/icons";
import { Store } from "../../interfaces";

const { Title, Text } = Typography;

export const StoreList: React.FC = () => {
  // Mock data for now - this will be replaced with real API calls later
  const stores: Store[] = [];

  const columns = [
    {
      title: "Tienda",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: Store) => (
        <Space>
          <Avatar icon={<ShopOutlined />} />
          <div>
            <div style={{ fontWeight: "bold" }}>{name}</div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              ID: {record.id}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Ubicación",
      dataIndex: "location",
      key: "location",
      render: (location: string) => (
        <div>
          <Text>{location}</Text>
        </div>
      ),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors = {
          active: "green",
          inactive: "red",
          maintenance: "orange",
        };
        const labels = {
          active: "Activa",
          inactive: "Inactiva",
          maintenance: "Mantenimiento",
        };
        return <Tag color={colors[status as keyof typeof colors]}>{labels[status as keyof typeof labels]}</Tag>;
      },
    },
    {
      title: "Rendimiento",
      key: "performance",
      render: (record: Store) => (
        <div>
          <div>
            <DollarOutlined style={{ marginRight: 4 }} />
            Ventas: ${record.performance?.currentSales?.toFixed(2) || "0.00"}
          </div>
          <div>
            <TrophyOutlined style={{ marginRight: 4 }} />
            Objetivo: ${record.performance?.monthlyTarget?.toFixed(2) || "0.00"}
          </div>
          <Progress
            percent={record.performance?.currentSales && record.performance?.monthlyTarget 
              ? (record.performance.currentSales / record.performance.monthlyTarget) * 100 
              : 0}
            size="small"
            showInfo={false}
            strokeColor="#52c41a"
          />
          <Text type="secondary" style={{ fontSize: "10px" }}>
            {record.performance?.currentSales && record.performance?.monthlyTarget 
              ? ((record.performance.currentSales / record.performance.monthlyTarget) * 100).toFixed(1)
              : "0"}% del objetivo
          </Text>
        </div>
      ),
    },
    {
      title: "Empleados",
      dataIndex: "employeeCount",
      key: "employeeCount",
      render: (count: number) => (
        <div>
          <TeamOutlined style={{ marginRight: 4 }} />
          {count || 0} empleados
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Tiendas</Title>
          <Text type="secondary">Gestión de tiendas del sistema</Text>
        </Col>
      </Row>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Tiendas"
              value={stores.length}
              prefix={<ShopOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tiendas Activas"
              value={stores.filter((s: Store) => s.status === "active").length}
              prefix={<ShopOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Ingresos Totales"
              value={stores.reduce((sum: number, store: Store) => sum + (store.performance?.currentSales || 0), 0)}
              prefix={<DollarOutlined />}
              suffix="USD"
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Promedio por Tienda"
              value={stores.length > 0 ? stores.reduce((sum: number, store: Store) => sum + (store.performance?.currentSales || 0), 0) / stores.length : 0}
              prefix={<RiseOutlined />}
              suffix="USD"
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
      </Row>

      <Table
        dataSource={stores}
        columns={columns}
        rowKey="id"
        scroll={{ x: 1400 }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}; 