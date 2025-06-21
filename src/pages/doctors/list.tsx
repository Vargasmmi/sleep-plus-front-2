import { List, useTable } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { useNavigation } from "@refinedev/core";

export const DoctorList = () => {
  const { tableProps } = useTable({ syncWithLocation: true });
  const { show, edit } = useNavigation();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" width={80} />
        <Table.Column dataIndex="name" title="Name" render={(value) => value || "Dr. Smith"} />
        <Table.Column dataIndex="specialty" title="Specialty" render={(value) => value || "Sleep Medicine"} />
        <Table.Column dataIndex="email" title="Email" render={(value) => value || "doctor@sleepplus.com"} />
        <Table.Column dataIndex="phone" title="Phone" render={(value) => value || "+1 234 567 8900"} />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value) => {
            const status = value || "available";
            return <Tag color={status === "available" ? "green" : "orange"}>{status}</Tag>;
          }}
        />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              <a onClick={() => show("doctors", record.id)}>View</a>
              <a onClick={() => edit("doctors", record.id)}>Edit</a>
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
