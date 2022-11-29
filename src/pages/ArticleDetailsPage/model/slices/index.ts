import { combineReducers } from '@reduxjs/toolkit'
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice/articleDetailsCommentsSlice'
import { articleDetailsRecommendationsReducer } from './articleDetailsRecommendationsSlice/articleDetailsRecommendationsSlice'
import { ArticleDetailsPageSchema } from '../types'

export const ArticleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    articleDetailsRecommendation: articleDetailsRecommendationsReducer,
    articleDetailsComments: articleDetailsCommentsReducer
})