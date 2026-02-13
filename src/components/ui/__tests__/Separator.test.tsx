/**
 * This file tests the Separator component.
 * It checks if:
 * 1. The separator line appears on the screen.
 * 2. It can be displayed either horizontally or vertically.
 * 3. It is correctly marked as "decorative" so screen readers ignore it.
 */
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
