import React from 'react'
import { useParams } from 'react-router-dom'

import { EditableProfileCard } from '@/features/editableProfileCard'
import { VStack } from '@/shared/ui/Stack'
import { Page } from '@/widgets/Page'

const ProfilePage = () => {
    const { id } = useParams<{ id: string }>()

    // if (!id) {
    //     return (<Text text={t('Профиль не найден')}/>)
    // }

    return (
        <Page>
            <VStack gap='16' max>
                <EditableProfileCard id={id!}/>
            </VStack>
        </Page>
    )
}

export default ProfilePage
