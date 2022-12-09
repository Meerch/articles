import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ArticlesList } from 'entities/Article'
import { useSelector } from 'react-redux'
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView
} from '../../model/selectors/articlesPageSelectors'
import { getArticles } from '../../model/slices/ArticlesPageSlice'
import { Text } from 'shared/ui/Text/Text'

interface ArticleInfiniteListProps {
    className?: string
}

export const ArticleInfiniteList = memo(({ className }: ArticleInfiniteListProps) => {
    const { t } = useTranslation('articles')
    const isLoading = useSelector(getArticlesPageIsLoading)
    const view = useSelector(getArticlesPageView)
    const error = useSelector(getArticlesPageError)
    const articles = useSelector(getArticles.selectAll)

    if (error) {
        return (<Text text={t('Произошла ошибка при загрузке статей')}/>)
    }

    return (
        <ArticlesList
            isLoading={isLoading}
            view={view}
            articles={articles}
            className={className}
        />
    )
})