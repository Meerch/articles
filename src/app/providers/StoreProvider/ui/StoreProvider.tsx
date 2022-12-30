import { ReducersMapObject } from '@reduxjs/toolkit'
import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'

import { createReduxStore, StateSchema } from '@/app/providers/StoreProvider'

interface StoreProviderProps {
    children?: ReactNode
    initialState?: DeepPartial<StateSchema>
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider: FC<StoreProviderProps> = ({ children, initialState, asyncReducers }) => {
    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>
    )

    return (
        <Provider store={store}>
            {children}
        </Provider >
    )
}
