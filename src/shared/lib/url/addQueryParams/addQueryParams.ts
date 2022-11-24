export const getQueryParams = (params: OptionalRecord<string, string>) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            searchParams.set(key, value)
        }
    })

    return `?${searchParams.toString()}`
}

/**
 * Функция добавления параметров в строку запросов в URL
 * @param params
 */
export const addQueryParams = (params: OptionalRecord<string, string>) => {
    window.history.pushState(null, '', getQueryParams(params))
}