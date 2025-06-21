import { List, useTable } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { useNavigation } from "@refinedev/core";

export const PatientList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    meta: {
      fields: ["id", "name", "email", "phone", "age", "status", "lastVisit"],
    },
  });

  const { show, edit } = useNavigation();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID"
          width={80}
        />
        <Table.Column
          dataIndex="name"
          title="Name"
          render={(value) => value || "John Doe"}
        />
        <Table.Column
          dataIndex="email"
          title="Email"
          render={(value) => value || "patient@example.com"}
        />
        <Table.Column
          dataIndex="phone"
          title="Phone"
          render={(value) => value || "+1 234 567 8900"}
        />
        <Table.Column
          dataIndex="age"
          title="Age"
          render={(value) => value || Math.floor(Math.random() * 50 + 20)}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value) => {
            const status = value || (Math.random() > 0.5 ? "active" : "inactive");
            return (
              <Tag color={status === "active" ? "green" : "red"}>
                {status}
              </Tag>
            );
          }}
        />
        <Table.Column
          dataIndex="lastVisit"
          title="Last Visit"
          render={(value) => value || new Date().toLocaleDateString()}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <a onClick={() => show("patients", record.id)}>View</a>
              <a onClick={() => edit("patients", record.id)}>Edit</a>
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
