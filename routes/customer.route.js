import express from "express";
import { createCustomer, deleteCustomerById, getCustomers, updateCustomerById } from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/", createCustomer);
router.get("/", getCustomers);
router.delete("/", deleteCustomerById);
router.put("/", updateCustomerById);

export default router;