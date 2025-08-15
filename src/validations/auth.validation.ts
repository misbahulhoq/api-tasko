import z from "zod";

const signup = z.object({
  name: z
    .string("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  email: z
    .string("Email is required")
    .min(6, "Email must be at least 6 characters long"),
  password: z.string("Password is required.").min(6, "Password is too short."),
});

export const AuthValidatorSchemas = { signup };
export default AuthValidatorSchemas;
