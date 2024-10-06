import Customer from "../models/customer.model.js";

// create customer 
export const createCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        const email = customer.email;
        const mobileNumber = customer.mobileNumber;
        const existingCustomer = await Customer.findOne({ email, mobileNumber });
        if (existingCustomer) return res.status(400).json({ message: "E-mail is already taken" });
        await customer.save();
        res.status(201).json({ message: "Customer created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// get all customer and single customer by id 
export const getCustomers = async (req, res) => {
    try {
        const { id } = req.query;

        // check id query if exist then get single review
        if (id) {
            const customer = await Customer.findById(id);
            if (!customer) return res.status(404).json({ message: "Customer not found" });
            return res.status(200).json(customer);
        }

        // if id does not provide then get all the agents
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const customers = await Customer.find().skip((page - 1) * limit).limit(limit);
        const totalCustomer = await Customer.countDocuments();

        res.status(200).json({ customers, total: totalCustomer, page, totalPage: Math.ceil(totalCustomer / limit) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete customer by id
export const deleteCustomerById = async (req, res) => {
    try {
        const { id } = req.query;

        const customer = await Customer.findByIdAndDelete(id);
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.status(200).json({ message: "Customer delete successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// update customer by id 
export const updateCustomerById = async (req, res) => {
    try {
        const { id } = req.query;

        // find customer by id and update
        const customer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
        if (!customer) return res.status(404).json({ message: "Customer not found" });

        res.status(200).json({ message: "Customer updated successfully", customer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}