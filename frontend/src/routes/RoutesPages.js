import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import LogIn from "../Pages/LogIn";
import ForgetPassword from "../Pages/ForgetPassword";
import SignUp from "../Pages/SignUp";
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <LogIn /> },
      { path: "/forgetpassword", element: <ForgetPassword /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);

export default router;
