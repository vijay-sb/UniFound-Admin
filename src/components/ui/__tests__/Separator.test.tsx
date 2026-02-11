import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Separator } from '../Separator'

describe('Separator', () => {
  it('renders correctly', () => {
    render(<Separator decorative={false} />)
    const separator = screen.getByRole('separator')
    expect(separator).toBeInTheDocument()
  })

  it('renders vertical orientation', () => {
    render(<Separator orientation="vertical" decorative={false} />)
    const separator = screen.getByRole('separator')
    expect(separator).toHaveAttribute('aria-orientation', 'vertical')
  })
})
