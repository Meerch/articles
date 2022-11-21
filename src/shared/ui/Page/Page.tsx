import { FC, MutableRefObject, useRef } from 'react'
import cls from './Page.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'

interface PageProps {
    className?: string
    onScrollEnd?: () => void
}

export const Page: FC<PageProps> = (props) => {
    const { className, children, onScrollEnd } = props
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd
    })

    return (
        <section
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
        >
            {children}
            <div ref={triggerRef}/>
        </section>
    )
}