import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Name must be string",
      required_error: "Name is required",
    }),
    email: z.string(),
    password: z
      .string({ invalid_type_error: "Password must be string" })
      .max(20, { message: "Password can not be more than 20 characters" }),
    role: z.enum(["admin", "user"], { message: "Invalid role" }),
    isBlocked: z.boolean().optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
