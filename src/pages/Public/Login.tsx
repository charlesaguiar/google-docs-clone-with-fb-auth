import { Link } from 'react-router-dom'

import Divider from 'components/Divider'
import LoginForm from 'components/Forms/Login'

const Login: React.FC = () => {
	return (
		<div className='flex flex-col min-w-[300px] p-4 md:min-w-[500px]'>
			<h1 className='text-4xl font-bold self-center mb-10'>Welcome</h1>
			<LoginForm />
			<Link to='/pb/forgot-password' className='text-sm self-end underline text-blue-500 mt-1'>
				Forgot password?
			</Link>
			<Divider />
			<span className='text-sm'>
				Doesnt have an account? Click{' '}
				<Link to='/pb/signup' className='underline text-blue-500'>
					here
				</Link>{' '}
				to signup.
			</span>
		</div>
	)
}

export default Login
