import useQuillSocketComm from "hooks/useQuillSocketComm";
import "./TextEditor.css";

export default function TextEditor() {
	const { quillEditorRef } = useQuillSocketComm();
	return <div id="txt-editor-container" ref={quillEditorRef} />;
}
