import { useQuery } from 'react-query'

import useToggle from 'hooks/useToggle'

import { useAuthContext } from 'contexts/AuthContext'
import useDocumentsSections from 'hooks/documents/useDocumentsSections'

import { displayToast } from 'utils/toast'
import { getDocuments } from 'services/DocumentService'

import CreateDocumentForm from 'components/CreateDocumentForm'
import Loading from 'components/Loading'
import PageHeader from 'components/PageHeader'
import Modal from 'components/Modal'
import DocumentsSection from 'components/DocumentsSection'

const MyDocuments: React.FC = () => {
	const [createDocumentModalVisible, toggleCreateDocumentModal] = useToggle()
	const { getLoggedUserId } = useAuthContext()

	const { isLoading, error, data } = useQuery(
		'myDocuments',
		async () => await getDocuments(getLoggedUserId()),
	)

	const { recentlyClonedDocuments, otherDocuments } = useDocumentsSections(data)

	if (isLoading || !data) return <Loading />

	if (error) {
		displayToast('Error trying to load your documents. Please, try again', {
			type: 'error',
		})
		return null
	}

	return (
		<div>
			<PageHeader
				title='My Documents'
				actions={[
					{
						variant: 'primary',
						label: 'New',
						handler: toggleCreateDocumentModal,
					},
				]}
			/>
			<div className='flex flex-col gap-8 mt-8'>
				<DocumentsSection title='Recently cloned documents' documents={recentlyClonedDocuments} />
				<DocumentsSection title='Other documents' documents={otherDocuments} />
			</div>

			<Modal
				visible={createDocumentModalVisible}
				toggleVisible={toggleCreateDocumentModal}
				title='New Document'
			>
				<CreateDocumentForm onCancel={toggleCreateDocumentModal} />
			</Modal>
		</div>
	)
}

export default MyDocuments
