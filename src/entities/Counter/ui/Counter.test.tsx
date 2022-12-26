import { fireEvent, screen } from '@testing-library/react'
import componentRender from '@/shared/lib/tests/componentRender/componentRender'
import { Counter } from './Counter'

describe('Counter.test', () => {
    test('test render with initial state', () => {
        componentRender(<Counter/>, {
            initialState: { counter: { value: 10 } }
        })
        expect(screen.getByTestId('value')).toHaveTextContent('10')
    })

    test('increment', () => {
        componentRender(<Counter/>, {
            initialState: { counter: { value: 10 } }
        })
        fireEvent.click(screen.getByTestId('increment-btn'))
        expect(screen.getByTestId('value')).toHaveTextContent('11')
    })

    test('increment', () => {
        componentRender(<Counter/>, {
            initialState: { counter: { value: 10 } }
        })
        fireEvent.click(screen.getByTestId('decrement-btn'))
        expect(screen.getByTestId('value')).toHaveTextContent('9')
    })
})