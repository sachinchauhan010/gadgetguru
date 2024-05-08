import React, { useContext, useState } from "react";
import logInIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Context from "../context";
function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const dataResponse = await fetch("http://localhost:8000/api/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success("Login Succesfully");
        fetchUserDetails();

        navigate("/");
      }
    } catch (error) {}
  };
  function changeMode() {
    setShowPassword((showPassword) => !showPassword);
  }

  return (
    <section>
      <div className="mx-auto p-4">
        <div className="bg-gray-100 mx-auto max-w-md rounded-md shadow-xl px-10 py-5">
          <img src={logInIcon} alt="" className="h-20 w-20 mx-auto p-2" />

          <form action="">
            <div className="p-4 text-lg font-semibold grid">
              <label className="">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Email/userName"
                className="bg-gray-100 w-full outline-none border-2 rounded-md px-2 text-base py-1"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="p-4 text-lg font-semibold grid">
              <label className="">Password:</label>
              <div className="flex justify-between items-center border-2 rounded-md px-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-100 w-full outline-none text-base py-1"
                />
                <div className="cursor-pointer" onClick={changeMode}>
                  {showPassword ? (
                    <span>
                      <FaEyeSlash />
                    </span>
                  ) : (
                    <span>
                      <FaEye />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </form>
          <div className="flex justify-between items-center">
            <button
              onClick={(e) => {
                handleSubmit();
              }}
              className="mx-auto px-4 py-1 ml-4 my-4 text-lg rounded font-semibold text-white bg-red-500 hover:bg-green-700 hover:scale-110 transition-all"
            >
              Log In
            </button>
            <Link
              to={"/forgetpassword"}
              className="hover:text-red-500 hover:underline"
            >
              Forget Password
            </Link>
          </div>

          <p className="px-4 my-5">
            Don't have account?{" "}
            <span>
              <Link
                to="/signup"
                className="font-semibold hover:text-red-500 hover:underline"
              >
                Sign Up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LogIn;
