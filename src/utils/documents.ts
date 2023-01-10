import { IDocument } from 'services/DocumentService'

export const orderDocumentsByCreationDate = (documents: IDocument[]): IDocument[] => {
	return documents.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
}
