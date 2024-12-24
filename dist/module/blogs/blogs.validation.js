"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const blogsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            invalid_type_error: "Name must be string",
            required_error: "Name is required",
        }),
        content: zod_1.z.string({
            invalid_type_error: "Content must be string",
            required_error: "Content is required",
        }),
        isPublished: zod_1.z.boolean().optional(),
    }),
});
const updateBlogsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            invalid_type_error: "Name must be string",
        })
            .optional(),
        content: zod_1.z
            .string({
            invalid_type_error: "Content must be string",
        })
            .optional(),
        isPublished: zod_1.z.boolean().optional(),
    }),
});
exports.BlogValidation = {
    blogsValidationSchema,
    updateBlogsValidationSchema,
};
