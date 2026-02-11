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
