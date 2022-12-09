import { FC, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getUserAuthData } from 'entities/User'
import { HStack } from 'shared/ui/Stack'
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { profileActions } from '../../model/slice/profileSlice'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'

interface ProfilePageHeaderProps {
    className?: string
}

export const EditableProfileCardHeader: FC<ProfilePageHeaderProps> = ({ className }) => {
    const { t } = useTranslation('profile')
    const dispatch = useAppDispatch()
    const readonly = useSelector(getProfileReadonly)
    const authData = useSelector(getUserAuthData)
    const profileData = useSelector(getProfileData)
    const canEdit = authData?.id === profileData?.id

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
        <HStack max justify='between' className={classNames('', {}, [className])}>
            <Text title={t('Профиль')} />
            {
                canEdit &&
                <>
                    {
                        readonly
                            ? (<Button
                                onClick={onEdit}
                                theme={ButtonTheme.OUTLINE}
                                data-testid='EditableProfileCardHeader.EditButton'
                            >
                                {t('Редактировать')}
                            </Button>)
                            : (
                                <HStack gap='8'>
                                    <Button
                                        onClick={onCancelEdit}
                                        theme={ButtonTheme.OUTLINE_RED}
                                        data-testid='EditableProfileCardHeader.CancelButton'
                                    >
                                        {t('Отменить')}
                                    </Button>
                                    <Button
                                        onClick={updateProfile}
                                        theme={ButtonTheme.OUTLINE}
                                        data-testid='EditableProfileCardHeader.SaveButton'
                                    >
                                        {t('Сохранить')}
                                    </Button>
                                </HStack>
                            )
                    }
                </>
            }
        </HStack>
    )
}