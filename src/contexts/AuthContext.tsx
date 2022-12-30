import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { useQueryClient } from "react-query";

import useOnAuthStateChange from "hooks/firebase/useOnAuthStateChange";

import { UserType } from "schemas/user";
import * as AuthService from "services/firebase/AuthService";

type FirebaseLoginAction = (email: string, password: string) => Promise<void>;

type FirebaseSignupAction = (
	name: string,
	email: string,
	password: string
) => Promise<void>;

interface IAuthContext {
	user?: UserType;
	loggedUserId: string | null;
	loading: boolean;
	isAuthenticated: boolean;
	signup: FirebaseSignupAction;
	login: FirebaseLoginAction;
	logout: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
	updateProfile: (newUser: UserType) => Promise<void>;
	updatePassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext({} as IAuthContext);

export const useAuthContext = () => {
	return useContext(AuthContext);
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<UserType | undefined>();
	const [loading, setLoading] = useState(true);

	const queryClient = useQueryClient();

	const signup = (name: string, email: string, password: string) => {
		return AuthService.signup(name, email, password);
	};

	const login = (email: string, password: string) => {
		return AuthService.login(email, password);
	};

	const logout = async () => {
		queryClient.clear();
		await AuthService.logout();
	};

	const resetPassword = (email: string) => {
		return AuthService.resetPassword(email);
	};

	const updateProfile = async (newUser: UserType) => {
		if (!user) return Promise.resolve();
		await AuthService.updateUserProfile(newUser);
		setUser({ ...user, ...newUser });
	};

	const updatePassword = async (newPassword: string) => {
		return AuthService.updatePassword(newPassword);
	};

	const updateUser = useCallback(async () => {
		setUser(await AuthService.getLoggedUser());
	}, []);

	useOnAuthStateChange(() => {
		updateUser();
		setLoading(false);
	});

	const value = useMemo(
		() => ({
			user,
			loggedUserId: AuthService.loggedUserId(),
			isAuthenticated: AuthService.isAuthenticated(),
			loading,
			login,
			logout,
			signup,
			resetPassword,
			updateProfile,
			updatePassword,
		}),
		[
			user,
			loading,
			login,
			logout,
			signup,
			resetPassword,
			updateProfile,
			updatePassword,
		]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
