import { HTMLAttributeAnchorTarget, memo } from 'react'
import cls from './ArticlesList.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Article } from '../../model/types/article'
import { ArticlesListItem } from '../ArticlesListItem/ArticlesListItem'
import { ArticlesListItemSkeleton } from '../ArticlesListItem/ArticlesListItemSkeleton'
import { Text, TextSize } from '@/shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { ArticleView } from '../../model/consts/articleConsts'

interface ArticlesListProps {
    articles: Article[]
    className?: string
    isLoading?: boolean
    view?: ArticleView
    target?: HTMLAttributeAnchorTarget
}

const getSkeletons = (view: ArticleView) => {
    return new Array(view === ArticleView.TILE ? 9 : 3)
        .fill(0)
        .map((_, index) => (
            <ArticlesListItemSkeleton
                className={cls.card}
                key={index}
                view={view}
            />
        ))
}

export const ArticlesList = memo((props: ArticlesListProps) => {
    const {
        className,
        articles,
        isLoading,
        target,
        view = ArticleView.TILE
    } = props
    const { t } = useTranslation('articles')

    if (!isLoading && articles.length === 0) {
        return (
            <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
                <Text size={TextSize.SIZE_L} title={t('Статьи не найдены')}/>
            </div>
        )
    }

    const renderArticle = (article: Article) => (
        <ArticlesListItem
            target={target}
            className={cls.card}
            key={article.id}
            article={article}
            view={view}
        />
    )

    return (
        <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
            {
                articles.length > 0 && articles.map(renderArticle)
            }
            {
                isLoading && getSkeletons(view)
            }
        </div>
    )
})