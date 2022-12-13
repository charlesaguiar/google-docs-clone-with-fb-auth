import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { MdDelete, MdOutlineEdit, MdShare, MdFilterNone } from "react-icons/md";

import { getDocument } from "../../services/DocumentService";

import TextEditor from "../../components/TextEditor";
import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";

export default function DocumentEditor() {
	const { id: documentId } = useParams();

	const { isLoading, data: document } = useQuery(
		"documentMeta",
		() => getDocument(documentId || ""),
		{ refetchOnWindowFocus: false }
	);

	if (isLoading || !document) {
		return <Loading />;
	}

	return (
		<div>
			<PageHeader
				title={
					<div className="flex gap-4 items-center">
						<span>{document.name}</span>
						<MdOutlineEdit
							size={28}
							className="text-gray-300 cursor-pointer hover:text-gray-900"
						/>
					</div>
				}
				actions={[
					{
						variant: "secondary",
						label: "Share",
						Icon: <MdShare size={24} />,
						handler: () => {},
					},
					{
						variant: "secondary",
						label: "Delete",
						Icon: <MdDelete size={24} />,
						handler: () => {},
					},
					{
						variant: "primary",
						label: "Clone",
						Icon: <MdFilterNone size={24} />,
						handler: () => {},
					},
				]}
			/>
			<TextEditor />
		</div>
	);
}
