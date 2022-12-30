import { FC, Suspense } from 'react'

import { LoginFormAsync } from '../LoginForm/LoginForm.async'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Loader } from '@/shared/ui/Loader'
import { Modal } from '@/shared/ui/Modal'

interface LoginModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
}

export const LoginModal: FC<LoginModalProps> = ({ className, isOpen, onClose }) => {
    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            {isOpen && <Suspense fallback={<Loader/>}>
                <LoginFormAsync closeModal={onClose}/>
            </Suspense>}
        </Modal>
    )
}
