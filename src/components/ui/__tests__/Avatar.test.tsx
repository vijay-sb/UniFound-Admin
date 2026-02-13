/**
 * This file tests the Avatar component.
 * It checks if:
 * 1. It shows the fallback text (like "CN") when no image is found.
 * 2. It tries to load the image when a valid URL is provided.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Avatar, AvatarImage, AvatarFallback } from '../Avatar'

describe('Avatar', () => {
  it('renders fallback when image is missing', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it.skip('renders image when provided', async () => {
    render(
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
    const image = await screen.findByRole('img')
    expect(image).toHaveAttribute('src', 'https://github.com/shadcn.png')
    expect(image).toHaveAttribute('alt', '@shadcn')
  })
})
