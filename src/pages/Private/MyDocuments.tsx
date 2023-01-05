import { useQuery } from "react-query";

import useToggle from "hooks/useToggle";

import { useAuthContext } from "contexts/AuthContext";

import { displayToast } from "utils/toast";
import { getDocuments } from "services/DocumentService";

import CreateDocumentForm from "components/CreateDocumentForm";
import Document from "components/Document";
import Loading from "components/Loading";
import PageHeader from "components/PageHeader";
import Modal from "components/Modal";

export default function MyDocuments() {
	const [createDocumentModalVisible, toggleCreateDocumentModal] = useToggle();
	const { getLoggedUserId } = useAuthContext();

	const { isLoading, error, data } = useQuery("myDocuments", () =>
		getDocuments(getLoggedUserId())
	);

	if (isLoading || !data) return <Loading />;

	if (error) {
		displayToast("Error trying to load your documents. Please, try again", {
			type: "error",
		});
		return null;
	}

	return (
		<div>
			<PageHeader
				title="My Documents"
				actions={[
					{
						variant: "primary",
						label: "New",
						handler: toggleCreateDocumentModal,
					},
				]}
			/>
			<div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{data.map((document) => (
					<Document key={document.uid} document={document} />
				))}
			</div>
			<Modal
				visible={createDocumentModalVisible}
				toggleVisible={toggleCreateDocumentModal}
				title="New Document"
			>
				<CreateDocumentForm onCancel={toggleCreateDocumentModal} />
			</Modal>
		</div>
	);
}
