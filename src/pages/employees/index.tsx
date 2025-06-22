import React from "react";
import { useTable, useDelete, useShow, IResourceComponentsProps, GetOneResponse } from "@refinedev/core";
import { useModalForm, useSelect } from "@refinedev/antd";
import { List, EditButton, DeleteButton, ShowButton, CreateButton } from "@refinedev/antd";
import { Table, Space, Button, Modal, Form, Input, Select, DatePicker, Tag, Card, Typography, Avatar, Row, Col, Statistic, Progress } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, TeamOutlined, TrophyOutlined, FireOutlined } from "@ant-design/icons";
import { Employee, Store } from "../../interfaces";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;

export const EmployeeList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, searchFormProps } = useTable<Employee>({
    resource: "employees",
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

  const { mutate: deleteEmployee } = useDelete();

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: showCreateModal,
  } = useModalForm<Employee>({
    resource: "employees",
    action: "create",
    redirect: false,
  });

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: showEditModal,
    queryResult: editQueryResult,
  } = useModalForm<Employee>({
    resource: "employees",
    action: "edit",
    redirect: false,
  });

  const { data: storesData } = useSelect<Store>({
    resource: "stores",
    optionLabel: "name",
    optionValue: "id",
  });

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
      title: "Tienda",
      dataIndex: "storeId",
      key: "storeId",
      render: (storeId: string) => {
        const store = storesData?.data?.find((s: Store) => s.id === storeId);
        return store ? store.name : "Sin asignar";
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
          calling: "blue",
          break: "orange",
        };
        const labels = {
          active: "Activo",
          inactive: "Inactivo",
          calling: "En llamada",
          break: "En descanso",
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
            {(record.performance?.conversionRate || 0) * 100}% conversión
          </Text>
        </div>
      ),
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
      render: (record: Employee) => (
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

  const employees = tableProps.dataSource || [];

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Empleados</Title>
          <Text type="secondary">Gestión de empleados del sistema</Text>
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
              value={employees.filter((e: Employee) => e.status === "calling").length}
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
        {...tableProps}
        columns={columns}
        rowKey="id"
        scroll={{ x: 1400 }}
      />

      {/* Create Modal */}
      <Modal {...createModalProps} title="Crear Empleado" width={600}>
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
              <Form.Item
                label="Rol"
                name="role"
                rules={[{ required: true, message: "Por favor seleccione el rol" }]}
              >
                <Select>
                  <Option value="agent">Agente</Option>
                  <Option value="manager">Gerente</Option>
                  <Option value="admin">Administrador</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tienda" name="storeId">
                <Select allowClear>
                  {storesData?.data?.map((store: Store) => (
                    <Option key={store.id} value={store.id}>
                      {store.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Estado"
            name="status"
            rules={[{ required: true, message: "Por favor seleccione el estado" }]}
          >
            <Select>
              <Option value="active">Activo</Option>
              <Option value="inactive">Inactivo</Option>
              <Option value="calling">En llamada</Option>
              <Option value="break">En descanso</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal {...editModalProps} title="Editar Empleado" width={600}>
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
              <Form.Item
                label="Rol"
                name="role"
                rules={[{ required: true, message: "Por favor seleccione el rol" }]}
              >
                <Select>
                  <Option value="agent">Agente</Option>
                  <Option value="manager">Gerente</Option>
                  <Option value="admin">Administrador</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tienda" name="storeId">
                <Select allowClear>
                  {storesData?.data?.map((store: Store) => (
                    <Option key={store.id} value={store.id}>
                      {store.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Estado"
            name="status"
            rules={[{ required: true, message: "Por favor seleccione el estado" }]}
          >
            <Select>
              <Option value="active">Activo</Option>
              <Option value="inactive">Inactivo</Option>
              <Option value="calling">En llamada</Option>
              <Option value="break">En descanso</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}; 