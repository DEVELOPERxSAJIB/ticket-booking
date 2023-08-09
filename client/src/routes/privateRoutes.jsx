import Layout from "../components/Layout/Layout";
import Admin from "../pages/Movies/Movies";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";
import Theatres from "../pages/Theatres/Theatres";
import PrivateGuard from "./PrivateGuard";

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
            path : "/admin",
            element : <Admin />
          },
          {
            path : "/theatres",
            element : <Theatres />
          }
        ],
      },
    ],
  },
];

export default privateRoutes;
