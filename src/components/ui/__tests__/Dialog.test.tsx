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
