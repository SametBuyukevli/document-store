import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../logo.svg";
import { IoSearch } from "react-icons/io5";
import { FaHome, FaRegFile } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { FaFileMedical, FaRegBookmark } from "react-icons/fa6";
import UserPhoto from "./photo.jpeg";

const SidebarActive = ({ user }) => {
    const navigate = useNavigate();
    const location = useLocation(); // location hook

    const handleLogout = async () => {
        try {
            await axios.post("/users/logout");
            console.log("Logout successful");
            // Clear session storage
            sessionStorage.removeItem("user");
            navigate("/"); // Home page
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    const handleDocumentList = async () => {
        // Document create sayfasına yönlendir
        navigate("/document/list");
    };

    const handleDocumentCreate = async () => {
        // Document create sayfasına yönlendir
        navigate("/document/create");
    };

    const handleHome = async () => {
        navigate("/home");
    };

    return (
        <div className="bg-white w-64 h-auto p-6 flex flex-col justify-between items-start shadow-md rounded-r-2xl">
            {/* Logo Section */}
            <div className="flex items-center mb-12">
                <img
                    src={Logo}
                    className="h-14 w-auto rounded-md mr-2"
                    alt="Logo"
                />
                <div>
                    <h1 className="font-semibold text-xl ml-1 ">
                        Document{" "}
                        <span className="text-fbcolor text-xl">Store</span>
                    </h1>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center w-full rounded-md bg-gray-200 px-2 py-2 mb-4">
                <IoSearch className="h-8 w-8 text-textColor " />
                <input
                    type="text"
                    placeholder="Search..."
                    className="ml-2 w-full bg-transparent outline-none text-textColor font-semibold"
                />
            </div>

            {/* Home Icon */}
            <div
                className="group flex items-center w-full rounded-md px-2 py-2 border-1 hover:bg-usercardColor1"
                onClick={handleHome}
            >
                <FaHome className="h-7 w-7 text-textColor group-hover:text-white" />
                <span className="ml-4 font-semibold text-xl text-textColor group-hover:text-white">
                    Home
                </span>
            </div>

            {/* My Document Icon */}
            <div
                className={`group flex items-center w-full rounded-md px-2 py-2 border-1 hover:bg-usercardColor1 mt-2 ${
                    location.pathname === "/document/list"
                        ? "bg-usercardColor1 text-white"
                        : ""
                }`}
                onClick={handleDocumentList}
            >
                <FaRegFile
                    className={`h-7 w-7 ${
                        location.pathname === "/document/list"
                            ? "text-white"
                            : "text-textColor"
                    } group-hover:text-white`}
                />
                <span
                    className={`ml-4 font-semibold text-xl ${
                        location.pathname === "/document/list"
                            ? "text-white"
                            : "text-textColor"
                    } group-hover:text-white`}
                >
                    My Documents
                </span>
            </div>

            {/* Add Document icon */}
            <div
                className={`group flex items-center w-full rounded-md px-2 py-2 border-1 hover:bg-usercardColor1 mt-2 ${
                    location.pathname === "/document/create"
                        ? "bg-usercardColor1 text-white"
                        : ""
                }`}
                onClick={handleDocumentCreate}
            >
                <FaFileMedical
                    className={`h-7 w-7 ${
                        location.pathname === "/document/create"
                            ? "text-white"
                            : "text-textColor"
                    } group-hover:text-white`}
                />
                <span
                    className={`ml-4 font-semibold text-xl ${
                        location.pathname === "/document/create"
                            ? "text-white"
                            : "text-textColor"
                    } group-hover:text-white`}
                >
                    Add Document
                </span>
            </div>

            {/* Flags icon */}
            <div
                className="group flex items-center w-full rounded-md px-2 py-2 border-1 hover:bg-usercardColor1 mt-2"
                // onClick={handleDocumentList}
            >
                <FaRegBookmark className="h-7 w-7 text-textColor group-hover:text-white" />
                <span className="ml-4 font-semibold text-xl text-textColor group-hover:text-white">
                    Favourites
                </span>
            </div>

            {/* Settings icon */}
            <div
                className="group flex items-center w-full rounded-md px-2 py-2 border-1 hover:bg-usercardColor1 mt-2"
                // onClick={handleDocumentList}
            >
                <FiSettings className="h-7 w-7 text-textColor group-hover:text-white" />
                <span className="ml-4 font-semibold text-xl text-textColor group-hover:text-white">
                    Settings
                </span>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-gray-300 my-4 mt-16 w-full"></div>

            {/* Profile icon */}
            <div className="flex items-center gap-4">
                <img
                    src={UserPhoto}
                    alt="User"
                    className="h-10 w-10 rounded-full stroke-black stroke-1"
                />
                <div className="font-medium text-lg text-textColor">
                    {/* <div>Samet Büyükevli</div> */}
                    {/* <div class="text-sm text-gray-500">Backend Developer</div> */}
                    {user ? `${user.UserName} ${user.LastName}` : "Loading..."}
                </div>
            </div>

            {/* Logout icon */}
            <div
                className="group flex items-center w-full rounded-md px-2 py-2 border-1 hover:bg-usercardColor1 mt-2"
                onClick={handleLogout}
            >
                <FiLogOut className="h-7 w-7 text-textColor group-hover:text-white rotate-180" />
                <span className="ml-4 font-semibold text-xl text-textColor group-hover:text-white">
                    Logout
                </span>
            </div>
        </div>
    );
};

export default SidebarActive;
