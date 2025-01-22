import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Error from "../components/ErrorPage/Error";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import FundingPage from "../Pages/Home/FundingPage/FundingPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import DonationRequest from "../Pages/DonationRequest/DonationRequest";
import BlogPage from "../Pages/BlogPage/BlogPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/funding",
        element: (
          <PrivateRoute>
            <FundingPage></FundingPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/donation-request",
        element: <DonationRequest></DonationRequest>,
      },
      {
        path: "/search",
        element: <SearchPage></SearchPage>,
      },
      {
        path: "/blog",
        element: <BlogPage></BlogPage>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);

export default router;
