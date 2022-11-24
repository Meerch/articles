import { MutableRefObject, useCallback, useRef } from 'react'

export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timerRef = useRef() as MutableRefObject<NodeJS.Timeout>

    return useCallback((...args: any[]) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            callback(...args)
        }, delay)
    }, [callback, delay])
}