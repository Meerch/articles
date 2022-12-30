import { getUserAuthData } from './getUserAuthData'

import { StateSchema } from '@/app/providers/StoreProvider'

const authData = {
    username: 'admin',
    id: '51'
}

describe('getProfileData.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                authData
            }
        }
        expect(getUserAuthData(state as StateSchema))
            .toEqual(authData)
    })

    test('test empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getUserAuthData(state as StateSchema)).toEqual(undefined)
    })
})