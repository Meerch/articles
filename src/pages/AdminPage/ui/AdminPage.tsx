import React from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'

const AdminPage = () => {
    const { t } = useTranslation()

    return (
        <Page data-testid='AdminPage'>
            {t('Admin page')}
        </Page>
    )
}

export default AdminPage
