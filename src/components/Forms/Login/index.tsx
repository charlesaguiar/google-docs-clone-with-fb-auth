import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthContext } from "contexts/AuthContext";
import { AuthError, parseFirebaseErrorMessage } from "lib/firebase";
import { displayToast } from "utils/toast";

import Button from "components/Button";
import Input from "components/Input";
import PasswordInput from "components/PasswordInput";

import { LoginFormSchemaType, LoginFormSchema } from "./schema";

const LoginForm: React.FC = () => {
	const { login } = useAuthContext();

	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormSchemaType>({
		resolver: zodResolver(LoginFormSchema),
	});

	const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data) => {
		setLoading(true);
		try {
			await login(data.email, data.password);
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
				id="email"
				label="Email"
				type="email"
				error={errors.email?.message}
				placeholder="Your e-mail"
				autoFocus
				{...register("email")}
			/>
			<PasswordInput
				id="password"
				label="Password"
				type="password"
				error={errors.password?.message}
				placeholder="Your password"
				defaultValue="Charles123"
				{...register("password")}
			/>

			<Button type="submit" disabled={loading} isLoading={loading}>
				Login
			</Button>
		</form>
	);
};

export default LoginForm;
