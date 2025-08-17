import { Modal, Button } from 'react-bootstrap';

function PasswordChangeModal({ show, handleClose, handleConfirm, handleDefer }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title> 비밀번호 변경 안내</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        비밀번호를 변경한 지 90일이 지났습니다. <br />
        주기적인 비밀번호 변경으로 계정을 안전하게 보호하세요.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDefer}>
          3개월 후 다시 알림
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          지금 변경
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PasswordChangeModal;