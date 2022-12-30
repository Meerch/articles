import { Notification } from '../model/types/Notification'

import { rtkApi } from '@/shared/api/rtkApi'

const notificationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotificationsList: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications'
            })
        })
    })
})

export const getNotificationList = notificationsApi.useGetNotificationsListQuery