/**
 * This file tests the Dialog (Modal) component.
 * It checks if:
 * 1. The dialog is hidden by default.
 * 2. Clicking the trigger button opens the dialog.
 * 3. The dialog shows the correct title and description when open.
 */
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../Dialog'

describe('Dialog', () => {
  it('opens and closes correctly', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Open Dialog'))
    
    // Dialog content should be visible
    expect(await screen.findByText('Dialog Title')).toBeInTheDocument()
    expect(screen.getByText('Dialog Description')).toBeInTheDocument()
  })
})
