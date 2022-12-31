import { ImgHTMLAttributes, memo, ReactElement, useLayoutEffect, useState } from 'react'

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string
    fallback?: ReactElement
    fallbackError?: ReactElement
}

export const AppImage = memo((props: AppImageProps) => {
    const { className, fallback, src, fallbackError, alt = 'image', ...otherProps } = props
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useLayoutEffect(() => {
        const image = new Image()
        image.src = src ?? ''
        image.onload = () => {
            setIsLoading(false)
        }
        image.onerror = () => {
            setHasError(true)
            setIsLoading(false)
        }
    }, [src])

    if (isLoading && fallback) {
        return fallback
    }

    if (hasError && fallbackError) {
        return fallbackError
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            {...otherProps}
        />
    )
})
