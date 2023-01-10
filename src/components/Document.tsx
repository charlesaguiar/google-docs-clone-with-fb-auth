import { format } from 'date-fns'
import { SiGoogledrive } from 'react-icons/si'
import { Link } from 'react-router-dom'

import { IDocument } from 'services/DocumentService'

interface IDocumentProps {
	document: IDocument
}

const Document: React.FC<IDocumentProps> = ({ document }) => {
	return (
		<Link to={`/document-editor/${document.uid}`}>
			<div className='flex flex-col lg:gap-2 h-full lg:flex-row justify-start items-center shadow-lg p-4 rounded-lg border cursor-pointer border-gray-300 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500 duration-300 ease-in-out'>
				<div>
					<SiGoogledrive size={32} />
				</div>
				<div className='flex flex-col gap-1 min-w-0'>
					<h5 className='lg:truncate'>{document.name}</h5>
					<span className='text-sm text-gray-500'>
						Created at {format(new Date(document.createdAt), 'EEEE, MMM/yyyy')}
					</span>
				</div>
			</div>
		</Link>
	)
}

export default Document
