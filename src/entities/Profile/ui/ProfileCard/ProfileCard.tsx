import { FC } from 'react'
import cls from './ProfileCard.module.scss'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text'
import { Input } from 'shared/ui/Input/Input'
import { Profile } from '../../model/types/profileSchema'
import { Loader } from 'shared/ui/Loader/Loader'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Currency } from 'entities/Currency/model/types/currency'
import { CurrencySelect } from 'entities/Currency'
import { Country, CountrySelect } from 'entities/Country'

interface ProfileCardProps {
    className?: string
    data?: Profile
    isLoading?: boolean
    error?: string
    readonly?: boolean
    onChangeFirstName?: (value: string) => void
    onChangeLastName?: (value: string) => void
    onChangeAge?: (value: string) => void
    onChangeCity?: (value: string) => void
    onChangeUsername?: (value: string) => void
    onChangeAvatar?: (value: string) => void
    onChangeCurrency?: (value: Currency) => void
    onChangeCountry?: (value: Country) => void
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
    const {
        className,
        isLoading,
        data,
        error,
        readonly,
        onChangeFirstName,
        onChangeLastName,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry
    } = props
    const { t } = useTranslation()

    if (isLoading) {
        return (<div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
            <Loader />
        </div>)
    }

    if (error) {
        return (<div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
            <Text
                align={TextAlign.CENTER}
                theme={TextTheme.ERROR}
                title='Произошла ошибка'
                text='Пожалуйста обновите страницу и попробуйте ещё раз'
            />
        </div>)
    }

    const mods: Mods = {
        [cls.editing]: readonly
    }

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <div className={cls.data}>
                {
                    data?.avatar && (
                        <div className={cls.avatarWrapper}>
                            <Avatar src={data?.avatar} alt='Avatar'/>
                        </div>
                    ) }
                <Input
                    readonly={readonly}
                    onChange={onChangeFirstName}
                    className={cls.input}
                    value={data?.first}
                    placeholder={t('Имя')}
                />
                <Input
                    readonly={readonly}
                    onChange={onChangeLastName}
                    className={cls.input}
                    value={data?.lastname}
                    placeholder={t('Фамилия')}
                />
                <Input
                    readonly={readonly}
                    onChange={onChangeAge}
                    className={cls.input}
                    value={data?.age}
                    placeholder={t('Возраст')}
                />
                <Input
                    readonly={readonly}
                    onChange={onChangeCity}
                    className={cls.input}
                    value={data?.city}
                    placeholder={t('Город')}
                />
                <Input
                    readonly={readonly}
                    onChange={onChangeUsername}
                    className={cls.input}
                    value={data?.username}
                    placeholder={t('Никнейм')}
                />
                <Input
                    readonly={readonly}
                    onChange={onChangeAvatar}
                    className={cls.input}
                    value={data?.avatar}
                    placeholder={t('Ссылка на аватар')}
                />
                <CurrencySelect
                    className={cls.input}
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    className={cls.input}
                    value={data?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                />
            </div>
        </div>
    )
}