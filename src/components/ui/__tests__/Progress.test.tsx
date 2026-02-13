/**
 * This file tests the Progress component (progress bar).
 * It checks if:
 * 1. The progress bar appears on the screen.
 * 2. It correctly shows the completion percentage (e.g., 60% full).
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Progress } from '../Progress'

describe('Progress', () => {
  it('renders correctly', () => {
    render(<Progress value={50} />)
    const progress = screen.getByRole('progressbar')
    expect(progress).toBeInTheDocument()
    expect(progress).toHaveAttribute('aria-valuenow', '50')
  })
})
