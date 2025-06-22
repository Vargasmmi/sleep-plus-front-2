import React from "react";
import { Table, Space, Tag, Card, Typography, Avatar, Row, Col, Statistic, Progress } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, TeamOutlined, TrophyOutlined, FireOutlined } from "@ant-design/icons";
import { Employee } from "../../interfaces";

const { Title, Text } = Typography;

export const EmployeeList: React.FC = () => {
  // Mock data for now - this will be replaced with real API calls later
  const employees: Employee[] = [];

  const columns = [
    {
      title: "Empleado",
      dataIndex: ["firstName", "lastName"],
      key: "name",
      render: (_: any, record: Employee) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: "bold" }}>
              {record.firstName} {record.lastName}
            </div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              ID: {record.id}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Contacto",
      key: "contact",
      render: (record: Employee) => (
        <div>
          <div>
            <PhoneOutlined style={{ marginRight: 8 }} />
            {record.email}
          </div>
          <div>
            <MailOutlined style={{ marginRight: 8 }} />
            {record.email}
          </div>
        </div>
      ),
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        const colors = {
          admin: "red",
          manager: "blue",
          agent: "green",
        };
        const labels = {
          admin: "Administrador",
          manager: "Gerente",
          agent: "Agente",
        };
        return <Tag color={colors[role as keyof typeof colors]}>{labels[role as keyof typeof labels]}</Tag>;
      },
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors = {
          active: "green",
          inactive: "red",
          suspended: "orange",
        };
        const labels = {
          active: "Activo",
          inactive: "Inactivo",
          suspended: "Suspendido",
        };
        return <Tag color={colors[status as keyof typeof colors]}>{labels[status as keyof typeof labels]}</Tag>;
      },
    },
    {
      title: "Rendimiento",
      key: "performance",
      render: (record: Employee) => (
        <div>
          <div>
            <FireOutlined style={{ marginRight: 4 }} />
            Llamadas: {record.performance?.callsToday || 0}
          </div>
          <div>
            <TrophyOutlined style={{ marginRight: 4 }} />
            Conversiones: {record.performance?.conversionsToday || 0}
          </div>
          <Progress
            percent={(record.performance?.conversionRate || 0) * 100}
            size="small"
            showInfo={false}
            strokeColor="#52c41a"
          />
          <Text type="secondary" style={{ fontSize: "10px" }}>
            {((record.performance?.conversionRate || 0) * 100).toFixed(1)}% conversión
          </Text>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Empleados</Title>
          <Text type="secondary">Gestión de empleados del sistema</Text>
        </Col>
      </Row>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Empleados"
              value={employees.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Empleados Activos"
              value={employees.filter((e: Employee) => e.status === "active").length}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="En Llamada"
              value={0}
              prefix={<PhoneOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Agentes"
              value={employees.filter((e: Employee) => e.role === "agent").length}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
      </Row>

      <Table
        dataSource={employees}
        columns={columns}
        rowKey="id"
        scroll={{ x: 1400 }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}; 