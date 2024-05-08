import React from "react";
import Container from "react-bootstrap/esm/Container";

export default function Home() {
  return (
    <Container>
      <div className="mt-4">
        <h4>Giới thiệu trang web</h4>
        <h5 className="mt-3">Yêu cầu</h5>
        <p className="mb-2 p-0">
          Chức năng
          <ul className="mt-2">
            <li>Đăng nhập</li>
            <li>Đăng kí</li>
            <li>CRUD users</li>
            <li>Tìm kiếm users</li>
            <li>Sắp xếp</li>
            <li>Export CSV</li>
            <li>Import CSV</li>
          </ul>
        </p>
        <p className="mb-2 p-0">
          Công nghệ:
          <ul className="mt-2">
            <li>HTML, CSS, SCSS, Bootstrap 5</li>
            <li>JavaScript, React JS</li>
          </ul>
        </p>
        <p className="mb-2 p-0">
          Link API fake:{" "}
          <a className="fw-bold" href="https://resreq.in" target="_blank">
            RESREQ.IN
          </a>
        </p>
        <h5 className="mt-3">Lưu ý</h5>
        <p className="mb-2 p-0">
          Tài khoản đăng nhập demo (do API không cho phép đăng kí tài khoản)
          <ul className="mt-2">
            <li>
              <strong>Email: </strong> eve.holt@reqres.in
            </li>
            <li>
              <strong>Password: </strong> cityslicka
            </li>
          </ul>
        </p>
      </div>
    </Container>
  );
}
