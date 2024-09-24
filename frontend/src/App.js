import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Signup from "./components/auth/Signup.js";
import Login from "./components/auth/Login.js";
import AuthPage from "./components/auth/AuthPage.js";
import Document from "./components/document/Documents.js";
import DocCreatePage from "./components/document/DocCreatePage.js";
// import Favourite from "./components/favourite/Favourite.js";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="users/auth" />} />

                {/* AuthPage rotası */}
                <Route path="users/auth" element={<AuthPage />} />

                {/* Anasayfa rotası */}
                <Route path="/home" element={<HomePage />} />

                {/* Signup sayfası rotası */}
                <Route path="/users/signup" element={<Signup />} />

                {/* Login sayfası rotası */}
                <Route path="/users/login" element={<Login />} />

                {/* Document List rotası*/}
                <Route path="/document/list" element={<Document />} />

                {/* Document Create rotası*/}
                <Route path="/document/create" element={<DocCreatePage />} />
            </Routes>
        </Router>
    );
};

export default App;
