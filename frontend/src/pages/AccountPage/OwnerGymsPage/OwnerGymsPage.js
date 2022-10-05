import {
  Button,
  Modal,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  message,
  Upload,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import "./OwnerGymsPage.scss";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};

const OwnerGymsPage = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
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
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
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
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 15 }}
          layout="horizontal"
        >
          <Form.Item label="Gym name">
            <Input />
          </Form.Item>
          <Form.Item label="Address">
            <Input />
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
