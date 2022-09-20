import { Col, Modal, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const GymOwnerAppointmentCancellationForm = ({
  cancelledId,
  comment,
  handleConfirmCancellation,
  handleCancelCancellatin,
  handleChangeCommentValue,
}) => {
  return (
    <Modal
      visible={cancelledId !== null}
      onOk={handleConfirmCancellation}
      onCancel={handleCancelCancellatin}
    >
      <h1>Appointment Cancellation {cancelledId}</h1>
      <Row>
        <Col span={12}>
          <p className="cancellationForm__normalAttribute">Gym Name : 1</p>
        </Col>
        <Col span={12}>
          <p className="cancellationForm__normalAttribute">User Name : 1</p>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <p className="cancellationForm__normalAttribute">Start Time : 1</p>
        </Col>
        <Col span={12}>
          <p className="cancellationForm__normalAttribute">Duration : 1</p>
        </Col>
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
