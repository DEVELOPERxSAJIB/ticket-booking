import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogOut } from "../../features/user/userApiSlice";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(userLogOut());
  };

  return (
    <div className="nav-menu">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="menu-item">
          <ul>
            <li>
              <Link className="active" to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/"}>ShowTimes</Link>
            </li>
            <li>
              <Link className="disabled-link" to={"/"}>
                Carrer
              </Link>
            </li>
            <li>
              <Link className="disabled-link" to={"/"}>
                Member
              </Link>
            </li>
            <li>
              <Link className="disabled-link" to={"/"}>
                About us
              </Link>
            </li>
            <li>
              <Link className="disabled-link" to={"/"}>
                Ticket Price
              </Link>
            </li>
            <li>
              <Link to={"/login"}>Admin</Link>
            </li>
            <li>
              <Link onClick={handleLogOut} to={"/"}>
                Logout
              </Link>
            </li>
          </ul>
        </div>

        <div className="user-profile">
          <Avatar
            style={{ backgroundColor: "#5F1A89", cursor: "pointer" }}
            icon={<UserOutlined />}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
