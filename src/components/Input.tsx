import React, { forwardRef } from "react";
import { MdErrorOutline } from "react-icons/md";

interface IInputProps extends React.ComponentPropsWithoutRef<"input"> {
	label?: string;
	error?: string;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
	({ id, label, className, error, ...rest }, ref) => {
		return (
			<div className="flex flex-col">
				{label ? (
					<label className="text-sm text-inherit mb-2" htmlFor={id}>
						{label}
					</label>
				) : null}
				<input
					{...rest}
					id={id}
					ref={ref}
					className={`p-4 border border-gray-400 border-solid rounded ${className}`}
				/>
				{error ? (
					<div className="flex gap-2 mt-1 items-center text-red-500">
						<MdErrorOutline size={16} />
						<span className="text-sm ">{error}</span>
					</div>
				) : null}
			</div>
		);
	}
);

export default Input;
