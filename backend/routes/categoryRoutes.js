const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

// POST create, update, delete

router.post('/create', categoryController.createCategory);
router.post('/update/:id', categoryController.updateCategory);
router.post('/delete/:id', categoryController.deleteCategory);

module.exports = router;


