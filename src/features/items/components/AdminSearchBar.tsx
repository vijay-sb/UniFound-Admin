// ============================================================================
// ADMIN SEARCH BAR COMPONENT
// ============================================================================
// Search input for filtering items by keyword

import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface AdminSearchBarProps {
  value: string; // Current search query
  onChange: (value: string) => void; // Callback when search input changes
  placeholder?: string; // Optional custom placeholder text
}

/**
 * Search input field for filtering items
 * - Real-time search as user types
 * - Search icon inside input
 * - Customizable placeholder text
 * 
 * @param value - Current search query text
 * @param onChange - Callback function called with new search text
 * @param placeholder - Optional custom placeholder (defaults to generic search text)
 * @returns Search input component
 * 
 * @example
 * const [query, setQuery] = useState('')
 * <AdminSearchBar
 *   value={query}
 *   onChange={setQuery}
 *   placeholder="Search items..."
 * />
 */
export default function AdminSearchBar({
  value,
  onChange,
  placeholder = "Search items by category, zone, or ID...",
}: AdminSearchBarProps) {
  return (
    <div className="relative max-w-md w-full">
      {/* Search icon inside input */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      {/* Search input field */}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 bg-blue-950 border-white/10 focus:border-[#3ECF8E]/50 transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
}
