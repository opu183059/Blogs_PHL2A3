"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerDuplicateError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handlerDuplicateError = (err, res) => {
    res.status(http_status_1.default.CONFLICT).json({
        status: false,
        message: err.message,
        statusCode: http_status_1.default.CONFLICT,
        error: err,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    });
};
exports.handlerDuplicateError = handlerDuplicateError;
