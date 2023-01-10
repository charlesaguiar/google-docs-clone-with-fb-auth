import { createContext, useContext, useState } from 'react'
import { useQueryClient } from 'react-query'

import useOnAuthStateChange from 'hooks/firebase/useOnAuthStateChange'

import { UserType } from 'schemas/user'
import * as AuthService from 'services/firebase/AuthService'

type FirebaseLoginAction = (email: string, password: string) => Promise<void>

type FirebaseSignupAction = (name: string, email: string, password: string) => Promise<void>

interface IAuthContext {
	user?: UserType
	loading: boolean
	isAuthenticated: boolean
	signup: FirebaseSignupAction
	login: FirebaseLoginAction
	logout: () => Promise<void>
	resetPassword: (email: string) => Promise<void>
	updateProfile: (newUser: UserType) => Promise<void>
	updatePassword: (newPassword: string) => Promise<void>
	getLoggedUserId: () => string | null
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const AuthContext = createContext({} as IAuthContext)

export const useAuthContext = (): IAuthContext => {
	return useContext(AuthContext)
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<UserType | undefined>()
	const [loading, setLoading] = useState(true)

	const queryClient = useQueryClient()

	const signup = async (name: string, email: string, password: string): Promise<void> => {
		await AuthService.signup(name, email, password)
	}

	const login = async (email: string, password: string): Promise<void> => {
		await AuthService.login(email, password)
	}

	const logout = async (): Promise<void> => {
		queryClient.clear()
		await AuthService.logout()
	}

	const resetPassword = async (email: string): Promise<void> => {
		await AuthService.resetPassword(email)
	}

	const updateProfile = async (newUser: UserType): Promise<void> => {
		if (!user) return
		await AuthService.updateUserProfile(newUser)
		setUser({ ...user, ...newUser })
	}

	const updatePassword = async (newPassword: string): Promise<void> => {
		await AuthService.updatePassword(newPassword)
	}

	const updateUser = async (): Promise<void> => {
		setUser(await AuthService.getLoggedUser())
		setLoading(false)
	}

	useOnAuthStateChange(async () => {
		await updateUser()
	})

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: AuthService.isAuthenticated(),
				loading,
				login,
				logout,
				signup,
				resetPassword,
				updateProfile,
				updatePassword,
				getLoggedUserId: AuthService.loggedUserId,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
