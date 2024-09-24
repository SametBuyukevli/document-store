const express = require('express');
const router = express.Router();
const docCategoryController = require('../controllers/docCategoryController');

router.get('/getDocCategories/:documentId', docCategoryController.getDocCategories);

router.post('/addCategory/:documentId/:categoryId', docCategoryController.createDocCategory);
router.post('/deleteCategory/:documentId/:categoryId', docCategoryController.deleteDocCategory);
//router.post('/updateCategory/:documentId/:categoryId', docCategoryController.updateDocCategory);

module.exports = router;