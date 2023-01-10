import React, { forwardRef, useMemo } from 'react'
import { MdErrorOutline } from 'react-icons/md'

export interface IInputProps extends React.ComponentPropsWithoutRef<'input'> {
	label?: string
	isRequired?: boolean
	startIcon?: React.ReactNode
	endIcon?: React.ReactNode
	error?: string
	rootClassname?: string
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
	(
		{ id, label, isRequired, startIcon, endIcon, className, rootClassname = '', error, ...rest },
		ref,
	) => {
		const errorClasses = useMemo(() => {
			return error ? 'border-red-500' : ''
		}, [error])

		const disabledClasses = useMemo(() => {
			return rest.disabled ? 'bg-gray-100 text-gray-400' : ''
		}, [rest.disabled])

		return (
			<div className='flex flex-col'>
				<Label id={id} label={label} isRequired={isRequired} />
				<div
					className={`flex items-center py-2 px-4 gap-2 rounded bg-white border border-solid border-gray-400 focus-within:border-blue-500 focus-within:border-2 ${errorClasses} ${disabledClasses} ${rootClassname}`}
				>
					{startIcon ?? null}
					<input
						{...rest}
						id={id}
						ref={ref}
						className={`bg-transparent w-full focus-within:outline-none ${className ?? ''}`}
					/>
					{endIcon ?? null}
				</div>
				<Error error={error} />
			</div>
		)
	},
)

const Label: React.FC<Pick<IInputProps, 'id' | 'label' | 'isRequired'>> = ({
	id,
	label,
	isRequired,
}) => {
	if (!label) return null

	return (
		<div className='flex gap-1'>
			<label className='text-sm text-inherit' htmlFor={id}>
				{label}
			</label>
			{isRequired ? <span className='text-xs text-red-500 font-bold'>*</span> : null}
		</div>
	)
}

const Error: React.FC<Pick<IInputProps, 'error'>> = ({ error }) => {
	if (!error) return null

	return (
		<div className='flex gap-1 mt-1 items-center text-red-500'>
			<MdErrorOutline size={12} />
			<span className='text-xs'>{error}</span>
		</div>
	)
}

Input.displayName = 'Input'

export default Input
