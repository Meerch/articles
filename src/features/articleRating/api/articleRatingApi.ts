import { rtkApi } from '@/shared/api/rtkApi'
import { Rating } from '@/entities/Rating'

interface GetArticleRatingArgs {
    articleId: string
    userId?: string
}

interface RateArticleArgs {
    articleId: string
    userId?: string
    feedback?: string
    rate: number
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], GetArticleRatingArgs>({
            query: ({ articleId, userId }) => ({
                url: '/article-ratings',
                params: { articleId, userId }
            })
        }),
        rateArticle: build.mutation<void, RateArticleArgs>({
            query: (args) => ({
                url: '/article-ratings',
                method: 'POST',
                body: args
            })
        })
    })
})

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery
export const useRateArticle = articleRatingApi.useRateArticleMutation