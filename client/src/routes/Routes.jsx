import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Task from "../pages/Task";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "task",
        element: <Task />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
