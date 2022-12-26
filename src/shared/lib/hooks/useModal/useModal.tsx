import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

interface useModalProps {
    onClose?: () => void
    animationDelay?: number
    isOpen?: boolean
}

export const useModal = (props: useModalProps) => {
    const { onClose, animationDelay, isOpen } = props
    const [isClosing, setIsClosing] = useState(false)
    const refTimer = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
        }
    }, [isOpen])

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            refTimer.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, animationDelay)
        }
    }, [onClose, animationDelay])

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            close()
        }
    }, [close])

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }

        return () => {
            clearTimeout(refTimer.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    return {
        isClosing,
        isMounted,
        close
    }
}