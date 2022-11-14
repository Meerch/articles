import { getArticleCommentsError, getArticleCommentsIsLoading } from './comments'
import { StateSchema } from 'app/providers/StoreProvider'

describe('test selectors of comments', () => {
    test('test getArticleCommentsIsLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: {
                isLoading: true
            }
        }
        expect(getArticleCommentsIsLoading(state as StateSchema)).toBe(true)
    })

    test('test getArticleCommentsIsLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: {
                error: 'Error'
            }
        }
        expect(getArticleCommentsError(state as StateSchema)).toBe('Error')
    })
})