import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Text, TextSize } from '@/shared/ui/Text'
import { AddCommentForm } from '@/features/AddCommentForm'
import { CommentList } from '@/entities/Comment'
import { useSelector } from 'react-redux'
import {
    getArticleComments
} from '../../model/slices/articleDetailsCommentsSlice/articleDetailsCommentsSlice'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments/comments'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import useInitialEffect from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import {
    fetchCommentsByArticleId
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { VStack } from '@/shared/ui/Stack'

interface ArticleDetailsCommentsProps {
    className?: string
    id: string
}

export const ArticleDetailsComments = memo(({ className, id }: ArticleDetailsCommentsProps) => {
    const { t } = useTranslation('article-details')
    const dispatch = useAppDispatch()
    const comments = useSelector(getArticleComments.selectAll)
    const isLoading = useSelector(getArticleCommentsIsLoading)

    const onSendComment = useCallback((value: string) => {
        void dispatch(addCommentForArticle(value))
    }, [dispatch])

    useInitialEffect(() => {
        void dispatch(fetchCommentsByArticleId(id))
    })

    return (
        <VStack gap='8' max className={classNames('', {}, [className])}>
            <Text size={TextSize.SIZE_L} title={t('Комментарии')}/>
            <AddCommentForm onSendComment={onSendComment}/>
            <CommentList
                comments={comments}
                isLoading={isLoading}
            />
        </VStack>
    )
})