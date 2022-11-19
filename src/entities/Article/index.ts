export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'
export { ArticlesList } from './ui/ArticlesList/ArticlesList'
export { ArticleViewSelector } from './ui/ArticleViewSelector/ArticleViewSelector'
export { articleDetailsActions, articleDetailsReducer } from './model/slice/articleDetailsSlice'
export { ArticleDetailsSchema } from './model/types/articleDetailsSchema'
export { Article, ArticleView } from './model/types/article'
export {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from './model/selectors/articleDetails'