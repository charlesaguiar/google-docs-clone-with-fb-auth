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
