import api from "lib/axios";

export interface IDocument {
	id: string;
	uid: string;
	ownerId: string;
	data: any;
	name: string;
	createdAt: string;
}

export interface IEditDocumentInput {
	uid: string;
	name: string;
}

export const getDocuments = (ownerId: string | null) =>
	api
		.get<{ documents: IDocument[] }>("documents", { params: { ownerId } })
		.then((r) => r.data.documents);

export const getDocument = (documentId: string) =>
	api
		.get<{ document: IDocument }>(`document/${documentId}`)
		.then((r) => r.data.document);

export const createDocument = (name: string, ownerId: string) =>
	api
		.post<{ message: string; data: { document: IDocument } }>("document", {
			name,
			ownerId,
		})
		.then((r) => ({
			message: r.data.message,
			document: r.data.data.document,
		}));

export const editDocument = (uid: string, name: string) =>
	api
		.patch<{ message: string }>("document", {
			uid,
			name,
		})
		.then((r) => r.data.message);

export const deleteDocument = (uid: string) =>
	api
		.delete<{ message: string }>(`document/${uid}`)
		.then((r) => r.data.message);
