const userRoutes = require("../routes/userRoutes");
const documentRoutes = require("../routes/documentRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const docCategoryRoutes = require("../routes/docCategoryRoutes");
const tagsRoutes = require("../routes/tagRoutes");

module.exports = function (app) {
    app.use("/users", userRoutes);
    app.use("/document", documentRoutes);
    app.use("/tags", tagsRoutes);
    app.use("/category", categoryRoutes);
    app.use("/docCategory", docCategoryRoutes);
};
