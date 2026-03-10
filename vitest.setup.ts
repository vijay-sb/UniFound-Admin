// ============================================================================
// VITEST SETUP FILE
// ============================================================================
// This file runs before all tests to set up mocks and polyfills
// - Mocks browser APIs (ResizeObserver, PointerCapture, Image)
// - Ensures components can be tested without actual browser features

import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock ResizeObserver (used by components for responsive behavior)
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// Register the mocked ResizeObserver on the window object
window.ResizeObserver = ResizeObserver

// Mock pointer capture methods (used for drag/drop and touch interactions)
window.HTMLElement.prototype.setPointerCapture = vi.fn()
window.HTMLElement.prototype.releasePointerCapture = vi.fn()
window.HTMLElement.prototype.hasPointerCapture = vi.fn()

// Mock Image constructor (used by image components for loading state)
const MockImage = class {
  onload: () => void = () => {}
  onerror: () => void = () => {}
  addEventListener: () => void = () => {}
  removeEventListener: () => void = () => {}
  complete = false
  naturalWidth = 0
  naturalHeight = 0
  private _src = ''
  get src() {
    return this._src
  }
  set src(value: string) {
    this._src = value
    this.complete = false
    // Simulate async image loading with a small delay
    setTimeout(() => {
      // If URL contains 'error', simulate load failure
      if (value.includes('error')) {
        this.onerror()
      } else {
        // Otherwise, simulate successful load with default dimensions
        this.complete = true
        this.naturalWidth = 100
        this.naturalHeight = 100
        this.onload()
      }
    }, 10)
  }
} as any

global.Image = MockImage
window.Image = MockImage
