import { MutableRefObject, ReactNode, UIEvent, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import cls from './Page.module.scss'
import { StateSchema } from '@/app/providers/StoreProvider'
import { getUIScrollByPath, uiActions } from '@/features/UI'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import useInitialEffect from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'
import { TestProps } from '@/shared/types/tests'

interface PageProps extends TestProps {
    className?: string
    onScrollEnd?: () => void
    children: ReactNode
}

export const Page = (props: PageProps) => {
    const { className, children, onScrollEnd } = props
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    const { pathname } = useLocation()
    const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname))
    const dispatch = useAppDispatch()

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd
    })

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition
    })

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(uiActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname
        }))
    }, 500)

    return (
        <main
            data-testid={props['data-testid' ?? 'Page']}
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
            onScroll={onScroll}
        >
            {children}
            {
                onScrollEnd &&
                <div
                    className={cls.trigger}
                    ref={triggerRef}
                />
            }
        </main>
    )
}