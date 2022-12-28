import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthContext } from "contexts/AuthContext";
import { AuthError, parseFirebaseErrorMessage } from "lib/firebase";
import { displayToast } from "utils/toast";

import Input from "components/Input";
import PasswordInput from "components/PasswordInput";
import Button from "components/Button";

import { SignupFormSchema, SignupFormSchemaType } from "./schema";

const SignupForm: React.FC = () => {
	const { signup } = useAuthContext();
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupFormSchemaType>({
		resolver: zodResolver(SignupFormSchema),
	});

	const onSubmit: SubmitHandler<SignupFormSchemaType> = async (data) => {
		setLoading(true);

		try {
			await signup(data.email, data.password);
		} catch (e) {
			displayToast(parseFirebaseErrorMessage(e as AuthError), {
				type: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
			<Input
				id="name"
				label="Name"
				type="name"
				autoFocus
				isRequired
				error={errors.name?.message}
				{...register("name")}
			/>
			<Input
				id="email"
				label="Email"
				type="email"
				isRequired
				error={errors.email?.message}
				{...register("email")}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
				<PasswordInput
					id="password"
					label="Password"
					isRequired
					error={errors.password?.message}
					{...register("password")}
				/>
				<PasswordInput
					id="conf-password"
					label="Confirm password"
					isRequired
					error={errors.passwordConfirmation?.message}
					{...register("passwordConfirmation")}
				/>
			</div>

			<Button type="submit" disabled={loading} isLoading={loading}>
				Signup
			</Button>
		</form>
	);
};

export default SignupForm;
