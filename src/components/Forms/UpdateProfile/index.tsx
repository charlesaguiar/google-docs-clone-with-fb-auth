import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthContext } from "contexts/AuthContext";
import useFileReader from "hooks/useFileReader";

import Button from "components/Button";
import Divider from "components/Divider";
import Input from "components/Input";
import Loading from "components/Loading";
import PasswordInput from "components/PasswordInput";
import UploadAvatar from "components/UploadAvatar";

import { ProfileFormSchema, ProfileFormSchemaType } from "./schema";
import useUpdateUserProfile from "./useUpdateUserProfile";

const UpdateProfileForm: React.FC = () => {
	const navigate = useNavigate();
	const { user: loggedUser, loading } = useAuthContext();

	const [avatar, avatarUrl, handleAvatarSubmit] = useFileReader(
		loggedUser?.avatarUrl
	);
	const [isUpdating, onUpdateSubmit] = useUpdateUserProfile(loggedUser, avatar);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfileFormSchemaType>({
		resolver: zodResolver(ProfileFormSchema),
	});

	if (loading || !loggedUser) return <Loading inline={false} />;

	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={handleSubmit(onUpdateSubmit)}
		>
			<div className="flex flex-col gap-8 items-center md:flex-row">
				<UploadAvatar
					avatarUrl={avatarUrl}
					handleAvatarSubmit={handleAvatarSubmit}
				/>
				<div className="flex-1 w-100">
					<Input
						id="name"
						label="Display Name"
						type="text"
						defaultValue={loggedUser.name || ""}
						error={errors.name?.message}
						isRequired
						{...register("name")}
					/>
				</div>
			</div>
			<Divider />
			<Input
				id="email"
				label="Email"
				type="email"
				defaultValue={loggedUser.email || ""}
				disabled
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
				<PasswordInput
					id="password"
					label="Password"
					placeholder="Leave blank to keep"
					error={errors.password?.message}
					{...register("password")}
				/>
				<PasswordInput
					id="password-conf"
					label="Password Confirmation"
					placeholder="Leave blank to keep"
					error={errors.passwordConfirmation?.message}
					{...register("passwordConfirmation")}
				/>
			</div>

			<div className="flex flex-col gap-4 lg:flex-row">
				<Button className="flex-1" type="submit" isLoading={isUpdating}>
					Update
				</Button>

				<Button type="submit" variant="secondary" onClick={() => navigate("/")}>
					Cancel
				</Button>
			</div>
		</form>
	);
};

export default UpdateProfileForm;
