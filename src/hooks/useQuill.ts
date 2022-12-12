import Quill from "quill";
import { useCallback, useState } from "react";

interface IUseQuillOutput {
	quill: Quill | undefined;
	quillEditorRef: (wrapper: HTMLDivElement) => void;
}

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

const useQuill = (): IUseQuillOutput => {
	const [quill, setQuill] = useState<Quill | undefined>();

	const quillEditorRef = useCallback((wrapper: HTMLDivElement) => {
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

	return { quill, quillEditorRef };
};

export default useQuill;
