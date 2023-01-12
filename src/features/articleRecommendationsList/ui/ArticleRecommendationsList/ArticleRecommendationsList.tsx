import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { getArticleRecommendationList } from '../../api/articleRecommendationApi'

import { ArticlesList, ArticleView } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import { Text, TextSize } from '@/shared/ui/Text'

interface ArticleRecommendationsListProps {
    className?: string
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props
    const { t } = useTranslation('article-details')
    const { isLoading, data: articles, error } = getArticleRecommendationList(3)

    if (isLoading || error || !articles) {
        return null
    }

    console.log('ArticleRecommendationsList articles', articles)

    return (
        <VStack
            data-testid='ArticleRecommendationsList'
            className={classNames('', {}, [className])}
            gap='8'
        >
            <Text size={TextSize.SIZE_L} title={t('Рекомендации')}/>
            <ArticlesList
                target='_blank'
                articles={articles}
                isLoading={isLoading}
                view={ArticleView.TILE}
            />
        </VStack>
    )
})