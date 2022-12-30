import { ValidateProfileError } from '../consts/validateErrorConsts'

import { Profile } from '@/entities/Profile'

export interface ProfileSchema {
    data?: Profile
    form?: Profile
    error?: string
    isLoading: boolean
    readonly: boolean
    validateErrors?: ValidateProfileError[]
}