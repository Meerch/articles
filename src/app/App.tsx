import React, { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppRouter } from './providers/router'
import { getUserInited, userActions } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

const App = () => {
    const dispatch = useAppDispatch()
    const inited = useSelector(getUserInited)

    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch])

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback=''>
                <Navbar/>
                <div className="content-page">
                    <Sidebar/>
                    {inited && <AppRouter/>}
                </div>
            </Suspense>
        </div>
    )
}

export default App
