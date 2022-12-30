import UpdateProfileForm from "components/Forms/UpdateProfile";

const UpdateProfile: React.FC = () => {
	return (
		<div className="flex flex-col max-w-[300px] p-4 md:max-w-[500px] mx-auto">
			<h1 className="text-4xl font-bold self-center mb-10">Update Profile</h1>
			<UpdateProfileForm />
		</div>
	);
};

export default UpdateProfile;
