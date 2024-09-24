import React from "react";
import UserPhoto from "./photo.jpeg";

const UserCard = ({ user }) => {
    return (
        <div className="flex bg-gradient-to-r from-usercardColor1 to-usercardColor2 max-w-md rounded-2xl shadow-xl">
            <div className="flex-none w-24 h-24">
                <img
                    src={UserPhoto}
                    alt="User"
                    className="w-full h-full object-cover rounded-l-2xl"
                />
            </div>
            <div className="flex-auto p-4 flex flex-col justify-center">
                <h1 className="text-xl font-bold text-white">
                    {user ? `${user.UserName} ${user.LastName}` : "Loading..."}
                </h1>
                <p className="text-sm text-gray-200">Backend Developer</p>
            </div>
        </div>
    );
};

export default UserCard;
