import { useCallback, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { SubmitHandler } from "react-hook-form";

import { UserType } from "schemas/user";
import { AuthError, parseFirebaseErrorMessage, storage } from "lib/firebase";
import { useAuthContext } from "contexts/AuthContext";
import { displayToast } from "utils/toast";

import { ProfileFormSchemaType } from "./schema";
import { useQueryClient } from "react-query";

type UseUpdateUserProfileOutput = [
	isUpdating: boolean,
	onUpdateSubmit: SubmitHandler<ProfileFormSchemaType>
];

const useUpdateUserProfile = (
	currentUser: UserType | undefined,
	avatar: File | undefined
): UseUpdateUserProfileOutput => {
	const [isUpdating, setIsUpdating] = useState(false);
	const { updateProfile, updatePassword } = useAuthContext();
	const queryClient = useQueryClient();

	const onUpdateSubmit: SubmitHandler<ProfileFormSchemaType> = useCallback(
		async ({ name, password }) => {
			if (!currentUser) return;
			setIsUpdating(true);
			let promises: Promise<void | string>[] = [];

			if (password) {
				promises = [...promises, updatePassword(password)];
			}

			let url = currentUser.avatarUrl;
			if (avatar) {
				const storageRef = ref(storage, `files/${avatar.name}`);
				const uploadSnapshot = await uploadBytes(storageRef, avatar);
				url = await getDownloadURL(uploadSnapshot.ref);
				promises = [
					...promises,
					updateProfile({ ...currentUser, name, avatarUrl: url }),
				];
			}

			if (url === currentUser.avatarUrl && name !== currentUser.name) {
				promises = [
					...promises,
					updateProfile({ ...currentUser, name, avatarUrl: url }),
				];
			}

			try {
				await Promise.all(promises);
				queryClient.refetchQueries(["logged-user"]);
				displayToast("Profile successfully updated!", {
					type: "success",
				});
			} catch (e) {
				displayToast(parseFirebaseErrorMessage(e as AuthError), {
					type: "error",
				});
			} finally {
				setIsUpdating(false);
			}
		},
		[currentUser, avatar]
	);

	return [isUpdating, onUpdateSubmit];
};

export default useUpdateUserProfile;
