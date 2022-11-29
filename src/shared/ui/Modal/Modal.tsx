import React, { FC, MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import cls from './Modal.module.scss'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { Portal } from '../Portal/Portal'

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen: boolean
    onClose?: () => void
    lazy?: boolean
}

const ANIMATION_DELAY = 200

export const Modal: FC<ModalProps> = (props) => {
    const { className, onClose, children, isOpen, lazy } = props
    const [isClosing, setIsClosing] = useState(false)
    const refTimer = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
        }
    }, [isOpen])

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
                <div onClick={handlerCloseModal} className={cls.overlay}>
                    <div onClick={handlerClickContent} className={cls.content}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
