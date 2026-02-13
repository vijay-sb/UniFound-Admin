/**
 * This file tests the Alert component.
 * It checks if:
 * 1. The alert renders successfully.
 * 2. The alert changes appearance when using different variants (like "destructive").
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Alert, AlertTitle, AlertDescription } from '../Alert'

describe('Alert', () => {
  it('renders correctly', () => {
    render(
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
    )

    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
    expect(screen.getByText('Heads up!')).toBeInTheDocument()
    expect(screen.getByText(/You can add components/)).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    )
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('border-destructive/50')
  })
})
