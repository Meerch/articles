import { render, screen } from '@testing-library/react'
import { ThemeButton, Button } from './Button'

describe('Button', () => {
    test('Test render button', () => {
        render(<Button>TEST</Button>)
        expect(screen.getByText('TEST')).toBeInTheDocument()
    })

    test('Test clear theme', () => {
        render(<Button theme={ThemeButton.CLEAR}>TEST</Button>)
        expect(screen.getByText('TEST')).toHaveClass('clear')
        screen.debug()
    })
})