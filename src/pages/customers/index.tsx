import React from "react";
import { useTable, useDelete, useShow, IResourceComponentsProps, GetOneResponse } from "@refinedev/core";
import { useModalForm, useSelect } from "@refinedev/antd";
import { List, EditButton, DeleteButton, ShowButton, CreateButton } from "@refinedev/antd";
import { Table, Space, Button, Modal, Form, Input, Select, DatePicker, Tag, Card, Typography, Avatar, Row, Col, Statistic } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, CrownOutlined, StarOutlined } from "@ant-design/icons";
import { Customer, Employee } from "../../interfaces";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;

export const CustomerList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, searchFormProps } = useTable<Customer>({
    resource: "customers",
    onSearch: (values) => {
      return [
        {
          field: "firstName",
          operator: "contains",
          value: values.q,
        },
        {
          field: "lastName",
          operator: "contains",
          value: values.q,
        },
        {
          field: "email",
          operator: "contains",
          value: values.q,
        },
      ];
    },
    pagination: {
      pageSize: 10,
    },
    sorters: {
      initial: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
    },
  });

  const { mutate: deleteCustomer } = useDelete();

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: showCreateModal,
  } = useModalForm<Customer>({
    resource: "customers",
    action: "create",
    redirect: false,
  });

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: showEditModal,
    queryResult: editQueryResult,
  } = useModalForm<Customer>({
    resource: "customers",
    action: "edit",
    redirect: false,
  });

  const { data: employeesData } = useSelect<Employee>({
    resource: "employees",
    optionLabel: "firstName",
    optionValue: "id",
  });

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
            {tier.toUpperCase()}
          </Tag>
        );
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
          pending: "orange",
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>;
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
    {
      title: "Agente Asignado",
      dataIndex: "assignedAgentId",
      key: "assignedAgentId",
      render: (agentId: string) => {
        const agent = employeesData?.data?.find((emp: Employee) => emp.id === agentId);
        return agent ? `${agent.firstName} ${agent.lastName}` : "Sin asignar";
      },
    },
    {
      title: "Fecha de Registro",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (record: Customer) => (
        <Space>
          <ShowButton hideText size="small" recordItemId={record.id} />
          <EditButton hideText size="small" recordItemId={record.id} />
          <DeleteButton
            hideText
            size="small"
            recordItemId={record.id}
            onSuccess={() => {
              tableProps.onChange?.({ ...tableProps.pagination, current: 1 });
            }}
          />
        </Space>
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
        <Col>
          <CreateButton onClick={showCreateModal} />
        </Col>
      </Row>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Clientes"
              value={tableProps.dataSource?.length || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Miembros Elite"
              value={tableProps.dataSource?.filter((c: Customer) => c.isEliteMember).length || 0}
              prefix={<CrownOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Clientes Activos"
              value={tableProps.dataSource?.filter((c: Customer) => c.status === "active").length || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sin Agente"
              value={tableProps.dataSource?.filter((c: Customer) => !c.assignedAgentId).length || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>

      <Table
        {...tableProps}
        columns={columns}
        rowKey="id"
        scroll={{ x: 1200 }}
      />

      {/* Create Modal */}
      <Modal {...createModalProps} title="Crear Cliente" width={600}>
        <Form {...createFormProps} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Nombre"
                name="firstName"
                rules={[{ required: true, message: "Por favor ingrese el nombre" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Apellido"
                name="lastName"
                rules={[{ required: true, message: "Por favor ingrese el apellido" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Por favor ingrese el email" },
                  { type: "email", message: "Email inválido" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Teléfono"
                name="phone"
                rules={[{ required: true, message: "Por favor ingrese el teléfono" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Tier" name="tier">
                <Select>
                  <Option value="bronze">Bronze</Option>
                  <Option value="silver">Silver</Option>
                  <Option value="gold">Gold</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Estado" name="status">
                <Select>
                  <Option value="active">Activo</Option>
                  <Option value="inactive">Inactivo</Option>
                  <Option value="pending">Pendiente</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Agente Asignado" name="assignedAgentId">
            <Select allowClear>
              {employeesData?.data?.map((employee: Employee) => (
                <Option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="isEliteMember" valuePropName="checked">
            <Select>
              <Option value={true}>Miembro Elite</Option>
              <Option value={false}>Cliente Regular</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal {...editModalProps} title="Editar Cliente" width={600}>
        <Form {...editFormProps} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Nombre"
                name="firstName"
                rules={[{ required: true, message: "Por favor ingrese el nombre" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Apellido"
                name="lastName"
                rules={[{ required: true, message: "Por favor ingrese el apellido" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Por favor ingrese el email" },
                  { type: "email", message: "Email inválido" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Teléfono"
                name="phone"
                rules={[{ required: true, message: "Por favor ingrese el teléfono" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Tier" name="tier">
                <Select>
                  <Option value="bronze">Bronze</Option>
                  <Option value="silver">Silver</Option>
                  <Option value="gold">Gold</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Estado" name="status">
                <Select>
                  <Option value="active">Activo</Option>
                  <Option value="inactive">Inactivo</Option>
                  <Option value="pending">Pendiente</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Agente Asignado" name="assignedAgentId">
            <Select allowClear>
              {employeesData?.data?.map((employee: Employee) => (
                <Option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="isEliteMember" valuePropName="checked">
            <Select>
              <Option value={true}>Miembro Elite</Option>
              <Option value={false}>Cliente Regular</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}; 