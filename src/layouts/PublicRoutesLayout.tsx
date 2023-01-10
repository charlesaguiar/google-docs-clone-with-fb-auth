import { Outlet } from 'react-router-dom'

const PublicRoutesLayout: React.FC = () => {
	return (
		<div className='flex items-center justify-center container max-w-[1280px] mx-auto h-screen'>
			<Outlet />
		</div>
	)
}

export default PublicRoutesLayout
