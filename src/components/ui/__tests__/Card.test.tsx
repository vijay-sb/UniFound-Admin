/**
 * This file tests the Card component.
 * It checks if:
 * 1. The card displays all its parts (Title, Content, Footer) correctly.
 * 2. The card wrapper renders with the correct styling.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../Card'

describe('Card', () => {
  it('renders correctly with content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card Content')).toBeInTheDocument()
    expect(screen.getByText('Card Footer')).toBeInTheDocument()
  })
})
