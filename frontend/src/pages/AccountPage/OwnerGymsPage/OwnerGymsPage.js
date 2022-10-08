import { Button, Input } from "antd";
import { useState } from "react";
import GymForm from "../../../components/GymForm/GymForm";
import { handleRequestToCreateGym } from "../../../services/gyms";
import "./OwnerGymsPage.scss";
const { TextArea } = Input;

const OwnerGymsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCreate = async (values) => {
    console.log("Received values of form: ", values);
    setIsModalOpen(false);
    const result = await handleRequestToCreateGym(values);
    console.log({ result });
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
