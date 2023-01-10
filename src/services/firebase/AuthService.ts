import { auth } from 'lib/firebase'
import { UserType } from 'schemas/user'
import * as UserService from './UserService'

export const isAuthenticated = (): boolean => Boolean(auth.currentUser)

export const loggedUserId = (): string | null => localStorage.getItem('docs:userId')

export const getLoggedUser = async (): Promise<UserType | undefined> => {
	const loggedUser = auth.currentUser
	if (!loggedUser?.uid) return

	return await UserService.getUserByAuthId(loggedUser.uid)
}

export const signup = async (name: string, email: string, password: string): Promise<void> => {
	const { user } = await auth.createUserWithEmailAndPassword(email, password)

	if (!user?.uid) return

	await UserService.createNewUser(user?.uid, name, email)
}

export const login = async (email: string, password: string): Promise<void> => {
	await auth.signInWithEmailAndPassword(email, password)
	if (!auth.currentUser) return

	const loggedUser = await UserService.getUserByAuthId(auth.currentUser.uid)
	localStorage.setItem('docs:userId', loggedUser?.id ?? '')
}

export const logout = async (): Promise<void> => {
	localStorage.removeItem('docs:userId')
	await auth.signOut()
}

export const resetPassword = async (email: string): Promise<void> => {
	await auth.sendPasswordResetEmail(email)
}

export const updatePassword = async (newPassword: string): Promise<void> => {
	if (!auth.currentUser) return
	await auth.currentUser.updatePassword(newPassword)
}

export const updateUserProfile = async (user: UserType): Promise<void> => {
	if (!auth.currentUser) return
	await Promise.all([
		auth.currentUser.updateProfile({
			displayName: user.name,
			photoURL: user.avatarUrl,
		}),
		UserService.updateUser(user),
	])
}
