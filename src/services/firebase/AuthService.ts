import { auth } from "lib/firebase";
import { UserType } from "schemas/user";
import * as UserService from "./UserService";

export const isAuthenticated = () => Boolean(auth.currentUser);

export const loggedUserId = () => localStorage.getItem("docs:userId");

export const getLoggedUser = async (): Promise<UserType | undefined> => {
	const loggedUser = auth.currentUser;
	if (!loggedUser?.uid) return;

	return UserService.getUserByAuthId(loggedUser.uid);
};

export const signup = async (name: string, email: string, password: string) => {
	const { user } = await auth.createUserWithEmailAndPassword(email, password);

	if (!user?.uid) return;

	return UserService.createNewUser(user?.uid, name, email);
};

export const login = async (email: string, password: string) => {
	await auth.signInWithEmailAndPassword(email, password);
	if (!auth.currentUser) return;

	const loggedUser = await UserService.getUserByAuthId(auth.currentUser.uid);
	localStorage.setItem("docs:userId", loggedUser?.id || "");
};

export const logout = () => {
	localStorage.removeItem("docs:userId");
	return auth.signOut();
};

export const resetPassword = (email: string) => {
	return auth.sendPasswordResetEmail(email);
};

export const updatePassword = async (newPassword: string) => {
	if (!auth.currentUser) return Promise.resolve();
	return auth.currentUser.updatePassword(newPassword);
};

export const updateUserProfile = async (user: UserType) => {
	if (!auth.currentUser) return Promise.resolve();
	await Promise.all([
		auth.currentUser.updateProfile({
			displayName: user.name,
			photoURL: user.avatarUrl,
		}),
		UserService.updateUser(user),
	]);
};
