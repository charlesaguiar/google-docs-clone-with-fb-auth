import api from 'lib/axios'

export interface IDocument {
	id: string
	uid: string
	ownerId: string
	data: unknown
	name: string
	cloned?: boolean
	createdAt: string
}

export interface IEditDocumentInput {
	uid: string
	name: string
}

export const getDocuments = async (ownerId: string | null): Promise<IDocument[]> =>
	await api
		.get<{ documents: IDocument[] }>('documents', { params: { ownerId } })
		.then((r) => r.data.documents)

export const getDocument = async (documentId: string): Promise<IDocument> =>
	await api.get<{ document: IDocument }>(`document/${documentId}`).then((r) => r.data.document)

export const createDocument = async (
	name: string,
	ownerId: string,
	content?: unknown,
): Promise<{ message: string; document: IDocument }> =>
	await api
		.post<{ message: string; data: { document: IDocument } }>('document', {
			name,
			ownerId,
			data: content,
		})
		.then((r) => ({
			message: r.data.message,
			document: r.data.data.document,
		}))

export const cloneDocument = async (document: IDocument): Promise<void> => {
	await api.post('clone-document', {
		name: document?.name ?? 'Document',
		ownerId: document.ownerId,
		data: document.data,
	})
}

export const editDocument = async (uid: string, name: string): Promise<void> => {
	await api.patch('document', { uid, name })
}

export const deleteDocument = async (uid: string): Promise<void> => {
	await api.delete(`document/${uid}`)
}
