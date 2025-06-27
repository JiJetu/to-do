import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Task from "../pages/Task";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import CreateTask from "../pages/CreateTask";
import Profile from "../pages/Profile";
import MyPostedTask from "../pages/MyPostedTask";
import TaskDetails from "../pages/TaskDetails";
import PrivateRoute from "./PrivateRoute";
import MyBids from "../pages/MyBids";
import UpdateTask from "../pages/UpdateTask";

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
        path: "tasks",
        element: <Task />,
      },
      {
        path: "task/:id",
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/task/${params.id}`),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "create-task",
        element: (
          <PrivateRoute>
            <CreateTask />,
          </PrivateRoute>
        ),
      },
      {
        path: "my-tasks",
        element: (
          <PrivateRoute>
            <MyPostedTask />
          </PrivateRoute>
        ),
      },
      {
        path: "my-task/update/:id",
        element: (
          <PrivateRoute>
            <UpdateTask />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/task/${params.id}`),
      },
      {
        path: "my-bids",
        element: (
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
