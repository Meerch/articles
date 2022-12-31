import { CSSProperties, memo, useMemo } from 'react'
import cls from './Avatar.module.scss'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { AppImage } from '../AppImage'
import UserIcon from '../../assets/icons/user.svg'
import { Icon } from '../Icon'
import { Skeleton } from '../Skeleton'

interface AvatarProps {
    className?: string
    src?: string
    alt?: string
    size?: number
    fallbackInverted?: boolean
}

export const Avatar = memo((props: AvatarProps) => {
    const {
        className,
        src,
        alt = '',
        fallbackInverted,
        size = 100
    } = props

    const mods: Mods = {}

    const styles = useMemo<CSSProperties>(() => ({
        height: size,
        width: size
    }), [size])

    const fallback = <Skeleton width={size} height={size} borderRadius='50%'/>
    const fallbackError = <Icon inverted={fallbackInverted} width={size} height={size} Svg={UserIcon}/>

    return (
        <AppImage
            fallback={fallback}
            fallbackError={fallbackError}
            style={styles}
            className={classNames(cls.Avatar, mods, [className])}
            src={src}
            alt={alt}
        />
    )
})
