import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { RatingCard } from '@/entities/Rating'
import { useGetArticleRating, useRateArticle } from '@/features/articleRating/api/articleRatingApi'
import { useSelector } from 'react-redux'
import { getUserAuthData } from '@/entities/User'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

export interface ArticleRatingProps {
    className?: string
    articleId: string
}

const ArticleRating = memo(({ className, articleId }: ArticleRatingProps) => {
    const { t } = useTranslation('article-details')
    const userData = useSelector(getUserAuthData)

    const { data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? ''
    })

    const [rateArticle] = useRateArticle()

    const handlerRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            void rateArticle({
                articleId,
                userId: userData?.id ?? '',
                rate: starsCount,
                feedback
            })
        } catch (e) {
            console.log(e)
        }
    }, [articleId, rateArticle, userData?.id])

    const onAccept = useCallback((starsCount: number) => {
        handlerRateArticle(starsCount)
    }, [handlerRateArticle])

    const onCancel = useCallback((starsCount: number, feedback?: string) => {
        handlerRateArticle(starsCount, feedback)
    }, [handlerRateArticle])

    if (isLoading) {
        return (
            <Skeleton width='100%' height={120}/>
        )
    }

    const rating = data?.[0]

    return (
        <RatingCard
            className={className}
            onAccept={onAccept}
            onCancel={onCancel}
            title={t('Оцените статью')}
            feedbackTitle={t('Оставьте свой отзыв о статье, это поможет улучшить качество')}
            rate={rating?.rate}
            hasFeedback
        />
    )
})

export default ArticleRating