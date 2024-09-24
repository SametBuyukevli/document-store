const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagsController");

// Belirli bir döküman için etiketleri getiren route
router.get("/detail/:id", tagsController.getDocumentTags);

module.exports = router;
