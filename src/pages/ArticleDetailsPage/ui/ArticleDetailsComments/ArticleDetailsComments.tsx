import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getArticleCommentsIsLoading } from '../../model/selectors/comments/comments'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import {
    fetchCommentsByArticleId
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import {
    getArticleComments
} from '../../model/slices/articleDetailsCommentsSlice/articleDetailsCommentsSlice'

import { CommentList } from '@/entities/Comment'
import { AddCommentForm } from '@/features/AddCommentForm'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import useInitialEffect from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { VStack } from '@/shared/ui/Stack'
import { Text, TextSize } from '@/shared/ui/Text'

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