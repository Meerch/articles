import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { initArticlesPage } from './initArticlesPage'

describe('initArticlesPage.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                _inited: false
            }
        })

        const searchParams = new URLSearchParams()
        await thunk.callThunk(searchParams)
        expect(thunk.dispatch).toBeCalledTimes(4)
    })

    test('failed', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                _inited: true
            }
        })

        const searchParams = new URLSearchParams()
        await thunk.callThunk(searchParams)
        expect(thunk.dispatch).toBeCalledTimes(2)
    })
})