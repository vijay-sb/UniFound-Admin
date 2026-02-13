/**
 * This file tests the Switch component (toggle button).
 * It checks if:
 * 1. The switch appears on the screen.
 * 2. Clicking the switch toggles it between on/off.
 * 3. The switch cannot be clicked when disabled.
 */
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Switch } from '../Switch'

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toBeInTheDocument()
  })

  it('toggles state on click', () => {
    const onCheckedChange = vi.fn()
    render(<Switch onCheckedChange={onCheckedChange} />)
    const switchElement = screen.getByRole('switch')
    fireEvent.click(switchElement)
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('can be disabled', () => {
    render(<Switch disabled />)
    const switchElement = screen.getByRole('switch')
    expect(switchElement).toBeDisabled()
  })
})
