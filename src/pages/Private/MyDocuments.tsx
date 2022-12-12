import { useQuery } from "react-query";

import { displayToast } from "../../utils/toast";
import { useAuthContext } from "../../contexts/AuthContext";
import { getDocuments } from "../../services/DocumentService";
import useToggle from "../../hooks/useToggle";

import CreateDocumentForm from "../../components/CreateDocumentForm";
import Document from "../../components/Document";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import Modal from "../../components/Modal";

export default function MyDocuments() {
	const [createDocumentModalVisible, toggleCreateDocumentModal] = useToggle();
	const { user } = useAuthContext();

	const { isLoading, error, data } = useQuery("myDocuments", () =>
		getDocuments(user?.uid!)
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
						label: "Create New",
						handler: toggleCreateDocumentModal,
					},
				]}
			/>
			<div className="grid gap-4 grid-cols-2 md:grid-col-3 lg:grid-cols-4">
				{data.map((document) => (
					<Document key={document.uid} document={document} />
				))}
			</div>
			<Modal
				visible={createDocumentModalVisible}
				toggleVisible={toggleCreateDocumentModal}
				title="Create new Document"
			>
				<CreateDocumentForm />
			</Modal>
		</div>
	);
}
