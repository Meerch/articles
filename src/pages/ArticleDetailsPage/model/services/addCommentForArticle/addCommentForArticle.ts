import { createAsyncThunk } from '@reduxjs/toolkit'

import {
    fetchCommentsByArticleId
} from '../fetchCommentsByArticleId/fetchCommentsByArticleId'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { getArticleDetailsData } from '@/entities/Article'
import { Comment } from '@/entities/Comment'
import { getUserAuthData } from '@/entities/User'

export const addCommentForArticle = createAsyncThunk<Comment[], string, ThunkConfig<string>>(
    'articleDetails/addCommentForArticle',
    async (text, thunkAPI) => {
        const { extra, dispatch, rejectWithValue, getState } = thunkAPI

        const user = getUserAuthData(getState())
        const article = getArticleDetailsData(getState())

        if (!user || !text || !article) {
            return rejectWithValue('no data')
        }

        try {
            const response = await extra.api.post<Comment[]>('/comments', {
                articleId: article.id,
                userId: user.id,
                text
            })

            if (!response.data) {
                throw new Error('server error')
            }

            void dispatch(fetchCommentsByArticleId(article.id))
            return response.data
        } catch {
            return rejectWithValue('error')
        }
    }
)