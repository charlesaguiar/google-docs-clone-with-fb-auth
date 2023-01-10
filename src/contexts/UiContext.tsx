import { createContext, useContext, useLayoutEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import useToggle from 'hooks/useToggle'

interface IUiContextProviderProps {
	children: React.ReactNode
}

interface IUiContext {
	showSidebar: boolean
	toggleSideBar: (params?: { force?: boolean }) => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const UiContext = createContext({} as IUiContext)

export const useUiContext = (): IUiContext => {
	const context = useContext(UiContext)
	return context
}

const UiProvider: React.FC<IUiContextProviderProps> = ({ children }) => {
	const location = useLocation()
	const [showSidebar, toggleSideBar] = useToggle()

	useLayoutEffect(() => {
		toggleSideBar({ force: false })
	}, [location, toggleSideBar])

	const value = useMemo(() => ({ showSidebar, toggleSideBar }), [showSidebar, toggleSideBar])

	return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

export default UiProvider
