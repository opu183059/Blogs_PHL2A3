"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Please provide your email"],
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
            },
            message: "{VALUE} is not a valid email",
        },
        immutable: true, // Keeps the email immutable for a particular order
    },
    product: { type: String, required: [true, "Please insert the product ID"] },
    quantity: {
        type: Number,
        required: [true, "Please insert product quantity"],
        min: 1,
    },
    totalPrice: { type: Number },
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
