import {
    createBrowserRouter,
    
  } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Error from "../components/ErrorPage/Error";
const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path: "/",
            element: <Home></Home>,
          },
       
      ]
    },
    {
      path:'/login',
      element:<Login></Login>
  },
  {
      path:'/register',
      element:<Register></Register>
  },
  {
    path: "*",
    element: <Error></Error>,
  },

  ]);

  export default router;