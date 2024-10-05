import Order from '../models/order.model.js';

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("property user");
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get an order by ID
export const getOrderById = async (req, res) => {
    const { id } = req.query;  // Use query parameter

    try {
        const order = await Order.findById(id).populate('propertyId userId');
        if (!order) {
            return res.status(404).send({ message: "Order not found" });
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Update an order
export const updateOrder = async (req, res) => {
    const { id } = req.query;  // Use query parameter

    try {
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!order) {
            return res.status(404).send({ message: "Order not found" });
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Delete an order
export const deleteOrder = async (req, res) => {
    const { id } = req.query;  // Use query parameter

    try {
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).send({ message: "Order not found" });
        }
        res.status(200).send({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
