import React from 'react'
import { Link, useMatch } from 'react-router-dom'

interface IMenuItemProps {
	label: string
	to: string
	activeClassnames?: string
	Icon: React.ReactNode
}

const MenuItem: React.FC<IMenuItemProps> = ({ label, to, Icon }) => {
	const match = useMatch(to)
	return (
		<li>
			<Link
				to={to}
				className={`${
					match ? 'text-blue-500' : ''
				} flex gap-4 p-2 cursor-pointer rounded-lg items-center hover:bg-blue-50 hover:border hover:border-blue-500 hover:text-blue-500`}
			>
				{Icon}
				<span>{label}</span>
			</Link>
		</li>
	)
}

export default MenuItem
