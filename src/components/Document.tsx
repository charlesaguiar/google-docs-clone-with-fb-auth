import { format } from "date-fns";
import { SiGoogledrive } from "react-icons/si";
import { Link } from "react-router-dom";

import { IDocument } from "services/DocumentService";

export default function Document({ document }: { document: IDocument }) {
	return (
		<Link to={`/document-editor/${document.uid}`}>
			<div className="flex flex-col lg:flex-row justify-between items-center shadow-lg p-4 rounded-lg border cursor-pointer border-gray-300 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500 duration-300 ease-in-out">
				<SiGoogledrive size={32} />
				<div className="flex flex-col gap-1">
					<span>{document.name}</span>
					<span className="text-sm text-gray-500">
						Created at {format(new Date(document.createdAt), "EEEE, MMM/yyyy")}
					</span>
				</div>
			</div>
		</Link>
	);
}
