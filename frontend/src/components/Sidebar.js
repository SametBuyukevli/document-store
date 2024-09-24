import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../logo.svg";
import { IoSearch } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { FaHome, FaRegFile } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaFileMedical, FaRegBookmark } from "react-icons/fa6";

const Sidebar = () => {
    const navigate = useNavigate();

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
        // Document create sayfasına yönlendir
        navigate("/home");
    };

    return (
        <div className="bg-white h-screen p-5 pt-8 flex flex-col items-start rounded-r-lg">
            <img src={Logo} className="h-12 w-auto rounded-md " alt="Logo" />
            <div className="flex flex-col items-start mt-16">

                {/* Search icon */}
                <div className="h-12 w-12 flex items-center justify-center border-1 bg-searchStrokeColor rounded-lg">
                    <IoSearch className="text-textColor h-8 w-8" />
                </div>

                {/* Home icon */}
                <div
                    className="h-12 w-12 flex items-center justify-center mt-4 border-1 rounded-lg hover:bg-usercardColor1"
                    onClick={handleHome}
                >
                    <FaHome className="text-textColor h-7 w-7 hover:text-activetextColor" />
                </div>

                {/* Document icon */}
                <div
                    className="h-12 w-12 flex items-center justify-center mt-4 border-1 rounded-lg hover:bg-usercardColor1"
                    onClick={handleDocumentList}
                >
                    <FaRegFile className="text-textColor h-7 w-7 hover:text-activetextColor" />
                </div>

                {/* Add Document icon */}
                <div
                    className="h-12 w-12 flex items-center justify-center mt-4 border-1 rounded-lg"
                    onClick={handleDocumentCreate}
                >
                    <FaFileMedical className="text-textColor h-8 w-8" />
                </div>

                {/* Flags icon */}
                <div className="h-12 w-12 flex items-center justify-center mt-4 border-1 rounded-lg">
                    <FaRegBookmark className="text-textColor h-7 w-7" />
                </div>

                {/* Settings icon */}
                <div className="h-12 w-12 flex items-center justify-center mt-4 mb-6 border-1 rounded-lg">
                    <FiSettings className="text-textColor h-7 w-7" />
                </div>

                {/* Divider */}
                <div className="border-t-2 border-gray-300 my-4 mt-16 w-full"></div>

                {/* Menu icon */}
                <div className="h-12 w-12 flex items-center justify-center mt-2 mb-4 border-1 rounded-lg">
                    <IoMdMenu className="text-textColor h-9 w-9" />
                </div>

                {/* Logout icon */}
                <div
                    className="h-12 w-12 flex items-center justify-center border-1 bg-firstColor rounded-full cursor-pointer"
                    onClick={handleLogout}
                >
                    <FiLogOut className="text-activetextColor h-7 w-7 rotate-180" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
