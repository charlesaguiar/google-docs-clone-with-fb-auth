import Quill, { TextChangeHandler } from "quill";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import useQuill from "./useQuill";
import useSocket from "./useSocket";

interface IUseQuillSocketCommOutput {
	quill: Quill | undefined;
	quillEditorRef: (wrapper: HTMLDivElement) => void;
}

interface ISocketEmitEventMap {
	"save-document": (delta: any) => any;
	"send-changes": (delta: any) => any;
	"get-document": (
		documentId: string,
		ownerId: string,
		documentName: string
	) => any;
}

interface ISocketListenEventMap {
	"receive-changes": (delta: any) => void;
	"load-document": (document: any) => void;
}

const SAVE_INTERVAL_MS = 5000;

const useQuillSocketComm = (): IUseQuillSocketCommOutput => {
	const { id: documentId } = useParams();
	const socket = useSocket<ISocketListenEventMap, ISocketEmitEventMap>();
	const { quill, quillEditorRef } = useQuill();
	const { user } = useAuthContext();

	/* SAVES CHANGES TO DOCUMENT EVERY 5 SECONDS */
	useEffect(() => {
		if (!quill || !socket) return;

		const interval = setInterval(() => {
			socket.emit("save-document", quill.getContents());
		}, SAVE_INTERVAL_MS);

		return () => {
			clearInterval(interval);
		};
	}, [socket, quill]);

	/* DETECTS QUILL EDITOR CHANGES AND SENDS TO SOCKET */
	useEffect(() => {
		if (!quill || !socket) return;

		const onQuillTextChange: TextChangeHandler = (delta, oldDelta, source) => {
			/* only tracks user changes */
			if (source !== "user") return;
			socket.emit("send-changes", delta);
		};

		quill.on("text-change", onQuillTextChange);

		return () => {
			quill.off("text-change", onQuillTextChange);
		};
	}, [quill, socket]);

	/* LISTEN TO RECEIVE-CHANGES EVENT */
	useEffect(() => {
		if (!quill || !socket) return;

		const onReceiveChanges = (delta: any) => {
			quill.updateContents(delta);
		};

		socket.on("receive-changes", onReceiveChanges);

		return () => {
			socket.off("receive-changes", onReceiveChanges);
		};
	}, [quill, socket]);

	/* LOAD DOCUMENT BASED ON DOCUMENT ID */
	useEffect(() => {
		if (!socket || !quill || !documentId || !user?.uid) return;

		socket.once("load-document", (document) => {
			quill.setContents(document);
			quill.enable();
		});

		socket.emit("get-document", documentId, user?.uid, "Test Document");
	}, [quill, socket, documentId, user?.uid]);

	return { quill, quillEditorRef };
};

export default useQuillSocketComm;
