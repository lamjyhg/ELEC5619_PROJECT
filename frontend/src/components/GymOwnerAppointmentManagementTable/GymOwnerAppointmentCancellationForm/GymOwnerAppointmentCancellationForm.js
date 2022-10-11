import { Modal, Row, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { displayDate } from "../../../utils/dateHandlers";

const GymOwnerAppointmentCancellationForm = ({
  cancelledAppointment,
  comment,
  isLoading,
  handleConfirmCancellation,
  handleCancelCancellatin,
  handleChangeCommentValue,
}) => {
  if (cancelledAppointment === null) {
    return null;
  }
  const { id, gymName, customerName, startTime, endTime } =
    cancelledAppointment;

  return (
    <Modal
      visible={cancelledAppointment !== null}
      onOk={handleConfirmCancellation}
      onCancel={handleCancelCancellatin}
    >
      <Spin spinning={isLoading}>
        <h1>Appointment Cancellation Form</h1>
        <Row>
          <p>ID: {id}</p>
        </Row>
        <Row>
          <p>Gym Name : {gymName}</p>
        </Row>
        <Row>
          <p>Customer Name : {customerName}</p>
        </Row>
        <Row>
          <p>Start Time : {displayDate(startTime)}</p>
        </Row>
        <Row>
          <p>End Time: {displayDate(endTime)}</p>
        </Row>
        <TextArea
          rows={4}
          placeholder="please leave a comment for cancellation"
          maxLength={200}
          showCount={true}
          value={comment}
          onChange={handleChangeCommentValue}
        />
      </Spin>
    </Modal>
  );
};
export default GymOwnerAppointmentCancellationForm;
