import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "../Layout/MainLayout";
import HomePages from "../pages/HomePages";
import AboutPages from "../pages/AboutPages";
import ProfilePages from "../pages/ProfilePages";





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
            element: <ProfilePages></ProfilePages>,
        },
    ]
  },
]);