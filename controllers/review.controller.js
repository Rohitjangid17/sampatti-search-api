import Review from "../models/review.model.js";

// create review 
export const createReview = async (req, res) => {
    let response = false;
    let message = "";

    try {
        const { name, propertyAddress, email, review } = req.body;
        const existingReview = await Review.findOne({ email });

        // Check if all fields are null or empty
        if (!name && !propertyAddress && !email && !review?.title && !review?.description && review?.rating === null) {
            response = false;
            message = "All fields are required";
            return res.status(400).json({ response, message });
        }

        // check name is required
        if (!name) {
            response = false;
            message = "Name is required";

            return res.status(400).json({ response: response, message: message });
        }

        // check title length grether then 50 character or not
        if (name.length > 50) {
            response = false;
            message = "Name must be 50 characters or less";

            return res.status(400).json({ response: response, message: message });
        }

        // check propertyAddress is required
        if (!propertyAddress) {
            response = false;
            message = "Property address is required";

            return res.status(400).json({ response: response, message: message });
        }

        // check propertyAddress length grether then 100 character or not
        if (propertyAddress.length > 100) {
            response = false;
            message = "Property address must be 100 characters or less";

            return res.status(400).json({ response: response, message: message });
        }

        // check email is required
        if (!email) {
            response = false;
            message = "E-mail is required";

            return res.status(400).json({ response: response, message: message });
        }

        // check email length grether then 50 character or not
        if (email.length > 50) {
            response = false;
            message = "E-mail must be 50 characters or less";

            return res.status(400).json({ response: response, message: message });
        }

        // check review already exists or not
        if (existingReview) {
            response = false;
            message = "E-mail is already taken";

            return res.status(400).json({ response: response, message: message });
        }

        // check review title is required
        if (!review.title) {
            response = false;
            message = "Review title is required";

            return res.status(400).json({ response: response, message: message });
        }

        // check review title length grether then 100 character or not
        if (review.title.length > 100) {
            response = false;
            message = "E-mail must be 100 characters or less";

            return res.status(400).json({ response: response, message: message });
        }

        // check review description is required
        if (!review.description) {
            response = false;
            message = "Review description is required";

            return res.status(400).json({ response: response, message: message });
        }

        // check review description length grether then 400 character or not
        if (review.description.length > 400) {
            response = false;
            message = "E-mail must be 400 characters or less";

            return res.status(400).json({ response: response, message: message });
        }

        // check review rating is required
        if (review.rating === null) {
            response = false;
            message = "Review rating is required";

            return res.status(400).json({ response: response, message: message });
        }

        // Check if rating is a valid number and between 1 and 5
        if (review.rating <= 0 || review.rating > 5) {
            response = false;
            message = "Rating must be between 1 and 5";

            return res.status(400).json({ response: response, message: message });
        }

        const reviewBody = new Review(req.body);
        await reviewBody.save();

        response = true;
        message = "Review created successfully";
        return res.status(201).json({ response: response, message: message });
    } catch (error) {
        response = false;
        message = "Something went wrong";
        return res.status(500).json({ response: response, message: message, error: error.message });
    }
}

// get all review and single review by id 
export const getReviews = async (req, res) => {
    let response = false;
    let message = "";

    try {
        const { id, createdAt } = req.query;

        // check id query if exist then get single review
        if (id) {
            const review = await Review.findById(id);
            if (!review) {
                response = false;
                message = "Review not found";
                res.status(404).json({ response: response, message: message });
            }
            return res.status(200).json(review);
        }

        // check createdAt query id exist then get past 7 days review
        if (createdAt) {
            const providedDate = new Date(createdAt);
            const startDate = new Date(providedDate);
            startDate.setDate(startDate.getDate() - 7); // Start date is 7 days before the provided date

            const reviews = await Review.find({
                createdAt: {
                    $gte: startDate,
                    $lt: new Date(providedDate.setDate(providedDate.getDate() + 1)) // End date is the next day of the provided date
                }
            });

            return res.status(200).json({ reviews });
        }

        // if id does not provide then get all the agents
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const reviews = await Review.find().skip((page - 1) * limit).limit(limit);
        const totalReview = await Review.countDocuments();

        res.status(200).json({ reviews, total: totalReview, page, totalPage: Math.ceil(totalReview / limit) });
    } catch (error) {
        response = false;
        message = "Something went wrong";
        return res.status(500).json({ response: response, message: message, error: error.message });
    }
}

// delete review by id
export const deleteReviewById = async (req, res) => {
    let response = false;
    let message = "";

    try {
        const { id } = req.query;

        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            response = false;
            message = "Review not found";
            res.status(404).json({ response: response, message: message });
        }

        response = true;
        message = "Review delete successfully";
        res.status(200).json({ response: response, message: message });
    } catch (error) {
        response = false;
        message = "Something went wrong";
        return res.status(500).json({ response: response, message: message, error: error.message });
    }
}

// update review by id 
export const updateReviewById = async (req, res) => {
    try {
        const { id } = req.query;
        const reviewBody = req.body;

        // find review by id and update
        const review = await Review.findByIdAndUpdate(id, reviewBody, { new: true });

        if (!review) {
            response = false;
            message = "Review not found";
            res.status(404).json({ response: response, message: message });
        }

        response = true;
        message = "Review updated successfully";
        res.status(200).json({ response: response, message: message });
    } catch (error) {
        response = false;
        message = "Something went wrong";
        return res.status(500).json({ response: response, message: message, error: error.message });
    }
}