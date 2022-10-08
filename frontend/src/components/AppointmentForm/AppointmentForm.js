import { DatePicker, Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
// import "./AppointmentForm.scss";
const { TextArea } = Input;

export default function AppointmentForm({
  open,
  onCreate,
  onCancel,
  acitonType,
}) {
  const [form] = Form.useForm();
  const onStartTimeChange = (value, dateString) => {
    console.log("Started Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onStarTimeOk = (value) => {
    console.log("onStartOk: ", value.toDate().toJSON());
  };
  const onEndTimeChange = (value, dateString) => {
    console.log("End Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onEndTimeOk = (value) => {
    console.log("onEndOk: ", value.toDate().toJSON());
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
            console.log("Validate Failed:", info);
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
            format="YYYY-MM-DD HH:mm"
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
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>
        <Form.Item label="Note" name="note">
          <TextArea name="note" />
        </Form.Item>
      </Form>
    </Modal>
  );
}