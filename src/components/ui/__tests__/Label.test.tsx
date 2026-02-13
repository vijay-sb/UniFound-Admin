/**
 * This file tests the Label component.
 * It checks if:
 * 1. The label text appears correctly.
 * 2. The label is correctly linked to an input field (so clicking the label focuses the input).
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Label } from '../Label'

describe('Label', () => {
  it('renders correctly', () => {
    render(<Label htmlFor="email">Email</Label>)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Email')).toHaveAttribute('for', 'email')
  })
})
