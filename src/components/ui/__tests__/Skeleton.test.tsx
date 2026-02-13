/**
 * This file tests the Skeleton component (loading state).
 * It checks if:
 * 1. The skeleton shape appears with the right styles.
 * 2. It has the "pulse" animation to indicate loading.
 */
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Skeleton } from '../Skeleton'

describe('Skeleton', () => {
  it('renders correctly', () => {
    const { container } = render(<Skeleton className="w-[100px] h-[20px]" />)
    const skeleton = container.firstChild
    expect(skeleton).toHaveClass('animate-pulse')
    expect(skeleton).toHaveClass('rounded-md')
    expect(skeleton).toHaveClass('bg-muted')
  })
})
