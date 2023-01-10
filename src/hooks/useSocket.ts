import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export type EventsMap = Record<string, any>

const useSocket = <IListenEvents extends EventsMap, IEmitEvents extends EventsMap>():
	| Socket<IListenEvents, IEmitEvents>
	| undefined => {
	const [socket, setSocket] = useState<Socket<IListenEvents, IEmitEvents> | undefined>()

	useEffect(() => {
		const s = io(import.meta.env.VITE_SOCKET_URL)
		setSocket(s)
		return () => {
			s.disconnect()
		}
	}, [])

	return socket
}

export default useSocket
