import { CSSProperties, memo, useMemo } from 'react'
import cls from './Avatar.module.scss'
import { classNames, Mods } from 'shared/lib/classNames/classNames'

interface AvatarProps {
    className?: string
    src?: string
    alt?: string
    size?: number
}

export const Avatar = memo((props: AvatarProps) => {
    const {
        className,
        src,
        alt = '',
        size = 100
    } = props

    const mods: Mods = {}

    const styles = useMemo<CSSProperties>(() => ({
        height: size,
        width: size
    }), [size])

    return (
        <img
            style={styles}
            className={classNames(cls.Avatar, mods, [className])}
            src={src}
            alt={alt}
        />
    )
})
