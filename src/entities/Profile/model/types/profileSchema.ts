import { Currency } from 'entities/Currency/model/types/currency'
import { Country } from 'entities/Country/model/types/country'

export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_aGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'USER_NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR'
}

export interface Profile {
    id?: string
    first?: string
    lastname?: string
    age?: number
    currency?: Currency
    country?: Country
    city?: string
    username?: string
    avatar?: string
}

export interface ProfileSchema {
    data?: Profile
    form?: Profile
    error?: string
    isLoading: boolean
    readonly: boolean
    validateErrors?: ValidateProfileError[]
}