import { ValidateProfileError } from '../../consts/validateErrorConsts'

import { getProfileValidateErrors } from './getProfileValidateErrors'

import { StateSchema } from '@/app/providers/StoreProvider'

describe('getProfileData.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: [ValidateProfileError.SERVER_ERROR, ValidateProfileError.INCORRECT_AGE]
            }
        }
        expect(getProfileValidateErrors(state as StateSchema))
            .toEqual([ValidateProfileError.SERVER_ERROR, ValidateProfileError.INCORRECT_AGE])
    })

    test('test empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined)
    })
})