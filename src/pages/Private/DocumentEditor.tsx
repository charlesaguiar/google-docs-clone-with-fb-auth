import { useRef } from "react";
import { useParams } from "react-router-dom";
import { MdDelete, MdShare, MdFilterNone } from "react-icons/md";

import useDocument from "hooks/rq/useDocument";
import useDeactivateDocument from "hooks/rq/useDeactivateDocument";
import useToggle from "hooks/useToggle";

import TextEditor from "components/TextEditor";
import Loading from "components/Loading";
import PageHeader from "components/PageHeader";
import DocumentTitle from "components/DocumentTitle";
import Modal from "components/Modal";
import ConfirmationDialog from "components/ConfirmationDialog";
import useCloneDocument from "hooks/rq/useCloneDocument";

export default function DocumentEditor() {
	const confirmationRef = useRef({ message: "", handler: () => {} });

	const { id: documentId } = useParams();
	const { document, isLoading } = useDocument(documentId || "");

	const { deactivate, isDeactivating } = useDeactivateDocument();
	const { clone, isCloning } = useCloneDocument(document);

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
							confirmationRef.current = {
								message: "Do you really want to delete this document?",
								handler: () => deactivate({ documentId: document.uid }),
							};
							toggleConfirmationModal();
						},
					},
					{
						variant: "primary",
						label: "Clone",
						Icon: <MdFilterNone size={24} />,
						handler: () => {
							confirmationRef.current = {
								message: "Do you really want to clone this document?",
								handler: clone,
							};
							toggleConfirmationModal();
						},
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
					onConfirm={confirmationRef.current.handler}
					isLoading={isDeactivating || isCloning}
				>
					<span>{confirmationRef.current.message}</span>
				</ConfirmationDialog>
			</Modal>
		</div>
	);
}
