import { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { profileActions } from '../../model/slice/profileSlice'

import { getUserAuthData } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

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
