const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "category not found",
            });
        }
        req.category = category;
        next();
    });
};

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "category not saved successfully",
            });
        }
        res.json({ category });
    });
};

exports.getCategory = (req, res) => {
    return res.json(req.category);
};

exports.getAllCategorys = (req, res) => {
    Category.find((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "NO categories found",
            });
        }
        res.json(categories);
    });
};

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to update category",
            });
        }
        res.json(updatedCategory);
    });
};

exports.deleteCategory = (req, res) => {
    const category = req.category;
    category.remove((err, deletedcategory) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete category",
            });
        }
        res.json({
            message: ` ${category.name} is successfully deleted`,
        });
    });
};
