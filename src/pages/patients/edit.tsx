import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";

export const PatientEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input patient name!" }]}
        >
          <Input placeholder="Enter patient name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="patient@example.com" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input phone number!" }]}
        >
          <Input placeholder="+1 234 567 8900" />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input age!" }]}
        >
          <InputNumber min={0} max={150} placeholder="25" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select placeholder="Select status">
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
        >
          <Input.TextArea rows={3} placeholder="Enter patient address" />
        </Form.Item>

        <Form.Item
          label="Medical History"
          name="medicalHistory"
        >
          <Input.TextArea rows={4} placeholder="Enter medical history notes" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
