import { memo } from 'react'
import cls from './Text.module.scss'
import { classNames, Mods } from 'shared/lib/classNames/classNames'

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error'
}

export enum TextAlign {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right'
}

export enum TextSize {
    SIZE_S = 'size_s',
    SIZE_M = 'size_m',
    SIZE_L = 'size_l'
}

interface TextProps {
    className?: string
    title?: string
    text?: string
    theme?: TextTheme
    align?: TextAlign
    size?: TextSize

    'data-testid'?: string
}

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.SIZE_S]: 'h3',
    [TextSize.SIZE_M]: 'h2',
    [TextSize.SIZE_L]: 'h3'
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        size = TextSize.SIZE_M,
        align = TextAlign.LEFT,
        theme = TextTheme.PRIMARY,
        'data-testid': dataTestId = ''
    } = props

    const HeaderTag = mapSizeToHeaderTag[size]

    const mods: Mods = {
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls[size]]: true
    }

    return (
        <div className={classNames(cls.Text, mods, [className])}>
            {title && <HeaderTag data-testid={`${dataTestId}.Header`} className={cls.title}>{title}</HeaderTag>}
            {text && <p data-testid={`${dataTestId}.Paragraph`} className={cls.text}>{text}</p>}
        </div>
    )
})
