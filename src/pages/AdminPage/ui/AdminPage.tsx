import React from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from 'widgets/Page/Page'

const AdminPage = () => {
    const { t } = useTranslation()

    return (
        <Page>
            {t('Admin page')}
        </Page>
    )
}

export default AdminPage
