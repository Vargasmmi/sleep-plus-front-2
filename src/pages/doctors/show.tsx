import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Descriptions } from "antd";

const { Text } = Typography;

export const DoctorShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{record?.id}</Descriptions.Item>
        <Descriptions.Item label="Name">
          <Text strong>{record?.name || "Dr. Smith"}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Specialty">
          {record?.specialty || "Sleep Medicine"}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {record?.email || "doctor@sleepplus.com"}
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          {record?.phone || "+1 234 567 8900"}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={record?.status === "available" ? "green" : "orange"}>
            {record?.status || "available"}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};
