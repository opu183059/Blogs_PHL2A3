"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const handleZodError_1 = require("../error/handleZodError");
const handleCastError_1 = require("../error/handleCastError");
const handleValidationError_1 = require("../error/handleValidationError");
const handlerDuplicateError_1 = require("../error/handlerDuplicateError");
const handleGenericError_1 = require("../error/handleGenericError");
const globalErrorHandler = (err, req, res, _next) => {
    if (err.name && err.name === "ZodError") {
        (0, handleZodError_1.handlerZodError)(err, res);
    }
    else if (err instanceof mongoose_1.default.Error.CastError) {
        (0, handleCastError_1.handleCastError)(err, res);
    }
    else if (err instanceof mongoose_1.default.Error.ValidationError) {
        (0, handleValidationError_1.handleValidationError)(err, res);
    }
    else if (err.code && err.code === 11000) {
        (0, handlerDuplicateError_1.handlerDuplicateError)(err, res);
    }
    else if (err instanceof Error) {
        (0, handleGenericError_1.handleGenericError)(err, res);
    }
};
exports.globalErrorHandler = globalErrorHandler;
