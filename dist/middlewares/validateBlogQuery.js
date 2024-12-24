"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = void 0;
const validateQuery = (req, res, next) => {
    req.query = req.query || {};
    next();
};
exports.validateQuery = validateQuery;
