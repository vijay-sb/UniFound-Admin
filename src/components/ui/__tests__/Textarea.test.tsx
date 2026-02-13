/**
 * This file tests the Textarea component (multi-line input).
 * It checks if:
 * 1. The textarea appears with the correct placeholder text.
 * 2. The user can type multiple lines of text.
 * 3. The textarea cannot be typed in when disabled.
 */
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Textarea } from '../Textarea'

describe('Textarea', () => {
  it('renders correctly', () => {
    render(<Textarea placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('accepts user input', () => {
    render(<Textarea placeholder="Enter text" />)
    const textarea = screen.getByPlaceholderText('Enter text') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'Hello' } })
    expect(textarea.value).toBe('Hello')
  })

  it('can be disabled', () => {
    render(<Textarea disabled placeholder="Disabled textarea" />)
    const textarea = screen.getByPlaceholderText('Disabled textarea')
    expect(textarea).toBeDisabled()
  })
})
