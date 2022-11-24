import { memo } from 'react'
import cls from './ArticlesList.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Article, ArticleView } from '../../model/types/article'
import { ArticlesListItem } from '../ArticlesListItem/ArticlesListItem'
import { ArticlesListItemSkeleton } from 'entities/Article/ui/ArticlesListItem/ArticlesListItemSkeleton'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'

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