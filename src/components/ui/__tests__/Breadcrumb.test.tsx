/**
 * This file tests the Breadcrumb component.
 * It checks if:
 * 1. The breadcrumb navigation renders all its parts (links, separators).
 * 2. It helps users understand where they are in the website hierarchy.
 */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../Breadcrumb'

describe('Breadcrumb', () => {
  it('renders correctly', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Current Page')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
