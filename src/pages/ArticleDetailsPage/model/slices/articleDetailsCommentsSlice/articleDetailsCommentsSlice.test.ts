import {
    fetchCommentsByArticleId
} from '../../services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { ArticleDetailsCommentsSchema } from '../../types/ArticleDetailsCommentsSchema'

import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice'

import { Comment } from '@/entities/Comment'

const comment1: Comment = {
    id: '1',
    user: {
        id: '1',
        username: 'User 1'
    },
    text: 'Comment #1'
}

const comment2: Comment = {
    id: '2',
    user: {
        id: '2',
        username: 'User 2'
    },
    text: 'Comment #2'
}

describe('test slices articleDetailsCommentsSlice', () => {
    test('test set comments by fetch fulfilled', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = {
            ids: [],
            entities: undefined,
            isLoading: true
        }

        const action = {
            type: fetchCommentsByArticleId.fulfilled.type,
            payload: [comment1, comment2]
        }

        expect(articleDetailsCommentsReducer(
            state as ArticleDetailsCommentsSchema,
            action
        )).toEqual({
            ids: ['1', '2'],
            entities: {
                1: comment1,
                2: comment2
            },
            isLoading: false
        })
    })

    test('test set loading by fetch pending', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = {
            isLoading: false
        }
        const action = {
            type: fetchCommentsByArticleId.pending.type
        }

        expect(articleDetailsCommentsReducer(
            state as ArticleDetailsCommentsSchema,
            action
        )).toEqual({ isLoading: true })
    })

    test('test set error by fetch rejected', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = {
            isLoading: true,
            error: undefined
        }
        const action = {
            type: fetchCommentsByArticleId.rejected.type,
            payload: 'Error'
        }

        expect(articleDetailsCommentsReducer(
            state as ArticleDetailsCommentsSchema,
            action
        )).toEqual({
            error: 'Error',
            isLoading: false
        })
    })
})