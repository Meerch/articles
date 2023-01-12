import { Reducer } from '@reduxjs/toolkit'
import { ReactNode, useEffect } from 'react'
import { useStore } from 'react-redux'
import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider'
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch'

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>
}

interface DynamicModuleLoaderProps {
    reducers: ReducersList
    removeAfterDestroy?: boolean
    children: ReactNode
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const { children, reducers, removeAfterDestroy = true } = props
    const dispatch = useAppDispatch()
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
