import { Col, Modal, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const GymOwnerAppointmentCancellationForm = ({
  cancelledAppointment,
  comment,
  handleConfirmCancellation,
  handleCancelCancellatin,
  handleChangeCommentValue,
}) => {
  if (cancelledAppointment === null) {
    return null;
  }
  const { id, gymName, customerName, duration, startTime } =
    cancelledAppointment;
  return (
    <Modal
      visible={cancelledAppointment !== null}
      onOk={handleConfirmCancellation}
      onCancel={handleCancelCancellatin}
    >
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
        <p>Start Time : {startTime}</p>
      </Row>
      <Row>
        <p>Duration : {duration}</p>
      </Row>
      <TextArea
        rows={4}
        placeholder="please leave a comment for cancellation"
        maxLength={200}
        showCount={true}
        value={comment}
        onChange={handleChangeCommentValue}
      />
    </Modal>
  );
};
export default GymOwnerAppointmentCancellationForm;
