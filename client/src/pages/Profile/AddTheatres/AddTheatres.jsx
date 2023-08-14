import "./AddTheatre.css";
import { Button, Col, Form, Input, Row } from "antd";
import ModalPopUp from "../../../utils/ModalPopUp";
import TextArea from "antd/es/input/TextArea";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheatre, deleteTheatre } from "../../../features/theatre/theatreApiSlice";
import {
  setMessageEmpty,
  theatreStateData,
} from "../../../features/theatre/theatreSlice";
import MessageAlert from "../../../utils/MessageAlertAntD";
import { AiOutlinePlus } from "react-icons/ai";
import Swal from "sweetalert2";

const AddTheatres = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { theatre, message, error } = useSelector(theatreStateData);

  const [modal, setModal] = useState(false);

  const handleTheatreForm = (values) => {
    values.owner = user._id;
    dispatch(createTheatre(values));
  };

  // delete theatre
  const handleDeleteTheatre = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete theatre forever",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTheatre(id))
      }
    });
  }

  // set form value null
  useEffect(() => {
    if (message) {
      form.resetFields();
      setModal(false);
      MessageAlert({ type: "success", content: message });
      dispatch(setMessageEmpty());
    }
    if (error) {
      setModal(true);
      MessageAlert({ type: "error", content: error });
      dispatch(setMessageEmpty());
    }
  }, [message, error, setModal, form, dispatch]);

  return (
    <>
      <div className="admin d-flex justify-content-end">
        <Button onClick={() => setModal(true)}>Add Theatres</Button>
      </div>

      <ModalPopUp
        title="Add a Theatre"
        width="600px"
        open={modal}
        okay={() => setModal(false)}
        cancle={() => setModal(false)}
      >
        <hr />
        <Form form={form} layout="vertical" onFinish={handleTheatreForm}>
          <Row gutter={16}>
            <Col span={"24"}>
              <Form.Item label="Hall/Theatre Name" name="name">
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Address" name="address">
                <TextArea type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Phone" name="phone">
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Email" name="email">
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={24} className="d-flex justify-content-end">
              <Button
                onClick={() => setModal(false)}
                className="ant-btn ant-btn-dashed ant-btn-dangerous me-2"
              >
                Cancle
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="ant-btn ant-btn-primary"
              >
                SAVE
              </Button>
            </Col>
          </Row>
        </Form>
      </ModalPopUp>

      {!theatre ? (
        <table className="table">
          <thead className="thead-light d-flex justify-content-center">
            <td>
              <th scope="col">No Data Found</th>
            </td>
          </thead>
        </table>
      ) : (
        <table className="table table-borderd mt-3 add-theatre-form">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[...theatre]?.reverse().map((item, index) => {
              return (
                <tr className="align-middle" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>

                  <td>{item.isActive ? "Active" : "Pending / Block"}</td>

                  <td>{item.email}</td>
                  <td>
                    <Button className="ant-btn ant-btn-primary" size="small">
                      <CiEdit />
                    </Button>
                    <Button
                      className="ant-btn ant-btn-dangerous ms-1"
                      size="small"
                      onClick={() => handleDeleteTheatre(item._id)}
                    >
                      <CiTrash />
                    </Button>
                    {item.isActive && (
                      <Button className="green-button ms-1" size="small">
                        <AiOutlinePlus />
                        &nbsp; Show&apos;s
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AddTheatres;
