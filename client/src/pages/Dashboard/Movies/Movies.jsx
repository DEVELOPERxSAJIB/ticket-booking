import "./Movies.css";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
const { Option } = Select;
import ModalPopUp from "../../../utils/ModalPopUp";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import {
  createMovie,
  deleteMovie,
  getSingleMovies,
} from "../../../features/movie/movieApiSlice";
import { movieData } from "../../../features/movie/movieSlice";
import { useEffect, useRef, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import Swal from "sweetalert2";
import MessageAlert from "../../../utils/MessageAlertAntD";
import { setMessageEmpty } from "../../../features/theatre/theatreSlice";

function Movies() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const formRef = useRef(null);

  const { movie, message, error, single } = useSelector(movieData);

  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // create movie
  const handleMovieForm = (values) => {
    dispatch(createMovie(values));
  };

  // edit movie
  const handleMovieEdit = (id) => {
    formRef.current?.resetFields();
    dispatch(getSingleMovies(id));
    const singleMovie = movie.filter((data) => data._id === id);

    if (singleMovie.length > 0) {
      setSelectedMovie(singleMovie[0]);
      setEditModal(true);
      formRef.current?.resetFields();
    }
  };

  // const initialValues = {
  //   title: selectedMovie.title,
  //   description: selectedMovie.description,
  // };

  // single movie show
  const handleMovieShow = (id) => {
    dispatch(getSingleMovies(id));
    console.log(single);
    setShowModal(true);
  };

  // set form value null
  useEffect(() => {
    if (message) {
      setModal(false);
      form.resetFields();
      MessageAlert({ type: "success", content: message, duration: "3" });
      dispatch(setMessageEmpty());
    }
    if (error) {
      setModal(true);
      MessageAlert({ type: "error", content: error, duration: "3" });
      dispatch(setMessageEmpty());
    }
  }, [message, error, setModal, form, dispatch]);

  // delete movie
  const handleDeleteMovie = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete your movie forever",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMovie(id));
      }
    });
  };

  // useEffect(() => {
  //   if(selectedMovie){
  //       title : selectedMovie[0].title
  //     }
  //   }
  // }, [selectedMovie]);

  return (
    <>
      <div className="admin d-flex justify-content-end">
        <Button onClick={() => setModal(true)}>Add Movie</Button>
      </div>

      {/* create modal */}
      <ModalPopUp
        title="Add a Movie"
        open={modal}
        okay={() => setModal(false)}
        cancle={() => setModal(false)}
      >
        <div
          style={{
            width: "100%",
            height: "3px",
            borderRadius: "50%",
            background: "#210035",
            marginBottom: "15px",
          }}
          className="border"
        ></div>
        <Form form={form} layout="vertical" onFinish={handleMovieForm}>
          <Row gutter={16}>
            <Col span={"24"}>
              <Form.Item label="Movie Title" name="title">
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Movie Description" name="description">
                <TextArea type="text" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Duration" name="duration">
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Language" name="language">
                <Select placeholder="select a language">
                  <Option>-Select-</Option>
                  <Option value="Bangla"></Option>
                  <Option value="English"></Option>
                  <Option value="Korean"></Option>
                  <Option value="Japanes"></Option>
                  <Option value="Chines"></Option>
                  <Option value="Hindi"></Option>
                  <Option value="Tamil"></Option>
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Movie Release Data" name="releaseDate">
                <DatePicker style={{ width: "100%" }} type="date" />
              </Form.Item>
            </Col>
            <Col span={"6"}>
              <Form.Item label="Actors" name="actors">
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Ganre" name="ganre">
                <Select placeholder="select a ganre">
                  <Option>-Select-</Option>
                  <Option value={"Action"}></Option>
                  <Option value={"Thriller"}></Option>
                  <Option value={"Si-Fi"}></Option>
                  <Option value={"Romace"}></Option>
                  <Option value={"Drama"}></Option>
                  <Option value={"Horror"}></Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Category" name="category">
                <Select placeholder="select a category">
                  <Option>-Select-</Option>
                  <Option value="2D"></Option>
                  <Option value="3D"></Option>
                  <Option value="Anime"></Option>
                  <Option value="3D Anime"></Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item label="Poster" name="poster">
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

      {/* edit modal */}
      <ModalPopUp
        title="Update Movie Details"
        open={editModal}
        okay={() => setEditModal(false)}
        cancle={() => {
          setEditModal(false);
          setSelectedMovie(null);
          formRef.current?.resetFields();
        }}
      >
        <Form
          form={form}
          ref={formRef}
          name="control-ref"
          initialValues={selectedMovie}
          layout="vertical"
          onFinish={handleMovieForm}
        >
          <Row gutter={16}>
            <Col span={"24"}>
              <Form.Item label="Movie Title" name="title">
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Movie Description" name="description">
                <TextArea type="text" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Duration" name="duration">
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Language" name="language">
                <Select placeholder="select a language">
                  <Option>-Select-</Option>
                  <Option value="Bangla"></Option>
                  <Option value="English"></Option>
                  <Option value="Korean"></Option>
                  <Option value="Japanes"></Option>
                  <Option value="Chines"></Option>
                  <Option value="Hindi"></Option>
                  <Option value="Tamil"></Option>
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Movie Release Data" name="releaseDate">
                {/* <DatePicker style={{ width: "100%" }} type="date" /> */}
              </Form.Item>
            </Col>
            <Col span={"6"}>
              <Form.Item label="Actors" name="actors">
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Ganre" name="ganre">
                <Select placeholder="select a ganre">
                  <Option>-Select-</Option>
                  <Option value={"Action"}></Option>
                  <Option value={"Thriller"}></Option>
                  <Option value={"Si-Fi"}></Option>
                  <Option value={"Romace"}></Option>
                  <Option value={"Drama"}></Option>
                  <Option value={"Horror"}></Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item label="Category" name="category">
                <Select placeholder="select a category">
                  <Option>-Select-</Option>
                  <Option value="2D"></Option>
                  <Option value="3D"></Option>
                  <Option value="Anime"></Option>
                  <Option value="3D Anime"></Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item label="Poster" name="poster">
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col span={24} className="d-flex justify-content-end">
              <Button
                onClick={() => {
                  formRef.current?.resetFields();
                  setSelectedMovie(null);
                  setEditModal(null);
                }}
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

      {/* Single movie show modal */}
      <ModalPopUp
        title="Showing Movies Details"
        open={showModal}
        width="600px"
        okay={() => setShowModal(false)}
        cancle={() => {
          setShowModal(false);
        }}
      >
        <div className="show-modal">
          <div className="img-area">
            <img src={single.poster} alt="" />
          </div>
          <div className="details">
            <strong>Title : {single.title} </strong>
            <p>Actors : {single.actors}</p>
            <p>Ganre : {single.ganre}</p>
            <p>Rating : 8.5</p>
            <p>Duration : {single.duration}</p>
            <p>Language : {single.language}</p>
          </div>
        </div>
      </ModalPopUp>

      <table className="table table-borderd mt-3">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Poster</th>
            <th>Category</th>
            <th>Ganre</th>
            <th>Release Date</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movie &&
            [...movie].reverse().map((item, index) => {
              // const dateTimeString = item.releaseDate;
              // const dateOnly = dateTimeString.split("T")[0];

              return (
                <tr className="align-middle" key={index}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>
                    <img src={item.poster} alt="logo" />
                  </td>
                  <td>{item.category}</td>
                  <td>{item.ganre}</td>
                  <td>{item.releaseDate}</td>
                  <td>{item.duration} Min</td>
                  <td>
                    <Button
                      onClick={() => handleMovieShow(item._id)}
                      className="ant-btn ant-btn-ghost me-1"
                      size="small"
                    >
                      <AiOutlineArrowsAlt />
                    </Button>
                    <Button
                      onClick={() => handleMovieEdit(item._id)}
                      className="ant-btn ant-btn-primary"
                      size="small"
                    >
                      <CiEdit />
                    </Button>
                    <Button
                      className="ant-btn ant-btn-dangerous ms-1"
                      size="small"
                      onClick={() => handleDeleteMovie(item._id)}
                    >
                      <CiTrash />
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default Movies;
