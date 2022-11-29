import {
    ArticleDetailsRecommendationsSchema
} from './ArticleDetailsRecommendationsSchema'
import {
    ArticleDetailsCommentsSchema
} from './ArticleDetailsCommentsSchema'

export interface ArticleDetailsPageSchema {
    articleDetailsRecommendation: ArticleDetailsRecommendationsSchema
    articleDetailsComments: ArticleDetailsCommentsSchema
}