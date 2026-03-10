// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
// cn: Classname utility function
// - Safely merges Tailwind CSS classes
// - Handles conflicts and overrides using tailwind-merge
// - Used throughout components for dynamic styling

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Safely combines multiple class names with Tailwind CSS conflict resolution
 * @param inputs - Variable number of class values (strings, objects, arrays)
 * @returns Merged and deduplicated class string
 * @example
 * cn('bg-blue-500', 'bg-red-500') // Returns: 'bg-red-500'
 * cn('p-4', { 'p-8': isPadded }) // Conditionally applies classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
