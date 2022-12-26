import { rtkApi } from 'shared/api/rtkApi'
import { Notification } from '../model/types/Notification'

const notificationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationList: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications'
            })
        })
    })
})

export const getNotificationList = notificationsApi.useGetArticleRecommendationListQuery