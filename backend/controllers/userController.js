const { User } = require("../database/db");
const bcrypt = require("bcrypt");

// User create
const createUser = async (req, res) => {
    const { userName, lastName, email, password } = req.body;

    try {
        // Kayıtlı email kontrolü
        const existingUser = await User.findOne({ where: { Email: email } });

        if (existingUser) {
            return res.status(400).send({ message: "Email already exists" });
        }

        // Şifre hashleme
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            UserName: userName,
            LastName: lastName,
            Email: email,
            Password: hashedPassword,
        });
        req.session.user = user; // Oturumda kullanıcıyı sakla
        res.status(200).send({ message: "Successfully added user", user });
    } catch (err) {
        console.log("User create error:", err);
        res.sendStatus(500);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("Received login request with:", { email, password }); // E-posta ve şifreyi loglayın
    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            console.log("User found:", user); // Kullanıcıyı loglayın
            const isPasswordMatch = await bcrypt.compare(
                password,
                user.Password
            );

            if (isPasswordMatch) {
                req.session.user = user; // Oturumda kullanıcıyı sakla
                res.status(200).send({
                    message: "Login successful",
                    user: {
                        UserID: user.UserID,
                        UserName: user.UserName,
                        LastName: user.LastName,
                        // Include other necessary fields
                    },
                });
            } else {
                res.status(400).send({ message: "Password is incorrect" });
            }
        } else {
            res.status(400).send({ message: "Email is incorrect" });
        }
    } catch (err) {
        console.log("Login error:", err);
        res.sendStatus(500);
    }
};

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Logout error");
        }
        // Çerezi temizle
        res.clearCookie("connect.sid", { path: "/" });
        res.status(200).send("Logout successful");
    });
};

module.exports = { createUser, loginUser, logoutUser };
