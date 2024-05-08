import React, { Fragment, useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalUser from "./ModalUser";
import ModalEdit from "./ModalEdit";
import ModalConfirm from "./ModalConfirm";
import Papa from "papaparse";
import { CSVLink, CSVDownload } from "react-csv";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";

export default function TableUsers(props) {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalShow, setIsModalShow] = useState(false);
  const [isModalEditShow, setIsModalEditShow] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [deleteUser, setDeleteUser] = useState({});
  const [isModalConfirmShow, setIsModalConfirmShow] = useState(false);
  const [isASC, setIsASC] = useState(false);
  const refSearch = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataExport, setDataExport] = useState([]);
  const handleClose = () => {
    setIsModalShow(false);
  };
  const handleShow = () => {
    setIsModalShow(true);
  };
  const handleCloseEdit = () => {
    setIsModalEditShow(false);
  };
  const handleShowEdit = () => {
    setIsModalEditShow(true);
  };
  const handleCloseConfirm = () => {
    setIsModalConfirmShow(false);
  };
  const handleShowConfirm = () => {
    setIsModalConfirmShow(true);
  };
  const getUsers = (page) => {
    fetchAllUsers(page)
      .then((res) => {
        setTotalUsers(res.total);
        setTotalPages(res.total_pages);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUsers(1);
  }, []);
  const handleEditUser = (user) => {
    handleShowEdit();
    setEditUser(user);
  };
  const handleDeleteUser = (user) => {
    handleShowConfirm();
    setDeleteUser(user);
  };
  const renderUsers = () => {
    return users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.email}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>
            <button
              className="btn btn-danger me-2"
              onClick={() => {
                handleDeleteUser(user);
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                handleEditUser(user);
              }}
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
  };
  const handleUpdateTable = (user) => {
    setUsers([user, ...users]);
  };
  const handleEditUserFromModal = (info) => {
    setUsers(
      [...users].map((user) => {
        if (user.id === info.id) {
          return {
            ...user,
            ["first_name"]: info.first_name,
          };
        }
        return user;
      })
    );
  };
  const handleDeleteUserFromModal = () => {
    setUsers([...users].filter((user) => user.id !== deleteUser.id));
  };
  const sortByID = () => {
    const cloneUsers = [...users];
    setIsASC(!isASC);
    if (isASC) {
      cloneUsers.sort((a, b) => a.id - b.id);
    } else {
      cloneUsers.sort((a, b) => b.id - a.id);
    }
    setUsers(cloneUsers);
  };
  const sortByText = (field) => {
    const cloneUsers = [...users];
    setIsASC(!isASC);
    cloneUsers.sort((a, b) => {
      let text1 = a[field].trim().toLowerCase();
      let text2 = b[field].trim().toLowerCase();
      let firstOperand = isASC ? text1 : text2;
      let secondOperand = isASC ? text2 : text1;
      if (firstOperand > secondOperand) return 1;
      else if (firstOperand < secondOperand) return -1;
      else return 0;
    });
    setUsers(cloneUsers);
  };
  const handleSearch = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (value !== "") {
      if (refSearch.current) {
        clearTimeout(refSearch.current);
      }
      refSearch.current = setTimeout(() => {
        const cloneUsers = [...users].filter((user) =>
          user.first_name.trim().toLowerCase().includes(value.toLowerCase())
        );
        setUsers(cloneUsers);
        clearTimeout(refSearch.current);
      }, 300);
    } else {
      getUsers(currentPage);
    }
  };
  const getUsersExport = (event, done) => {
    let result = [];
    if (users && users.length > 0) {
      result.push(["ID", "Email", "First name", "Last name"]);
      users.map((user, index) => {
        let arr = [];
        arr[0] = user.id;
        arr[1] = user.email;
        arr[2] = user.first_name;
        arr[3] = user.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };
  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (file.type !== "text/csv") {
      toast.error("Only accept CSV file");
    } else {
      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("Wrong format Header CSV file");
              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                setUsers(result);
              }
            } else {
              toast.error("Wrong format CSV file");
            }
          } else {
            toast.error("Not found data on CSV file");
          }
        },
      });
    }
  };
  return (
    <Fragment>
      <Container>
        <div className="my-4 d-flex align-items-center justify-content-between flex-wrap">
          <h3 className="m-0">List Users</h3>
          <div className="d-flex gap-2 align-items-center">
            <label htmlFor="file" className="d-block btn btn-warning">
              <i className="fa-solid fa-file-import"></i>
              <span className="ms-2 d-none d-sm-inline">Import CSV</span>
            </label>
            <input type="file" hidden id="file" onChange={handleImportCSV} />
            <button className="btn btn-primary">
              <CSVLink
                filename="users.csv"
                data={dataExport}
                target="_blank"
                asyncOnClick={true}
                onClick={getUsersExport}
              >
                <i
                  className="fa-solid fa-file-arrow-down"
                  style={{ color: "white" }}
                ></i>
                <span
                  className="ms-2 d-none d-sm-inline"
                  style={{ color: "white" }}
                >
                  Export CSV
                </span>
              </CSVLink>
            </button>

            <button className="btn btn-success" onClick={handleShow}>
              <i className="fa-solid fa-circle-plus"></i>
              <span className="ms-2 d-none d-sm-inline">Add New</span>
            </button>
          </div>
        </div>
        <div className="col-12 col-md-4 form-group mb-4">
          <input
            type="text"
            name="keyword"
            id="keyword"
            onChange={handleSearch}
            className="form-control"
            placeholder="Search user by email"
            aria-describedby="helpId"
          />
        </div>
        <Table responsive="md" striped bordered hover>
          <thead>
            <tr>
              <th className="d-flex justify-content-between sort-header">
                <span>ID</span>
                <span onClick={() => sortByID()}>
                  <i className="fas fa-arrow-up-long"></i>
                  <i className="fas fa-arrow-down-long"></i>
                </span>
              </th>
              <th className="sort-header">
                <div className="d-flex justify-content-between">
                  <span> Email </span>
                  <span onClick={() => sortByText("email")}>
                    <i className="fas fa-arrow-up-long"></i>
                    <i className="fas fa-arrow-down-long"></i>
                  </span>
                </div>
              </th>
              <th className="sort-header d-flex justify-content-between">
                <span>First Name </span>
                <span onClick={() => sortByText("first_name")}>
                  <i className="fas fa-arrow-up-long"></i>
                  <i className="fas fa-arrow-down-long"></i>
                </span>
              </th>
              <th className="sort-header">
                <div className="d-flex justify-content-between">
                  <span> Last Name </span>
                  <span onClick={() => sortByText("last_name")}>
                    <i className="fas fa-arrow-up-long"></i>
                    <i className="fas fa-arrow-down-long"></i>
                  </span>
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </Table>
        <div className="d-flex justify-content-end">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </Container>
      <ModalUser
        isModalShow={isModalShow}
        handleClose={handleClose}
        handleShow={handleShow}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEdit
        isModalShow={isModalEditShow}
        handleClose={handleCloseEdit}
        handleShow={handleShowEdit}
        editUser={editUser}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalConfirm
        isModalConfirmShow={isModalConfirmShow}
        handleClose={handleCloseConfirm}
        handleShow={handleShowConfirm}
        deleteUser={deleteUser}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </Fragment>
  );
}
