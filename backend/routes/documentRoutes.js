const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
// Yapılandırılmış multer middleware'ı içe aktardık
const upload = require("../middleware/upload.js");

// POST create, update, delete
router.post("/create", upload.single("File"), documentController.createDocument);
router.post("/update/:id", documentController.updateDocument);
router.delete("/delete/:id", documentController.deleteDocument);
// GET list, detail
router.get("/list", documentController.getDocuments);
router.get("/detail/:id", documentController.getDocument);

module.exports = router;
