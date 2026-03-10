// ============================================================================
// THEME HOOK
// ============================================================================
// Custom hook for managing theme (dark/light/system) and applying to DOM

import { useEffect, useState } from "react"

// Supported theme options
type Theme = "dark" | "light" | "system"

/**
 * Manages application theme and applies to document
 * - Tracks theme preference (dark, light, or system default)
 * - Listens to system theme changes
 * - Updates document class for CSS to react to theme
 * 
 * @returns Object with current theme and setter function
 * @example
 * const { theme, setTheme } = useTheme()
 * setTheme('dark') // Changes theme to dark
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system")

  useEffect(() => {
    // Determine if dark mode should be active
    const isDark =
      // Explicit dark theme selected
      theme === "dark" ||
      // System theme is dark AND system preference is selected
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)

    // Apply theme to document root for CSS to use
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return { theme, setTheme }
}
