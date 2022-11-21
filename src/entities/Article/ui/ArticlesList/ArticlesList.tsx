import { memo } from 'react'
import cls from './ArticlesList.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Article, ArticleView } from '../../model/types/article'
import { ArticlesListItem } from '../ArticlesListItem/ArticlesListItem'
import { ArticlesListItemSkeleton } from 'entities/Article/ui/ArticlesListItem/ArticlesListItemSkeleton'

interface ArticlesListProps {
    articles: Article[]
    className?: string
    isLoading?: boolean
    view?: ArticleView
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
        view = ArticleView.TILE
    } = props

    const renderArticle = (article: Article) => (
        <ArticlesListItem
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