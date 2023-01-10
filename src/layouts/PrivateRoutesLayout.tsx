import { Outlet } from 'react-router-dom'

import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'

const PrivateRoutesLayout: React.FC = () => {
	return (
		<div className='flex flex-col h-full'>
			<Navbar />
			<div className='flex'>
				<Sidebar />
				<main className='ml-0 md:ml-[theme(width.sidebar)] px-8 py-6 grow'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default PrivateRoutesLayout
