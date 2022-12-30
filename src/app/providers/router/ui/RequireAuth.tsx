import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { getUserAuthData, UserRole, getUserRoles } from '@/entities/User'
import { getRouteForbidden, getRouteMain } from '@/shared/const/router'

interface RequireAuthProps {
    children: JSX.Element
    roles?: UserRole[]
}

export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
    const auth = useSelector(getUserAuthData)
    const userRoles = useSelector(getUserRoles)
    const location = useLocation()

    const hasRequireRoles = useMemo(() => {
        if (!roles) {
            return true
        }

        return roles.some(requiredRole => {
            return userRoles?.includes(requiredRole)
        })
    }, [roles, userRoles])

    if (!auth) {
        return <Navigate to={getRouteMain()} state={{ from: location }} replace/>
    }

    if (!hasRequireRoles) {
        return <Navigate to={getRouteForbidden()} state={{ from: location }} replace/>
    }

    return children
}