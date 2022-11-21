import { MutableRefObject, useEffect } from 'react'

export interface useInfiniteScrollOptions {
    triggerRef: MutableRefObject<HTMLDivElement>
    wrapperRef: MutableRefObject<HTMLDivElement>
    callback?: () => void
}

export const useInfiniteScroll = ({ triggerRef, wrapperRef, callback }: useInfiniteScrollOptions) => {
    useEffect(() => {
        const triggerElement = triggerRef.current
        const wrapperElement = wrapperRef.current
        let observer: IntersectionObserver | null = null

        if (callback) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0
            }

            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback()
                }
            }, options)

            observer.observe(triggerElement)
        }

        return () => {
            if (observer && triggerElement) {
                observer.unobserve(triggerElement)
            }
        }
    }, [callback, triggerRef, wrapperRef])
}
