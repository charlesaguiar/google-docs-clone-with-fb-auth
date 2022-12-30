import z from "zod";

export const SignupFormSchema = z
	.object({
		name: z.string().min(1, { message: "Name is required" }),
		email: z
			.string()
			.min(1, { message: "Email is required" })
			.email("Must be a valid email"),
		password: z
			.string()
			.min(6, { message: "Password must have at least 6 characters" }),
		passwordConfirmation: z.string(),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		path: ["passwordConfirmation"],
		message: "Passwords must match",
	});

export type SignupFormSchemaType = z.infer<typeof SignupFormSchema>;
