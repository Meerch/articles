import { ValidateProfileError } from '../../types/editableProfileCardSchema'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { validateProfileData } from './validateProfileData'
import { Profile } from 'entities/Profile'

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

describe('fetchProfileData.test', () => {
    test('test correct data', () => {
        expect(validateProfileData(data))
            .toEqual([])
    })

    test('test incorrect age', () => {
        expect(validateProfileData({ ...data, age: NaN }))
            .toEqual([ValidateProfileError.INCORRECT_AGE])
    })

    test('test incorrect country', () => {
        expect(validateProfileData({ ...data, country: undefined }))
            .toEqual([ValidateProfileError.INCORRECT_COUNTRY])
    })

    test('test incorrect user data', () => {
        expect(validateProfileData({ ...data, lastname: undefined }))
            .toEqual([ValidateProfileError.INCORRECT_USER_DATA])
    })

    test('test validate empty data', () => {
        expect(validateProfileData(undefined))
            .toEqual([ValidateProfileError.NO_DATA])
    })

    test('test validate several errors', () => {
        expect(validateProfileData({ ...data, lastname: undefined, age: undefined }))
            .toEqual([ValidateProfileError.INCORRECT_USER_DATA, ValidateProfileError.INCORRECT_AGE])
    })
})