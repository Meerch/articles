import React, { FC, ReactNode } from 'react'

import { Overlay } from '../Overlay/Overlay'
import { Portal } from '../Portal/Portal'

import cls from './Modal.module.scss'

import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen: boolean
    onClose?: () => void
    lazy?: boolean
}

export const Modal: FC<ModalProps> = (props) => {
    const { className, onClose, children, isOpen, lazy } = props
    const { isMounted, isClosing, close } = useModal({
        isOpen,
        animationDelay: 200,
        onClose
    })

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.closed]: isClosing
    }

    if (!isMounted && lazy) {
        return null
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <Overlay onClick={close}/>
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    )
}
