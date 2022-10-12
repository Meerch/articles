import { fireEvent, screen } from '@testing-library/react'
import { Sidebar } from './Sidebar'
import renderWithTranslation from 'shared/lib/tests/renderWithTranslation/renderWithTranslation'

describe('Sidebar', () => {
    test('Test render sidebar', () => {
        renderWithTranslation(<Sidebar/>)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })

    test('Test toggle sidebar', () => {
        renderWithTranslation(<Sidebar/>)
        const toggle = screen.getByTestId('sidebar-toggle')
        fireEvent.click(toggle)
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
    })
})