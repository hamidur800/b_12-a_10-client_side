import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Componants/Home/Home";
import AllProperties from "../Componants/AllProperties/AllProperties";
import AddProperties from "../Componants/AddProperties/AddProperties";
import MyProperties from "../Componants/MyProperties/MyProperties";
import MyRatings from "../Componants/MyRatings/MyRatings";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import LogIn from "../Pages/LogIn/LogIn";
import Signup from "../Pages/Signup/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        path: "Home",
        Component: Home,
      },
      {
        path: "AllProperties",
        element: <AllProperties></AllProperties>,
      },
      {
        path: "AddProperties",
        element: <AddProperties></AddProperties>,
      },
      {
        path: "MyProperties",
        element: <MyProperties></MyProperties>,
      },
      {
        path: "MyRatings",
        element: <MyRatings></MyRatings>,
      },
      {
        path: "/PropertyDetails/:id",
        element: <MyRatings></MyRatings>,
      },
    ],
    errorElement: <ErrorPage></ErrorPage>,
  },

  {
    path: "LogIn",
    element: <LogIn></LogIn>,
  },
  {
    path: "Signup",
    element: <Signup></Signup>,
  },
]);
