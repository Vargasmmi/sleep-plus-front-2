import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Descriptions } from "antd";

const { Text } = Typography;

export const AppointmentShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const statusColors: Record<string, string> = {
    scheduled: "blue",
    completed: "green",
    cancelled: "red",
    pending: "orange"
  };

  return (
    <Show isLoading={isLoading}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{record?.id}</Descriptions.Item>
        <Descriptions.Item label="Patient">
          <Text strong>{record?.patientName || "John Doe"}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Doctor">
          {record?.doctorName || "Dr. Smith"}
        </Descriptions.Item>
        <Descriptions.Item label="Date">
          {record?.date || new Date().toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Time">
          {record?.time || "10:00 AM"}
        </Descriptions.Item>
        <Descriptions.Item label="Type">
          {record?.type || "Consultation"}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={statusColors[record?.status] || "blue"}>
            {record?.status || "scheduled"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Notes">
          {record?.notes || "No additional notes"}
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};
