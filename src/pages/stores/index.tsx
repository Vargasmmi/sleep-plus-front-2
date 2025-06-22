import React from "react";
import { useTable, useDelete, useShow, IResourceComponentsProps, GetOneResponse } from "@refinedev/core";
import { useModalForm, useSelect } from "@refinedev/antd";
import { List, EditButton, DeleteButton, ShowButton, CreateButton } from "@refinedev/antd";
import { Table, Space, Button, Modal, Form, Input, Select, DatePicker, Tag, Card, Typography, Avatar, Row, Col, Statistic, Progress } from "antd";
import { ShopOutlined, DollarOutlined, TeamOutlined, TrophyOutlined, RiseOutlined } from "@ant-design/icons";
import { Store, Employee } from "../../interfaces";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;

export const StoreList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, searchFormProps } = useTable<Store>({
    resource: "stores",
    onSearch: (values) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values.q,
        },
        {
          field: "location",
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

  const { mutate: deleteStore } = useDelete();

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: showCreateModal,
  } = useModalForm<Store>({
    resource: "stores",
    action: "create",
    redirect: false,
  });

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: showEditModal,
    queryResult: editQueryResult,
  } = useModalForm<Store>({
    resource: "stores",
    action: "edit",
    redirect: false,
  });

  const { data: managersData } = useSelect<Employee>({
    resource: "employees",
    filters: [{ field: "role", operator: "eq", value: "manager" }],
    optionLabel: "firstName",
    optionValue: "id",
  });

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
      title: "Gerente",
      dataIndex: "managerId",
      key: "managerId",
      render: (managerId: string) => {
        const manager = managersData?.data?.find((m: Employee) => m.id === managerId);
        return manager ? `${manager.firstName} ${manager.lastName}` : "Sin asignar";
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
    {
      title: "Fecha de Creación",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (record: Store) => (
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

  const stores = tableProps.dataSource || [];

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Tiendas</Title>
          <Text type="secondary">Gestión de tiendas del sistema</Text>
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
        {...tableProps}
        columns={columns}
        rowKey="id"
        scroll={{ x: 1400 }}
      />

      {/* Create Modal */}
      <Modal {...createModalProps} title="Crear Tienda" width={600}>
        <Form {...createFormProps} layout="vertical">
          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: "Por favor ingrese el nombre de la tienda" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ubicación"
            name="location"
            rules={[{ required: true, message: "Por favor ingrese la ubicación" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Gerente" name="managerId">
            <Select allowClear>
              {managersData?.data?.map((manager: Employee) => (
                <Option key={manager.id} value={manager.id}>
                  {manager.firstName} {manager.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Estado"
            name="status"
            rules={[{ required: true, message: "Por favor seleccione el estado" }]}
          >
            <Select>
              <Option value="active">Activa</Option>
              <Option value="inactive">Inactiva</Option>
              <Option value="maintenance">Mantenimiento</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Objetivo Mensual" name={["performance", "monthlyTarget"]}>
            <Input type="number" prefix="$" />
          </Form.Item>
          <Form.Item label="Descripción" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal {...editModalProps} title="Editar Tienda" width={600}>
        <Form {...editFormProps} layout="vertical">
          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: "Por favor ingrese el nombre de la tienda" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ubicación"
            name="location"
            rules={[{ required: true, message: "Por favor ingrese la ubicación" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Gerente" name="managerId">
            <Select allowClear>
              {managersData?.data?.map((manager: Employee) => (
                <Option key={manager.id} value={manager.id}>
                  {manager.firstName} {manager.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Estado"
            name="status"
            rules={[{ required: true, message: "Por favor seleccione el estado" }]}
          >
            <Select>
              <Option value="active">Activa</Option>
              <Option value="inactive">Inactiva</Option>
              <Option value="maintenance">Mantenimiento</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Objetivo Mensual" name={["performance", "monthlyTarget"]}>
            <Input type="number" prefix="$" />
          </Form.Item>
          <Form.Item label="Descripción" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}; 