import Property from "../models/property.model.js";

// create property
export const createProperty = async (req, res) => {
    try {
        const propertyBody = req.body;
        const property = new Property({ ...propertyBody });
        await property.save();
        res.status(201).json({ message: "Property created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all properties or property by ID
export const getProperties = async (req, res) => {
    try {
        const { id } = req.query;

        if (id) {
            // If an ID is provided, get the specific property
            const property = await Property.findById(id);
            if (!property) return res.status(404).json({ message: "Property not found" });
            return res.status(200).json(property);
        }

        // Otherwise, get all properties
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const properties = await Property.find()
            .skip((page - 1) * limit)
            .limit(limit);
        const totalProperty = await Property.countDocuments();

        res.status(200).json({ properties, total: totalProperty, page, totalPage: Math.ceil(totalProperty / limit) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete property by id
export const deletePropertyById = async (req, res) => {
    try {
        const { id } = req.query;

        const property = await Property.findByIdAndDelete(id);
        if (!property) return res.status(404).json({ message: "Property not found" });
        res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// update property by id
export const updatePropertyById = async (req, res) => {
    try {
        const { id } = req.query;
        const updatedData = req.body;

        // Find the property by ID and update it
        const property = await Property.findByIdAndUpdate(id, updatedData, { new: true });

        // Check if the property was found and updated
        if (!property) return res.status(404).json({ message: "Property not found" });

        res.status(200).json({ message: "Property updated successfully", property });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}