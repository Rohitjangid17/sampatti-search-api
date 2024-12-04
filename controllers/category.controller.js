import Category from "../models/category.model.js";

// create category
export const createCategory = async (req, res) => {
    let response = false;
    let message = "";

    try {
        const { title, description } = req.body;

        const category = new Category(req.body);
        const existingCategory = await Category.findOne({
            $or: [{ title: req.body.title }],
        });

        // check category already exists or not
        if (existingCategory) {
            response = false;
            message = "Category is already taken";
            return res.status(400).json({ response: response, message: message });
        }

        // check title is required
        if (!title) {
            response = false;
            message = "Category title is required";
            return res.status(400).json({ response: response, message: message });
        }

        // check title length grether then 100 character or not
        if (title.length > 100) {
            response = false;
            message = "Title too long! Please keep it under 100 characters.";
            return res.status(400).json({ response: response, message: message });
        }

        // check description length grether then 500 character or not
        if (description && description.length > 500) {
            response = false;
            message = "Description too long! Please keep it under 500 characters";
            return res.status(400).json({ response: response, message: message });
        }

        await category.save();
        response = true;
        message = "Category created successfully";
        return res.status(201).json({ response: response, message: message });
    } catch (error) {
        return res.status(500).json({ response: response, error: error.message })
    }
}

// get category
export const getCategory = async (req, res) => {
    let response = false;
    let message = "";

    try {
        const { id } = req.query;

        // check id query if exist then get single category
        if (id) {
            const category = await Category.findById(id);
            if (!category) {
                response = false;
                message = "Category not found";
                return res.status(404).json({ response: response, message: message });
            }
            return res.status(200).json(category);
        }

        // if id does not provide then get all the category list
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const categories = await Category.find().skip((page - 1) * limit).limit(limit);
        const totalCategory = await Category.countDocuments();
        response = true;

        return res.status(200).json({ response: response, categories, total: totalCategory, page, totalPage: Math.ceil(totalCategory / limit) });
    } catch (error) {
        let response = false;
        let message = "Something went wrong";
        return res.status(500).json({ response: response, message: message, error: error.message });
    }
}

// delete agent by id
export const deleteCategoryById = async (req, res) => {
    let response = false;
    let message = "";

    try {
        const { id } = req.query;

        const category = await Category.findByIdAndDelete(id);

        // check the category if not exist then throw error
        if (!category) {
            response = false;
            message = "Category not found";
            return res.status(404).json({ response: response, message: message });
        }

        response = true;
        message = "Category delete successfully";
        return res.status(200).json({ response: response, message: message });
    } catch (error) {
        response = false;
        message = "Something went wrong";
        return res.status(500).json({ response: response, message: response, error: error.message });
    }
}

// category update by id
export const updateCategoryById = async (req, res) => {
    let response = false;
    let message = "";

    try {
        const { title, description } = req.body;
        const { id } = req.query;

        const existingCategory = await Category.findOne({
            $or: [{ title: req.body.title }],
        });

        // check category already exists or not
        if (existingCategory) {
            response = false;
            message = "Category is already taken";
            return res.status(400).json({ response: response, message: message });
        }

        // check title is required
        if (!title) {
            response = false;
            message = "Category title is required";
            return res.status(400).json({ response: response, message: message });
        }

        // check title length grether then 100 character or not
        if (title.length > 100) {
            response = false;
            message = "Category title should not exceed 100 characters";
            return res.status(400).json({ response: response, message: message });
        }

        // check description length grether then 500 character or not
        if (description && description.length > 500) {
            response = false;
            message = "Category description should not exceed 500 characters";
            return res.status(400).json({ response: response, message: message });
        }

        const category = await Category.findByIdAndUpdate(id, req.body, { new: true });

        // check category not found
        if (!category) {
            response = false;
            message = "Category not found";
            return res.status(404).json({ response: response, message: message });
        }

        response = true;
        message = "Category updated successfully";
        return res.status(200).json({ response: response, message: message });
    } catch (error) {
        let response = false;
        let message = "Something went wrong";
        return res.status(500).json({ response: response, message: message, error: error.message });
    }
}