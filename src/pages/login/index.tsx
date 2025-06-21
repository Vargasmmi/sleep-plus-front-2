import { useLogin } from "@refinedev/core";
import { Form, Input, Button, Card, Typography, Space, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const Login = () => {
  const { mutate: login, isLoading } = useLogin();

  const onFinish = (values: any) => {
    login(values);
  };

  const handleDemoLogin = () => {
    login({ email: "admin@sleepplus.com", password: "demo123" });
    message.info("Using demo credentials");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Card
        style={{
          width: 400,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2} style={{ color: "#1890ff", marginBottom: 8 }}>
            Sleep Plus Admin
          </Title>
          <Text type="secondary">Sign in to your account</Text>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="admin@sleepplus.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="demo123"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              block
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <Space direction="vertical" style={{ width: "100%" }}>
          <Button type="dashed" onClick={handleDemoLogin} block>
            Use Demo Credentials
          </Button>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Text type="secondary">
              Demo credentials:
              <br />
              Email: admin@sleepplus.com
              <br />
              Password: demo123
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};
