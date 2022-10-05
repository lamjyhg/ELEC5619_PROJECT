import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Upload } from "antd";
import { useState } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import AddressAutoComplete from "../../../components/AddressAutoComplete/AddressAutoComplete";
import "./OwnerGymsPage.scss";
const { TextArea } = Input;

const GymForm = ({ open, onCreate, onCancel, acitonType }) => {
  const [form] = Form.useForm();
  const [address, setAddress] = useState("");
  const clearAddress = () => {
    setAddress("");
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
  const handleAddressChange = ({ address }) => {
    // set form address value
    form.setFieldValue("address", address);
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    // form.setFieldsValue("imageUrl", e.file.name);
    //set imgae url
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Modal
      visible={open}
      title={acitonType === "CREATE" ? "Create Gym" : "Update Gym"}
      okText={acitonType === "CREATE" ? "Create Gym" : "Update Gym"}
      cancelText="Cancel"
      onCancel={() => {
        onCancel();
        setAddress("");
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log({ values });
            form.resetFields();
            setAddress("");
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
              message: "Please input your gym name!",
            },
          ]}
          onChange={handleAddressSelect}
        >
          <AddressAutoComplete
            address={address}
            clearAddress={clearAddress}
            onChange={handleAddressChange}
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
          <Upload action="/upload.do" listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const OwnerGymsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setIsModalOpen(false);
  };

  return (
    <div className="gym_list_contianer">
      <p>Gym List</p>
      <Button type="primary" onClick={showModal}>
        Create gym
      </Button>
      <GymForm
        open={isModalOpen}
        onCreate={onCreate}
        acitonType={"CREATE"}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};
export default OwnerGymsPage;
