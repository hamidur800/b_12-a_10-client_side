import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Components/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Registation from "../Pages/Registation/Registation";
import AllProperties from "../Components/All Properties/AllProperties";
import MyProperties from "../Components/MyProperties/MyProperties";
import MyRatings from "../Components/MyRatings/MyRatings";
import PrivateRoute from "../provider/PrivateRoute";
import ForgetPassword from "../Pages/Login/forgetpassword";
import AddProperties from "../Components/Add Properties/AddProperties";
import PropertyDetails from "../Components/Property Details/PropertyDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: () => fetch("/populer.json"),
        element: <Home />,
      },
      {
        path: "Home",
        loader: () => fetch("/populer.json"),
        element: <Home />,
      },
      {
        path: "AllProperties",
        loader: () => fetch("/alltoys.json"),
        element: <AllProperties></AllProperties>,
      },
      {
        path: "AddProperties",
        element: (
          <PrivateRoute>
            <AddProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "MyProperties",
        element: (
          <PrivateRoute>
            <MyProperties></MyProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "MyRatings",
        element: (
          <PrivateRoute>
            <MyRatings></MyRatings>
          </PrivateRoute>
        ),
      },
      {
        path: "PropertyDetails/:id",
        loader: () => fetch("/alltoys.json"),
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "Login",
    element: <Login />,
  },
  {
    path: "Registation",
    element: <Registation />,
  },
  {
    path: "forget-password",
    element: <ForgetPassword />,
  },
]);
