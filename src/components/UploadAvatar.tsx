import Avatar from "./Avatar";
import Input from "./Input";

interface IUploadAvatarProps {
	avatarUrl?: string | null;
	handleAvatarSubmit: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadAvatar({
	avatarUrl,
	handleAvatarSubmit,
}: IUploadAvatarProps) {
	return (
		<div className="relative flex items-center w-[120px] h-[120px] rounded-full border border-gray-300 p-4">
			<label
				className="absolute top-[50%] left-[50%] w-full h-full cursor-pointer -translate-x-[50%] -translate-y-[50%]"
				htmlFor="avatar-input"
			>
				<Avatar avatarUrl={avatarUrl} />
			</label>
			<Input
				id="avatar-input"
				className="hidden"
				type="file"
				onChange={handleAvatarSubmit}
				accept="image/png, image/jpeg"
				rootClassname="invisible"
			/>
		</div>
	);
}
