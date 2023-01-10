import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthContext } from 'contexts/AuthContext'
import { displayToast } from 'utils/toast'
import { AuthError, parseFirebaseErrorMessage } from 'lib/firebase'

import Button from 'components/Button'
import { ForgotPasswordFormSchema, ForgotPasswordFormSchemaType } from './schema'
import Input from 'components/Input'

const ForgotPasswordForm: React.FC = () => {
	const { resetPassword } = useAuthContext()
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordFormSchemaType>({
		resolver: zodResolver(ForgotPasswordFormSchema),
	})

	const onSubmit: SubmitHandler<ForgotPasswordFormSchemaType> = async (data): Promise<void> => {
		setLoading(true)
		try {
			await resetPassword(data.email)
			displayToast('All set! Check you e-mail for further instructions.', {
				type: 'success',
			})
		} catch (e) {
			displayToast(parseFirebaseErrorMessage(e as AuthError), {
				type: 'error',
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
			<Input
				id='email'
				label='Email'
				type='email'
				error={errors.email?.message}
				placeholder='Your e-mail'
				autoFocus
				{...register('email')}
			/>
			<Button type='submit' disabled={loading} isLoading={loading}>
				Reset password
			</Button>
		</form>
	)
}

export default ForgotPasswordForm
