import { getLoginUsername } from './getLoginUsername'

import { StateSchema } from '@/app/providers/StoreProvider'

describe('getLoginUsername.test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'username123'
            }
        }
        expect(getLoginUsername(state as StateSchema)).toBe('username123')
    })

    test('test empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginUsername(state as StateSchema)).toEqual('')
    })
})