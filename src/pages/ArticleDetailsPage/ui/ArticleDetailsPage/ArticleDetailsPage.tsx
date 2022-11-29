import cls from './ArticleDetailsPage.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { ArticleDetails, ArticlesList, ArticleView } from 'entities/Article'
import { useNavigate, useParams } from 'react-router-dom'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { CommentList } from 'entities/Comment'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice/articleDetailsCommentsSlice'
import { useSelector } from 'react-redux'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments/comments'
import useInitialEffect from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { AddCommentForm } from 'features/AddCommentForm'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { Button } from 'shared/ui/Button/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Page } from 'widgets/Page/Page'
import { ArticleDetailsPageReducer } from '../../model/slices'
import {
    fetchRecommendationArticles
} from '../../model/services/fetchRecommendationArticles/fetchRecommendationArticles'
import {
    getArticleRecommendationIsLoading
} from '../../model/selectors/recommendations/recommendations'
import {
    getArticleRecommendations
} from '../../model/slices/articleDetailsRecommendationsSlice/articleDetailsRecommendationsSlice'
import { VStack } from 'shared/ui/Stack'

interface ArticleDetailsPageProps {
    className?: string
}

const reducers: ReducersList = {
    articleDetailsPage: ArticleDetailsPageReducer
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('article-details')
    const { id } = useParams<{ id: string }>()
    const comments = useSelector(getArticleComments.selectAll)
    const isLoading = useSelector(getArticleCommentsIsLoading)
    const recommendationsIsLoading = useSelector(getArticleRecommendationIsLoading)
    const recommendations = useSelector(getArticleRecommendations.selectAll)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useInitialEffect(() => {
        void dispatch(fetchCommentsByArticleId(id))
        void dispatch(fetchRecommendationArticles())
    })

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles)
    }, [navigate])

    const onSendComment = useCallback((value: string) => {
        void dispatch(addCommentForArticle(value))
    }, [dispatch])

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </div>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <VStack gap='16' max>
                    <Button onClick={onBackToList}>
                        {t('Вернуться назад')}
                    </Button>
                    <ArticleDetails id={id}/>
                    <Text size={TextSize.SIZE_L} className={cls.commentTitle} title={t('Рекомендации')}/>
                    <ArticlesList
                        target='_blank'
                        className={cls.recommendations}
                        articles={recommendations}
                        isLoading={recommendationsIsLoading}
                        view={ArticleView.TILE}
                    />
                    <Text size={TextSize.SIZE_L} className={cls.commentTitle} title={t('Комментарии')}/>
                    <AddCommentForm onSendComment={onSendComment} className={cls.addComment}/>
                    <CommentList
                        isLoading={isLoading}
                        comments={comments}
                    />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)