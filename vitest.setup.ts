import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver

// Mock PointerCapture
window.HTMLElement.prototype.setPointerCapture = vi.fn()
window.HTMLElement.prototype.releasePointerCapture = vi.fn()
window.HTMLElement.prototype.hasPointerCapture = vi.fn()

// Mock Image
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
    // Simulate async load
    setTimeout(() => {
      if (value.includes('error')) {
        this.onerror()
      } else {
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
