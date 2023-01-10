import { FaUser } from 'react-icons/fa'

interface IAvatarProps {
	avatarUrl?: string | null
	placeholderSize?: number
}

const Avatar: React.FC<IAvatarProps> = ({ avatarUrl, placeholderSize = 28 }) => {
	return avatarUrl ? (
		<img
			className='border shadow-lg border-gray-300 w-full h-full rounded-full object-cover object-center'
			src={avatarUrl}
		/>
	) : (
		<div className='p-1 rounded-full border border-gray-300'>
			<FaUser className='w-full h-full rounded-full' size={placeholderSize} />
		</div>
	)
}

export default Avatar
