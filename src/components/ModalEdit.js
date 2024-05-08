import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";

export default function ModalEdit(props) {
  const [showLoading, setShowLoading] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    job: "",
  });
  useEffect(() => {
    if (props.isModalShow) {
      setInfo({
        ...info,
        ["name"]: props.editUser.first_name,
      });
    }
  }, [props.editUser]);
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
    setInfo({
      ...info,
      ["name"]: props.editUser.first_name,
    });
  };
  const handleShow = () => {
    props.handleShow();
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    let result;
    await putUpdateUser(info)
      .then((res) => (result = res))
      .catch((err) => console.log(err));

    if (result && result.updatedAt) {
      toast.success("Edit user successfully");
      props.handleEditUserFromModal({
        first_name: result.name,
        id: props.editUser.id,
      });
      handleClose();
    } else {
      toast.error("Edit user failed");
    }
    setShowLoading(false);
  };
  return (
    <>
      <Modal show={props.isModalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            ref={formRef}
            onSubmit={handleEditUser}
            className="d-flex gap-4 flex-column"
          >
            <div className="form-group">
              <label htmlFor="email">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={info.name}
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
                value={info.job}
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
                <span className={`{${showLoading} ? ""ms-2"} : ""`}>
                  {" "}
                  Change
                </span>
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
