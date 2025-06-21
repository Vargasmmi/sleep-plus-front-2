import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const DoctorCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Dr. John Smith" />
        </Form.Item>
        <Form.Item label="Specialty" name="specialty" rules={[{ required: true }]}>
          <Select placeholder="Select specialty">
            <Select.Option value="sleep-medicine">Sleep Medicine</Select.Option>
            <Select.Option value="neurology">Neurology</Select.Option>
            <Select.Option value="pulmonology">Pulmonology</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="doctor@sleepplus.com" />
        </Form.Item>
        <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
          <Input placeholder="+1 234 567 8900" />
        </Form.Item>
        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select placeholder="Select status">
            <Select.Option value="available">Available</Select.Option>
            <Select.Option value="busy">Busy</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Create>
  );
};
