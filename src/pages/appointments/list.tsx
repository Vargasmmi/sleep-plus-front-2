import { List, useTable } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { useNavigation } from "@refinedev/core";

export const AppointmentList = () => {
  const { tableProps } = useTable({ syncWithLocation: true });
  const { show, edit } = useNavigation();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" width={80} />
        <Table.Column dataIndex="patientName" title="Patient" render={(value) => value || "John Doe"} />
        <Table.Column dataIndex="doctorName" title="Doctor" render={(value) => value || "Dr. Smith"} />
        <Table.Column dataIndex="date" title="Date" render={(value) => value || new Date().toLocaleDateString()} />
        <Table.Column dataIndex="time" title="Time" render={(value) => value || "10:00 AM"} />
        <Table.Column dataIndex="type" title="Type" render={(value) => value || "Consultation"} />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value) => {
            const status = value || "scheduled";
            const colors: Record<string, string> = {
              scheduled: "blue",
              completed: "green",
              cancelled: "red",
              pending: "orange"
            };
            return <Tag color={colors[status] || "blue"}>{status}</Tag>;
          }}
        />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              <a onClick={() => show("appointments", record.id)}>View</a>
              <a onClick={() => edit("appointments", record.id)}>Edit</a>
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
