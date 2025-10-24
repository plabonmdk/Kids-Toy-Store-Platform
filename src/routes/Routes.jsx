import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "../Layout/MainLayout";
import HomePages from "../pages/HomePages";
import AboutPages from "../pages/AboutPages";
import ProfilePages from "../pages/ProfilePages";
import Register from "../pages/Register";
import SingIn from "../pages/SingIn";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ForgotPassword from "../pages/ForgotPassword";
import Details from "../pages/Details";
import Error from "../pages/Error";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            index: true,
            element: <HomePages></HomePages>,
            
        },
        {
           path:"/about",
            element: <AboutPages></AboutPages>,
        },
        {
            path:"/profile",
            element: <PrivateRoute>
                <ProfilePages></ProfilePages>
            </PrivateRoute>,
        },
        {
            path:"/register",
            element: <Register></Register>,
        },
        {
            path:"/sing_in",
            element: <SingIn></SingIn>,
        },
        {
            path: "/forgot",
            element: <ForgotPassword></ForgotPassword>
        },
        {
            path: "/details/:id",
            element: <Details></Details>
        },
        {
            path: "/*",
            element: <Error></Error>
        }
    ]
  },
]);