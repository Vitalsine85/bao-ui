import Typography from '@/components/Typography'
import { faArrowLeft, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, ReactNode } from 'react'

export interface ModalHeaderProps {
	children?: ReactNode
	header?: string | ReactNode
	subheader?: string | ReactNode
	onClose?(): void
	onBack?(): void
}

const ModalHeader: FC<ModalHeaderProps> = ({ header, subheader, children, onBack, onClose }) => {
	return (
		<>
			<div className='flex justify-between mb-4 h-8 items-center'>
				<div className='flex flex-col justify-center gap-1'>
					<Typography variant='lg' className='font-semibold'>
						{onBack && (
							<FontAwesomeIcon icon={faArrowLeft} onClick={onBack} width={24} height={24} className='cursor-pointer hover:text-text-400' />
						)}
						{header ? header : children}
					</Typography>
					{subheader && <Typography variant='sm'>{subheader}</Typography>}
				</div>
			</div>
			<div className='absolute top-0 right-0 hidden pt-4 pr-6 sm:block'>
				{onClose && (
					<button className='rounded-md bg-primary-100 text-text-100 outline-none hover:text-text-400' onClick={onClose}>
						<FontAwesomeIcon icon={faClose} className='h-6 w-6' />
					</button>
				)}
			</div>
		</>
	)
}

export default ModalHeader
