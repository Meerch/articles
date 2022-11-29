import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'

export const fetchRecommendationArticles = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articleDetailsPage/fetchRecommendationArticles',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI
        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _limit: 4
                }
            })

            if (!response.data) {
                throw new Error('server error')
            }

            return response.data
        } catch {
            return rejectWithValue('error')
        }
    }
)