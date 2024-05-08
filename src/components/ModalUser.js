import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";

export default function ModalUser(props) {
  const [showLoading, setShowLoading] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    job: "",
  });
  const formRef = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };
  const handleClose = () => {
    props.handleClose();
  };
  const handleShow = () => {
    props.handleShow();
  };
  const handleSaveUser = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    let result;
    await postCreateUser(info)
      .then((res) => (result = res))
      .catch((err) => console.log(err));

    if (result && result.id) {
      formRef.current.reset();
      toast.success("Added a new user successfully");
      props.handleUpdateTable({
        first_name: info.name,
        id: result.id,
      });
      handleClose();
    } else {
      toast.error("Error");
    }
    setShowLoading(false);
  };
  return (
    <>
      <Modal show={props.isModalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            ref={formRef}
            onSubmit={handleSaveUser}
            className="d-flex gap-4 flex-column"
          >
            <div className="form-group">
              <label htmlFor="email">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="job">Job</label>
              <input
                type="text"
                name="job"
                id="job"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                {showLoading ? (
                  <i className="fa-solid fa-rotate loading" />
                ) : (
                  ""
                )}
                <span className={`{${showLoading} ? ""ms-2"} : ""`}> Add</span>
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
