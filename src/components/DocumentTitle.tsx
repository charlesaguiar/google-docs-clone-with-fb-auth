import { useCallback } from 'react'
import useEditDocument from 'hooks/rq/useEditDocument'
import { IDocument } from 'services/DocumentService'

import InlineEditInput from './InlineEditInput'

interface IDocumentTitleProps {
	document: IDocument
}

const DocumentTitle: React.FC<IDocumentTitleProps> = ({ document }) => {
	const { edit, isEditing } = useEditDocument()

	const onDocumentNameEdit = useCallback(
		(name: string) => {
			edit({ uid: document.uid, name })
		},
		[document, edit],
	)

	return (
		<InlineEditInput
			defaultValue={document.name}
			onEdit={onDocumentNameEdit}
			isLoading={isEditing}
		/>
	)
}

export default DocumentTitle
