import { DatePicker, Form, Input, Modal } from "antd";
import React from "react";
const { TextArea } = Input;

export default function AppointmentForm({
  open,
  onCreate,
  onCancel,
  acitonType,
}) {
  const [form] = Form.useForm();
  const onStartTimeChange = (value, dateString) => {
    
    
  };

  const onStarTimeOk = (value) => {
    
  };
  const onEndTimeChange = (value, dateString) => {
    
    
  };

  const onEndTimeOk = (value) => {
    
  };

  return (
    <Modal
      visible={open}
      title={
        acitonType === "CREATE" ? "Create Appointment" : "Update Appointment"
      }
      okText={
        acitonType === "CREATE" ? "Create Appointment" : "Update Appointment"
      }
      cancelText="Cancel"
      onCancel={() => {
        onCancel();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(async (values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            
          });
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your name",
            },
          ]}
          label="Your name"
          name="customerName"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
          ]}
          label="Email"
          name="customerEmail"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Start Time"
          name="startTime"
          rules={[
            {
              required: true,
              message: "Please input the start time",
            },
          ]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD hh:mm"
            onChange={onStartTimeChange}
            onOk={onStarTimeOk}
          />
        </Form.Item>
        <Form.Item
          label="End Time"
          name="endTime"
          rules={[
            {
              required: true,
              message: "Please input the end time",
            },
          ]}
        >
          <DatePicker
            showTime
            onChange={onEndTimeChange}
            onOk={onEndTimeOk}
            format="YYYY-MM-DD hh:mm"
          />
        </Form.Item>
        <Form.Item label="Note" name="note">
          <TextArea name="note" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
