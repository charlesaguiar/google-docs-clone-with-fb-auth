import { createContext, useContext, useLayoutEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import useToggle from "../hooks/useToggle";

interface IUiContextProviderProps {
	children: React.ReactNode;
}

interface IUiContext {
	showSidebar: boolean;
	toggleSideBar: () => void;
}

const UiContext = createContext({} as IUiContext);

export const useUiContext = () => {
	const context = useContext(UiContext);
	return context;
};

const UiProvider: React.FC<IUiContextProviderProps> = ({ children }) => {
	const location = useLocation();
	const [showSidebar, toggleSideBar] = useToggle();

	useLayoutEffect(() => {
		toggleSideBar({ force: false });
	}, [location]);

	const value = useMemo(
		() => ({ showSidebar, toggleSideBar }),
		[showSidebar, toggleSideBar]
	);

	return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export default UiProvider;
