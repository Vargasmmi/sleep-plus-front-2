import { Row, Col, Card, Statistic, Typography, Progress, List, Tag } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  ScheduleOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export const Dashboard = () => {
  // Mock data for demonstration
  const stats = {
    totalPatients: 1234,
    totalDoctors: 45,
    totalAppointments: 3456,
    completedToday: 89,
    pendingToday: 12,
    growth: 15.3,
  };

  const recentAppointments = [
    { id: 1, patient: "John Doe", doctor: "Dr. Smith", time: "10:00 AM", status: "completed" },
    { id: 2, patient: "Jane Smith", doctor: "Dr. Johnson", time: "11:30 AM", status: "pending" },
    { id: 3, patient: "Mike Wilson", doctor: "Dr. Brown", time: "2:00 PM", status: "pending" },
    { id: 4, patient: "Sarah Davis", doctor: "Dr. Garcia", time: "3:30 PM", status: "scheduled" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Dashboard</Title>
      <Text type="secondary" style={{ marginBottom: 24, display: "block" }}>
        Welcome to Sleep Plus Admin Dashboard
      </Text>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Patients"
              value={stats.totalPatients}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Doctors"
              value={stats.totalDoctors}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Appointments"
              value={stats.totalAppointments}
              prefix={<ScheduleOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Monthly Growth"
              value={stats.growth}
              precision={2}
              prefix={<RiseOutlined />}
              suffix="%"
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card title="Today's Appointments" style={{ marginBottom: 24 }}>
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ textAlign: "center" }}>
                  <Progress
                    type="circle"
                    percent={Math.round((stats.completedToday / (stats.completedToday + stats.pendingToday)) * 100)}
                    strokeColor="#52c41a"
                  />
                  <div style={{ marginTop: 16 }}>
                    <Text strong>Completed</Text>
                    <div>
                      <CheckCircleOutlined style={{ color: "#52c41a" }} /> {stats.completedToday}
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: "center" }}>
                  <Progress
                    type="circle"
                    percent={Math.round((stats.pendingToday / (stats.completedToday + stats.pendingToday)) * 100)}
                    strokeColor="#faad14"
                  />
                  <div style={{ marginTop: 16 }}>
                    <Text strong>Pending</Text>
                    <div>
                      <ClockCircleOutlined style={{ color: "#faad14" }} /> {stats.pendingToday}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Recent Appointments" style={{ marginBottom: 24 }}>
            <List
              dataSource={recentAppointments}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>{item.patient}</span>
                        <Tag color={
                          item.status === "completed" ? "green" :
                          item.status === "pending" ? "orange" : "blue"
                        }>
                          {item.status}
                        </Tag>
                      </div>
                    }
                    description={
                      <div>
                        <Text type="secondary">{item.doctor}</Text>
                        <br />
                        <Text type="secondary">{item.time}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
