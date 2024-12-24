"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "Name must be string",
            required_error: "Name is required",
        }),
        email: zod_1.z.string().email({ message: "Invalid email" }),
        password: zod_1.z
            .string({ invalid_type_error: "Password must be string" })
            .max(20, { message: "Password can not be more than 20 characters" }),
        role: zod_1.z.enum(["admin", "user"]).optional(),
        isBlocked: zod_1.z.boolean().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.UserValidation = {
    userValidationSchema,
};
