import { useRef } from "react";
import { useParams } from "react-router-dom";
import { MdDelete, MdShare, MdFilterNone } from "react-icons/md";

import useDocument from "../../hooks/rq/useDocument";
import useDeactivateDocument from "../../hooks/rq/useDeactivateDocument";
import useToggle from "../../hooks/useToggle";

import TextEditor from "../../components/TextEditor";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import DocumentTitle from "../../components/DocumentTitle";
import Modal from "../../components/Modal";
import ConfirmationDialog from "../../components/ConfirmationDialog";

export default function DocumentEditor() {
	const confirmationMessageRef = useRef("");

	const { id: documentId } = useParams();
	const { document, isLoading } = useDocument(documentId || "");
	const { deactivate, isDeactivating } = useDeactivateDocument();

	const [displayConfirmationModal, toggleConfirmationModal] = useToggle();

	if (isLoading || !document) {
		return <Loading />;
	}

	return (
		<div>
			<PageHeader
				title={<DocumentTitle document={document} />}
				actions={[
					{
						variant: "secondary",
						label: "Share",
						Icon: <MdShare size={24} />,
						handler: toggleConfirmationModal,
					},
					{
						variant: "secondary",
						label: "Delete",
						Icon: <MdDelete size={24} />,
						handler: () => {
							confirmationMessageRef.current =
								"Do you really want to delete this document?";
							toggleConfirmationModal();
						},
					},
					{
						variant: "primary",
						label: "Clone",
						Icon: <MdFilterNone size={24} />,
						handler: toggleConfirmationModal,
					},
				]}
			/>
			<TextEditor />
			<Modal
				visible={displayConfirmationModal}
				toggleVisible={toggleConfirmationModal}
				title="Confirmation"
			>
				<ConfirmationDialog
					onCancel={toggleConfirmationModal}
					onConfirm={() => deactivate({ documentId: document.uid })}
					isLoading={isDeactivating}
				>
					<span>{confirmationMessageRef.current}</span>
				</ConfirmationDialog>
			</Modal>
		</div>
	);
}
