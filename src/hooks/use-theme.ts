import { useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system")

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)

    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return { theme, setTheme }
}
