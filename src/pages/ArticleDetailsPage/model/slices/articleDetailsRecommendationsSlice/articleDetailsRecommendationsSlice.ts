import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { ArticleDetailsRecommendationsSchema } from '../../types/ArticleDetailsRecommendationsSchema'
import { Article } from 'entities/Article'
import { fetchRecommendationArticles } from '../../services/fetchRecommendationArticles/fetchRecommendationArticles'

const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (comment) => comment.id
})

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state?.articleDetailsPage?.articleDetailsRecommendation ?? recommendationsAdapter.getInitialState()
)

const articleDetailsRecommendationsSlice = createSlice({
    name: 'articleDetailsRecommendationsSlice',
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {}
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendationArticles.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchRecommendationArticles.fulfilled, (
                state,
                action: PayloadAction<Article[]>
            ) => {
                state.isLoading = false
                recommendationsAdapter.setAll(state, action.payload)
            })
            .addCase(fetchRecommendationArticles.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const { reducer: articleDetailsRecommendationsReducer } = articleDetailsRecommendationsSlice