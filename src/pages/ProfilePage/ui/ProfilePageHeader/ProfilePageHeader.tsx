import { FC, useCallback } from 'react'
import cls from './ProfilePageHeader.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import { getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ProfilePageHeaderProps {
    className?: string
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({ className }) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const readonly = useSelector(getProfileReadonly)

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false))
    }, [dispatch])

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    }, [dispatch])

    const updateProfile = useCallback(() => {
        void dispatch(updateProfileData())
    }, [dispatch])

    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('Профиль')} />
            {
                readonly
                    ? (<Button
                        onClick={onEdit}
                        className={cls.editBtn}
                        theme={ButtonTheme.OUTLINE}
                    >
                        {t('Редактировать')}
                    </Button>)
                    : (<>
                        <Button
                            onClick={onCancelEdit}
                            className={cls.cancelEdit}
                            theme={ButtonTheme.OUTLINE_RED}
                        >
                            {t('Отменить')}
                        </Button>
                        <Button
                            onClick={updateProfile}
                            className={cls.saveChanges}
                            theme={ButtonTheme.OUTLINE}
                        >
                            {t('Сохранить')}
                        </Button>
                    </>)
            }
        </div>
    )
}
