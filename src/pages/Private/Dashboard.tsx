import { useAuthContext } from 'contexts/AuthContext'

import Loading from 'components/Loading'
import PageHeader from 'components/PageHeader'

const Dashboard: React.FC = () => {
	const { user } = useAuthContext()

	return (
		<div>
			<PageHeader title='Home' />
			{user ? (
				<div className='flex flex-col'>
					<div className='flex flex-col gap-1'>
						<span>{`Welcome, ${user?.name ?? 'user'}`}</span>
						<span className='text-sm text-gray-300'>{user?.email}</span>
					</div>
				</div>
			) : (
				<Loading inline={false} />
			)}
		</div>
	)
}

export default Dashboard
