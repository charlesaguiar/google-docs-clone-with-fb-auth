import { Link } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'

import ForgotPasswordForm from 'components/Forms/ForgotPassword'

const ForgotPassword: React.FC = () => {
	return (
		<div className='flex flex-col min-w-[300px] p-4 md:min-w-[500px]'>
			<h1 className='text-4xl font-bold self-center mb-10'>Recover your password</h1>
			<ForgotPasswordForm />
			<div className='w-100 h-[1px] bg-gray-300 my-4' />
			<div className='flex gap-3 items-center text-sm'>
				<MdArrowBack />
				<Link to='/pb/login' className='underline text-blue-500'>
					Back to login page
				</Link>{' '}
			</div>
		</div>
	)
}

export default ForgotPassword
