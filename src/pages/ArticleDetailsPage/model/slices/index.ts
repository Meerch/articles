import { combineReducers } from '@reduxjs/toolkit'

import { ArticleDetailsPageSchema } from '../types'

import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice/articleDetailsCommentsSlice'
import { articleDetailsRecommendationsReducer } from './articleDetailsRecommendationsSlice/articleDetailsRecommendationsSlice'

export const ArticleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    articleDetailsRecommendation: articleDetailsRecommendationsReducer,
    articleDetailsComments: articleDetailsCommentsReducer
})