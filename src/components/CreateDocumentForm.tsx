import { useRef, useState } from 'react'

import { useAuthContext } from 'contexts/AuthContext'
import useCreateDocument from 'hooks/rq/useCreateDocument'

import Button from './Button'
import Divider from './Divider'
import Input from './Input'

interface ICreateDocumentFormProps {
	onCancel?: () => void
}

const CreateDocumentForm: React.FC<ICreateDocumentFormProps> = ({ onCancel = () => {} }) => {
	const { user } = useAuthContext()
	const { create, isCreating } = useCreateDocument()

	const [errorMessage, setErrorMessage] = useState<string | undefined>()
	const documentNameRef = useRef<HTMLInputElement>(null)

	const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()

		if (!user?.id) return

		if (!documentNameRef.current?.value) {
			setErrorMessage('Please, provide a name for the document')
			return
		}

		create({ name: documentNameRef.current?.value, ownerId: user.id })
	}

	return (
		<form className='flex flex-col' onSubmit={onSubmit}>
			<Input
				id='document-name-input'
				label='Document Name'
				placeholder='Document name'
				ref={documentNameRef}
				error={errorMessage}
				autoFocus
			/>
			<Divider />
			<div className='flex gap-4 self-end'>
				<Button type='button' variant='secondary' onClick={onCancel} disabled={isCreating}>
					Cancel
				</Button>
				<Button type='submit' variant='primary' isLoading={isCreating} disabled={isCreating}>
					Create
				</Button>
			</div>
		</form>
	)
}

export default CreateDocumentForm
