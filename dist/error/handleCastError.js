"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleCastError = (err, res) => {
    res.status(http_status_1.default.BAD_REQUEST).json({
        success: false,
        message: err.message,
        statusCode: http_status_1.default.BAD_REQUEST,
        error: err,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    });
};
exports.handleCastError = handleCastError;
