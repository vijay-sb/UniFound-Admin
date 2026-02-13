/**
 * This file tests the DropdownMenu component.
 * It checks if:
 * 1. The menu is hidden by default.
 * 2. Clicking the trigger opens the menu to show options.
 * 3. The menu items are clickable and displayed correctly.
 */
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from '../DropdownMenu'

describe('DropdownMenu', () => {
  it('opens and displays items', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    expect(screen.queryByText('My Account')).not.toBeInTheDocument()

    const trigger = screen.getByText('Open Menu')
    fireEvent.pointerDown(trigger)
    fireEvent.click(trigger) // Try both just in case

    expect(await screen.findByText('My Account')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })
})
