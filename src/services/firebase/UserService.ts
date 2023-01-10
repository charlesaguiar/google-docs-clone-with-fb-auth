import { equalTo, get, orderByChild, push, query, ref, set } from 'firebase/database'
import { database } from 'lib/firebase'
import { UserSchema, UserType } from 'schemas/user'

const usersRef = ref(database, 'users/')

export const getUserByAuthId = async (authId: string): Promise<UserType | undefined> => {
	const constraints = [orderByChild('authId'), equalTo(authId)]
	const snapshot = await get(query(usersRef, ...constraints))

	if (!snapshot.exists()) return

	const val = snapshot.val()

	return UserSchema.parse(
		Object.keys(val).map((id) => ({
			id,
			...val[id],
		}))[0],
	)
}

export const createNewUser = async (authId: string, name: string, email: string): Promise<void> => {
	await push(usersRef, { authId, name, email })
}

export const updateUser = async (user: UserType): Promise<void> => {
	if (!user.id) return
	const userRef = ref(database, `users/${user.id}`)
	await set(userRef, {
		authId: user.authId,
		name: user.name,
		email: user.email,
		avatarUrl: user.avatarUrl ?? null,
	})
}
