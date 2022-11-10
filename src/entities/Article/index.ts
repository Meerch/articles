export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'
export { articleDetailsActions, articleDetailsReducer } from './model/slice/articleDetailsSlice'
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema'
export type { Article } from './model/types/article'
export {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from './model/selectors/articleDetails'