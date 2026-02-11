import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Popover, PopoverTrigger, PopoverContent } from '../Popover'

describe('Popover', () => {
  it('opens and displays content', async () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>
    )

    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Open Popover'))

    expect(await screen.findByText('Popover Content')).toBeInTheDocument()
  })
})
