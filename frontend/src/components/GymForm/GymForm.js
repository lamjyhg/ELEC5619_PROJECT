import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Tag,
  TimePicker,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { handleRequestToSaveGymPhoto } from "../../services/gyms";
import AddressAutoComplete from "../AddressAutoComplete/AddressAutoComplete";

import moment from "moment";
import { dayObjects, getStringFromNumber } from "../../utils/dateHandlers";
import "./GymForm.scss";
const { TextArea } = Input;

export default function GymForm({ open, onCreate, onCancel, gym, setGymNull }) {
  const [form] = Form.useForm();
  const [tradingHour, setTradingHour] = useState({
    day: "0",
    startTime: null,
    endTime: null,
  });
  const [tradingHours, setTradingHours] = useState({});
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const handleDaySelect = (day) => {
    setTradingHour({ ...tradingHour, day });
  };
  const handleOnChanegHours = (hours) => {
    setTradingHour({
      ...tradingHour,
      startTime: hours[0].format("HH:mm:ss"),
      endTime: hours[1].format("HH:mm:ss"),
    });
  };
  const handleAddTradingHour = () => {
    var newTradingHours = {
      ...tradingHours,
      [tradingHour.day]: {
        startTime: tradingHour.startTime,
        endTime: tradingHour.endTime,
      },
    };
    setTradingHours(newTradingHours);
  };
  const handleRemoveTradingHour = (day) => {
    var newTradingHours = {
      ...tradingHours,
    };
    delete newTradingHours[day];

    setTradingHours(newTradingHours);
  };
  const checkAbleToAddTradingHour = () => {
    const { day, startTime, endTime } = tradingHour;
    if (day * 1 > 6 || day * 1 < 0) {
      return false;
    }
    if (!startTime || !endTime) {
      return false;
    }
    return true;
  };
  const handleAddressSelect = (address, placeID) => {
    form.setFieldValue("address", address);
    geocodeByAddress(address)
      .then(async (results) => {
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        setAddress(address);
        form.setFieldValue("geoLocation", {
          lat: latLng.lat,
          lng: latLng.lng,
        });
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const getTradingHoursTag = () => {
    const keys = Object.keys(tradingHours).sort();
    const tags = keys.map((hour, index) => {
      const each = tradingHours[hour];
      return (
        <Tag>
          {getStringFromNumber(hour)} {each.startTime} - {each.endTime}
          <CloseOutlined
            onClick={() => {
              handleRemoveTradingHour(hour);
            }}
          />
        </Tag>
      );
    });
    return tags;
  };
  const setDefault = () => {
    setAddress("");
    setGymNull();
    form.resetFields();
    setTradingHour({
      day: "0",
      startTime: null,
      endTime: null,
    });
    setTradingHours({});
  };

  useEffect(() => {
    if (gym) {
      
      setAddress(gym.address);
      setImageUrl(gym.imageUrl);
      setTradingHours(!gym.tradingHours ? {} : gym.tradingHours);
      form.setFieldValue("geoLocation", { ...gym.geoLocation });
      form.setFieldValue("address", gym.address);
      form.setFieldValue("name", gym.name);
      form.setFieldValue("description", gym.description);
      form.setFieldValue("maximumOfAppointments", gym.maximumOfAppointments);
    }
  }, [gym]);

  return (
    <Modal
      visible={open}
      title={!gym ? "Create Gym" : "Update Gym"}
      okText={!gym ? "Create Gym" : "Update Gym"}
      cancelText="Cancel"
      onCancel={() => {
        onCancel();
        setDefault();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(async (values) => {
            setDefault();
            onCreate({
              ...values,
              imageUrl: imageUrl,
              tradingHours,
            });
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
              message: "Please input your gym name!",
            },
          ]}
          label="Gym name"
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your gym address!",
            },
          ]}
          onChange={handleAddressSelect}
        >
          <AddressAutoComplete
            address={address}
            onAddressSelect={handleAddressSelect}
          />
        </Form.Item>
        <Form.Item hidden name="geoLocation"></Form.Item>
        <Form.Item
          label="Max Appointment"
          name="maximumOfAppointments"
          rules={[
            {
              required: true,
              message: "Please input your gym name!",
            },
          ]}
        >
          <Form.Item name="maximumOfAppointments" noStyle>
            <InputNumber name="maximumOfAppointments" min={0} max={100} />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Trading Hours">
          <>{getTradingHoursTag()}</>
          <>
            <Select
              defaultValue="0"
              value={tradingHour.day}
              onChange={handleDaySelect}
            >
              {dayObjects.map((day, index) => (
                <Select.Option key={index} value={day.value}>
                  {day.text}
                </Select.Option>
              ))}
            </Select>
            <TimePicker.RangePicker
              ranges={[
                moment(tradingHour.startTime),
                moment(tradingHour.endTime),
              ]}
              onChange={handleOnChanegHours}
            />
            <Button
              disabled={!checkAbleToAddTradingHour()}
              onClick={handleAddTradingHour}
            >
              add
            </Button>
          </>
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your gym name!",
            },
          ]}
        >
          <TextArea name="description" />
        </Form.Item>

        <Form.Item
          label="Cover Image"
          name="imageUrl"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action={async (file) => {
              const formData = new FormData();
              formData.append("imageFile", file);
              const imageUrl = await handleRequestToSaveGymPhoto(formData);
              setImageUrl(imageUrl);
            }}
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
