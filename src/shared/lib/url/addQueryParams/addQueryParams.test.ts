import { getQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams'

describe('addQueryParams.test', () => {
    test('test with one param', () => {
        const params = {
            test: 'value'
        }
        expect(getQueryParams(params)).toBe('?test=value')
    })

    test('test with several params', () => {
        const params = {
            test: 'value',
            test2: 'value2'
        }
        expect(getQueryParams(params)).toBe('?test=value&test2=value2')
    })

    test('test with one param and param with value of undefined', () => {
        const params = {
            test: 'value',
            test2: undefined
        }
        expect(getQueryParams(params)).toBe('?test=value')
    })
})