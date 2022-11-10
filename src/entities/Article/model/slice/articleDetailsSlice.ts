import { createSlice } from '@reduxjs/toolkit'
import { ArticleDetailsSchema } from '../../model/types/articleDetailsSchema'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'

const initialState: ArticleDetailsSchema = {
    isLoading: false,
    data: undefined,
    error: undefined
}

export const articleDetailsSlice = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { actions: articleDetailsActions } = articleDetailsSlice
export const { reducer: articleDetailsReducer } = articleDetailsSlice