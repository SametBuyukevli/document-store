const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const cors = require("cors");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { sequelize } = require("./database/db"); // sql modülünü de içe aktarıyoruz

// Ortam değişkenlerini yükleme
dotenv.config();

const PORT = process.env.PORT || 4343;
const app = express();

app.use(
    cors({
        origin: "http://localhost:3000", // Frontend'in çalıştığı port
        credentials: true, // Tarayıcı ile sunucu arasında cookie paylaşımı için gerekli
        methods: ["GET", "POST", "PUT", "DELETE"], // İzin verilen HTTP yöntemleri
        allowedHeaders: ["Content-Type", "Authorization"], // İzin verilen başlıklar
    })
);

// Middleware
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Session setup
const sessionStore = new SequelizeStore({
    db: sequelize,
});

app.use(
    session({
        secret: process.env.SESSION_SECRET, // Secret Key
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        },
    })
);

// Routes
require("./startup/routes")(app);

// Database connection
sequelize
    .authenticate()
    .then(() => {
        console.log("Database connection successful");
        sessionStore.sync(); // session store sync
        app.listen(PORT, () =>
            console.log(`Server is running on port ${PORT}`)
        );
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
