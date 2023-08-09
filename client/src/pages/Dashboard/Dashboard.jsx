import "./Dashboard.css";
import AdminTab from "../../components/AdminTab/AdminTab";
import Header from "../../components/Header/Header";
import { movieData, setMessageEmpty } from "../../features/movie/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import MainLoader from "../../utils/MainLoader";
import { useEffect } from "react";
import MessageAlert from "../../utils/MessageAlertAntD";

function Dashboard() {
  const dispatch = useDispatch();

  const { message, error, loader } = useSelector(movieData);

  useEffect(() => {
    if (message) {
      MessageAlert({ type: "success", content: message, duration: "3" });
      dispatch(setMessageEmpty());
    }
    if (error) {
      MessageAlert({ type: "error", content: error, duration: "3" });
      dispatch(setMessageEmpty());
    }
  });
  return (
    <>
      <Header />
      {loader && <MainLoader />}
      <div className="dashboard-wrapper">
        <div className="dashboard-container shadow">
          <AdminTab />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
