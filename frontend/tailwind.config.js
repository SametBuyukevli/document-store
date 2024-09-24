/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                sidebarColor: "#B7B7B7",
                searchStrokeColor: "#F3F3F3",
                firstColor: "#4444A5",
                activetextColor: "#FFFFE5",
                textColor: "#040426",
                usercardColor1: "#4444A5",
                usercardColor2: "#636ECD",
                cardColor1: "#2FFF00",
                cardColor2: "#97FF80",
                cardColor3: "#F6F6F6",
                weatherColor1: "#DD2476",
                weatherColor2: "#FF512F",
                loginButton: "#4444A5",
                loginFontColor: "#0B0B40",
                fbcolor: "#EB1C3C",
                secondColor: "#7575FB",
                borderColor: {
                    default: "#3C51D2",
                    DEFAULT: "#3C51D2", // Base color
                    50: "rgba(60, 81, 210, 0.1)", // 10% opacity
                    100: "rgba(60, 81, 210, 0.2)", // 20% opacity
                    200: "rgba(60, 81, 210, 0.3)", // 30% opacity
                    300: "rgba(60, 81, 210, 0.4)", // 40% opacity
                    400: "rgba(60, 81, 210, 0.5)", // 50% opacity
                    500: "rgba(60, 81, 210, 0.6)", // 60% opacity
                    600: "rgba(60, 81, 210, 0.7)", // 70% opacity
                    700: "rgba(60, 81, 210, 0.8)", // 80% opacity
                    800: "rgba(60, 81, 210, 0.9)", // 90% opacity
                    900: "rgba(60, 81, 210, 1)", // 100% opacity (no opacity)
                },
            },
        },
    },
    plugins: [],
};
