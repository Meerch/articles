import { getProfileData } from './getProfileData'

import { StateSchema } from '@/app/providers/StoreProvider'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { Profile } from '@/entities/Profile'

const data: Profile = {
    username: 'nickname',
    first: 'firstName',
    lastname: 'lastName',
    age: 18,
    avatar: 'avatar',
    currency: Currency.RUB,
    country: Country.Russia,
    city: 'Moscow'
}

describe('getProfileData.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data
            }
        }
        expect(getProfileData(state as StateSchema)).toEqual(data)
    })

    test('test empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileData(state as StateSchema)).toEqual(undefined)
    })
})