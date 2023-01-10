import { useEffect } from 'react'
import { auth, FirebaseUser } from 'lib/firebase'

const useOnAuthStateChange = (
	callback: (user?: FirebaseUser | null) => void | Promise<void>,
): void => {
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			await callback(user)
		})

		return unsubscribe
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}

export default useOnAuthStateChange
