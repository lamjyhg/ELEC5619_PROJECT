import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Upload } from "antd";
import { useState } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import AddressAutoComplete from "../../../components/AddressAutoComplete/AddressAutoComplete";
import "./OwnerGymsPage.scss";

const OwnerGymsPage = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    address: "",
    maximumOfAppointments: "",
    imageUrl: "",
    geoLocation: { lat: "", lng: "" },
  });
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // submit gym
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const clearAddress = () => {
    // set address empty filed with antd form
    setFormValue((previousForm) => ({ ...previousForm, address: "" }));
  };
  const handleAddressSelect = (address, placeID) => {
    console.log({ address, placeID });
    geocodeByAddress(address)
      .then(async (results) => {
        // Do something with results[0]
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        // Do something with latLng
        setFormValue((previousForm) => ({
          ...previousForm,
          address,
          geoLocation: { lat: latLng.lat, lng: latLng.lng },
        }));
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  const handleAddressChange = (address) => {
    // set form address value
    console.log({ address });
    setFormValue((previousForm) => ({ ...previousForm, address }));
  };

  return (
    <div className="gym_list_contianer">
      <p>Gym List</p>
      <Button type="primary" onClick={showModal}>
        Create gym
      </Button>
      {/* reuse this modal for update gym */}
      <Modal
        title="Create Gym"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          onFinish={onFinish}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 15 }}
          layout="horizontal"
        >
          <Form.Item label="Gym name">
            <Input />
          </Form.Item>
          <Form.Item label="Address">
            <AddressAutoComplete
              address={formValue.address}
              clearAddress={clearAddress}
              onChange={handleAddressChange}
              onAddressSelect={handleAddressSelect}
            />
          </Form.Item>
          <Form.Item label="Max Appointment">
            <Form.Item name="input-number" noStyle>
              <InputNumber name="maximumOfAppointments" min={0} max={100} />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Cover Image"
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="imageUrl"
              action="/upload.do"
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default OwnerGymsPage;
