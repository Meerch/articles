import { FC, useEffect } from 'react'
import { Reducer } from '@reduxjs/toolkit'
import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema'
import { useDispatch, useStore } from 'react-redux'

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer
}

interface DynamicModuleLoaderProps {
    reducers: ReducersList
    removeAfterDestroy?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const { children, reducers, removeAfterDestroy = true } = props
    const dispatch = useDispatch()
    const store = useStore() as ReduxStoreWithManager

    useEffect(() => {
        const reducersMap = store.reducerManager.getReducerMap()

        Object.entries(reducers).forEach(([name, reducer]) => {
            if (!reducersMap[name as StateSchemaKey]) {
                store.reducerManager.add(name as StateSchemaKey, reducer)
                dispatch({ type: `@INIT async reducer ${name}` })
            }
        })

        return () => {
            if (removeAfterDestroy) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey)
                    dispatch({ type: `@DESTROY async reducer ${name}` })
                })
            }
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {children}
        </>
    )
}
