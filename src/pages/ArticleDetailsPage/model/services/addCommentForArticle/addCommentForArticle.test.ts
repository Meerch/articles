import { addCommentForArticle } from './addCommentForArticle'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { StateSchema } from 'app/providers/StoreProvider'

const data = {
    articleId: '1',
    id: 'Js0Aqm9',
    text: 'Text comment',
    userId: '1'
}

const initialState: DeepPartial<StateSchema> = {
    user: {
        authData: {
            id: '1'
        }
    },
    articleDetails: {
        data: {
            id: '1'
        }
    }
}

describe('addCommentForArticle.test', () => {
    test('test fulfilled state', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, initialState)
        thunk.api.post.mockReturnValue(Promise.resolve({ data }))
        const result = await thunk.callThunk('Text comment')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(thunk.dispatch).toHaveBeenCalledTimes(3)
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data)
    })

    test('with server error', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, initialState)
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
        const result = await thunk.callThunk('Some text')

        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })

    test('validate error no unknown userId and unknown articleId', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, {})
        const result = await thunk.callThunk('Some text')

        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('no data')
    })

    test('validate error without text of comments', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle, initialState)
        // @ts-ignore
        const result = await thunk.callThunk(null)

        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('no data')
    })
})