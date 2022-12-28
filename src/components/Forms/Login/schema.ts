import z from "zod";

export const LoginFormSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email("Must be a valid email"),
	password: z.string().min(6, { message: "Password is required" }),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
