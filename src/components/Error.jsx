import React from "react";
import { useNavigate } from "react-router-dom";
import errorImage from "../assets/blue-monday.png";
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white font-['Source_Sans_3']">
            <div className="text-[#2597B9] text-center">
                <img src={errorImage} alt="Blue Monday" className="max-w-full h-auto mx-auto" />
                <div className="h-[15vh] flex flex-col items-center justify-center">
                    <h1 className="font-extrabold text-6xl">404</h1>
                    <h3 className="font-medium text-base mt-2">Uh oh, something looks wrong here.</h3>
                    <button onClick={() => navigate("/")} className="mt-4 px-5 py-3 rounded-lg text-white font-semibold text-sm bg-[#2597B9] transition-transform duration-300 hover:scale-110">Back Home</button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
