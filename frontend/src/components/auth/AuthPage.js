import Logo from "../../logo.svg";
import { useNavigate } from "react-router-dom";
const AuthPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 to-blue-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <div className="flex items-center text-center mb-8">
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
                <form>
                    <button
                        className="w-full bg-loginButton text-white p-3 rounded-lg font-semibold mb-6"
                        onClick={() => navigate("/users/signup")}
                    >
                        Signup
                    </button>
                    <button
                        className="w-full bg-loginButton text-white p-3 rounded-lg font-semibold"
                        onClick={() => navigate("/users/login")}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;
