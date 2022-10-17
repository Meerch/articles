import { configureStore } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema'
import { CounterReducer } from 'entities/Counter'

export const createReduxStore = (initialState?: StateSchema) => {
    return configureStore<StateSchema>({
        reducer: {
            counter: CounterReducer
        },
        devTools: __IS_DEV__,
        preloadedState: initialState
    })
}