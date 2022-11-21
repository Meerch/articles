import { MutableRefObject, useEffect } from 'react'

export interface useInfiniteScrollOptions {
    triggerRef: MutableRefObject<HTMLDivElement>
    wrapperRef: MutableRefObject<HTMLDivElement>
    callback?: () => void
}

export const useInfiniteScroll = ({ triggerRef, wrapperRef, callback }: useInfiniteScrollOptions) => {
    useEffect(() => {
        const trigger = triggerRef.current
        const wrapper = wrapperRef.current
        let observer: IntersectionObserver | null = null

        // if (!trigger || !wrapper) {
        //     return
        // }

        if (callback) {
            const options = {
                root: wrapper,
                rootMargin: '0px',
                threshold: 1.0
            }

            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback()
                }
            }, options)

            observer.observe(trigger)
        }

        return () => {
            if (observer) {
                observer.unobserve(trigger)
            }
        }
    }, [callback, triggerRef, wrapperRef])
}
