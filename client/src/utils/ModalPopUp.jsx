import { Modal } from "antd";

function ModalPopUp({ open, title = "Add", okay = false, cancle = false, children }) {
  return (
    <Modal
      width={"800px"}
      title={title}
      centered
      open={open}
      onOk={okay}
      onCancel={cancle}
    >
      {children}
    </Modal>
  );
}

export default ModalPopUp;
