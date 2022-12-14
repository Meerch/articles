import { createAsyncThunk } from '@reduxjs/toolkit'

import { Article } from '../../types/article'

import { ThunkConfig } from '@/app/providers/StoreProvider'

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
    'articleDetails/fetchArticleById',
    async (articleId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI
        try {
            const response = await extra.api.get<Article>(`/articles/${articleId}`)

            if (!response.data) {
                throw new Error('server error')
            }

            return response.data
        } catch {
            return rejectWithValue('error')
        }
    }
)