import { useEffect } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import MessageAlert from "../../utils/MessageAlertAntD";
import { setMessageEmpty } from "../../features/user/userSlice";
import MainLoader from "../../utils/MainLoader";


function Home() {

  const dispatch = useDispatch()

  const { error, message, loader } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      MessageAlert({ content: error });
      dispatch(setMessageEmpty())
    }
    if (message) {
      MessageAlert({ type: "success", content: message });
      dispatch(setMessageEmpty())
    }    
  }, [error, message,dispatch]);

  return (
    <>
    {loader && <MainLoader />}
      <Header />
      <Navbar />
    </>
  );
}

export default Home;
