import { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Logo from "../../logo.svg";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    // Email format regex
    const emailRegex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/;

    const handleSubmit = async (e) => {
        e.preventDefault(); // Formun submit edilmesini engeller

        // Email formatını doğrula
        if (!emailRegex.test(email)) {
            setErrorMessage(
                "Invalid email format. Please enter a valid email address."
            );
            return;
        }

        // Kayıt işlemleri burada yapılır
        try {
            const response = await axios.post("/users/signup", {
                userName,
                lastName,
                email,
                password,
            });
            if (response.status === 200) {
                console.log("Signup successful: ", response.data);
                sessionStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                navigate("/home"); // Başarılı kayıt sonrası yönlendir
            }
        } catch (error) {
            console.log("Signup error: ", error);
            setErrorMessage("Signup failed. Please try again."); // Hata mesajı ayarla
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
                <form onSubmit={handleSubmit}>
                    <div className="mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full p-3 pl-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <div className="mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full p-3 pl-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
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
                    <div className="mb-12">
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
                    {errorMessage && (
                        <p className="text-red-500 mb-4">{errorMessage}</p>
                    )}{" "}
                    {/* Hata mesajını göster */}
                    <button
                        type="submit"
                        className="w-full bg-loginButton text-white p-3 rounded-lg font-semibold"
                    >
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
