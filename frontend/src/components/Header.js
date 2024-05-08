import React from "react";
import WebLogo from "../assest/WebLogo.png";
import { CgSearch } from "react-icons/cg";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="shadow-md flex justify-between items-center px-6">
      <img src={WebLogo} alt="" className="h-16" />
      <div className="hidden lg:flex justify-start items-center border-2 px-4 rounded-md">
        <input
          type="text"
          placeholder="Search product here...."
          className="w-[20vw] py-1 mr-4 outline-none md:text-lg"
        />
        <CgSearch className="hover:scale-125 text-2xl" />
      </div>
      <div>
        <div className="flex justify-center items-center gap-x-10">
          <FaRegCircleUser className="text-3xl cursor-pointer" />
          <div className="relative">
            <BsCart2 className="text-3xl cursor-pointer" />
            <span className="text-md font-semibold absolute top-0 right-0 bg-red-600 px-1 text-center text-white rounded-[90%]">0</span>
          </div>
          <Link to={"/login"} className="text-lg font-semibold text-white bg-red-500 px-4 py-1 rounded-md">LogIn</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
