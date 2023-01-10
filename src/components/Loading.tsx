import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

interface ILoadingProps {
	size?: number
	inline?: boolean
}

const Loading: React.FC<ILoadingProps> = ({ size = 50, inline = true }) => {
	return (
		<div className={`flex items-center justify-center ${inline ? 'h-screen' : ''}`}>
			<ClipLoader size={size} />
		</div>
	)
}

export default Loading
