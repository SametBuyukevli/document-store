// userRoutes.js
const express = require("express");
const {
    createUser,
    loginUser,
    logoutUser,
} = require("../controllers/userController");
const router = express.Router();

// POST /users/signup
router.post("/signup", createUser);
// POST /users/login
router.post("/login", loginUser);
// POST /users/logout
router.post("/logout", logoutUser);

module.exports = router;
