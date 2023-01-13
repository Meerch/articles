import { fireEvent, screen } from '@testing-library/react'
import { Sidebar } from './Sidebar'
import componentRender from '@/shared/lib/tests/componentRender/componentRender'

describe('Sidebar', () => {
    test('Test render sidebar', () => {
        componentRender(<Sidebar/>)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })

    test('Test toggle sidebar', () => {
        componentRender(<Sidebar/>)
        const toggle = screen.getByTestId('sidebar-toggle')
        fireEvent.click(toggle)
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
    })
})