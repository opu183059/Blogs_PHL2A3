"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGenericError = void 0;
const handleGenericError = (err, res) => {
    res.status(err === null || err === void 0 ? void 0 : err.statusCode).json({
        success: false,
        message: err.message,
        statusCode: err === null || err === void 0 ? void 0 : err.statusCode,
        error: err,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    });
};
exports.handleGenericError = handleGenericError;
