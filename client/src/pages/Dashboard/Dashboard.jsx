import "./Dashboard.css";
import AdminTab from "../../components/AdminTab/AdminTab";
import Header from "../../components/Header/Header";
import { movieData } from "../../features/movie/movieSlice";
import { useSelector } from "react-redux";
import MainLoader from "../../utils/MainLoader";

function Dashboard() {

  const { loader } = useSelector(movieData);


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
