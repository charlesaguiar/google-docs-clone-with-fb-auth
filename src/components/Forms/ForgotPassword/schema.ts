import z from 'zod'

export const ForgotPasswordFormSchema = z.object({
	email: z.string().min(1, { message: 'Email is required' }).email('Must be a valid email'),
})

export type ForgotPasswordFormSchemaType = z.infer<typeof ForgotPasswordFormSchema>
