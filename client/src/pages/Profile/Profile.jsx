import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import ProfileTab from "../../components/ProfileTab/ProfileTab";
import { theatreStateData } from "../../features/theatre/theatreSlice";
import MainLoader from "../../utils/MainLoader";

const Profile = () => {
  const { loader } = useSelector(theatreStateData);

  return (
    <>
      {loader && <MainLoader />}
      <Header />
      <Navbar />
      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          <ProfileTab />
        </div>
      </div>
    </>
  );
};

export default Profile;
