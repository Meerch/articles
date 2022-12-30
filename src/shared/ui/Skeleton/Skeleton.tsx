import { CSSProperties, memo } from 'react'

import cls from './Skeleton.module.scss'

import { classNames } from '@/shared/lib/classNames/classNames'

interface SkeletonProps {
    className?: string
    width?: string | number
    height?: string | number
    borderRadius?: string
}

export const Skeleton = memo((props: SkeletonProps) => {
    const { className, borderRadius, height, width } = props

    const styles: CSSProperties = {
        borderRadius,
        height,
        width
    }

    return (
        <div
            style={styles}
            className={classNames(cls.Skeleton, {}, [className])}
        />
    )
})