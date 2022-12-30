import {
    ArticleDetailsCommentsSchema
} from './ArticleDetailsCommentsSchema'
import {
    ArticleDetailsRecommendationsSchema
} from './ArticleDetailsRecommendationsSchema'

export interface ArticleDetailsPageSchema {
    articleDetailsRecommendation: ArticleDetailsRecommendationsSchema
    articleDetailsComments: ArticleDetailsCommentsSchema
}