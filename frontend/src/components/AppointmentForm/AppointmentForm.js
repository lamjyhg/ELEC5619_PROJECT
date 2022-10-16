import { DatePicker, Form, Input, Modal, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleActionToGetGymTimeAvailability } from '../../state/gyms/gyms.action';
import moment from 'moment';
import { hours, translateMomentDay } from '../../utils/dateHandlers';
import { current } from '@reduxjs/toolkit';
import { handleRequestToGetGymTimeAvailability } from '../../services/gyms';
const { TextArea } = Input;

export default function AppointmentForm({
  gymId,
  tradingHours,
  open,
  onCreate,
  onCancel,
  acitonType,
  gym,
}) {
  const [form] = Form.useForm();
  const [isLoaded, setIsLoaded] = useState(false);
  const [day, setDay] = useState(null);
  const [avalability, setAvailability] = useState(0);
  const onStartTimeChange = (value, dateString) => {
    if (!dateString || dateString.length === 0) {
      setDay(null);
      form.setFieldValue('startTime', null);
    } else {
      const dayMoment = moment(dateString);
      setDay(translateMomentDay(dayMoment.day()));
    }
  };
  const { availability, isError, isLoading, isSuccess } = useSelector(
    (state) => {
      return state.gyms.singleGym;
    }
  );
  const dispacth = useDispatch();

  const onStarTimeOk = (value) => {};

  const onChangeStartTime = (value) => {
    form.setFieldValue('startTime', value);
    setIsLoaded(true);
    const date = form.getFieldValue('date').format('YYYY-MM-DD');
    const startTime = value;
    const endTime = moment(value, 'hh:ss').add(1, 'hours').format('hh:ss');
    console.log(114);
    // getTimeAvailability(GID, startTime, endTime);

    handleRequestToGetGymTimeAvailability(gymId, {
      startTimeString: `${date} ${startTime}`,
      endTimeString: `${date} ${endTime}`,
    })
      .then((res) => {
        console.log(res.body.availability);
        setAvailability(res.body.availability);
      })
      .catch(() => {
        setAvailability(0);
      });
    setIsLoaded(false);
  };

  const checkIsNotTradingDay = (current) => {
    if (current) {
      if (tradingHours[translateMomentDay(current.day())]) {
        return false;
      }
    }
    return true;
  };

  const checkIsTradingHour = (hour) => {
    if (!day || !hour || !tradingHours[day]) {
      return false;
    }
    const start = tradingHours[day].startTime;
    const end = tradingHours[day].endTime;

    return (
      (moment(`${hour}:00:00`, 'hh:mm:ss').isAfter(moment(start, 'hh:mm:ss')) ||
        moment(`${hour}:00:00`, 'hh:mm:ss').isSame(
          moment(start, 'hh:mm:ss')
        )) &&
      moment(`${hour}:00:00`, 'hh:mm:ss').isBefore(moment(end, 'hh:mm:ss'))
    );
  };

  useEffect(() => {
    setAvailability(0);
    setIsLoaded(false);
    form.setFieldValue('date', null);
    form.setFieldValue('startTime', null);
    setDay(0);
  }, []);

  return (
    <Modal
      visible={open}
      title={
        acitonType === 'CREATE'
          ? 'Create Appointment for One Hour'
          : 'Update Appointment'
      }
      okText={
        acitonType === 'CREATE' ? 'Create Appointment' : 'Update Appointment'
      }
      disable
      cancelText="Cancel"
      onCancel={() => {
        // if (!isLoaded && !isLoading && avalability > 0) {
        //   onCancel();
        // }
        setAvailability(0);
        form.setFieldValue('date', null);
        setDay(0);
        form.setFieldValue('startTime', null);

        onCancel();
      }}
      onOk={() => {
        if (!isLoaded && !isLoading && avalability > 0) {
          form
            .validateFields()
            .then(async (values) => {
              form.resetFields();
              setAvailability(0);
              setDay(0);
              form.setFieldValue('date', null);
              form.setFieldValue('startTime', null);
              onCreate(values);
            })
            .catch((info) => {});
        }
      }}
    >
      <Spin spinning={isLoaded || isLoading}>
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
                message: 'Please input your name',
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
                message: 'Please input your email',
              },
            ]}
            label="Email"
            name="customerEmail"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: 'Please input the date',
              },
            ]}
          >
            <DatePicker
              format="YYYY-MM-DD "
              onChange={onStartTimeChange}
              onOk={onStarTimeOk}
              disabledDate={(current) => {
                return (
                  moment().add(-1, 'days') >= current ||
                  moment().add(1, 'month') <= current ||
                  checkIsNotTradingDay(current)
                );
              }}
            />
          </Form.Item>
          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[
              {
                required: true,
                message: 'Please input the start time',
              },
            ]}
          >
            <Select
              disabled={!day}
              onChange={onChangeStartTime}
              status={avalability === 0 ? 'error' : null}
            >
              {hours().map((hour, index) => {
                if (checkIsTradingHour(hour)) {
                  return (
                    <Select.Option key={index} value={`${hour}:00`}>
                      {`${hour}:00`}
                    </Select.Option>
                  );
                }
              })}
            </Select>
            <p> availability: {avalability}</p>
          </Form.Item>

          <Form.Item
            label="Note"
            name="note"
            rules={[
              {
                required: true,
                message: 'Please add your note',
              },
            ]}
          >
            <TextArea name="note" showCount maxLength={300} />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}
