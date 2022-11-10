import { memo } from 'react'
import cls from './Loader.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'

interface LoaderProps {
    className?: string
}

export const Loader = memo(({ className }: LoaderProps) => {
    return (
        <div className={classNames(cls.loader, {}, [className])}>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    )
})
