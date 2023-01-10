import { RefObject, useCallback, useEffect } from 'react'

type Handler = (event: MouseEvent | TouchEvent) => void

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: Handler,
): void => {
	const memoizedHandler = useCallback(handler, [handler])
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent): void => {
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return
			}

			memoizedHandler(event)
		}

		document.addEventListener('mousedown', listener)

		return () => {
			document.removeEventListener('mousedown', listener)
		}
	}, [ref, memoizedHandler])
}

export default useOnClickOutside
