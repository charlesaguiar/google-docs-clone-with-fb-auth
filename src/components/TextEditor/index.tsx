import useQuillSocketComm from 'hooks/useQuillSocketComm'
import './TextEditor.css'

const TextEditor: React.FC = () => {
	const { quillEditorRef } = useQuillSocketComm()
	return <div id='txt-editor-container' ref={quillEditorRef} />
}

export default TextEditor
