"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const http_status_1 = __importDefault(require("http-status"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send({
        status: true,
        message: "Blog Server is Live ⚡",
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use((req, res) => {
    res.status(404).json({
        status: http_status_1.default.INTERNAL_SERVER_ERROR,
        message: "Route not found !!",
    });
});
exports.default = app;
