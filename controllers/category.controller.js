import Category from "../models/category.model.js";

// create category
export const createCategory = async (req, res) => {
    let response = false;
    let message = "";

    try {
        const { title } = req.body;

        const category = new Category(req.body);
        const existingCategory = await Category.findOne({
            $or: [{ title: req.body.title }],
        });

        console.log(`existing category ${existingCategory}`)

        // check category already exists or not
        if (existingCategory) {
            response = false;
            message = "Category is already taken";
            res.status(400).json({ response: response, message: message });
        }

        // check title is required
        if (!title) {
            response = false;
            message = "Category title is required";
            res.status(400).json({ response: response, message: message });
        }

        await category.save();
        response = true;
        message = "Category created successfully";
        res.status(201).json({ response: response, message: message });
    } catch (error) {
        res.status(500).json({ response: response, error: error.message })
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
                res.status(404).json({ response: response, message: message });
            }
            return res.status(200).json(category);
        }

        // if id does not provide then get all the category list
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const categories = await Category.find().skip((page - 1) * limit).limit(limit);
        const totalCategory = await Category.countDocuments();
        response = true;

        res.status(200).json({ response: response, categories, total: totalCategory, page, totalPage: Math.ceil(totalCategory / limit) });
    } catch (error) {
        return res.status(500).json({ response: false, message: "Something went wrong", error: error.message });
    }
}