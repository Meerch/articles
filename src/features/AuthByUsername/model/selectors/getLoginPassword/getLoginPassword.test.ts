import { getLoginPassword } from './getLoginPassword'

import { StateSchema } from '@/app/providers/StoreProvider'

describe('getLoginPassword.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: 'password123'
            }
        }
        expect(getLoginPassword(state as StateSchema)).toBe('password123')
    })

    test('test empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginPassword(state as StateSchema)).toEqual('')
    })
})