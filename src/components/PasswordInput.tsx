import { forwardRef } from "react";
import { MdRemoveRedEye } from "react-icons/md";

import useToggle from "hooks/useToggle";

import Input, { IInputProps } from "./Input";

interface IPasswordInputProps extends IInputProps {}

const PasswordInput = forwardRef<HTMLInputElement, IPasswordInputProps>(
	({ endIcon, ...rest }, ref) => {
		const [passwordVisible, togglePasswordVisible] = useToggle();

		return (
			<Input
				type={passwordVisible ? "text" : "password"}
				ref={ref}
				endIcon={
					<MdRemoveRedEye
						onClick={() => togglePasswordVisible()}
						className="text-gray-500 hover:text-black cursor-pointer"
					/>
				}
				{...rest}
			/>
		);
	}
);

export default PasswordInput;
