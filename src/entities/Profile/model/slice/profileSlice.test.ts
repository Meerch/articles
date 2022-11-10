import { Profile, ProfileSchema, ValidateProfileError } from '../types/profileSchema'
import { profileActions, profileReducer } from './profileSlice'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { updateProfileData } from 'entities/Profile'

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

describe('profileSlice.test', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false
        }
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadonly(true)
        )).toEqual({ readonly: true })
    })

    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = {
            form: data
        }
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.updateProfile({ age: 11 })
        )).toEqual({ form: { ...data, age: 11 } })
    })

    test('test cancel edit profile', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
            form: { ...data, age: 56 },
            data,
            validateErrors: [ValidateProfileError.INCORRECT_USER_DATA]
        }
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.cancelEdit()
        )).toEqual({
            readonly: true,
            validateErrors: undefined,
            form: data,
            data
        })
    })

    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.INCORRECT_USER_DATA]
        }

        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending
        )).toEqual({
            isLoading: true,
            validateErrors: undefined
        })
    })

    test('test update profile service fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true
        }

        expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(data, '')
        )).toEqual({
            isLoading: false,
            data,
            form: data,
            readonly: true,
            validateErrors: undefined
        })
    })
})