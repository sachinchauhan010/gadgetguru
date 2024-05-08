import React, { useState } from "react";
import logInIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helper/imageToBase64";
import { toast } from "react-toastify";
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic:"",
  });
  const [selectedImage, setSelectedImage] = useState();
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setFormData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      try {
        const dataResponse = await fetch("http://localhost:8000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const dataApi = await dataResponse.json();
        if (dataApi.success) {
          toast.success("Succesfully  Registered");
          navigate("/login");
        }
      } catch (error) {
        toast.error("Error.. User not registered");
        console.error("Error:", error);
      }
    } else {
      toast.error("Password and Confirm Password didn't match");
      console.log("Password and Confirm Password did not match");
    }
  };

  const matchPassword = () => {
    return formData.password === formData.confirmPassword;
  };
  function changeMode() {
    setShowPassword((showPassword) => !showPassword);
  }
  function changeCPMode() {
    setShowCPassword((showCPassword) => !showCPassword);
  }

  return (
    <section>
      <div className="mx-auto p-4">
        <div className="bg-gray-100 mx-auto max-w-md rounded-md shadow-xl px-10 py-5">
          <div className="relative overflow-hidden h-20 w-20 mx-auto rounded-full box-border">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Uploaded"
                className="mx-auto relative"
              />
            ) : (
              <img
                src={logInIcon}
                alt="Placeholder"
                className="mx-auto relative"
              />
            )}
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form>
            <div className="p-4 py-1 text-lg font-semibold grid">
              <label className="">Name:</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="bg-gray-100 w-full outline-none border-2 rounded-md px-2 text-base py-1"
                onChange={handleChange}
                value={formData.fullName}
                name="fullName"
              />
            </div>
            <div className="p-4 py-1 text-lg font-semibold grid">
              <label className="">Phone No:</label>
              <input
                type="text"
                placeholder="Enter Contact Number.."
                className="bg-gray-100 w-full outline-none border-2 rounded-md px-2 text-base py-1"
                onChange={handleChange}
                value={formData.phoneNo}
                name="phoneNo"
              />
            </div>
            <div className="p-4 py-1 text-lg font-semibold grid">
              <label className="">Email:</label>
              <input
                type="email"
                placeholder="Email/userName"
                className="bg-gray-100 w-full outline-none border-2 rounded-md px-2 text-base py-1"
                onChange={handleChange}
                value={formData.email}
                name="email"
              />
            </div>
            <div className="p-4 py-1 text-lg font-semibold grid">
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
            <div className="p-4 py-1 text-lg font-semibold grid">
              <label className="">Confirm Password:</label>
              <div className="flex justify-between items-center border-2 rounded-md px-2">
                <input
                  type={showCPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="Cpassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-gray-100 w-full outline-none text-base py-1"
                />
                <div className="cursor-pointer" onClick={changeCPMode}>
                  {showCPassword ? (
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
                matchPassword();
                handleSubmit();
              }}
              className="mx-auto px-4 py-1 ml-4 my-4 text-lg rounded font-semibold text-white bg-red-500 hover:bg-green-700 hover:scale-110 transition-all"
            >
              Sign Up
            </button>
          </div>

          <p className="px-4 my-5">
            You have already account!{" "}
            <span>
              <Link
                to="/login"
                className="font-semibold hover:text-red-500 hover:underline"
              >
                Log In
              </Link>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
