import "./Dashboard.css";
import DashboardTab from "../../components/DashboardTab/DashboardTab"
import Header from "../../components/Header/Header";
import { movieData } from "../../features/movie/movieSlice";
import { useSelector } from "react-redux";
import MainLoader from "../../utils/MainLoader";
import Navbar from "../../components/Navbar/Navbar";

function Dashboard() {

  const { loader } = useSelector(movieData);


  return (
    <>
      <Header />
      <Navbar />
      {loader && <MainLoader />}
      <div className="dashboard-wrapper">
        <div className="dashboard-container shadow">
          <DashboardTab />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
