import { useCallback, useEffect } from "react";
import { auth, FirebaseUser } from "lib/firebase";

const useOnAuthStateChange = (
	callback: (user?: FirebaseUser | null) => void
) => {
	const memoizedCallback = useCallback(callback, []);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			memoizedCallback(user);
		});

		return unsubscribe;
	}, [memoizedCallback]);
};

export default useOnAuthStateChange;
