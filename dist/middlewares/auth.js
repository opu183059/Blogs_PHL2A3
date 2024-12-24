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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../module/user/user.model");
const Auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // checking the token
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
        }
        // token verification
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_login_token_secret);
        const { userEmail, userRole } = decoded;
        // checking if the user is exist
        const user = yield user_model_1.User.findOne({ email: userEmail });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found.");
        }
        // check user is deleted
        const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
        if (isDeleted) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted.");
        }
        // checking user is blocked
        const userStatus = user === null || user === void 0 ? void 0 : user.isBlocked;
        if (userStatus === true) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked.");
        }
        // check user role based authorization
        if (requiredRoles && !requiredRoles.includes(userRole)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
        }
        // setting user in request
        req.user = decoded;
        next();
    }));
};
exports.default = Auth;
