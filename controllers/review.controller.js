import Review from "../models/review.model.js";

// create review 
export const createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        const email = review.email;
        const existingReview = await Review.findOne({ email });
        if (existingReview) return res.status(400).json({ message: "E-mail is already taken" });
        await review.save();
        res.status(201).json({ message: "Review created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get all review and single review by id 
export const getReviews = async (req, res) => {
    try {
        const { id, createdAt } = req.query;

        // check id query if exist then get single review
        if (id) {
            const review = await Review.findById(id);
            if (!review) return res.status(404).json({ message: "Review not found" });
            return res.status(200).json(review);
        }

        // check createdAt query id exist then get past 7 days review
        if (createdAt) {
            const startDate = new Date(createdAt);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 1);

            const reviews = await Review.find({
                createdAt: {
                    $gte: startDate,
                    $lt: endDate,
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
        res.status(500).json({ error: error.message });
    }
}

// delete review by id
export const deleteReviewById = async (req, res) => {
    try {
        const { id } = req.query;

        const review = await Review.findByIdAndDelete(id);
        if (!review) return res.status(404).json({ message: "Review not found" });
        res.status(200).json({ message: "Review delete successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// update review by id 
export const updateReviewById = async (req, res) => {
    try {
        const { id } = req.query;
        const reviewBody = req.body;

        // find review by id and update
        const review = await Review.findByIdAndUpdate(id, reviewBody, { new: true });
        if (!review) return res.status(404).json({ message: "Review not found" });

        res.status(200).json({ message: "Review updated successfully", review });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}