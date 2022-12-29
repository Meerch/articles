import { memo, useState } from 'react'
import cls from './StarRating.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import Star from '@/shared/assets/icons/favorite.svg'
import { Icon } from '../Icon/Icon'

interface StarRatingProps {
    className?: string
    onSelect?: (startCount: number) => void
    size?: number
    selectedStars?: number
}

const stars = [1, 2, 3, 4, 5]

export const StarRating = memo((props: StarRatingProps) => {
    const { className, selectedStars = 0, onSelect, size = 30 } = props
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars)
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount)
        }
    }

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0)
        }
    }

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount)
            setCurrentStarsCount(starsCount)
            setIsSelected(true)
        }
    }

    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {
                stars.map((starNumber) => (
                    <Icon
                        className={classNames(cls.starIcon, {
                            [cls.hovered]: currentStarsCount >= starNumber,
                            [cls.normal]: currentStarsCount < starNumber,
                            [cls.isSelected]: isSelected
                        }, [])}
                        key={starNumber}
                        Svg={Star}
                        height={size}
                        width={size}
                        onMouseEnter={onHover(starNumber)}
                        onMouseLeave={onLeave}
                        onClick={onClick(starNumber)}
                    />
                ))
            }
        </div>
    )
})