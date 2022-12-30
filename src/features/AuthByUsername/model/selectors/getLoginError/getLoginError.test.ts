import { getLoginError } from './getLoginError'

import { StateSchema } from '@/app/providers/StoreProvider'

describe('getLoginError.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                error: 'error'
            }
        }
        expect(getLoginError(state as StateSchema)).toBe('error')
    })

    test('test empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getLoginError(state as StateSchema)).toEqual(undefined)
    })
})