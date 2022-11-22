import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { initArticlesPage } from 'pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage'

describe('initArticlesPage.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                _inited: false
            }
        })

        await thunk.callThunk()
        expect(thunk.dispatch).toBeCalledTimes(4)
    })

    test('failed', async () => {
        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                _inited: true
            }
        })

        await thunk.callThunk()
        expect(thunk.dispatch).toBeCalledTimes(2)
    })
})