import { z } from "zod";

const blogsValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: "Name must be string",
      required_error: "Name is required",
    }),
    content: z.string({
      invalid_type_error: "Content must be string",
      required_error: "Content is required",
    }),
    author: z.string({
      invalid_type_error: "Author ID must be string",
      required_error: "Author ID is required",
    }),
    isPublished: z.boolean().optional(),
  }),
});

export const BlogValidation = {
  blogsValidationSchema,
};
