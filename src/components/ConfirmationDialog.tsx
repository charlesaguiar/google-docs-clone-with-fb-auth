import Button from './Button'

interface IConfirmationDialogProps {
	children: React.ReactNode
	isLoading?: boolean
	onConfirm: () => void
	onCancel: () => void
}

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({
	children,
	isLoading = false,
	onCancel,
	onConfirm,
}) => {
	return (
		<div>
			{children}
			<div className='flex justify-end gap-4 mt-4'>
				<Button type='button' variant='secondary' onClick={onCancel} disabled={isLoading}>
					Cancel
				</Button>
				<Button type='submit' isLoading={isLoading} onClick={onConfirm}>
					Confirm
				</Button>
			</div>
		</div>
	)
}

export default ConfirmationDialog
