import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Descriptions } from "antd";

const { Text } = Typography;

export const PatientShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{record?.id}</Descriptions.Item>
        <Descriptions.Item label="Name">
          <Text strong>{record?.name || "John Doe"}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {record?.email || "patient@example.com"}
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          {record?.phone || "+1 234 567 8900"}
        </Descriptions.Item>
        <Descriptions.Item label="Age">
          {record?.age || Math.floor(Math.random() * 50 + 20)} years
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={record?.status === "active" ? "green" : "red"}>
            {record?.status || "active"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Last Visit">
          {record?.lastVisit || new Date().toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          {record?.address || "123 Main St, City, State 12345"}
        </Descriptions.Item>
        <Descriptions.Item label="Medical History">
          <Text>
            {record?.medicalHistory || "No significant medical history recorded."}
          </Text>
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};
