import Layout from "../components/Layout/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";
import PrivateGuard from "./PrivateGuard";
import Profile from "../pages/Profile/Profile";

const privateRoutes = [
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateGuard />,
        children: [
          {
            path : "/",
            element : <Home />
          }, 
          {
            path : "/dashboard",
            element : <Dashboard />
          }, 
          {
            path : "/profile",
            element : <Profile />
          }
        ],
      },
    ],
  },
];

export default privateRoutes;
