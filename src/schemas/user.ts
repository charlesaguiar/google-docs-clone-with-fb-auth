import z from "zod";

export const UserSchema = z.object({
	id: z.string().optional().nullable(),
	authId: z.string().optional().nullable(),
	name: z.string().optional().nullable(),
	email: z.string().email().optional().nullable(),
	avatarUrl: z.string().optional().nullable(),
});

export type UserType = z.infer<typeof UserSchema>;
