import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";

export default function ModalConfirm(props) {
  const [showLoading, setShowLoading] = useState(false);
  const handleClose = () => {
    props.handleClose();
  };
  const handleShow = () => {
    props.handleShow();
  };
  const confirmToDelete = async () => {
    setShowLoading(true);
    let result;
    await deleteUser(props.deleteUser.id)
      .then((res) => (result = res))
      .catch((err) => console.log(err));
    console.log(result);
    if (result.status === 204) {
      toast.success("Deleted user successfully");
      props.handleDeleteUserFromModal();
      handleClose();
    } else {
      toast.error("Deleted user failed");
    }
    setShowLoading(false);
  };
  return (
    <>
      <Modal
        show={props.isModalConfirmShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="text-danger">This action cannot be undo! </h6>
          <p>
            Are you sure to delete this user:{" "}
            <strong>{props.deleteUser.first_name} </strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmToDelete}>
            {showLoading ? <i className="fa-solid fa-rotate loading" /> : ""}
            <span className={`{${showLoading} ? ""ms-2"} : ""`}> Confirm</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
