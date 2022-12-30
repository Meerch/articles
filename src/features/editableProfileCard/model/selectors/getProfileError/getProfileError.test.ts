import { getProfileError } from './getProfileError'

import { StateSchema } from '@/app/providers/StoreProvider'

describe('getProfileData.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: 'Error'
            }
        }
        expect(getProfileError(state as StateSchema)).toEqual('Error')
    })

    test('test empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileError(state as StateSchema)).toEqual(undefined)
    })
})