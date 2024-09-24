import { FaEnvelope, FaLock } from "react-icons/fa";
import Logo from "../../logo.svg";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/users/login", {
                email,
                password,
            });

            if (response.status === 200) {
                console.log("Login successful", response.data);
                sessionStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                console.log(
                    "User stored in sessionStorage:",
                    sessionStorage.getItem("user")
                );
                navigate("/home");
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(
                    error.response.data.message || "An error occurred"
                );
            } else {
                setErrorMessage("Network error or other issues");
            }
            console.log("Error:", error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 to-blue-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <div className="flex items-center text-center mb-14">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-16 mx-auto rounded-md"
                    />
                    <h1 className="text-2xl font-bold mr-auto">
                        <span className="text-loginFontColor">Document </span>
                        <span className="text-fbcolor">Store</span>
                    </h1>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-8">
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 pl-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 pl-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <div className="mb-8 text-right">
                        <label className="text-loginFontColor hover:underline cursor-pointer">
                            Forgot password?
                        </label>
                    </div>
                    {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-loginButton text-white p-3 rounded-lg font-semibold"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
