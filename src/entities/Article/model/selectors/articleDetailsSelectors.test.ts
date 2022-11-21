import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from './articleDetailsSelectors'
import { StateSchema } from 'app/providers/StoreProvider'

describe('articleDetails.test', () => {
    test('should return data', () => {
        const data = {
            id: '1',
            title: 'subtitle'
        }
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data
            }
        }
        expect(getArticleDetailsData(state as StateSchema)).toEqual(data)
    })

    test('test get isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                isLoading: true
            }
        }
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true)
    })

    test('test get error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: 'error'
            }
        }
        expect(getArticleDetailsError(state as StateSchema)).toEqual('error')
    })

    test('test empty state', () => {
        expect(getArticleDetailsError({} as StateSchema)).toEqual(undefined)
    })
})