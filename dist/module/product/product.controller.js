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
exports.productController = void 0;
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield product_service_1.productService.createProduct(payload);
        res.json({
            message: "Product created successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.json({
            message: "Product Creation failed",
            success: false,
            error,
        });
    }
});
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.params.query;
        const query = searchTerm
            ? {
                $or: [
                    { name: { $regex: searchTerm, $options: "i" } },
                    { brand: { $regex: searchTerm, $options: "i" } },
                    { category: { $regex: searchTerm, $options: "i" } },
                ],
            }
            : {};
        const result = yield product_service_1.productService.getProduct(query);
        res.json({
            message: "Products retrieved successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.json({
            message: "Cannot find the products, try again",
            status: false,
            error,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.productService.getSingleProduct(productId);
        res.json({
            message: "Products retrieved successfully",
            status: true,
            data: result,
        });
    }
    catch (error) {
        res.json({
            message: "Cannot find the products, try again",
            status: false,
            error,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const body = req.body;
        const result = yield product_service_1.productService.updateProduct(productId, body);
        res.send({
            status: true,
            message: "Product updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: "Error in updating",
            error,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.productService.deleteProduct(productId);
        res.send({
            status: true,
            message: "Product deleted successfully",
            data: {},
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: "Error in deleting the product",
            error,
        });
    }
});
exports.productController = {
    createProduct,
    getProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
