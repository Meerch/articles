import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from 'app/providers/StoreProvider/config/StateSchema'
import { CounterReducer } from 'entities/Counter'
import { userReducer } from 'entities/User'
import { createReducerManager } from 'app/providers/StoreProvider/config/createReducerManager'
import { $api } from 'shared/api/api'
import { uiReducer } from 'features/UI'

export const createReduxStore = (
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>
) => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: CounterReducer,
        user: userReducer,
        ui: uiReducer
    }

    const reducerManager = createReducerManager(rootReducers)

    const extraArg: ThunkExtraArg = {
        api: $api
    }

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg
            }
        })
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']