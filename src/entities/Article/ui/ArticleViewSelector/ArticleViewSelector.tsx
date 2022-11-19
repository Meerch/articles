import { memo } from 'react'
import cls from './ArticleViewSelector.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleView } from '../../model/types/article'
import ListIcon from 'shared/assets/icons/list.svg'
import TileIcon from 'shared/assets/icons/tile.svg'
import { Icon } from 'shared/ui/Icon/Icon'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'

interface ArticleViewSelectorProps {
    className?: string
    view: ArticleView
    onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
    {
        icon: TileIcon,
        view: ArticleView.TILE
    },
    {
        icon: ListIcon,
        view: ArticleView.LIST
    }
]

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView)
    }

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {
                viewTypes.map(viewType => (
                    <Button
                        theme={ButtonTheme.CLEAR}
                        key={viewType.view}
                        onClick={onClick(viewType.view)}
                    >
                        <Icon
                            className={classNames('', {
                                [cls.notActive]: view !== viewType.view
                            })}
                            Svg={viewType.icon}
                        />
                    </Button>
                ))
            }
        </div>
    )
})