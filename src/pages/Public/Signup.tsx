import { Link } from "react-router-dom";

import Divider from "components/Divider";
import SignupForm from "components/Forms/Signup";

const Signup: React.FC = () => {
	return (
		<div className="flex flex-col min-w-[300px] p-4 md:min-w-[500px]">
			<h1 className="text-4xl font-bold self-center mb-10">Signup</h1>
			<SignupForm />
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
