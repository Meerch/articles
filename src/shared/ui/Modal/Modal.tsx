import React, { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import cls from './Modal.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Portal } from 'shared/ui/Portal/Portal'

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen: boolean
    onClose?: () => void
}

const ANIMATION_DELAY = 200

export const Modal: FC<ModalProps> = (props) => {
    const { className, onClose, children, isOpen } = props
    const [isClosing, setIsClosing] = useState(false)
    const refTimer = useRef<ReturnType<typeof setTimeout>>()

    const handlerCloseModal = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            refTimer.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, ANIMATION_DELAY)
        }
    }, [onClose])

    const handlerClickContent = (event: React.MouseEvent) => {
        event.stopPropagation()
    }

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            handlerCloseModal()
        }
    }, [handlerCloseModal])

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }

        return () => {
            clearTimeout(refTimer.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.closed]: isClosing
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div onClick={handlerCloseModal} className={cls.overlay}>
                    <div onClick={handlerClickContent} className={cls.content}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
