import SideBar from "./Sidebar.js";
import UserCard from "./UserCard.js";
import DocumentCard from "./DocCard.js";
import WeatherCard from "./WeatherCard.js";
import CalendarCard from "./CalendarCard.js";

import { useState } from "react";
import React, { useEffect } from "react";

const HomePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        //tarayıcıda oturum boyunca kayıtlı kullanıcı varmı kontrol et
        const storedUser = sessionStorage.getItem("user");
        //kullanıcı varsa state'a set et
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    return (
        <div className="flex bg-gradient-to-br from-blue-300 to-blue-50 min-h-screen">
            <SideBar />
            <div className="flex flex-col space-y-4 p-4 ml-auto">
                <UserCard user={user} />
                <DocumentCard />
                <WeatherCard />
                <CalendarCard />
            </div>
        </div>
    );
};

export default HomePage;
