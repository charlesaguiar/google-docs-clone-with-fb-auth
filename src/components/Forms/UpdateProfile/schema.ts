import z from "zod";

export const ProfileFormSchema = z
	.object({
		name: z.string().min(1, { message: "Name is required" }),
		password: z.string().optional(),
		passwordConfirmation: z.string().optional(),
	})
	.refine(({ password }) => (password ? password.length > 6 : true), {
		path: ["password"],
		message: "Password must have at least 6 characters",
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		path: ["passwordConfirmation"],
		message: "Passwords must match",
	});

export type ProfileFormSchemaType = z.infer<typeof ProfileFormSchema>;
