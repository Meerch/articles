import { useSelector } from 'react-redux'
import { getUserAuthData, UserRole } from 'entities/User'
import { Navigate, useLocation } from 'react-router-dom'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { useMemo } from 'react'
import { getUserRoles } from 'entities/User/model/selectors/roleSelector'

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
        return <Navigate to={RoutePath.main} state={{ from: location }} replace/>
    }

    if (!hasRequireRoles) {
        return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace/>
    }

    return children
}