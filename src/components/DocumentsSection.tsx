import Document from 'components/Document'

import { IDocument } from 'services/DocumentService'

interface IDocumentsSectionProps {
	title: string
	documents: IDocument[]
}

const DocumentsSection: React.FC<IDocumentsSectionProps> = ({ title, documents }) => {
	if (!documents?.length) return null

	return (
		<section className='flex flex-col gap-3'>
			<span className='text-sm text-gray-500'>{`${title} (${documents.length})`}</span>

			<div className='grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{documents.map((document) => (
					<Document key={document.uid} document={document} />
				))}
			</div>
		</section>
	)
}

export default DocumentsSection
