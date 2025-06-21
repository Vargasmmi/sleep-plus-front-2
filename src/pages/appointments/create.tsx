import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, TimePicker } from "antd";

export const AppointmentCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Patient Name" name="patientName" rules={[{ required: true }]}>
          <Input placeholder="John Doe" />
        </Form.Item>
        <Form.Item label="Doctor Name" name="doctorName" rules={[{ required: true }]}>
          <Input placeholder="Dr. Smith" />
        </Form.Item>
        <Form.Item label="Date" name="date" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Time" name="time" rules={[{ required: true }]}>
          <TimePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Type" name="type" rules={[{ required: true }]}>
          <Select placeholder="Select type">
            <Select.Option value="consultation">Consultation</Select.Option>
            <Select.Option value="follow-up">Follow-up</Select.Option>
            <Select.Option value="sleep-study">Sleep Study</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select placeholder="Select status">
            <Select.Option value="scheduled">Scheduled</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
            <Select.Option value="cancelled">Cancelled</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Notes" name="notes">
          <Input.TextArea rows={4} placeholder="Additional notes..." />
        </Form.Item>
      </Form>
    </Create>
  );
};
