import { fetchProfileData } from './fetchProfileData'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { Profile } from '../../types/profileSchema'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'

const data: Profile = {
    id: '1',
    username: 'nickname',
    first: 'firstName',
    lastname: 'lastName',
    age: 18,
    avatar: 'avatar',
    currency: Currency.RUB,
    country: Country.Russia,
    city: 'Moscow'
}

describe('fetchProfileData.test', () => {
    test('', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData)
        thunk.api.get.mockReturnValue(Promise.resolve({ data }))
        const result = await thunk.callThunk('1')

        expect(thunk.api.get).toHaveBeenCalled()
        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data)
    })

    test('with server error', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData)
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
        const result = await thunk.callThunk('1')

        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(thunk.api.get).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('error')
    })
})