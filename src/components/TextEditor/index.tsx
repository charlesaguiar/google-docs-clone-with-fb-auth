import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Quill, { TextChangeHandler } from "quill";

import "./TextEditor.css";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const SAVE_INTERVAL_MS = 5000;
const TOOLBAR_OPTIONS = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ font: [] }],
	[{ list: "ordered" }, { list: "bullet" }],
	["bold", "italic", "underline"],
	[{ color: [] }, { background: [] }],
	[{ script: "sub" }, { script: "super" }],
	[{ align: [] }],
	["image", "blockquote", "code-block"],
	["clean"],
];

export default function TextEditor() {
	const { id: documentId } = useParams();
	const [socket, setSocket] = useState<Socket | undefined>();
	const [quill, setQuill] = useState<Quill | undefined>();

	const { user } = useAuthContext();

	/* INITIALIZES QUILL */
	const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
		if (!wrapper) return;

		wrapper.innerHTML = "";
		const editor = document.createElement("div");
		wrapper.append(editor);
		const q = new Quill(editor, {
			theme: "snow",
			modules: { toolbar: TOOLBAR_OPTIONS },
		});
		q.disable();
		q.setText("Loading...");

		setQuill(q);
	}, []);

	/* INITILIZES SOCKET */
	useEffect(() => {
		const s = io("http://localhost:3001");
		setSocket(s);

		return () => {
			s.disconnect();
		};
	}, []);

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
		if (!socket || !quill) return;

		socket.once("load-document", (document) => {
			quill.setContents(document);
			quill.enable();
		});

		socket.emit("get-document", documentId, user?.uid, "Test Document");
	}, [quill, socket, documentId]);

	return <div id="txt-editor-container" ref={wrapperRef} />;
}
