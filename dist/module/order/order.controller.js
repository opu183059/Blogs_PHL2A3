"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const product_service_1 = require("../product/product.service");
const order_model_1 = require("./order.model");
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, product: productId, quantity, totalPrice: givenTotalPrice, } = req.body;
        // get the selected product from Products database
        const product = yield product_service_1.productService.getSingleProduct(productId);
        if (!product || product.quantity < quantity) {
            res.json({ message: "Insufficient stock", status: false });
            return;
        }
        // calculate total price if the total price is not provided
        const totalPrice = givenTotalPrice
            ? givenTotalPrice
            : product.price * quantity;
        const order = new order_model_1.Order({
            email,
            product: productId,
            quantity,
            totalPrice,
        });
        const result = yield order_service_1.orderService.createOrder(order);
        // handle the product quantity and stock value after order completion
        product.quantity = product.quantity - quantity;
        product.inStock = product.quantity > 0 ? true : false;
        yield product_service_1.productService.updateProduct(productId, product);
        res.json({
            message: "Order created successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.json({
            message: "Order Creation failed",
            status: false,
            error,
        });
    }
});
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revenue = yield order_model_1.Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: { $multiply: ["$totalPrice", "$quantity"] } },
                },
            },
        ]);
        res.json({
            message: "Revenue calculated successfully",
            status: true,
            data: revenue ? revenue[0] : { totalRevenue: 0 },
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error calculating revenue",
            status: false,
            error,
        });
    }
});
exports.orderController = {
    createOrder,
    getRevenue,
};
