import {
    fetchProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    getProfileValidateErrors,
    profileActions,
    ProfileCard,
    profileReducer, ValidateProfileError
} from 'entities/Profile'
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import useInitialEffect from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useParams } from 'react-router-dom'

const reducers: ReducersList = {
    profile: profileReducer
}

const ProfilePage = () => {
    const { t } = useTranslation('profile')
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getProfileIsLoading)
    const readonly = useSelector(getProfileReadonly)
    const error = useSelector(getProfileError)
    const form = useSelector(getProfileForm)
    const validateErrors = useSelector(getProfileValidateErrors)
    const { id } = useParams<{ id: string }>()

    const validateErrorTranslates = {
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректная страна'),
        [ValidateProfileError.SERVER_ERROR]: t('Ошибка сервера'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Некорректное имя или фамилия'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны')
    }

    useInitialEffect(() => {
        if (id) {
            void dispatch(fetchProfileData(id))
        }
    })

    const onChangeFirstName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ first: value ?? '' }))
    }, [dispatch])

    const onChangeLastName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ lastname: value ?? '' }))
    }, [dispatch])

    const onChangeAge = useCallback((value: string) => {
        if (!/[^\d]/g.test(value || '')) {
            dispatch(profileActions.updateProfile({ age: Number(value) ?? 0 }))
        }
    }, [dispatch])

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ city: value ?? '' }))
    }, [dispatch])

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ username: value ?? '' }))
    }, [dispatch])

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value ?? '' }))
    }, [dispatch])

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({ currency }))
    }, [dispatch])

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({ country }))
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterDestroy>
            <ProfilePageHeader />
            {
                validateErrors?.length && validateErrors.map(error => (
                    <Text key={error} theme={TextTheme.ERROR} text={validateErrorTranslates[error]} />
                ))
            }
            <ProfileCard
                readonly={readonly}
                data={form}
                error={error}
                isLoading={isLoading}
                onChangeFirstName={onChangeFirstName}
                onChangeLastName={onChangeLastName}
                onChangeAge={onChangeAge}
                onChangeCity={onChangeCity}
                onChangeUsername={onChangeUsername}
                onChangeAvatar={onChangeAvatar}
                onChangeCurrency={onChangeCurrency}
                onChangeCountry={onChangeCountry}
            />
        </DynamicModuleLoader>
    )
}

export default ProfilePage
