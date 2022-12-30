import { fetchCommentsByArticleId } from './fetchCommentsByArticleId'

import { Comment } from '@/entities/Comment'
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'

const data: Comment[] = [
    {
        id: '1',
        user: {
            id: '1',
            username: 'Username #1'
        },
        text: 'Comment 1'
    },
    {
        id: '2',
        user: {
            id: '2',
            username: 'Username #2'
        },
        text: 'Comment 2'
    }
]

// const initialState: DeepPartial<StateSchema> = {
//     articleDetails: {
//         data: {
//             id: '1'
//         }
//     }
// }

describe('addCommentForArticle.test', () => {
    test('test fulfilled state', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId)
        thunk.api.get.mockReturnValue(Promise.resolve({ data }))
        const result = await thunk.callThunk('1')

        expect(thunk.api.get).toHaveBeenCalled()
        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data)
    })

    test('with server error', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId)
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
        const result = await thunk.callThunk('1')

        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(thunk.api.get).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })

    test('validate error without argument: articleId', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId)
        const result = await thunk.callThunk(undefined)

        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('error')
    })
})