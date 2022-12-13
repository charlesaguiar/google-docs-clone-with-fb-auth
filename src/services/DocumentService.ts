import api from "../lib/axios";

export interface IDocument {
	id: string;
	uid: string;
	ownerId: string;
	data: any;
	name: string;
	createdAt: string;
}

export const getDocuments = (ownerId: string) =>
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
