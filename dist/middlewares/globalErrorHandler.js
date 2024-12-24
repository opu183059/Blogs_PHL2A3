"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const handlerZodError = (err, res) => {
    // const issues = err.issues.map((item: any) => {
    //   return {
    //     path: item.path.join(">"),
    //     message: item.message,
    //   };
    // });
    res.status(http_status_1.default.BAD_REQUEST).json({
        success: false,
        message: err.message,
        statusCode: http_status_1.default.BAD_REQUEST,
        error: err,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    });
};
const handleValidationError = (err, res) => {
    res.status(http_status_1.default.BAD_REQUEST).json({
        success: false,
        message: err.message,
        statusCode: http_status_1.default.BAD_REQUEST,
        error: err,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    });
};
const handleCastError = (err, res) => {
    res.status(http_status_1.default.BAD_REQUEST).json({
        success: false,
        message: err.message,
        statusCode: http_status_1.default.BAD_REQUEST,
        error: err,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    });
};
const handlerDuplicateError = (err, res) => {
    res.status(http_status_1.default.CONFLICT).json({
        status: false,
        message: err.message,
        statusCode: http_status_1.default.CONFLICT,
        error: err,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    });
};
const handleGenericError = (err, res) => {
    res.status(err === null || err === void 0 ? void 0 : err.statusCode).json({
        success: false,
        message: err.message,
        statusCode: err === null || err === void 0 ? void 0 : err.statusCode,
        error: err,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    });
};
const globalErrorHandler = (err, req, res, _next) => {
    if (err.name && err.name === "ZodError") {
        handlerZodError(err, res);
    }
    else if (err instanceof mongoose_1.default.Error.CastError) {
        handleCastError(err, res);
    }
    else if (err instanceof mongoose_1.default.Error.ValidationError) {
        handleValidationError(err, res);
    }
    else if (err.code && err.code === 11000) {
        handlerDuplicateError(err, res);
    }
    else if (err instanceof Error) {
        handleGenericError(err, res);
    }
};
exports.globalErrorHandler = globalErrorHandler;
