import { useEffect } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import MessageAlert from "../../utils/MessageAlertAntD";
import { setMessageEmpty } from "../../features/user/userSlice";
import MainLoader from "../../utils/MainLoader";

function Home() {
  const dispatch = useDispatch();

  const { error, message, loader } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      MessageAlert({ content: error });
      dispatch(setMessageEmpty());
    }
    if (message) {
      MessageAlert({ type: "success", content: message });
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch]);

  return (
    <>
      {loader && <MainLoader />}
      <Header />
      <Navbar />
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        id="carouselExample"
        className=" carousel slide "
      >
        <div className="carousel-inner">
          <div className="carousel-item active">item 1</div>
          <div className="carousel-item">item 2</div>
          <div className="carousel-item">item 3</div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Home;
