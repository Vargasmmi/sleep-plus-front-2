import React from "react";
import { Table, Space, Tag, Card, Typography, Avatar, Row, Col, Statistic } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, CrownOutlined, StarOutlined } from "@ant-design/icons";
import { Customer } from "../../interfaces";

const { Title, Text } = Typography;

export const CustomerList: React.FC = () => {
  // Mock data for now - this will be replaced with real API calls later
  const customers: Customer[] = [];

  const columns = [
    {
      title: "Cliente",
      dataIndex: ["firstName", "lastName"],
      key: "name",
      render: (_: any, record: Customer) => (
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
      render: (record: Customer) => (
        <div>
          <div>
            <PhoneOutlined style={{ marginRight: 8 }} />
            {record.phone}
          </div>
          <div>
            <MailOutlined style={{ marginRight: 8 }} />
            {record.email}
          </div>
        </div>
      ),
    },
    {
      title: "Tier",
      dataIndex: "tier",
      key: "tier",
      render: (tier: string) => {
        const colors = {
          gold: "gold",
          silver: "silver",
          bronze: "orange",
        };
        const icons = {
          gold: <CrownOutlined />,
          silver: <StarOutlined />,
          bronze: <StarOutlined />,
        };
        return (
          <Tag color={colors[tier as keyof typeof colors]} icon={icons[tier as keyof typeof icons]}>
            {tier?.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Miembro Elite",
      dataIndex: "isEliteMember",
      key: "isEliteMember",
      render: (isElite: boolean) => (
        <Tag color={isElite ? "gold" : "default"} icon={isElite ? <CrownOutlined /> : undefined}>
          {isElite ? "Elite" : "Regular"}
        </Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Clientes</Title>
          <Text type="secondary">Gestión de clientes del sistema</Text>
        </Col>
      </Row>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Clientes"
              value={customers.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Miembros Elite"
              value={customers.filter((c: Customer) => c.isEliteMember).length}
              prefix={<CrownOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Clientes Activos"
              value={0}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sin Agente"
              value={0}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>

      <Table
        dataSource={customers}
        columns={columns}
        rowKey="id"
        scroll={{ x: 1200 }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}; 