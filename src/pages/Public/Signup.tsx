import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";
import { AuthError, parseFirebaseErrorMessage } from "../../lib/firebase";
import { displayToast } from "../../utils/toast";

import Divider from "../../components/Divider";
import Button from "../../components/Button";

const Signup: React.FC = () => {
	const { signup } = useAuthContext();

	const [loading, setLoading] = useState(false);

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordConfirmationRef = useRef<HTMLInputElement>(null);

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		if (passwordRef.current?.value !== passwordConfirmationRef.current?.value) {
			displayToast("Password must match", { type: "error" });
			return;
		}

		setLoading(true);
		try {
			if (emailRef.current?.value && passwordRef.current?.value) {
				await signup(emailRef.current?.value, passwordRef.current?.value);
			}
		} catch (e) {
			displayToast(parseFirebaseErrorMessage(e as AuthError), {
				type: "error",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col min-w-[300px] p-4 md:min-w-[500px]">
			<h1 className="text-4xl font-bold self-center mb-10">Signup</h1>

			<form className="flex flex-col gap-4" onSubmit={onSubmit}>
				<div className="flex flex-col">
					<label htmlFor="email">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						ref={emailRef}
						className="p-4 border border-gray-300 border-solid rounded"
					/>
				</div>

				<div className="flex flex-col">
					<label htmlFor="password">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						ref={passwordRef}
						className="p-4 border border-gray-300 border-solid rounded"
					/>
				</div>

				<div className="flex flex-col">
					<label htmlFor="conf-password">Confirm password</label>
					<input
						id="conf-password"
						name="conf-password"
						type="password"
						ref={passwordConfirmationRef}
						className="p-4 border border-gray-300 border-solid rounded"
					/>
				</div>

				<Button type="submit" disabled={loading} isLoading={loading}>
					Signup
				</Button>
			</form>

			<Divider />

			<span className="text-sm">
				Already have an account? Click{" "}
				<Link to="/pb/login" className="underline text-blue-500">
					here
				</Link>{" "}
				to login.
			</span>
		</div>
	);
};

export default Signup;
