import { useCallback, useState } from "react";

interface IToggleCallbackProps {
	force?: boolean;
}

const useToggle = (): [boolean, (params?: IToggleCallbackProps) => void] => {
	const [value, setValue] = useState(false);

	const toggle = useCallback((params?: IToggleCallbackProps) => {
		if (params?.force !== undefined) {
			setValue(params.force);
			return;
		}

		setValue((value) => !value);
	}, []);

	return [value, toggle];
};

export default useToggle;
