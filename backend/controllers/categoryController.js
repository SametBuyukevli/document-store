const { Category } = require('../database/db');

const createCategory = async (req, res) => {
  const { CategoryName } = req.body;

  try {
    const category = await Category.create({
      CategoryName,
    });
    res.status(200).send({ message: "Category created successfully", category });
  } catch (error) {
    console.log('Category create error:', error);
    res.sendStatus(500);
  }
};

const updateCategory = async (req, res) => {

  const categoryId = parseInt(req.params.id, 10);

  const { CategoryName } = req.body;

  if (isNaN(categoryId)) {
    return res.status(400).send({ message: "Invalid category ID" });
  }

  try {
    const category = await Category.findOne({
      where: {
        CategoryID: categoryId
      }
    });

    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    category.CategoryName = CategoryName;

    await category.save();

    return res.status(200).send({ message: "Category updated successfully", category });

  } catch (error) {
    console.log('Category update error:', error);
    res.sendStatus(500);

  }

};

const deleteCategory = async (req, res) => {

  const categoryId = parseInt(req.params.id, 10);

  if (isNaN(categoryId)) {
    return res.status(400).send({ message: "Invalid category ID" });
  }

  try {
    const category = await Category.findOne({
      where: {
        CategoryID: categoryId
      }
    });

    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    await category.destroy();

    return res.status(200).send({ message: "Category deleted successfully" });

  } catch (error) {
    console.log('Category delete error:', error);
    res.sendStatus(500);
  }
};

module.exports = { createCategory, updateCategory, deleteCategory };

