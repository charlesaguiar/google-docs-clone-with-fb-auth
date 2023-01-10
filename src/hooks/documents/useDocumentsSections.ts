import { useMemo } from 'react'
import { differenceInDays } from 'date-fns'

import { IDocument } from 'services/DocumentService'
import { orderDocumentsByCreationDate } from 'utils/documents'

interface IUseDocumentsSectionsOutput {
	recentlyClonedDocuments: IDocument[]
	otherDocuments: IDocument[]
}

const useDocumentsSections = (data: IDocument[] | undefined): IUseDocumentsSectionsOutput => {
	const recentlyClonedDocuments = useMemo(() => {
		if (!data) return []

		return orderDocumentsByCreationDate(
			data.filter(
				(document) =>
					document.cloned && differenceInDays(new Date(), new Date(document.createdAt)) <= 1,
			),
		)
	}, [data])

	const otherDocuments = useMemo(() => {
		if (!data) return []

		const recentlyClonedDocsIds = recentlyClonedDocuments.map((d) => d.uid)
		return orderDocumentsByCreationDate(data.filter((d) => !recentlyClonedDocsIds.includes(d.uid)))
	}, [data, recentlyClonedDocuments])

	return {
		recentlyClonedDocuments,
		otherDocuments,
	}
}

export default useDocumentsSections
