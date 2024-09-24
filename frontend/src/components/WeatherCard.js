import React from "react";
import Cloudy from "./Partly Cloudy Day-595b40b85ba036ed117da7bc.svg";

const WeatherCard = () => {
    return (
        <div className="flex items-center justify-between bg-gradient-to-r from-weatherColor1 to-weatherColor2 p-6 w-full max-w-md rounded-2xl shadow-lg">
            <div>
                <h2 className="text-white font-bold text-xl">Ankara</h2>
                <p className="text-white text-sm">Cloudy</p>
            </div>
            <div className="text-center">
                <h3 className="text-white font-bold text-3xl">32°</h3>
            </div>
            <div>
                <img src={Cloudy} className="flex items-center" alt="weather" />
                {/* <WiDayCloudy className="text-yellow-300 text-5xl" /> */}
            </div>
        </div>
    );
};

export default WeatherCard;
