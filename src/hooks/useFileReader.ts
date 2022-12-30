import { useCallback, useEffect, useState } from "react";

type UseFileReaderOutput = [
	file: File | undefined,
	fileUrl: string | undefined | null,
	handleFileSubmit: (e: React.ChangeEvent<HTMLInputElement>) => void
];

const useFileReader = (initialFileUrl?: string | null): UseFileReaderOutput => {
	const [file, setFile] = useState<File>();
	const [fileUrl, setFileUrl] = useState<string | null>();

	const onLoad = useCallback((fileReader: FileReader, cancel: boolean) => {
		if (fileReader.result && !cancel) {
			setFileUrl(fileReader.result as string);
		}
	}, []);

	useEffect(() => {
		setFileUrl(initialFileUrl);
	}, [initialFileUrl]);

	useEffect(() => {
		if (!file) return;

		const fileReader = new FileReader();
		let cancel = false;

		fileReader.addEventListener("load", () => {
			onLoad(fileReader, cancel);
		});

		fileReader.readAsDataURL(file);

		return () => {
			cancel = true;
			fileReader.removeEventListener("load", () => {
				onLoad(fileReader, cancel);
			});

			if (fileReader && fileReader.readyState === 1) {
				fileReader.abort();
			}
		};
	}, [file, onLoad]);

	const handleFileSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const input = e.target?.files?.[0];

		if (!input) return;

		setFile(input);
	};

	return [file, fileUrl, handleFileSubmit];
};

export default useFileReader;
